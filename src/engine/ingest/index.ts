import type { Poll, SocialObservation } from "../types";
import { validatePoll, type IngestResult, type PollSource, type SocialSource } from "./types";
import { wikipediaSource } from "./sources/wikipedia";
import { NEWS_OUTLETS, hebrewNewsSource } from "./sources/hebrewNews";

export * from "./types";
export * from "./store";
export { NEWS_OUTLETS } from "./sources/hebrewNews";

/**
 * Registry of live sources.
 *
 * Order is precedence: on a duplicate poll id, the first source registered
 * wins. Wikipedia leads because it is the only structured source — it publishes
 * pollster, sample size and fieldwork dates, which the news adapters have to
 * infer or do without.
 */
const pollSources: PollSource[] = [
  wikipediaSource(),
  ...NEWS_OUTLETS.map(hebrewNewsSource),
];
const socialSources: SocialSource[] = [];

export function registerPollSource(s: PollSource): void {
  pollSources.push(s);
}
export function registerSocialSource(s: SocialSource): void {
  socialSources.push(s);
}
export function listPollSources(): PollSource[] {
  return [...pollSources];
}
export function listSocialSources(): SocialSource[] {
  return [...socialSources];
}

export interface CollectionReport {
  polls: Poll[];
  social: SocialObservation[];
  warnings: string[];
  /** Sources that threw or returned nothing, so the job can report partial success. */
  failedSources: string[];
}

/**
 * Runs every registered source and merges the results.
 *
 * One failing source must never take down the daily forecast: a scraper breaks
 * when a newspaper changes its markup, which is a Tuesday, not an emergency.
 * Failures are collected and reported, and the forecast runs on what arrived.
 *
 * Deduplication is by poll id. When two sources report the same poll, the first
 * one registered wins, so registration order is the precedence order.
 */
export async function collectAll(sinceIso: string): Promise<CollectionReport> {
  const warnings: string[] = [];
  const failedSources: string[] = [];
  const byId = new Map<string, Poll>();

  for (const src of pollSources) {
    let res: IngestResult<Poll> | null = null;
    try {
      res = await src.fetch();
    } catch (err) {
      failedSources.push(src.id);
      warnings.push(`${src.id}: fetch failed — ${(err as Error).message}`);
      continue;
    }
    warnings.push(...res.warnings.map((w) => `${src.id}: ${w}`));
    for (const poll of res.items) {
      const problems = validatePoll(poll);
      if (problems.length > 0) {
        warnings.push(`${src.id}: rejected ${poll.id} — ${problems.join("; ")}`);
        continue;
      }
      if (!byId.has(poll.id)) byId.set(poll.id, poll);
    }
  }

  const social: SocialObservation[] = [];
  for (const src of socialSources) {
    try {
      const res = await src.fetch(sinceIso);
      warnings.push(...res.warnings.map((w) => `${src.id}: ${w}`));
      social.push(...res.items);
    } catch (err) {
      failedSources.push(src.id);
      warnings.push(`${src.id}: fetch failed — ${(err as Error).message}`);
    }
  }

  return {
    polls: [...byId.values()].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    social,
    warnings,
    failedSources,
  };
}
