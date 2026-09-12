import { describe, expect, it } from "vitest";
import { runSimulations, summarise, timeUncertaintyMultiplier } from "./simulate";
import { evaluateCoalitions, governmentOutlook } from "./coalitions";
import { DEFAULT_CONFIG } from "./config";
import { buildForecast } from "./forecast";
import { makeNormal, makeRng, seedFromString } from "./random";

const cfg = { ...DEFAULT_CONFIG, simulations: 3000 };

const shares: Record<string, number> = {
  likud: 0.19,
  yashar: 0.185,
  byachad: 0.095,
  democrats: 0.08,
  "yisrael-beiteinu": 0.072,
  otzma: 0.063,
  utj: 0.06,
  shas: 0.055,
  "joint-list": 0.053,
  raam: 0.04,
  "religious-zionism": 0.034,
  amcha: 0.033,
  reservists: 0.023,
  other: 0.0175,
};

describe("random", () => {
  it("is reproducible from a seed", () => {
    const a = Array.from({ length: 5 }, makeRng(seedFromString("x")));
    const b = Array.from({ length: 5 }, makeRng(seedFromString("x")));
    expect(a).toEqual(b);
  });

  it("produces a roughly standard normal", () => {
    const n = makeNormal(makeRng(1));
    const xs = Array.from({ length: 50000 }, n);
    const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
    const sd = Math.sqrt(xs.reduce((a, b) => a + (b - mean) ** 2, 0) / xs.length);
    expect(Math.abs(mean)).toBeLessThan(0.02);
    expect(sd).toBeGreaterThan(0.98);
    expect(sd).toBeLessThan(1.02);
  });
});

describe("timeUncertaintyMultiplier", () => {
  it("is 1 on election day and grows going back in time", () => {
    expect(timeUncertaintyMultiplier("2026-10-27", cfg)).toBeCloseTo(1, 6);
    expect(timeUncertaintyMultiplier("2026-09-27", cfg)).toBeCloseTo(1.3, 2);
    expect(timeUncertaintyMultiplier("2026-09-11", cfg)).toBeGreaterThan(
      timeUncertaintyMultiplier("2026-10-11", cfg),
    );
  });
});

describe("runSimulations", () => {
  const sim = runSimulations(shares, "2026-09-11", cfg);

  it("allocates exactly 120 seats in every single draw", () => {
    for (let i = 0; i < sim.simulations; i++) {
      let total = 0;
      for (const id of Object.keys(sim.seatSamples)) total += sim.seatSamples[id][i];
      expect(total).toBe(120);
    }
  });

  it("has bloc totals that add to 120 in every draw", () => {
    for (let i = 0; i < sim.simulations; i++) {
      expect(
        sim.blocSamples.netanyahu[i] + sim.blocSamples.change[i] + sim.blocSamples.arab[i],
      ).toBe(120);
    }
  });

  it("gives exactly one largest party per draw", () => {
    const total = Object.values(sim.largestCounts).reduce((a, b) => a + b, 0);
    expect(total).toBe(sim.simulations);
  });

  it("is reproducible: the same date and config give the same numbers", () => {
    const a = runSimulations(shares, "2026-09-11", cfg);
    const b = runSimulations(shares, "2026-09-11", cfg);
    expect(summarise(a.seatSamples.likud)).toEqual(summarise(b.seatSamples.likud));
  });

  it("puts a party near the threshold genuinely at risk, and a big party not at all", () => {
    const borderline = sim.aboveThresholdCounts["religious-zionism"] / sim.simulations;
    expect(borderline).toBeGreaterThan(0.2);
    expect(borderline).toBeLessThan(0.85);
    expect(sim.aboveThresholdCounts.likud / sim.simulations).toBeGreaterThan(0.99);
  });

  it("widens the seat interval the further out the forecast is", () => {
    const near = runSimulations(shares, "2026-10-20", cfg);
    const far = runSimulations(shares, "2026-08-01", cfg);
    const spread = (s: number[]) => summarise(s).high80 - summarise(s).low80;
    expect(spread(far.seatSamples.likud)).toBeGreaterThan(spread(near.seatSamples.likud));
  });

  it("correlates parties within a bloc rather than treating them as independent", () => {
    // Tested against the mechanism directly. Comparing the bloc variance to the
    // sum of its parties' variances would NOT show this: the 120-seat
    // constraint makes parties within a bloc negatively correlated (one party
    // dropping below the threshold hands most of its seats to its own bloc's
    // largest party), and that cancellation swamps the shared term. Switching
    // the bloc term off is the clean comparison.
    const varOf = (xs: number[]) => {
      const m = xs.reduce((a, b) => a + b, 0) / xs.length;
      return xs.reduce((a, b) => a + (b - m) ** 2, 0) / xs.length;
    };
    const withBloc = runSimulations(shares, "2026-09-11", cfg);
    const withoutBloc = runSimulations(shares, "2026-09-11", { ...cfg, blocErrorSd: 0 });
    // Roughly +30% of variance on each bloc, not more, and the shortfall from
    // a naive expectation is itself real: both blocs carry parties sitting on
    // the threshold, and when a shared negative shock knocks one out, most of
    // its votes are reallocated back to that same bloc's larger parties. The
    // threshold damps the very correlation it is reacting to.
    expect(varOf(withBloc.blocSamples.netanyahu)).toBeGreaterThan(
      varOf(withoutBloc.blocSamples.netanyahu) * 1.25,
    );
    expect(varOf(withBloc.blocSamples.change)).toBeGreaterThan(
      varOf(withoutBloc.blocSamples.change) * 1.25,
    );
  });

  it("keeps a bloc's 61-seat probability honest under correlated error", () => {
    // The failure mode this guards against: with independent party errors a
    // bloc of six parties looks far more certain than it is, and a model would
    // have called 2015 and 2022 with false confidence.
    const withBloc = runSimulations(shares, "2026-09-11", cfg);
    const withoutBloc = runSimulations(shares, "2026-09-11", { ...cfg, blocErrorSd: 0 });
    const p61 = (s: number[]) => s.filter((x) => x >= cfg.majority).length / s.length;
    expect(p61(withBloc.blocSamples.change)).toBeGreaterThan(p61(withoutBloc.blocSamples.change));
  });
});

