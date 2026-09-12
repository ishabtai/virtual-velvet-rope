/**
 * Daily scrape.
 *
 *   npm run scrape              # fetch every registered source, merge, report
 *   npm run scrape -- --dry-run # fetch and report, write nothing
 *
 * Writes the accumulating store to data/scraped-polls.json and anything that
 * failed validation to data/quarantine.json. Both are committed, so the poll
 * archive grows over the campaign and every rejection stays inspectable.
 *
 * EXIT CODES MATTER HERE. The job exits 0 when at least one source produced
 * something, even if others failed — a newspaper changing its markup must not
 * stop the forecast from running on the sources that still work. It exits 1
 * only when EVERY source failed, which is the signal that something systemic
 * broke and a human should look.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { collectAll, listPollSources } from "../src/engine/ingest";
import { applyMerge, mergePolls, type QuarantineFile, type StoredPolls } from "../src/engine/ingest/store";
import { POLLS } from "../src/engine/data/polls";
import type { Poll } from "../src/engine/types";

const DATA_DIR = join(process.cwd(), "data");
const STORE = join(DATA_DIR, "scraped-polls.json");
const QUARANTINE = join(DATA_DIR, "quarantine.json");

const dryRun = process.argv.includes("--dry-run");

function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch (err) {
    console.warn(`[store] ${path} is unreadable (${(err as Error).message}) — starting fresh`);
    return fallback;
  }
}

async function main() {
  mkdirSync(DATA_DIR, { recursive: true });

  const sources = listPollSources();
  console.log(`[scrape] ${sources.length} source(s): ${sources.map((s) => s.id).join(", ")}`);

  const since = new Date(Date.now() - 60 * 86400000).toISOString().slice(0, 10);
  const collected = await collectAll(since);

  for (const w of collected.warnings) console.warn(`[warn] ${w}`);

  const ok = sources.length - collected.failedSources.length;
  console.log(
    `[scrape] ${ok}/${sources.length} source(s) responded, ${collected.polls.length} poll(s) parsed`,
  );

  const store = readJson<StoredPolls>(STORE, { updatedAt: "", polls: [] });
  const quarantine = readJson<QuarantineFile>(QUARANTINE, { updatedAt: "", entries: [] });

  const report = mergePolls(store.polls, collected.polls, POLLS as Poll[]);

  console.log(
    `[merge] +${report.added.length} new · ${report.duplicates} duplicate · ` +
      `${report.shadowedByCurated} already curated · ${report.quarantined.length} quarantined · ` +
      `${report.total} in store`,
  );
  for (const p of report.added) {
    console.log(`  + ${p.date}  ${p.outlet.padEnd(10)} ${Object.keys(p.seats).length} parties  ${p.source}`);
  }
  for (const q of report.quarantined) {
    console.log(`  ! ${q.poll.id}: ${q.reasons.join("; ")}`);
  }

  if (dryRun) {
    console.log("[scrape] dry run — nothing written");
    return;
  }

  writeFileSync(STORE, JSON.stringify(applyMerge(store.polls, report), null, 2), "utf8");

  if (report.quarantined.length > 0) {
    // Keep the most recent 200 rejects: enough to debug a broken parser,
    // bounded so the file cannot grow without limit.
    const entries = [...report.quarantined, ...quarantine.entries].slice(0, 200);
    writeFileSync(
      QUARANTINE,
      JSON.stringify({ updatedAt: new Date().toISOString(), entries }, null, 2),
      "utf8",
    );
  }

  // Every source failing is a systemic problem worth failing the job over.
  // One or two failing is a Tuesday.
  if (ok === 0) {
    console.error("[scrape] every source failed");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
