import type { ModelConfig, Poll } from "./types";
import { allocateSeats } from "./baderOfer";
import { PARTY_BY_ID, REAL_PARTIES } from "./data/parties";
import { DEFAULT_GRADE, POLLSTER_BY_NAME } from "./data/pollsters";

/** Base share of the vote lost to the ~24 lists that win nothing. */
const BASE_WASTED_SHARE = 0.035;

export interface WeightedPoll {
  poll: Poll;
  /** Final weight after recency, sample size, grade, mode and partial penalty. */
  weight: number;
  /** Component weights, exposed so the site can show why a poll counts. */
  components: {
    recency: number;
    sample: number;
    grade: number;
    mode: number;
    partial: number;
  };
  /** Estimated share of total valid votes per party id. */
  shares: Record<string, number>;
  ageDays: number;
}

/**
 * Converts a poll's published seat counts into vote shares.
 *
 * For a complete 120-seat poll this INVERTS the real allocator rather than
 * dividing by 120. That matters: D'Hondt plus surplus agreements are not
 * proportional, so a party on 4 seats is not on 3.33% of the vote. The
 * inversion runs iterative proportional fitting against `allocateSeats` — the
 * exact function the simulation uses downstream — so the shares that come out
 * are guaranteed to reproduce the poll's own seat numbers.
 *
 * For a partial poll (headline parties only) there is nothing to invert
 * against, so it falls back to proportional scaling. The error from doing so is
 * small for the large parties that partial reports actually cover.
 */
export function seatsToShares(
  poll: Poll,
  config: ModelConfig,
  belowThreshold: string[] = [],
): Record<string, number> {
  const reportedSeats = Object.values(poll.seats).reduce((a, b) => a + b, 0);
  const complete = reportedSeats === config.totalSeats;

  // Wasted vote: what the poll itself reported for sub-threshold lists, plus a
  // base allowance for the long tail of micro-lists that no poll itemises.
  let wasted = BASE_WASTED_SHARE;
  if (poll.shares) {
    for (const [id, s] of Object.entries(poll.shares)) {
      if (!(id in poll.seats)) wasted += s;
    }
  }
  wasted += belowThreshold.filter((id) => !(id in poll.seats) && !poll.shares?.[id]).length * 0.02;
  wasted = Math.min(wasted, 0.12);

  const seatVoteShare = 1 - wasted;

  if (!complete) {
    const out: Record<string, number> = {};
    for (const [id, s] of Object.entries(poll.seats)) {
      out[id] = (s / config.totalSeats) * seatVoteShare;
    }
    return out;
  }

  // Iterative proportional fitting against the real allocator.
  const ids = Object.keys(poll.seats);
  const shares: Record<string, number> = {};
  for (const id of ids) shares[id] = poll.seats[id] / config.totalSeats;

  const agreements = surplusMap();
  for (let iter = 0; iter < 60; iter++) {
    const res = allocateSeats({
      votes: shares,
      threshold: 0, // threshold already applied by the published poll
      totalSeats: config.totalSeats,
      surplusAgreements: agreements,
    });
    let maxDiff = 0;
    for (const id of ids) {
      const got = res.seats[id] ?? 0;
      const target = poll.seats[id];
      maxDiff = Math.max(maxDiff, Math.abs(got - target));
      // +0.5 smoothing keeps the ratio finite and the iteration stable.
      shares[id] *= (target + 0.5) / (got + 0.5);
    }
    if (maxDiff === 0 && iter > 3) break;
  }

  const total = Object.values(shares).reduce((a, b) => a + b, 0);
  const out: Record<string, number> = {};
  for (const id of ids) out[id] = (shares[id] / total) * seatVoteShare;
  return out;
}

export function surplusMap(): Record<string, string | undefined> {
  const m: Record<string, string | undefined> = {};
  for (const p of REAL_PARTIES) m[p.id] = p.surplusPartner;
  return m;
}

/**
 * Weight for a single poll. Multiplicative, and every factor is in [0,1] so the
 * scale stays interpretable: a weight of 1.0 is a fresh, large, fully reported
 * phone poll from a top-graded institute.
 */
