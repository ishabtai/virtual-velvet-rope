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

/**
 * The set the model actually runs on: curated polls, plus every stored scraped
 * poll that does not collide with one.
 */
export function effectivePolls(curated: Poll[], stored: Poll[]): Poll[] {
  const ids = new Set(curated.map((p) => p.id));
  const prints = new Set(curated.map(fingerprint));
  const extra = stored.filter((p) => !ids.has(p.id) && !prints.has(fingerprint(p)));
  return [...curated, ...extra].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
