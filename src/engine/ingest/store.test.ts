import { describe, expect, it } from "vitest";
import { applyMerge, dedupePolls, effectivePolls, fingerprint, mergePolls } from "./store";
import type { Poll } from "../types";
import { validatePoll } from "./types";

function poll(over: Partial<Poll>): Poll {
  return {
    id: "x",
    date: "2026-09-10",
    pollster: "מדגם",
    outlet: "חדשות 12",
    sampleSize: 800,
    mode: "phone",
    seats: { likud: 24, yashar: 22, byachad: 15, democrats: 11, shas: 7, utj: 8 },
    provenance: "published-partial",
    // Distinct per poll: these fixtures stand in for different articles, and a
    // shared URL would (correctly) collapse them in the article pass.
    source: `https://example.test/${over.id ?? "poll"}`,
    ...over,
  };
}

describe("fingerprint", () => {
  it("is identical for the same poll reported under two different ids", () => {
    expect(fingerprint(poll({ id: "a" }))).toBe(fingerprint(poll({ id: "b" })));
  });

  it("is insensitive to the order the seats were written in", () => {
    const a = poll({ seats: { likud: 24, yashar: 22, shas: 7, utj: 8, byachad: 15, democrats: 11 } });
    expect(fingerprint(a)).toBe(fingerprint(poll({})));
  });

  it("differs when the numbers differ", () => {
    expect(fingerprint(poll({ seats: { likud: 25 } }))).not.toBe(fingerprint(poll({})));
  });
});

describe("mergePolls", () => {
  it("adds a genuinely new poll", () => {
    const r = mergePolls([], [poll({ id: "new" })], []);
    expect(r.added.map((p) => p.id)).toEqual(["new"]);
    expect(r.total).toBe(1);
  });

  it("never lets a scraped poll displace a human-verified one", () => {
    const curated = [poll({ id: "curated", notes: "checked by hand" })];
    const scraped = poll({ id: "scraped-same-numbers" });
    const r = mergePolls([], [scraped], curated);
    expect(r.added).toHaveLength(0);
    expect(r.shadowedByCurated).toBe(1);
  });

  it("counts the same poll from two outlets once", () => {
    const r = mergePolls([poll({ id: "first" })], [poll({ id: "second" })], []);
    expect(r.added).toHaveLength(0);
    expect(r.duplicates).toBe(1);
  });

  it("quarantines an impossible poll instead of dropping it silently", () => {
    const bad = poll({ id: "bad", seats: { likud: 80, yashar: 70 } }); // 150 seats
    const r = mergePolls([], [bad], []);
    expect(r.added).toHaveLength(0);
    expect(r.quarantined).toHaveLength(1);
    expect(r.quarantined[0].reasons.join(" ")).toMatch(/120/);
  });

  it("quarantines a delegation that cannot exist above the threshold", () => {
    const r = mergePolls([], [poll({ id: "b", seats: { likud: 24, yashar: 2 } })], []);
    expect(r.quarantined[0].reasons.join(" ")).toMatch(/impossible/);
  });

  it("only ever grows the store", () => {
    const existing = [poll({ id: "old", date: "2026-08-01" })];
    const r = mergePolls(existing, [poll({ id: "new", date: "2026-09-10" })], []);
    const merged = applyMerge(existing, r);
    expect(merged.polls.map((p) => p.id).sort()).toEqual(["new", "old"]);
  });

  it("returns the store newest-first", () => {
    const r = mergePolls(
      [],
      [poll({ id: "a", date: "2026-08-01" }), poll({ id: "b", date: "2026-09-01", seats: { likud: 25, yashar: 22, byachad: 15, democrats: 11, shas: 7, utj: 8 } })],
      [],
    );
    expect(applyMerge([], r).polls[0].id).toBe("b");
  });
});

