import type { BlocId, ModelConfig } from "./types";
import { allocateSeats } from "./baderOfer";
import { PARTY_BY_ID, REAL_PARTIES } from "./data/parties";
import { surplusMap } from "./aggregate";
import { makeNormal, makeRng, seedFromString } from "./random";

/**
 * Monte Carlo simulation of election day.
 *
 * The point of simulating rather than just reporting the poll average is that
 * Israeli seat counts are a violently non-linear function of vote shares. A
 * party sitting at 3.3% is one bad week from contributing zero seats instead of
 * four, and that single discontinuity can decide which bloc reaches 61. You
 * cannot get that from a point estimate; you have to run the distribution
 * through the actual allocator.
 *
 * THE ERROR MODEL IS WHERE FORECASTS LIVE OR DIE. Three components, in
 * decreasing order of how much damage they do when ignored:
 *
 *  1. BLOC-CORRELATED ERROR. Polling misses are not independent across parties.
 *     When Israeli polls are wrong, they are wrong about a whole bloc at once —
 *     2015 and 2022 both understated the right across every one of its parties
 *     simultaneously. A model with independent party errors would have the
 *     bloc totals converging to near-certainty as parties are added, and would
 *     have called both elections with false confidence.
 *
 *  2. ARAB TURNOUT. The largest single recurring error in Israeli polling is
 *     not preference but participation: Arab-party turnout has swung between
 *     45% and 65% between consecutive elections, worth several seats, and it is
 *     the variable pollsters measure worst. It gets its own, larger, term.
 *
 *  3. PARTY-SPECIFIC ERROR, scaled by party size. Absolute error grows with a
 *     party's share, so a 25% party's error is measured in points and a 4%
 *     party's in fractions of one.
 *
 * All three inflate with distance from election day, because a poll average in
 * September is measuring an electorate that has not finished deciding.
 */

export interface SimulationResult {
  /** seats[simIndex][partyId] */
  draws: Record<string, number>[];
  /** Per-party seat samples, for quantiles. */
  seatSamples: Record<string, number[]>;
  blocSamples: Record<BlocId, number[]>;
  /** Share of simulations in which each party was the single largest. */
  largestCounts: Record<string, number>;
  /** Share of simulations in which each party cleared the threshold. */
  aboveThresholdCounts: Record<string, number>;
  simulations: number;
}

/**
 * Share of the vote held by the bloc `blocErrorSd` was calibrated from — the
 * Netanyahu bloc, at roughly 45%. Other blocs scale against this.
 */
const REFERENCE_BLOC_SHARE = 0.45;

export function timeUncertaintyMultiplier(asOf: string, config: ModelConfig): number {
  const days = Math.max(
    0,
    (Date.parse(config.electionDate) - Date.parse(asOf)) / 86400000,
  );
  return 1 + config.timeUncertaintyPer30Days * (days / 30);
}

