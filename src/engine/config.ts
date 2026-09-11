import type { ModelConfig } from "./types";

/**
 * Model constants. Every one of these is a modelling judgement, so every one is
 * exposed here, documented, and adjustable from the simulator page rather than
 * buried in the code.
 */
export const DEFAULT_CONFIG: ModelConfig = {
  /**
   * 14 days. Israeli campaigns move fast and a month-old poll is a different
   * electorate — but a half-life much shorter than this throws away real
   * information and makes the average jump around on single outliers.
   */
  recencyHalfLifeDays: 14,

  /**
   * Sampling error scales as 1/sqrt(n), so weight scales as n. Capped at the
   * reference size: past ~1200 respondents the binding error is design and
   * house effect, not sample size, and rewarding a huge panel sample would
   * hand the aggregate to whoever runs the cheapest panel.
   */
  referenceSampleSize: 1000,

  modeWeights: {
    phone: 1.0,
    mixed: 0.95,
    "online-panel": 0.8,
    ivr: 0.6,
    unknown: 0.7,
  },

  /** A poll whose breakdown was partly reconstructed carries less weight. */
  partialPollPenalty: 0.75,

  /** Set in law: 3.25% of valid votes, equivalent to roughly four seats. */
  threshold: 0.0325,
  totalSeats: 120,
  majority: 61,

  /**
   * The social-media term may move a party by at most 0.6 percentage points of
   * vote share — under a seat's worth. See METHODOLOGY for why the cap is this
   * tight.
   */
  socialMaxAdjustmentPp: 0.6,
  socialHalfLifeDays: 7,

  simulations: 20000,

  /**
   * Error decomposition, in share points (0.01 = one percentage point), all
   * calibrated to election-day conditions and inflated backwards in time.
   *
   * nationalErrorSd  — differential turnout across the whole electorate.
   * blocErrorSd      — correlated misses within a bloc (the classic failure
   *                    mode: every right-wing party understated at once).
   * partyErrorSd     — party-specific error, scaled by party size.
   */
  nationalErrorSd: 0.006,
  blocErrorSd: 0.013,
  partyErrorSd: 0.011,

  electionDate: "2026-10-27",

  /**
   * Uncertainty grows with distance from election day: +30% per 30 days. Set
   * from how far Israeli poll averages have actually moved over the final two
   * months of past campaigns — a period that in this cycle has already seen a
   * new party (עמך ישראל) launch and take eight seats out of the Likud inside a
   * single week. Applied to the preference terms only, not to turnout.
   */
  timeUncertaintyPer30Days: 0.3,
};
