import { describe, expect, it } from "vitest";
import { applyMerge, effectivePolls, fingerprint, mergePolls } from "./store";
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
