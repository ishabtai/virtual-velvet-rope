/**
 * Core domain types for the Israeli election forecasting engine.
 *
 * The engine works in *vote-share space*, not seat space. Published polls report
 * seats, so seats are converted back to an implied share, adjusted, and then
 * re-allocated through the real Bader-Ofer method. This matters because seat
 * counts are a lossy, non-linear function of shares: two polls that both give a
 * party "8 seats" can differ by a full percentage point of actual support.
 */

export type BlocId = "netanyahu" | "change" | "arab";

export interface Party {
  /** Stable machine id used as the key everywhere in the engine. */
  id: string;
  /** Hebrew display name, as it appears on the ballot / in polls. */
  name: string;
  /** Party leader (Hebrew). */
  leader: string;
  /** Bloc alignment used for coalition arithmetic. */
  bloc: BlocId;
  /** Brand colour used across the site. */
  color: string;
  /** Seats won in the 2022 election under this banner (0 for new parties). */
  seats2022: number;
  /**
   * Surplus-vote (Bader-Ofer) agreement partner id, if one was filed with the
   * Central Elections Committee. Surplus agreements are worth roughly half a
   * seat on average and occasionally decide who forms a government.
   */
  surplusPartner?: string;
  /** Short Hebrew descriptor shown in the UI. */
  note?: string;
}

/** How a poll's fieldwork was carried out — drives the mode-quality weight. */
export type PollMode = "phone" | "online-panel" | "mixed" | "ivr" | "unknown";

/**
 * How much of a poll entry came from the published report, and how much was
 * reconstructed. This is graded rather than boolean because the honest answer
 * is graded: there is a real difference between a poll whose full 120-seat
 * breakdown was printed and one where nine parties were printed and the tenth
 * follows arithmetically from a published bloc total.
 *
 *  published-full      Every party's seats printed, summing to 120.
 *  published-partial   Only some parties printed; the rest are simply absent
 *                      and the model uses the poll only for what it reported.
 *  reconstructed       At least one value derived from a published bloc total
 *                      minus the other published parties. Sound arithmetic,
 *                      but it is inference, and `notes` must say which value.
 *  scenario            A conditional variant ("if party X runs") published
 *                      alongside a main poll from the same fieldwork. Real
 *                      data, but NOT an independent poll — see
 *                      `excludeFromAverage`.
 */
export type PollProvenance =
  | "published-full"
  | "published-partial"
  | "reconstructed"
  | "scenario";

export interface Poll {
  id: string;
  /** ISO date the fieldwork ended (the date the engine treats as the poll's age). */
  date: string;
  /** Polling institute, e.g. "מדגם", "דיירקט פולס". */
  pollster: string;
  /** Outlet that commissioned and published it, e.g. "חדשות 12". */
  outlet: string;
  /** Respondents. Null when the publisher did not disclose it. */
  sampleSize: number | null;
  mode: PollMode;
  /** Seats per party id. Parties absent from the map polled below threshold. */
  seats: Record<string, number>;
  /**
   * Raw vote shares (0-1) per party, when the publisher disclosed them. Much
   * more informative than seats; used directly when present.
   */
  shares?: Record<string, number>;
  /** URL of the published poll. */
  source: string;
  /**
   * True when the published report did not give a complete party-by-party
   * breakdown and some values were reconstructed from bloc totals. Such polls
   * are down-weighted and flagged in the UI.
   */
  partial?: boolean;
  /** Provenance tier. Displayed on the site next to every poll. */
  provenance: PollProvenance;
  /**
   * Excludes the entry from the weighted average while still publishing it.
   *
   * Set on scenario polls. A "what if Winter runs" variant shares its fieldwork
   * and its respondents with the main poll it was published beside, so counting
   * both would weight that one night of interviewing twice and would pull the
   * average toward whichever branch the outlet chose to model. The scenario is
   * still worth publishing — it is the only direct measurement of what happens
   * when a borderline party crosses — so it is shown and labelled, not used.
   */
  excludeFromAverage?: boolean;
  notes?: string;
}

/** A single day's aggregated social-media signal for one party. */
export interface SocialObservation {
  date: string;
  partyId: string;
  /** Share of party-related conversation volume across tracked platforms (0-1). */
  volumeShare: number;
  /** Net sentiment in [-1, 1]: positive means favourable mentions dominate. */
  sentiment: number;
  /** Share of *engaged* accounts (likes/shares/comments), not just impressions. */
  engagementShare: number;
  platforms: string[];
}