export function runSimulations(
  centralShares: Record<string, number>,
  asOf: string,
  config: ModelConfig,
  seedExtra = "",
): SimulationResult {
  const rng = makeRng(seedFromString(`${asOf}|${config.simulations}|${seedExtra}`));
  const normal = makeNormal(rng);
  const scale = timeUncertaintyMultiplier(asOf, config);
  const agreements = surplusMap();

  const partyIds = REAL_PARTIES.map((p) => p.id);
  const blocs: BlocId[] = ["netanyahu", "change", "arab"];

  const seatSamples: Record<string, number[]> = {};
  for (const id of partyIds) seatSamples[id] = [];
  const blocSamples: Record<BlocId, number[]> = { netanyahu: [], change: [], arab: [] };
  const largestCounts: Record<string, number> = Object.fromEntries(partyIds.map((id) => [id, 0]));
  const aboveThresholdCounts: Record<string, number> = Object.fromEntries(
    partyIds.map((id) => [id, 0]),
  );
  const draws: Record<string, number>[] = [];

  // Baseline bloc totals, used to distribute a bloc-level shock proportionally
  // across that bloc's parties rather than adding the same absolute amount to a
  // 25-seat party and a 4-seat one.
  const blocTotals: Record<BlocId, number> = { netanyahu: 0, change: 0, arab: 0 };
  for (const id of partyIds) {
    blocTotals[PARTY_BY_ID[id].bloc] += centralShares[id] ?? 0;
  }

  for (let s = 0; s < config.simulations; s++) {
    // The bloc term is calibrated from the Netanyahu bloc, which holds roughly
    // 45% of the vote. Applying that same ABSOLUTE size to the Arab bloc, at
    // about 8%, gave it an 80% interval of 0-19 seats — it made a bloc that has
    // never gone below four seats routinely vanish. Error grows with bloc size,
    // but sub-linearly: the historical misses are ~3.5 seats on a 55-seat bloc
    // and ~2 seats on a 10-seat one, which is a much larger RELATIVE error on
    // the small bloc. sqrt scaling sits between "same absolute" and "same
    // relative" and reproduces both.
    const blocScale = (bloc: BlocId) =>
      Math.sqrt(Math.max(0.02, blocTotals[bloc]) / REFERENCE_BLOC_SHARE);

    const blocShock: Record<BlocId, number> = {
      netanyahu: normal() * config.blocErrorSd * scale * blocScale("netanyahu"),
      change: normal() * config.blocErrorSd * scale * blocScale("change"),
      arab: normal() * config.blocErrorSd * scale * blocScale("arab"),
    };
    // Arab turnout gets an extra, independent shock on top of the bloc term.
    // Deliberately NOT multiplied by `scale`: the time-distance inflation models
    // voters who have not finished deciding, and turnout uncertainty does not
    // work that way — how many Arab voters show up on 27 October is roughly as
    // unknowable in September as it is the night before. Inflating it with
    // distance would have put both Arab parties below the threshold together in
    // an implausible share of runs.
    blocShock.arab += normal() * config.nationalErrorSd * 2.5;

    const shares: Record<string, number> = {};
    for (const id of partyIds) {
      const base = centralShares[id] ?? 0;
      if (base <= 0) {
        shares[id] = 0;
        continue;
      }
      const bloc = PARTY_BY_ID[id].bloc;
      const blocShare = blocTotals[bloc] || 1;
      const blocPart = blocShock[bloc] * (base / blocShare);

      // Absolute party error grows with the square root of party size,
      // normalised so a 10% party sits at exactly `partyErrorSd`.
      const sizeScale = Math.min(1.8, Math.max(0.35, Math.sqrt(base / 0.1)));
      const partyPart = normal() * config.partyErrorSd * sizeScale * scale;

      shares[id] = Math.max(0.0002, base + blocPart + partyPart);
    }
    shares.other = Math.max(0.004, centralShares.other ?? 0.03);

    // Renormalise: the shocks do not conserve mass on their own.
    const total = Object.values(shares).reduce((a, b) => a + b, 0);
    for (const id of Object.keys(shares)) shares[id] /= total;

    const { seats } = allocateSeats({
      votes: shares,
      threshold: config.threshold,
      totalSeats: config.totalSeats,
      surplusAgreements: agreements,
    });

    const drawSeats: Record<string, number> = {};
    const blocSum: Record<BlocId, number> = { netanyahu: 0, change: 0, arab: 0 };
    let bestId = partyIds[0];
    let bestSeats = -1;
    for (const id of partyIds) {
      const n = seats[id] ?? 0;
      drawSeats[id] = n;
      seatSamples[id].push(n);
      blocSum[PARTY_BY_ID[id].bloc] += n;
      if (n > 0) aboveThresholdCounts[id]++;
      if (n > bestSeats) {
        bestSeats = n;
        bestId = id;
      }
    }
    largestCounts[bestId]++;
    for (const b of blocs) blocSamples[b].push(blocSum[b]);
    // Keeping every draw would cost hundreds of megabytes at 20k sims; a
    // sample is enough for the scenario charts.
    if (s < 2000) draws.push(drawSeats);
  }

  return {
    draws,
    seatSamples,
    blocSamples,
    largestCounts,
    aboveThresholdCounts,
    simulations: config.simulations,
  };
}

export function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

export function summarise(samples: number[]): {
  mean: number;
  median: number;
  low80: number;
  high80: number;
} {
  const sorted = [...samples].sort((a, b) => a - b);
  const mean = samples.reduce((a, b) => a + b, 0) / (samples.length || 1);
  return {
    mean,
    median: quantile(sorted, 0.5),
    low80: quantile(sorted, 0.1),
    high80: quantile(sorted, 0.9),
  };
}
