import type { Poll } from "../types";
import { validatePoll } from "./types";

/**
 * The accumulating poll store.
 *
 * Scraped polls are appended to a file that lives in the repository and grows
 * every day, so the aggregate gets richer over the campaign instead of being
 * re-derived from whatever happens to be on a section page this morning. Three
 * rules govern it, and they exist because an automated store that gets any of
 * them wrong quietly poisons every forecast downstream:
 *
 *  1. THE CURATED SET IS IMMUTABLE. Hand-entered, source-checked polls in
 *     src/engine/data/polls.ts always win a collision. A scraper must never be
 *     able to overwrite a number a human verified.
 *  2. APPEND, NEVER REPLACE. A poll that has left the outlet's front page has
 *     not stopped having happened. The store only ever grows.
 *  3. A REJECT IS KEPT, NOT DROPPED. Anything that parsed but failed validation
 *     goes to quarantine with the reason. Silent failure is how a scraper rots
 *     for three weeks before anyone notices.
 */

export interface StoredPolls {
  /** ISO timestamp of the last successful scrape run. */
  updatedAt: string;
  polls: Poll[];
}

export interface QuarantinedPoll {
  poll: Poll;
  reasons: string[];
  seenAt: string;
}

export interface QuarantineFile {
  updatedAt: string;
  entries: QuarantinedPoll[];
}

export interface MergeReport {
  added: Poll[];
  duplicates: number;
  shadowedByCurated: number;
  quarantined: QuarantinedPoll[];
  total: number;
}

/**
 * Fingerprints a poll by what it actually claims, not by its id.
 *
 * Two outlets reporting the same Channel 12 poll produce different URLs and
 * therefore different ids, but identical numbers. Without this, the same night
 * of fieldwork would enter the average twice and count double.
 */
export function fingerprint(poll: Poll): string {
  const seats = Object.entries(poll.seats)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, n]) => `${id}:${n}`)
    .join(",");
  return `${poll.date}|${poll.pollster}|${seats}`;
}

export function mergePolls(
  existing: Poll[],
  incoming: Poll[],
  curated: Poll[],
): MergeReport {
  const curatedIds = new Set(curated.map((p) => p.id));
  const curatedPrints = new Set(curated.map(fingerprint));

  const byId = new Map(existing.map((p) => [p.id, p]));
  const prints = new Set(existing.map(fingerprint));

  const added: Poll[] = [];
  const quarantined: QuarantinedPoll[] = [];
  let duplicates = 0;
  let shadowedByCurated = 0;
  const seenAt = new Date().toISOString();

  for (const poll of incoming) {
    const problems = validatePoll(poll);
    if (problems.length > 0) {
      quarantined.push({ poll, reasons: problems, seenAt });
      continue;
    }

    const print = fingerprint(poll);

    // Rule 1: a human-verified poll is never displaced by a scraped one.
    if (curatedIds.has(poll.id) || curatedPrints.has(print)) {
      shadowedByCurated++;
      continue;
    }

    // Rule: the same poll reported twice is still one poll.
    if (byId.has(poll.id) || prints.has(print)) {
      duplicates++;
      continue;
    }

    byId.set(poll.id, poll);
    prints.add(print);
    added.push(poll);
  }

  const all = [...byId.values()].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date) || a.id.localeCompare(b.id),
  );

  return { added, duplicates, shadowedByCurated, quarantined, total: all.length };
}

/** Applies a merge to produce the file that gets written back. */
export function applyMerge(existing: Poll[], report: MergeReport): StoredPolls {
  const byId = new Map(existing.map((p) => [p.id, p]));
  for (const p of report.added) byId.set(p.id, p);
  return {
    updatedAt: new Date().toISOString(),
    polls: [...byId.values()].sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date) || a.id.localeCompare(b.id),
    ),
  };
}

/** Pollster fields that name no actual institute. */
const UNKNOWN_POLLSTERS = new Set(["משתנה", "לא ידוע", ""]);

const isKnownPollster = (p: Poll) => !UNKNOWN_POLLSTERS.has(p.pollster);

/** More parties extracted, and a better provenance tier, is a better reading. */
const PROVENANCE_RANK: Record<string, number> = {
  "published-full": 3,
  reconstructed: 2,
  "published-partial": 1,
  scenario: 0,
};

function completeness(p: Poll): number {
  return (
    Object.keys(p.seats).length * 10 +
    (PROVENANCE_RANK[p.provenance] ?? 0) +
    (p.sampleSize ? 1 : 0)
  );
}

/**
 * Collapses multiple readings of the same underlying poll.
 *
 * THE PROBLEM THIS SOLVES. An institute publishes one poll; five websites then
 * report it, and the scraper reads each of them slightly differently — eleven
 * parties from one article, twelve from another, one party misparsed in a
 * third. The content fingerprint treats all of those as distinct polls because
 * it compares the exact seat map, so one night of fieldwork entered the average
 * up to SEVEN times. That inflates whichever outlet happened to be scraped most
 * and, worse, it hands the house-effect estimator two contradictory readings
 * attributed to the same institute on the same date, which is how "מדגם" ended
 * up with a +4.65 point house effect on Yisrael Beiteinu — a number six times
 * larger than any real house effect, and pure artefact.
 *
 * THE IDENTITY RULE. A poll is identified by WHO CONDUCTED IT AND WHEN, not by
 * the numbers someone transcribed from it. That is how every serious aggregator
 * works: an institute publishes one poll per fieldwork date, so (pollster, date)
 * is the poll. Among readings sharing that key, the most complete one wins.
 *
 * AGGREGATORS. A site that republishes other people's polls carries no
 * institute name, so it cannot be keyed this way — and by construction its rows
 * are duplicates of a primary publication. So an unattributed poll is kept only
 * when NO identified poll exists for that date, and then only one per outlet.
 * It is a gap-filler, never a vote.
 */
export function dedupePolls(polls: Poll[]): Poll[] {
  const best = new Map<string, Poll>();
  const datesWithKnownPollster = new Set<string>();

  // Pass 1: identified polls, keyed by institute and date.
  for (const poll of polls) {
    if (!isKnownPollster(poll)) continue;
    datesWithKnownPollster.add(poll.date);
    const key = `known|${poll.pollster}|${poll.date}`;
    const prev = best.get(key);
    if (!prev || completeness(poll) > completeness(prev)) best.set(key, poll);
  }

  // Pass 2: unattributed polls, only where nothing identified covers the date.
  for (const poll of polls) {
    if (isKnownPollster(poll)) continue;
    if (datesWithKnownPollster.has(poll.date)) continue;
    const key = `anon|${poll.outlet}|${poll.date}`;
    const prev = best.get(key);
    if (!prev || completeness(poll) > completeness(prev)) best.set(key, poll);
  }

  return [...best.values()].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

/**
 * The set the model actually runs on: curated polls, plus every stored scraped
 * poll that does not duplicate one.
 *
 * Curated polls are hand-checked, so they win every collision — `dedupePolls`
 * sees them first and `completeness` never displaces them, because a curated
 * entry is always at least as complete as the scrape it was written from.
 */
export function effectivePolls(curated: Poll[], stored: Poll[]): Poll[] {
  const curatedKeys = new Set(
    curated.filter(isKnownPollster).map((p) => `${p.pollster}|${p.date}`),
  );
  const extra = stored.filter((p) => !curatedKeys.has(`${p.pollster}|${p.date}`));
  return dedupePolls([...curated, ...extra]);
}