export function pollWeight(
  poll: Poll,
  asOf: string,
  config: ModelConfig,
): WeightedPoll["components"] & { weight: number; ageDays: number } {
  const ageDays = Math.max(
    0,
    (Date.parse(asOf) - Date.parse(poll.date)) / 86400000,
  );

  // Exponential decay. A poll at the half-life counts half as much.
  const recency = Math.pow(0.5, ageDays / config.recencyHalfLifeDays);

  // Sampling variance scales as 1/n, so weight scales as n — capped at the
  // reference size. An undisclosed sample size is treated as a small one:
  // non-disclosure should cost something.
  const n = poll.sampleSize ?? 450;
  const sample = Math.min(1, n / config.referenceSampleSize);

  const grade = POLLSTER_BY_NAME[poll.pollster]?.grade ?? DEFAULT_GRADE;
  const mode = config.modeWeights[poll.mode] ?? config.modeWeights.unknown;
  const partial = poll.partial ? config.partialPollPenalty : 1;

  return {
    recency,
    sample,
    grade,
    mode,
    partial,
    weight: recency * sample * grade * mode * partial,
    ageDays,
  };
}

export function weighPolls(polls: Poll[], asOf: string, config: ModelConfig, belowThreshold: Record<string, string[]>): WeightedPoll[] {
  return polls
    // A scenario variant shares its respondents with the main poll published
    // beside it. Counting both would weight one night of fieldwork twice and
    // tilt the average toward whichever branch the outlet chose to model.
    .filter((p) => !p.excludeFromAverage)
    .filter((p) => Date.parse(p.date) <= Date.parse(asOf))
    .map((poll) => {
      const w = pollWeight(poll, asOf, config);
      return {
        poll,
        weight: w.weight,
        ageDays: w.ageDays,
        components: {
          recency: w.recency,
          sample: w.sample,
          grade: w.grade,
          mode: w.mode,
          partial: w.partial,
        },
        shares: seatsToShares(poll, config, belowThreshold[poll.id] ?? []),
      };
    })
    .sort((a, b) => Date.parse(b.poll.date) - Date.parse(a.poll.date));
}

/**
 * Weighted local average of a party's share at a point in time, optionally
 * excluding one institute (used for leave-one-out house-effect estimation).
 */
export function localAverage(
  weighted: WeightedPoll[],
  partyId: string,
  atDate: string,
  config: ModelConfig,
  opts: { excludePollster?: string; houseEffects?: Record<string, Record<string, number>> } = {},
): { value: number | null; weight: number } {
  let num = 0;
  let den = 0;
  for (const wp of weighted) {
    if (opts.excludePollster && wp.poll.pollster === opts.excludePollster) continue;
    const raw = wp.shares[partyId];
    if (raw === undefined) continue;
    const gap = Math.abs(Date.parse(atDate) - Date.parse(wp.poll.date)) / 86400000;
    // Symmetric kernel around `atDate`: unlike the forecast weight, a trend
    // estimate at a past date may legitimately use polls taken after it.
    const kernel = Math.pow(0.5, gap / config.recencyHalfLifeDays);
    const w = kernel * wp.components.sample * wp.components.grade * wp.components.mode * wp.components.partial;
    const he = opts.houseEffects?.[wp.poll.pollster]?.[partyId] ?? 0;
    num += (raw - he) * w;
    den += w;
  }
  return den > 0 ? { value: num / den, weight: den } : { value: null, weight: 0 };
}

/**
 * Estimates each institute's house effect: its systematic, repeated deviation
 * from the consensus on each party, in share points.
 *
 * Two properties make this honest rather than circular:
 *  - Leave-one-out. An institute's own polls never contribute to the consensus
 *    it is measured against, so a prolific pollster cannot define the centre
 *    and then score zero bias by construction.
 *  - Shrinkage. An estimate from two polls is pulled hard toward zero
 *    (n/(n+k), k=3). Without it, one outlier poll becomes a permanent
 *    "correction" applied to every future poll from that institute.
 *
 * House effects are identified only up to a constant — if every pollster
 * overstates a party by a point, that is not bias, it is the state of the
 * polling industry and no amount of arithmetic can reveal it. So the estimates
 * are centred to a weighted mean of zero per party, and the residual common
 * error is handled by the simulation's correlated error terms instead.
 */