describe("coalitions", () => {
  const sim = runSimulations(shares, "2026-09-11", cfg);

  it("keeps arithmetic and political plausibility as separate numbers", () => {
    const cs = evaluateCoalitions(sim, cfg);
    for (const c of cs) {
      expect(c.probability).toBeGreaterThanOrEqual(0);
      expect(c.probability).toBeLessThanOrEqual(1);
      expect(c.plausibility).toBeGreaterThan(0);
      expect(c.reasoning.length).toBeGreaterThan(40);
    }
    const grand = cs.find((c) => c.id === "grand-coalition")!;
    const bloc = cs.find((c) => c.id === "netanyahu-bloc")!;
    // The two largest parties together always clear 61 far more easily than the
    // incumbent bloc does — which is exactly why arithmetic alone misleads.
    expect(grand.meanSeats).toBeGreaterThan(0);
    expect(bloc.plausibility).toBeGreaterThan(grand.plausibility);
  });

  it("produces PM probabilities and deadlock that sum to one", () => {
    const o = governmentOutlook(sim, cfg);
    const total = o.pmProbability.reduce((a, p) => a + p.probability, 0) + o.pDeadlock;
    expect(total).toBeCloseTo(1, 6);
  });

  it("credits Netanyahu exactly when his bloc reaches 61", () => {
    const o = governmentOutlook(sim, cfg);
    const netMajority =
      sim.blocSamples.netanyahu.filter((s) => s >= cfg.majority).length / sim.simulations;
    const netanyahu = o.pmProbability.find((p) => p.partyId === "likud");
    expect(netanyahu?.probability ?? 0).toBeCloseTo(netMajority, 6);
  });
});

describe("buildForecast", () => {
  const f = buildForecast({ asOf: "2026-09-11", config: { simulations: 2000 } });

  it("returns mean seats summing to the full house", () => {
    const total = f.parties.reduce((a, p) => a + p.meanSeats, 0);
    expect(total).toBeCloseTo(120, 6);
  });

  it("keeps the social term out of the headline while the data is a placeholder", () => {
    expect(f.socialProvenance).toBe("placeholder");
    expect(f.socialEnabled).toBe(false);
    for (const p of f.parties) expect(p.socialAdjustment).toBe(0);
  });

  it("respects the cap and zero-sum rule when the social term is switched on", () => {
    const s = buildForecast({ asOf: "2026-09-11", includeSocial: true, config: { simulations: 500 } });
    const cap = s.config.socialMaxAdjustmentPp / 100;
    let sum = 0;
    for (const p of s.parties) {
      expect(Math.abs(p.socialAdjustment)).toBeLessThanOrEqual(cap * 1.0001);
      sum += p.socialAdjustment;
    }
    expect(Math.abs(sum)).toBeLessThan(1e-9);
    expect(s.socialSignals.some((x) => x.adjustment !== 0)).toBe(true);
  });

  it("counts down to election day", () => {
    expect(f.electionDate).toBe("2026-10-27");
    expect(f.daysToElection).toBe(46);
  });

  it("uses only polls published on or before the as-of date", () => {
    const past = buildForecast({ asOf: "2026-08-01", config: { simulations: 500 } });
    expect(past.weightedPolls.every((w) => w.poll.date <= "2026-08-01")).toBe(true);
    expect(past.pollsUsed).toBeLessThan(f.pollsUsed);
  });
});