describe("effectivePolls", () => {
  it("combines curated and stored polls without double-counting", () => {
    const curated = [poll({ id: "curated" })];
    const stored = [poll({ id: "dup-of-curated" }), poll({ id: "unique", date: "2026-09-01", seats: { likud: 26, yashar: 20, byachad: 14, democrats: 10, shas: 8, utj: 8 } })];
    const got = effectivePolls(curated, stored);
    expect(got.map((p) => p.id).sort()).toEqual(["curated", "unique"]);
  });
});

describe("dedupePolls — one poll per institute per date", () => {
  const seats11 = { likud: 21, yashar: 25, byachad: 13, democrats: 10, "yisrael-beiteinu": 9, otzma: 9, utj: 8, shas: 7, "joint-list": 7, raam: 5, "religious-zionism": 6 };
  const seats12 = { ...seats11, amcha: 0 };

  it("collapses several readings of one poll into the most complete one", () => {
    // Exactly the 9 September case from the live data: the same Channel 12 poll
    // read out of several articles, each extraction slightly different.
    const readings = [
      poll({ id: "a", date: "2026-09-09", pollster: "מדגם", seats: { likud: 21, yashar: 25, byachad: 13 } }),
      poll({ id: "b", date: "2026-09-09", pollster: "מדגם", seats: seats11 }),
      poll({ id: "c", date: "2026-09-09", pollster: "מדגם", seats: { likud: 21, yashar: 24 } }),
    ];
    const got = dedupePolls(readings);
    expect(got).toHaveLength(1);
    expect(got[0].id).toBe("b");
  });

  it("keeps two genuinely different institutes on the same date", () => {
    const got = dedupePolls([
      poll({ id: "midgam", date: "2026-09-09", pollster: "מדגם", seats: seats11 }),
      poll({ id: "direct", date: "2026-09-09", pollster: "דיירקט פולס", seats: seats11 }),
    ]);
    expect(got.map((p) => p.id).sort()).toEqual(["direct", "midgam"]);
  });

  it("drops an aggregator's copy when an identified poll covers that date", () => {
    // An aggregator republishing someone else's poll is a duplicate by
    // construction, and it carries no institute name to correct it by.
    const got = dedupePolls([
      poll({ id: "primary", date: "2026-09-09", pollster: "מדגם", seats: seats11 }),
      poll({ id: "agg", date: "2026-09-09", pollster: "משתנה", outlet: "סקר הסקרים", seats: seats11 }),
    ]);
    expect(got.map((p) => p.id)).toEqual(["primary"]);
  });

  it("keeps an aggregator's poll when nothing identified covers that date", () => {
    const got = dedupePolls([
      poll({ id: "agg", date: "2026-09-02", pollster: "משתנה", outlet: "סקר הסקרים", seats: seats11 }),
    ]);
    expect(got.map((p) => p.id)).toEqual(["agg"]);
  });

  it("keeps only one row per aggregator per date", () => {
    const got = dedupePolls([
      poll({ id: "x1", date: "2026-09-02", pollster: "משתנה", outlet: "סקר הסקרים", seats: seats11 }),
      poll({ id: "x2", date: "2026-09-02", pollster: "משתנה", outlet: "סקר הסקרים", seats: seats12 }),
      poll({ id: "y1", date: "2026-09-02", pollster: "לא ידוע", outlet: "וואלה", seats: seats11 }),
    ]);
    expect(got).toHaveLength(2);
    expect(got.map((p) => p.outlet).sort()).toEqual(["וואלה", "סקר הסקרים"]);
  });

  it("never lets a scraped reading displace a hand-checked one", () => {
    const curated = poll({ id: "curated", date: "2026-09-09", pollster: "מדגם", seats: seats11, provenance: "published-full", sampleSize: 800 });
    const scraped = poll({ id: "scraped", date: "2026-09-09", pollster: "מדגם", seats: seats12, provenance: "published-partial", sampleSize: null });
    expect(effectivePolls([curated], [scraped]).map((p) => p.id)).toEqual(["curated"]);
  });

  it("removes the exact duplicates that stored+fresh merging produced", () => {
    // effectivePolls used to concatenate the store and the fresh scrape without
    // deduping between them, so a poll already in the store appeared twice.
    const p1 = poll({ id: "stored", date: "2026-09-05", pollster: "כאן מחקרים", seats: seats11 });
    const p2 = poll({ id: "fresh", date: "2026-09-05", pollster: "כאן מחקרים", seats: seats11 });
    expect(effectivePolls([], [p1, p2])).toHaveLength(1);
  });
});