export function estimateHouseEffects(
  weighted: WeightedPoll[],
  config: ModelConfig,
  iterations = 12,
): Record<string, Record<string, number>> {
  const pollsters = Array.from(new Set(weighted.map((w) => w.poll.pollster)));
  const partyIds = REAL_PARTIES.map((p) => p.id);
  const SHRINK_K = 3;

  let effects: Record<string, Record<string, number>> = {};
  for (const h of pollsters) effects[h] = Object.fromEntries(partyIds.map((p) => [p, 0]));

  for (let iter = 0; iter < iterations; iter++) {
    const next: Record<string, Record<string, number>> = {};
    for (const h of pollsters) {
      next[h] = {};
      const hPolls = weighted.filter((w) => w.poll.pollster === h);
      for (const partyId of partyIds) {
        let num = 0;
        let den = 0;
        let n = 0;
        for (const wp of hPolls) {
          const raw = wp.shares[partyId];
          if (raw === undefined) continue;
          const consensus = localAverage(weighted, partyId, wp.poll.date, config, {
            excludePollster: h,
            houseEffects: effects,
          });
          if (consensus.value === null) continue;
          const w = wp.components.sample * wp.components.grade * wp.components.mode;
          num += (raw - consensus.value) * w;
          den += w;
          n++;
        }
        const raw = den > 0 ? num / den : 0;
        next[h][partyId] = raw * (n / (n + SHRINK_K));
      }
    }
    effects = next;
  }

  // Centre per party across institutes, weighted by how much each contributes.
  const pollsterWeight: Record<string, number> = {};
  for (const wp of weighted) {
    pollsterWeight[wp.poll.pollster] = (pollsterWeight[wp.poll.pollster] ?? 0) + wp.weight;
  }
  for (const partyId of partyIds) {
    let num = 0;
    let den = 0;
    for (const h of pollsters) {
      num += effects[h][partyId] * (pollsterWeight[h] ?? 0);
      den += pollsterWeight[h] ?? 0;
    }
    const mean = den > 0 ? num / den : 0;
    for (const h of pollsters) effects[h][partyId] -= mean;
  }

  return effects;
}

export interface AggregateResult {
  /** House-effect-corrected, weighted share estimate per party id. */
  shares: Record<string, number>;
  /** Sum of weights backing each party's estimate. */
  support: Record<string, number>;
  houseEffects: Record<string, Record<string, number>>;
  pollsUsed: number;
  /** Kish effective sample: (Σw)² / Σw². How many "full" polls this really is. */
  effectivePollCount: number;
}

export function aggregatePolls(
  polls: Poll[],
  asOf: string,
  config: ModelConfig,
  belowThreshold: Record<string, string[]> = {},
): AggregateResult {
  const weighted = weighPolls(polls, asOf, config, belowThreshold);
  const houseEffects = estimateHouseEffects(weighted, config);

  const shares: Record<string, number> = {};
  const support: Record<string, number> = {};

  for (const party of REAL_PARTIES) {
    let num = 0;
    let den = 0;
    for (const wp of weighted) {
      const raw = wp.shares[party.id];
      const explicitlyBelow = (belowThreshold[wp.poll.id] ?? []).includes(party.id);
      let value: number | undefined;
      if (raw !== undefined) {
        value = raw - (houseEffects[wp.poll.pollster]?.[party.id] ?? 0);
      } else if (explicitlyBelow) {
        // "Reported as failing" is information. Treat it as an observation just
        // under the threshold rather than dropping the poll for this party —
        // otherwise a party only ever gets averaged over the polls flattering
        // enough to list it, which biases every borderline party upward.
        value = wp.poll.shares?.[party.id] ?? config.threshold * 0.8;
      }
      if (value === undefined) continue;
      num += value * wp.weight;
      den += wp.weight;
    }
    if (den > 0) {
      shares[party.id] = Math.max(0.0005, num / den);
      support[party.id] = den;
    }
  }

  // Residual: whatever share is unaccounted for goes to lists that win nothing.
  const assigned = Object.values(shares).reduce((a, b) => a + b, 0);
  shares.other = Math.max(0.005, 1 - assigned);

  const sumW = weighted.reduce((a, w) => a + w.weight, 0);
  const sumW2 = weighted.reduce((a, w) => a + w.weight * w.weight, 0);

  return {
    shares,
    support,
    houseEffects,
    pollsUsed: weighted.filter((w) => w.weight > 0.02).length,
    effectivePollCount: sumW2 > 0 ? (sumW * sumW) / sumW2 : 0,
  };
}

export { PARTY_BY_ID };
