import { describe, expect, it } from "vitest";
import { aggregatePolls, estimateHouseEffects, pollWeight, seatsToShares, weighPolls } from "./aggregate";
import { allocateSeats } from "./baderOfer";
import { DEFAULT_CONFIG } from "./config";
import { BELOW_THRESHOLD, POLLS } from "./data/polls";
import type { Poll } from "./types";

const cfg = DEFAULT_CONFIG;

function poll(over: Partial<Poll>): Poll {
  return {
    id: "t",
    date: "2026-09-01",
    pollster: "מדגם",
    outlet: "x",
    sampleSize: 1000,
    mode: "phone",
    seats: {},
    source: "https://example.test/poll",
    provenance: "published-full",
    ...over,
  };
}

describe("seatsToShares", () => {
  it("reproduces a complete poll's own seat counts when re-allocated", () => {
    // This is the whole point of inverting the allocator rather than dividing
    // by 120: round-tripping must be exact, or the aggregate silently disagrees
    // with every poll feeding it.
    const p = POLLS.find((x) => x.id === "i24-2026-09-09")!;
    const shares = seatsToShares(p, cfg, BELOW_THRESHOLD[p.id]);
    const back = allocateSeats({
      votes: shares,
      threshold: 0,
      totalSeats: cfg.totalSeats,
      surplusAgreements: {},
    });
    for (const [id, seats] of Object.entries(p.seats)) {
      expect(Math.abs((back.seats[id] ?? 0) - seats)).toBeLessThanOrEqual(1);
    }
  });

  it("leaves room for wasted vote: shares sum to less than one", () => {
    const p = POLLS.find((x) => x.id === "i24-2026-09-09")!;
    const total = Object.values(seatsToShares(p, cfg)).reduce((a, b) => a + b, 0);
    expect(total).toBeLessThan(1);
    expect(total).toBeGreaterThan(0.85);
  });

  it("scales a partial poll proportionally and reports only what it covers", () => {
    const p = poll({ seats: { likud: 24, yashar: 24 }, partial: true });
    const shares = seatsToShares(p, cfg);
    expect(Object.keys(shares).sort()).toEqual(["likud", "yashar"]);
    expect(shares.likud).toBeCloseTo(shares.yashar, 10);
    expect(shares.likud).toBeGreaterThan(0.18);
    expect(shares.likud).toBeLessThan(0.2);
  });

  it("counts a poll's explicitly reported sub-threshold shares as wasted vote", () => {
    const base = poll({ seats: { a: 60, b: 60 } });
    const withWaste = poll({ seats: { a: 60, b: 60 }, shares: { z: 0.05 } });
    expect(seatsToShares(withWaste, cfg).a).toBeLessThan(seatsToShares(base, cfg).a);
  });
});

describe("pollWeight", () => {
  it("halves a poll's weight at exactly one half-life", () => {
    const fresh = pollWeight(poll({ date: "2026-09-11" }), "2026-09-11", cfg);
    const old = pollWeight(poll({ date: "2026-08-28" }), "2026-09-11", cfg);
    expect(old.recency / fresh.recency).toBeCloseTo(0.5, 6);
  });

  it("penalises an undisclosed sample size", () => {
    const shown = pollWeight(poll({ sampleSize: 1000 }), "2026-09-11", cfg);
    const hidden = pollWeight(poll({ sampleSize: null }), "2026-09-11", cfg);
    expect(hidden.sample).toBeLessThan(shown.sample);
  });

  it("caps the sample bonus so a huge panel cannot buy the aggregate", () => {
    const big = pollWeight(poll({ sampleSize: 1000 }), "2026-09-11", cfg);
    const huge = pollWeight(poll({ sampleSize: 100000 }), "2026-09-11", cfg);
    expect(huge.sample).toBe(big.sample);
  });

  it("discounts reconstructed breakdowns", () => {
    const full = pollWeight(poll({}), "2026-09-11", cfg);
    const part = pollWeight(poll({ partial: true }), "2026-09-11", cfg);
    expect(part.weight).toBeCloseTo(full.weight * cfg.partialPollPenalty, 10);
  });

  it("ignores polls published after the as-of date", () => {
    const w = weighPolls(POLLS, "2026-08-01", cfg, BELOW_THRESHOLD);
    expect(w.every((x) => Date.parse(x.poll.date) <= Date.parse("2026-08-01"))).toBe(true);
  });
});