describe("regressions from the 2026-10 contamination", () => {
  const sane = { likud: 22, yashar: 20, byachad: 11, democrats: 9, shas: 7, utj: 7 };

  it("rejects a bloc total read as a single party", () => {
    // The actual failure: a scraped Channel 11 article gave a one-month-old
    // party 52 seats. Seats summed to exactly 120, nothing was negative, and
    // nothing sat in the impossible 1-3 band — so every existing check passed,
    // and the published bloc forecast moved by six seats.
    const p = poll({ seats: { likud: 21, amcha: 52, yashar: 23, byachad: 11, "religious-zionism": 6, "joint-list": 7 } });
    expect(Object.values(p.seats).reduce((a, b) => a + b, 0)).toBe(120);
    expect(validatePoll(p).join(" ")).toMatch(/45-seat plausibility bound/);
  });

  it("still accepts the largest delegation anyone has actually won recently", () => {
    expect(validatePoll(poll({ seats: { likud: 35, yashar: 30, byachad: 20 } }))).toEqual([]);
  });

  it("rejects a poll-average page, which is not a poll", () => {
    // Averaging an average back into the average counts every underlying poll
    // twice, and an aggregate page carries no institute or fieldwork date.
    const p = poll({ source: "https://www.skarim.org/average-poll", seats: sane });
    expect(validatePoll(p).join(" ")).toMatch(/poll-average page/);
  });

  it("rejects a swing calculator, which is not a poll at any count", () => {
    // A calculator ships the last election result as its starting position.
    // Scraped nightly for a month, that starting position entered the store as
    // 34 fresh polls, every one of them the November 2022 Knesset result —
    // Likud 32 and Religious Zionism 14, both outside the range of every real
    // poll in the field. Deduplication alone would have left one of them in.
    const p = poll({
      source: "https://israelvoting.com/swing",
      seats: { likud: 32, "religious-zionism": 14, shas: 11, utj: 7, "yisrael-beiteinu": 6, raam: 5, "joint-list": 5 },
    });
    expect(validatePoll(p).join(" ")).toMatch(/interactive calculator/);
  });

  it("counts one article once, however many days it was scraped on", () => {
    // poll.date conflates fieldwork with scrape day, so an article that sat on
    // a section page for a fortnight was re-ingested every morning under a
    // fresh date. 133 stored records held only 80 distinct polls.
    const url = "https://example.test/article-1";
    const copies = ["2026-10-01", "2026-10-02", "2026-10-03", "2026-10-04"].map((date, i) =>
      poll({ id: `copy-${i}`, date, source: url, pollster: "לא ידוע", outlet: "כיכר השבת", seats: sane }),
    );
    const got = dedupePolls(copies);
    expect(got).toHaveLength(1);
    // The earliest sighting is closest to real fieldwork; keeping the latest is
    // precisely the recency laundering this guards against.
    expect(got[0].date).toBe("2026-10-01");
  });

  it("keeps two different articles from the same outlet on the same day", () => {
    const got = dedupePolls([
      poll({ id: "a", date: "2026-10-01", source: "https://x.test/1", pollster: "מדגם", seats: sane }),
      poll({ id: "b", date: "2026-10-01", source: "https://x.test/2", pollster: "כאן מחקרים", seats: sane }),
    ]);
    expect(got).toHaveLength(2);
  });
});
