import type { BlocId, ModelConfig } from "./types";
import { HISTORICAL_MISSES, type CalibrationGroup } from "./data/calibration";
import { PARTY_BY_ID, REAL_PARTIES } from "./data/parties";

/**
 * Poll-to-result calibration.
 *
 * WHAT THIS FIXES. Everything upstream of here measures polls against other
 * polls. House effects are centred to zero by construction, so if the entire
 * industry misses the same voters in the same direction — which is precisely
 * what happened in 2015, in April 2019 and again in 2022 — no amount of
 * cross-pollster arithmetic can see it. The only instrument that can is the
 * count itself.
 *
 * TWO OUTPUTS, AND THE SECOND MATTERS MORE.
 *
 *  1. A BIAS correction: the mean historical miss, applied as a shift.
 *  2. A VARIANCE recommendation: how far bloc totals have actually moved
 *     between the final polls and the count.
 *
 * The second was the surprise. Bloc-level misses in the record run from about
 * one seat to eight, with a standard deviation near two and a half seats. The
 * model's own `blocErrorSd` implied roughly one and a half seats — it was
 * understating the single most dangerous error in Israeli polling by a factor
 * of two or more, which makes every "probability of reaching 61" too confident.
 * A bias correction alone would have made that worse, not better: it would have
 * moved the centre while leaving the interval too narrow to contain the truth.
 *
 * WHY THE BIAS IS SHRUNK SO HARD.
 *
 *  - Four elections is a tiny sample. The mean of four noisy numbers is itself
 *    noisy, and applying it at face value is false precision.
 *  - The error is SHRINKING. Likud was understated by eight seats in 2015 and
 *    by one and a half in 2022; pollsters adapted. Recency weighting handles
 *    the trend, shrinkage handles the sample size, and they are separate.
 *  - Much of the raw historical gap is threshold failures freeing seats, a
 *    mechanism this model already simulates. Counting it again as bias would
 *    double-count it.
 *
 * So the correction is recency-weighted, shrunk toward zero, capped, and made
 * zero-sum. It moves the forecast by one to two seats, not five.
 */

/** Elections' worth of data before the estimate is taken near its face value. */
const SHRINK_K = 3;

/** Weight halves every this many elections going back. */
const RECENCY_HALF_LIFE_ELECTIONS = 1.5;

/** Hard ceiling on the bias correction, in seats per bloc. */
const MAX_BIAS_SEATS = 2.5;

export interface GroupCalibration {
  group: CalibrationGroup;
  /** Recency-weighted mean miss, in seats (positive = polls understated). */
  rawMeanSeats: number;
  /** After shrinkage, capping and zero-sum normalisation. */
  appliedSeats: number;
  /** Spread of the historical misses, in seats. */
  sdSeats: number;
  observations: number;
  /** Weight this group's evidence carried, after recency and confidence. */
  evidenceWeight: number;
}

export interface Calibration {
  groups: GroupCalibration[];
  /** partyId -> share-space adjustment (0.01 = one percentage point). */
  partyAdjustments: Record<string, number>;
  /**
   * Bloc-error standard deviation implied by the historical record, in share
   * units — what `ModelConfig.blocErrorSd` should be set to.
   */
  impliedBlocErrorSd: number;
  /** Total absolute movement applied, in seats. A one-line audit figure. */
  totalSeatsMoved: number;
}

/** An exit poll or a reported bloc total is weaker evidence than paired finals. */
const CONFIDENCE_WEIGHT = { firm: 1, approx: 0.6 } as const;

/**
 * @param currentShares Present-day vote-share estimate per party. The bloc
 *   correction is distributed across a bloc's parties in proportion to these,
 *   NOT to their 2022 seats. The bias being corrected is about the voters a
 *   poll is missing today, and today's map is not 2022's: Yashar is currently
 *   the largest party in the change bloc and did not exist in 2022, so a
 *   2022-weighted split handed it almost none of its own bloc's correction and
 *   pushed that share onto Yisrael Beiteinu instead.
 */
