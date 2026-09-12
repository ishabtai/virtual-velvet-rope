import { describe, expect, it } from "vitest";
import { applyMerge, dedupePolls, effectivePolls, fingerprint, mergePolls } from "./store";
import type { Poll } from "../types";

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
    source: "https://example.test/a",
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
