import type { BlocId, Forecast, ModelConfig, PartyEstimate, Poll, SocialObservation } from "./types";
import { DEFAULT_CONFIG } from "./config";
import { aggregatePolls, weighPolls, type WeightedPoll } from "./aggregate";
import { computeSocialSignals, type SocialSignal } from "./social";
import { runSimulations, summarise, timeUncertaintyMultiplier } from "./simulate";
import { evaluateCoalitions, governmentOutlook } from "./coalitions";
import { computeCalibration, type Calibration } from "./calibration";
import { REAL_PARTIES } from "./data/parties";
import { BELOW_THRESHOLD, POLLS } from "./data/polls";
import { SOCIAL_OBSERVATIONS, SOCIAL_PROVENANCE } from "./data/social";

export interface ForecastInput {
  asOf: string;
  polls?: Poll[];
  social?: SocialObservation[];
  belowThreshold?: Record<string, string[]>;
  config?: Partial<ModelConfig>;
  /**
   * Whether the social-media term is allowed to move the forecast. Defaults to
   * false whenever the social data is flagged as placeholder rather than
   * verified — the headline forecast never moves on unvalidated data.
   */
  includeSocial?: boolean;
  /**
   * Whether to apply the poll-to-result calibration. On by default; exposed so
   * the simulator can show what the forecast looks like without it.
   */
  includeCalibration?: boolean;
}

export interface FullForecast extends Forecast {
  weightedPolls: WeightedPoll[];
  socialSignals: SocialSignal[];
  socialEnabled: boolean;
  socialProvenance: string;
  uncertaintyMultiplier: number;
  /** Central share estimates keyed by party, after the social adjustment. */
  centralShares: Record<string, number>;
  /** The poll-to-result correction, and whether it was applied. */
  calibration: Calibration;
  calibrationEnabled: boolean;
}

export function buildForecast(input: ForecastInput): FullForecast {
  const config: ModelConfig = { ...DEFAULT_CONFIG, ...(input.config ?? {}) };
  const polls = input.polls ?? POLLS;
  const belowThreshold = input.belowThreshold ?? BELOW_THRESHOLD;
  const social = input.social ?? SOCIAL_OBSERVATIONS;
  const socialEnabled = input.includeSocial ?? SOCIAL_PROVENANCE === "verified";
  const calibrationEnabled = input.includeCalibration ?? true;

  const asOf = input.asOf;

  // --- 1. Weighted, house-effect-corrected poll average ---
  const agg = aggregatePolls(polls, asOf, config, belowThreshold);

  // --- 2. Social momentum adjustment, capped and zero-sum ---
  const socialSignals = computeSocialSignals(social, asOf, config, socialEnabled);
  const socialById: Record<string, number> = {};
  for (const s of socialSignals) socialById[s.partyId] = s.adjustment;

  // --- 2b. Poll-to-result calibration ---
  // Applied AFTER the poll average and BEFORE the simulation, because it
  // corrects an error in the polls themselves rather than anything the
  // simulation does. Weighted by present-day strength, so a bloc's correction
  // lands on the parties that actually hold that bloc's votes today.
  const calibration = computeCalibration(config, agg.shares);

  const centralShares: Record<string, number> = {};
  for (const party of REAL_PARTIES) {
    const base = agg.shares[party.id];
    if (base === undefined) continue;
    const calib = calibrationEnabled ? (calibration.partyAdjustments[party.id] ?? 0) : 0;
    centralShares[party.id] = Math.max(0.0005, base + (socialById[party.id] ?? 0) + calib);
  }
  centralShares.other = agg.shares.other ?? 0.035;

  // Renormalise after the adjustment so shares still sum to one.
  const total = Object.values(centralShares).reduce((a, b) => a + b, 0);
  for (const id of Object.keys(centralShares)) centralShares[id] /= total;

  // --- 3. Trend: the same pipeline as of 14 days ago ---
  const priorDate = new Date(Date.parse(asOf) - 14 * 86400000).toISOString().slice(0, 10);
  const priorAgg = aggregatePolls(polls, priorDate, config, belowThreshold);

  // --- 4. Monte Carlo through the real allocator ---
  const sim = runSimulations(centralShares, asOf, config, socialEnabled ? "social" : "nosocial");

  const parties: PartyEstimate[] = REAL_PARTIES.filter(
    (p) => centralShares[p.id] !== undefined,
  ).map((p) => {
    const s = summarise(sim.seatSamples[p.id] ?? []);
    return {
      partyId: p.id,
      share: centralShares[p.id],
      pollShare: agg.shares[p.id] ?? 0,
      socialAdjustment: socialById[p.id] ?? 0,
      meanSeats: s.mean,
      medianSeats: s.median,
      low80: s.low80,
      high80: s.high80,
      pAboveThreshold: (sim.aboveThresholdCounts[p.id] ?? 0) / sim.simulations,
      pLargest: (sim.largestCounts[p.id] ?? 0) / sim.simulations,
      trend14d:
        priorAgg.shares[p.id] !== undefined
          ? (agg.shares[p.id] ?? 0) - priorAgg.shares[p.id]
          : 0,
    };
  });
  parties.sort((a, b) => b.meanSeats - a.meanSeats);

  const blocs = (["netanyahu", "change", "arab"] as BlocId[]).map((bloc) => {
    const samples = sim.blocSamples[bloc];
    const s = summarise(samples);
    const pMajority = samples.filter((x) => x >= config.majority).length / samples.length;
    return { bloc, meanSeats: s.mean, low80: s.low80, high80: s.high80, pMajority };
  });

  const coalitions = evaluateCoalitions(sim, config);
  const outlook = governmentOutlook(sim, config);

  const daysToElection = Math.max(
    0,
    Math.round((Date.parse(config.electionDate) - Date.parse(asOf)) / 86400000),
  );

  return {
    asOf,
    electionDate: config.electionDate,
    daysToElection,
    parties,
    blocs,
    coalitions,
    pmProbability: outlook.pmProbability,
    pDeadlock: outlook.pDeadlock,
    pollsUsed: agg.pollsUsed,
    effectivePollCount: agg.effectivePollCount,
    houseEffects: agg.houseEffects,
    config,
    weightedPolls: weighPolls(polls, asOf, config, belowThreshold),
    socialSignals,
    socialEnabled,
    socialProvenance: SOCIAL_PROVENANCE,
    uncertaintyMultiplier: timeUncertaintyMultiplier(asOf, config),
    centralShares,
    calibration,
    calibrationEnabled,
  };
}

/**
 * Trims a forecast to what the published JSON snapshot needs. The weighted-poll
 * list and the raw simulation draws are large and reconstructible.
 */
export function toSnapshot(f: FullForecast): Forecast & {
  socialEnabled: boolean;
  socialProvenance: string;
  centralShares: Record<string, number>;
  calibration: Calibration;
  calibrationEnabled: boolean;
} {
  return {
    asOf: f.asOf,
    electionDate: f.electionDate,
    daysToElection: f.daysToElection,
    parties: f.parties,
    blocs: f.blocs,
    coalitions: f.coalitions,
    pmProbability: f.pmProbability,
    pDeadlock: f.pDeadlock,
    pollsUsed: f.pollsUsed,
    effectivePollCount: f.effectivePollCount,
    houseEffects: f.houseEffects,
    config: f.config,
    socialEnabled: f.socialEnabled,
    socialProvenance: f.socialProvenance,
    centralShares: f.centralShares,
    calibration: f.calibration,
    calibrationEnabled: f.calibrationEnabled,
  };
}