export function computeCalibration(
  config: ModelConfig,
  currentShares: Record<string, number> = {},
): Calibration {
  const dates = Array.from(new Set(HISTORICAL_MISSES.map((m) => m.date))).sort();
  const latest = dates.length - 1;

  const groups: CalibrationGroup[] = ["netanyahu", "change", "arab", "haredi"];
  const perGroup: GroupCalibration[] = [];

  for (const group of groups) {
    const rows = HISTORICAL_MISSES.filter((m) => m.group === group);
    if (rows.length === 0) {
      perGroup.push({
        group, rawMeanSeats: 0, appliedSeats: 0, sdSeats: 0,
        observations: 0, evidenceWeight: 0,
      });
      continue;
    }

    let num = 0;
    let den = 0;
    const errors: number[] = [];
    for (const row of rows) {
      const age = latest - dates.indexOf(row.date);
      const recency = Math.pow(0.5, age / RECENCY_HALF_LIFE_ELECTIONS);
      const w = recency * CONFIDENCE_WEIGHT[row.confidence];
      const error = row.actual - row.polled;
      num += error * w;
      den += w;
      errors.push(error);
    }

    const rawMean = den > 0 ? num / den : 0;

    // Unweighted spread: how far these misses scatter, which is what the
    // simulation's error term needs to reproduce.
    const plainMean = errors.reduce((a, b) => a + b, 0) / errors.length;
    const sd =
      errors.length > 1
        ? Math.sqrt(
            errors.reduce((a, e) => a + (e - plainMean) ** 2, 0) / (errors.length - 1),
          )
        : Math.abs(plainMean);

    const shrunk = rawMean * (rows.length / (rows.length + SHRINK_K));
    const capped = Math.max(-MAX_BIAS_SEATS, Math.min(MAX_BIAS_SEATS, shrunk));

    perGroup.push({
      group,
      rawMeanSeats: rawMean,
      appliedSeats: capped,
      sdSeats: sd,
      observations: rows.length,
      evidenceWeight: den,
    });
  }

  // --- Zero-sum across the three real blocs ---------------------------------
  // "haredi" is a subset of "netanyahu", so it redistributes WITHIN that bloc
  // and is excluded from the cross-bloc balance.
  const blocRows = perGroup.filter((g) => g.group !== "haredi");
  const imbalance = blocRows.reduce((a, g) => a + g.appliedSeats, 0);
  if (blocRows.length > 0) {
    const share = imbalance / blocRows.length;
    for (const g of blocRows) g.appliedSeats -= share;
  }

  // --- Convert seats to share-space adjustments per party -------------------
  const partyAdjustments: Record<string, number> = {};
  const HAREDI = new Set(["shas", "utj"]);

  // Fall back to 2022 seats only when no current estimate is available — a
  // cold start, before any poll has been aggregated.
  const strength = (p: (typeof REAL_PARTIES)[number]) =>
    currentShares[p.id] ?? (p.seats2022 || 1) / 120;

  const blocSizes: Record<BlocId, number> = { netanyahu: 0, change: 0, arab: 0 };
  for (const p of REAL_PARTIES) blocSizes[p.bloc] += strength(p);

  for (const party of REAL_PARTIES) {
    const bloc = blocRows.find((g) => g.group === party.bloc);
    if (!bloc) continue;
    // Distribute a bloc's correction across its parties in proportion to how
    // much support each actually has now.
    const weight = strength(party) / (blocSizes[party.bloc] || 1);
    let seats = bloc.appliedSeats * weight;

    // Haredi parties carry their own documented extra: their turnout is the
    // one this industry misses most reliably, and it is measured separately.
    if (HAREDI.has(party.id)) {
      const haredi = perGroup.find((g) => g.group === "haredi");
      if (haredi) seats += haredi.appliedSeats / HAREDI.size;
    }

    partyAdjustments[party.id] = (seats / config.totalSeats) * 0.955;
  }

  // Re-centre so the party adjustments still sum to zero after the Haredi term.
  const total = Object.values(partyAdjustments).reduce((a, b) => a + b, 0);
  const n = Object.keys(partyAdjustments).length;
  for (const id of Object.keys(partyAdjustments)) partyAdjustments[id] -= total / n;

  // --- Variance: what the record says bloc error actually is ---------------
  const netanyahu = perGroup.find((g) => g.group === "netanyahu");
  const sdSeats = netanyahu?.sdSeats ?? 0;
  const impliedBlocErrorSd = (sdSeats / config.totalSeats) * 0.955;

  const totalSeatsMoved = Object.values(partyAdjustments).reduce(
    (a, v) => a + Math.abs((v / 0.955) * config.totalSeats),
    0,
  );

  return { groups: perGroup, partyAdjustments, impliedBlocErrorSd, totalSeatsMoved };
}

/** Human-readable label for a calibration group. */
export const GROUP_LABELS: Record<CalibrationGroup, string> = {
  netanyahu: "הגוש בראשות נתניהו",
  change: "גוש השינוי",
  arab: "המפלגות הערביות",
  haredi: "המפלגות החרדיות",
};

export { PARTY_BY_ID };
