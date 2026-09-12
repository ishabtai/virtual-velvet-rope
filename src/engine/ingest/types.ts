import type { Poll, SocialObservation } from "../types";

/**
 * Ingestion adapters.
 *
 * The forecast engine never talks to the network. It takes arrays of `Poll` and
 * `SocialObservation` and returns a forecast, which is what makes it testable
 * and reproducible. Everything that touches the outside world lives behind one
 * of these two interfaces, so a source can be added, fixed or removed without
 * the model changing at all.
 *
 * STATUS IN THIS REPOSITORY: no adapter is wired to a live source yet. The
 * environment this was built in has its outbound network restricted by policy —
 * every Israeli news domain and Wikipedia returned a proxy block, and there are
 * no platform API credentials — so the seed dataset in `src/engine/data/polls.ts`
 * was assembled by hand from published reports, each with its source URL. The
 * adapters below define the contract those live sources will fill.
 */

export interface IngestResult<T> {
  items: T[];
  /** Source identifier, for attribution and for per-source error reporting. */
  source: string;
  fetchedAt: string;
  /** Non-fatal problems: a poll that failed validation, a changed layout. */
  warnings: string[];
}

export interface PollSource {
  id: string;
  name: string;
  url: string;
  /** Called by the daily job. Must not throw; report failures as warnings. */
  fetch(): Promise<IngestResult<Poll>>;
}

export interface SocialSource {
  id: string;
  name: string;
  platform: string;
  /**
   * Returns one observation per party per day over the requested window.
   * Implementations MUST set `platforms` so downstream code can tell which
   * platforms a day's number actually covers — a missing platform silently
   * changing the denominator is the most common way this kind of signal breaks.
   */
  fetch(sinceIso: string): Promise<IngestResult<SocialObservation>>;
}

/** Rejects a poll that cannot be true, before it reaches the model. */
export function validatePoll(poll: Poll): string[] {
  const problems: string[] = [];
  if (!poll.id) problems.push("missing id");
  if (Number.isNaN(Date.parse(poll.date))) problems.push(`bad date: ${poll.date}`);
  if (Date.parse(poll.date) > Date.now() + 86400000) problems.push("fieldwork date is in the future");
  const total = Object.values(poll.seats).reduce((a, b) => a + b, 0);
  if (total > 120) problems.push(`seats sum to ${total}, above the 120-seat house`);
  if (total <= 0) problems.push("no seats reported");
  for (const [id, n] of Object.entries(poll.seats)) {
    if (n < 0) problems.push(`${id} has negative seats`);
    // A party below the threshold cannot win 1-3 seats: the cliff is at four.
    if (n > 0 && n < 4) problems.push(`${id} reported ${n} seats, impossible under a 3.25% threshold`);
  }
  if (poll.sampleSize !== null && poll.sampleSize < 100) problems.push("implausibly small sample");
  if (!poll.source) problems.push("missing source URL");
  return problems;
}