describe("estimateHouseEffects", () => {
  it("detects a pollster that consistently inflates one party", () => {
    const polls: Poll[] = [];
    for (let i = 0; i < 4; i++) {
      const d = `2026-09-0${i + 1}`;
      const even = { likud: 30, yashar: 30, byachad: 30, democrats: 30 };
      const skewed = { likud: 40, yashar: 30, byachad: 30, democrats: 20 };
      polls.push(poll({ id: `honest-a-${i}`, date: d, pollster: "מדגם", seats: even }));
      polls.push(poll({ id: `honest-b-${i}`, date: d, pollster: "כאן מחקרים", seats: even }));
      polls.push(poll({ id: `biased-${i}`, date: d, pollster: "דיירקט פולס", seats: skewed }));
    }
    const weighted = weighPolls(polls, "2026-09-05", cfg, {});
    const he = estimateHouseEffects(weighted, cfg);
    expect(he["דיירקט פולס"].likud).toBeGreaterThan(0.02);
    expect(he["דיירקט פולס"].democrats).toBeLessThan(-0.02);
    expect(Math.abs(he["מדגם"].likud)).toBeLessThan(Math.abs(he["דיירקט פולס"].likud));
  });

  it("shrinks an estimate drawn from a single poll toward zero", () => {
    const polls: Poll[] = [
      poll({ id: "s1", pollster: "מדגם", seats: { likud: 30, yashar: 30, byachad: 30, democrats: 30 } }),
      poll({ id: "s2", pollster: "כאן מחקרים", seats: { likud: 30, yashar: 30, byachad: 30, democrats: 30 } }),
      poll({ id: "s3", pollster: "דיירקט פולס", seats: { likud: 60, yashar: 20, byachad: 20, democrats: 20 } }),
    ];
    const he = estimateHouseEffects(weighPolls(polls, "2026-09-05", cfg, {}), cfg);
    // The raw gap is ~25 points of share; one poll must not buy a correction
    // anywhere near that size.
    expect(Math.abs(he["דיירקט פולס"].likud)).toBeLessThan(0.1);
  });

  it("centres effects so they are relative, not absolute, bias", () => {
    const weighted = weighPolls(POLLS, "2026-09-11", cfg, BELOW_THRESHOLD);
    const he = estimateHouseEffects(weighted, cfg);
    const pollsterWeight: Record<string, number> = {};
    for (const w of weighted) pollsterWeight[w.poll.pollster] = (pollsterWeight[w.poll.pollster] ?? 0) + w.weight;
    let num = 0;
    let den = 0;
    for (const [h, m] of Object.entries(he)) {
      num += m.likud * pollsterWeight[h];
      den += pollsterWeight[h];
    }
    expect(Math.abs(num / den)).toBeLessThan(1e-9);
  });
});

describe("aggregatePolls", () => {
  it("produces shares that sum to one including the wasted-vote residual", () => {
    const agg = aggregatePolls(POLLS, "2026-09-11", cfg, BELOW_THRESHOLD);
    const total = Object.values(agg.shares).reduce((a, b) => a + b, 0);
    expect(total).toBeCloseTo(1, 10);
  });

  it("treats 'reported below threshold' differently from 'not reported'", () => {
    const seats = { yashar: 40, byachad: 40, democrats: 40 };
    const polls = [
      poll({ id: "p1", pollster: "מדגם", seats }),
      poll({ id: "p2", pollster: "כאן מחקרים", seats }),
    ];
    const silent = aggregatePolls(polls, "2026-09-11", cfg, {});
    const flagged = aggregatePolls(polls, "2026-09-11", cfg, { p1: ["likud"], p2: ["likud"] });
    // Silence leaves no estimate at all; an explicit failure pins the party
    // just under the threshold instead of letting it go unmeasured.
    expect(silent.shares.likud).toBeUndefined();
    expect(flagged.shares.likud).toBeCloseTo(cfg.threshold * 0.8, 6);
  });

  it("reports an effective poll count no larger than the raw count", () => {
    const agg = aggregatePolls(POLLS, "2026-09-11", cfg, BELOW_THRESHOLD);
    expect(agg.effectivePollCount).toBeLessThanOrEqual(POLLS.length);
    expect(agg.effectivePollCount).toBeGreaterThan(1);
  });
});

describe("scenario polls", () => {
  it("publishes a scenario variant but keeps it out of the average", () => {
    const base = poll({ id: "base", seats: { likud: 60, yashar: 60 } });
    const scenario = poll({
      id: "scenario",
      seats: { likud: 20, yashar: 100 },
      provenance: "scenario",
      excludeFromAverage: true,
    });
    const weighted = weighPolls([base, scenario], "2026-09-11", cfg, {});
    expect(weighted.map((w) => w.poll.id)).toEqual(["base"]);

    // The scenario's wildly different numbers must not move the estimate.
    const withScenario = aggregatePolls([base, scenario], "2026-09-11", cfg, {});
    const without = aggregatePolls([base], "2026-09-11", cfg, {});
    expect(withScenario.shares.likud).toBeCloseTo(without.shares.likud, 12);
  });
});

describe("unattributed polls", () => {
  it("gets no house-effect correction for a pollster field that names no institute", () => {
    // "unknown" is not an institute. Lumping every unattributed poll into one
    // pseudo-institute and measuring its bias produces a number about nothing —
    // which is then subtracted from those polls as if it were a correction.
    const polls: Poll[] = [];
    for (let i = 0; i < 4; i++) {
      const d = `2026-09-0${i + 1}`;
      polls.push(poll({ id: `k${i}`, date: d, pollster: "מדגם", seats: { likud: 30, yashar: 30, byachad: 30, democrats: 30 } }));
      polls.push(poll({ id: `u${i}`, date: d, pollster: "משתנה", seats: { likud: 60, yashar: 20, byachad: 20, democrats: 20 } }));
    }
    const he = estimateHouseEffects(weighPolls(polls, "2026-09-05", cfg, {}), cfg);
    expect(Object.keys(he)).not.toContain("משתנה");
    expect(Object.keys(he)).toContain("מדגם");
  });

  it("still counts an unattributed poll in the average", () => {
    const known = poll({ id: "k", pollster: "מדגם", seats: { likud: 40, yashar: 40, byachad: 40 } });
    const anon = poll({ id: "a", pollster: "לא ידוע", seats: { likud: 60, yashar: 30, byachad: 30 } });
    const withAnon = aggregatePolls([known, anon], "2026-09-11", cfg, {});
    const without = aggregatePolls([known], "2026-09-11", cfg, {});
    expect(withAnon.shares.likud).toBeGreaterThan(without.shares.likud);
  });
});
