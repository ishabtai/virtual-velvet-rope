/**
 * Re-validate the committed store.
 *
 *   npm run revalidate              # purge anything that fails validatePoll
 *   npm run revalidate -- --dry-run # report only
 *
 * WHY THIS EXISTS. validatePoll ran only at intake, so a row that entered the
 * store before a guard was written stayed in the store — and in the published
 * forecast — forever. Two such rows moved the October 2026 forecast by six
 * seats at the bloc level: a bloc total parsed as a party (amcha: 52) and a
 * swing calculator's starting position scraped as a fresh poll 34 days running.
 * Both are caught by the current validator. Neither was caught by it, because
 * nothing ever asked it again.
 *
 * So the guards are retroactive now: every tightening of validatePoll cleans
 * the archive the next time this runs, and the daily job runs it.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { validatePoll } from "../src/engine/ingest/types";
import type { QuarantineFile, StoredPolls } from "../src/engine/ingest/store";

const DATA_DIR = join(process.cwd(), "data");
const STORE = join(DATA_DIR, "scraped-polls.json");
const QUARANTINE = join(DATA_DIR, "quarantine.json");

const dryRun = process.argv.includes("--dry-run");

function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

const store = readJson<StoredPolls>(STORE, { updatedAt: "", polls: [] });
const quarantine = readJson<QuarantineFile>(QUARANTINE, { updatedAt: "", entries: [] });

const kept: typeof store.polls = [];
const rejected: QuarantineFile["entries"] = [];

for (const poll of store.polls) {
  const reasons = validatePoll(poll);
  if (reasons.length === 0) kept.push(poll);
  else rejected.push({ poll, reasons, at: new Date().toISOString() });
}

console.log(`[revalidate] ${kept.length} kept · ${rejected.length} purged`);
for (const r of rejected) console.log(`  ! ${r.poll.id}: ${r.reasons.join("; ")}`);

if (rejected.length === 0) {
  console.log("[revalidate] store is clean");
  process.exit(0);
}

if (dryRun) {
  console.log("[revalidate] dry run — nothing written");
  process.exit(0);
}

writeFileSync(
  STORE,
  JSON.stringify({ updatedAt: new Date().toISOString(), polls: kept }, null, 2),
  "utf8",
);
// Same 200-entry bound as the scrape job: enough to debug, never unbounded.
const seen = new Set(rejected.map((r) => r.poll.id));
const entries = [...rejected, ...quarantine.entries.filter((e) => !seen.has(e.poll.id))].slice(0, 200);
writeFileSync(
  QUARANTINE,
  JSON.stringify({ updatedAt: new Date().toISOString(), entries }, null, 2),
  "utf8",
);