export interface PollsterProfile {
  pollster: string;
  /**
   * Analyst-assigned quality grade in [0, 1] combining transparency, method,
   * disclosure of sample size, and historical accuracy. Applied as a weight.
   */
  grade: number;
  /** Number of past elections with a measurable final-poll error, if any. */
  elections: number;
  /**
   * Mean absolute seat error of the institute's final pre-election poll across
   * past elections. Null when there is no public track record.
   */
  meanAbsSeatError: number | null;
  notes: string;
}

export interface ModelConfig {
  /** Days after which a poll's weight is halved. */
  recencyHalfLifeDays: number;
  /** Sample size that receives full sample weight; smaller samples scale as sqrt(n/n0). */
  referenceSampleSize: number;
  /** Weight multiplier per fieldwork mode. */
  modeWeights: Record<PollMode, number>;
  /** Multiplier applied to polls with a reconstructed breakdown. */
  partialPollPenalty: number;
  /** Legal electoral threshold as a share of valid votes. */
  threshold: number;
  /** Total seats in the Knesset. */
  totalSeats: number;
  /** Seats needed for a governing majority. */
  majority: number;
  /**
   * Maximum share-points (in percentage points) that the social-media signal is
   * allowed to move any single party. Deliberately small — see METHODOLOGY.
   */
  socialMaxAdjustmentPp: number;
  /** Half-life in days for the social momentum window. */
  socialHalfLifeDays: number;
  /** Monte Carlo iterations. */
  simulations: number;
  /** Standard deviation of the shared national polling-miss term, in share points. */
  nationalErrorSd: number;
  /** Standard deviation of the bloc-level correlated error, in share points. */
  blocErrorSd: number;
  /**
   * Baseline per-party idiosyncratic error at election day, in share points.
   * Scaled up for parties far from the election and for small parties.
   */
  partyErrorSd: number;
  /** Election day, ISO date. */
  electionDate: string;
  /** How much the error inflates per 30 days of distance from election day. */
  timeUncertaintyPer30Days: number;
}

export interface PartyEstimate {
  partyId: string;
  /** Central estimate of vote share (0-1) after all adjustments. */
  share: number;
  /** Share implied by the raw weighted poll average, before social adjustment. */
  pollShare: number;
  /** Signed social-media adjustment applied, in share units. */
  socialAdjustment: number;
  /** Mean seats across simulations (non-integer by design). */
  meanSeats: number;
  /** Median seats across simulations. */
  medianSeats: number;
  /** 80% credible interval on seats. */
  low80: number;
  high80: number;
  /** Probability of clearing the 3.25% threshold. */
  pAboveThreshold: number;
  /** Probability of being the single largest party. */
  pLargest: number;
  /** Change in central share vs. the estimate 14 days ago, in share units. */
  trend14d: number;
}

export interface BlocEstimate {
  bloc: BlocId;
  meanSeats: number;
  low80: number;
  high80: number;
  /** Probability the bloc alone reaches 61 seats. */
  pMajority: number;
}

export interface CoalitionScenario {
  id: string;
  label: string;
  members: string[];
  /** Probability this exact member set reaches 61+ seats. */
  probability: number;
  meanSeats: number;
  /** Analyst-assigned political plausibility in [0,1], independent of arithmetic. */
  plausibility: number;
  reasoning: string;
}

export interface Forecast {
  /** ISO date this forecast was generated for. */
  asOf: string;
  electionDate: string;
  daysToElection: number;
  parties: PartyEstimate[];
  blocs: BlocEstimate[];
  coalitions: CoalitionScenario[];
  /** Probability each leader ends up as prime minister. */
  pmProbability: { leader: string; partyId: string; probability: number }[];
  /** Probability no bloc can form a coalition without crossing the Arab-party line. */
  pDeadlock: number;
  /** Number of polls that carried non-trivial weight. */
  pollsUsed: number;
  /** Effective sample size of the aggregate (sum of weights squared, normalised). */
  effectivePollCount: number;
  /** Estimated house effects by pollster and party, in share points. */
  houseEffects: Record<string, Record<string, number>>;
  config: ModelConfig;
}
