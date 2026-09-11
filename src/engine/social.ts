import type { ModelConfig, SocialObservation } from "./types";
import { REAL_PARTIES } from "./data/parties";

/**
 * Turning social-media chatter into a forecast adjustment.
 *
 * THE CORE PROBLEM: raw social volume is not a vote estimate and never will be.
 * The platform electorate is younger, more secular, more urban and far more
 * politically extreme than the voting electorate. In Israel specifically, the
 * Haredi parties reliably win 15-18 seats while generating maybe 3% of online
 * political conversation, and the Arab parties' turnout — the single largest
 * source of error in Israeli polling — is invisible in engagement data.
 * A model that regressed seats on mention share would predict Shas out of the
 * Knesset in every cycle.
 *
 * SO THE SIGNAL IS USED AS MOMENTUM, NOT LEVEL.
 *
 * We never ask "what share of conversation does this party have" — that number
 * is structurally wrong and no amount of weighting fixes it. We ask "has this
 * party's own share of conversation, and the sentiment around it, moved
 * relative to its own recent baseline". A party's platform skew is roughly
 * constant over weeks, so it cancels out of a change score. What survives is
 * the part that genuinely leads published polling: attention shifting toward or
 * away from a party faster than fortnightly polls can register.
 *
 * Three further guards:
 *   - The adjustment is capped at `socialMaxAdjustmentPp` (0.6pp, under one
 *     seat). Momentum is a tie-breaker between polls, not a rival to them.
 *   - It is scaled DOWN for parties whose electorate is under-represented
 *     online (see `ONLINE_REPRESENTATIVENESS`), because for them even the
 *     change score is measured on the wrong people.
 *   - The adjustments are recentred to sum to zero, so the signal reallocates
 *     support between parties instead of inventing or destroying votes.
 */

/**
 * How well a party's actual voters are represented in tracked platform data,
 * in [0,1]. Drives how much of the momentum signal is allowed through.
 */
export const ONLINE_REPRESENTATIVENESS: Record<string, number> = {
  likud: 0.85,
  yashar: 0.9,
  byachad: 0.9,
  democrats: 0.95,
  "yisrael-beiteinu": 0.7,
  otzma: 0.8,
  "religious-zionism": 0.75,
  amcha: 0.85,
  reservists: 0.85,
  // Haredi parties: organised around community institutions and closed
  // messaging, largely absent from the open platforms. The signal is close to
  // uninformative for them and is treated as such.
  shas: 0.2,
  utj: 0.15,
  // Arab parties: present online, but turnout — not preference — is what moves
  // their seat count, and turnout is not what engagement measures.
  "hadash-taal": 0.45,
  raam: 0.45,
};

export interface SocialSignal {
  partyId: string;
  /** Recent weighted attention score (volume + engagement + sentiment). */
  recent: number;
  /** The same score over the preceding baseline window. */
  baseline: number;
  /** Relative momentum: (recent - baseline) / baseline, clipped. */
  momentum: number;
  /** Final applied adjustment in share units (e.g. 0.003 = +0.3pp). */
  adjustment: number;
  representativeness: number;
}

/**
 * Composite attention score for one party over a window.
 *
 * Engagement share is weighted above raw volume share because a like or a share
 * costs more than an impression and is harder to manufacture at scale, and
 * sentiment enters as a modest multiplier rather than a term — a party can
 * dominate a news cycle for bad reasons, and the sign of the coverage matters
 * less than the fact of it.
 */
function attentionScore(obs: SocialObservation[]): number {
  if (obs.length === 0) return 0;
  let v = 0;
  let e = 0;
  let s = 0;
  for (const o of obs) {
    v += o.volumeShare;
    e += o.engagementShare;
    s += o.sentiment;
  }
  const n = obs.length;
  const volume = v / n;
  const engagement = e / n;
  const sentiment = s / n;
  return (0.35 * volume + 0.65 * engagement) * (1 + 0.25 * sentiment);
}

export function computeSocialSignals(
  observations: SocialObservation[],
  asOf: string,
  config: ModelConfig,
  enabled: boolean,
): SocialSignal[] {
  const asOfMs = Date.parse(asOf);
  const window = config.socialHalfLifeDays; // recent window, in days
  const recentCutoff = asOfMs - window * 86400000;
  const baselineCutoff = asOfMs - 4 * window * 86400000;

  const raw: SocialSignal[] = [];
  for (const party of REAL_PARTIES) {
    const mine = observations.filter((o) => o.partyId === party.id);
    const recentObs = mine.filter(
      (o) => Date.parse(o.date) > recentCutoff && Date.parse(o.date) <= asOfMs,
    );
    const baseObs = mine.filter(
      (o) => Date.parse(o.date) > baselineCutoff && Date.parse(o.date) <= recentCutoff,
    );
    const recent = attentionScore(recentObs);
    const baseline = attentionScore(baseObs);
    const representativeness = ONLINE_REPRESENTATIVENESS[party.id] ?? 0.5;

    // Clipped at ±40%: a party whose chatter doubled in a week has almost
    // certainly been brigaded or hit one viral moment, not gained 40% more
    // voters. Clipping keeps a single news cycle from dominating the term.
    const momentum =
      baseline > 0 ? Math.max(-0.4, Math.min(0.4, (recent - baseline) / baseline)) : 0;

    raw.push({
      partyId: party.id,
      recent,
      baseline,
      momentum,
      representativeness,
      adjustment: 0,
    });
  }

  if (!enabled) return raw;

  const maxAdj = config.socialMaxAdjustmentPp / 100;
  for (const sig of raw) {
    // momentum/0.4 maps the clip range onto [-1,1], then the cap and the
    // representativeness discount are applied.
    sig.adjustment = (sig.momentum / 0.4) * maxAdj * sig.representativeness;
  }

  // Recentre to zero-sum so the signal moves support between parties rather
  // than creating it. Weighted by each party's size is unnecessary here because
  // the adjustments are already tiny and comparable in magnitude.
  const mean = raw.reduce((a, s) => a + s.adjustment, 0) / raw.length;
  for (const sig of raw) sig.adjustment -= mean;

  return raw;
}
