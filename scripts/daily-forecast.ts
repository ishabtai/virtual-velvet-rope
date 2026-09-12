/**
 * Daily forecast job.
 *
 *   npm run forecast            # today
 *   npm run forecast -- --date 2026-09-11
 *   npm run forecast -- --backfill 30
 *
 * Writes dated, immutable snapshots to public/data/. The site reads those
 * files rather than recomputing in the browser, which gives three things worth
 * having: the published number never changes after the fact, the page loads
 * without running 20,000 simulations on someone's phone, and yesterday's
 * forecast is still there tomorrow to be checked against.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { buildForecast, toSnapshot, type FullForecast } from "../src/engine/forecast";
import { generateReport, reportToMarkdown } from "../src/engine/report";
import { collectAll, effectivePolls, listPollSources, listSocialSources } from "../src/engine/ingest";
import { BELOW_THRESHOLD, POLLS } from "../src/engine/data/polls";
import { SOCIAL_OBSERVATIONS } from "../src/engine/data/social";
import type { Poll } from "../src/engine/types";

const DATA_DIR = join(process.cwd(), "public", "data");

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function main() {
  mkdirSync(DATA_DIR, { recursive: true });

  const date = arg("--date") ?? isoDay(new Date());
  const backfill = Number(arg("--backfill") ?? 0);

  // --- Ingest ---------------------------------------------------------------
  // Live sources are merged on top of the curated seed set. With no adapters
  // registered this is a no-op and the seed set is used as-is; the job still
  // reports what it tried, so a silently-empty registry is visible in the log
  // rather than looking like a successful fetch.
  const since = isoDay(new Date(Date.parse(date) - 60 * 86400000));
  const collected = await collectAll(since);
  console.log(
    `[ingest] ${listPollSources().length} poll source(s), ${listSocialSources().length} social source(s) registered`,
  );
  if (listPollSources().length === 0) {
    console.log("[ingest] no live poll adapters registered — using the curated seed dataset");
  }
  for (const w of collected.warnings) console.warn(`[ingest] ${w}`);
  if (collected.failedSources.length > 0) {
    console.warn(`[ingest] failed sources: ${collected.failedSources.join(", ")}`);
  }

  // Curated polls, plus everything the scraper has accumulated over the
  // campaign, plus anything this run just fetched. `effectivePolls` drops a
  // stored poll that duplicates a curated one so no night of fieldwork counts
  // twice.
  const storePath = join(process.cwd(), "data", "scraped-polls.json");
  const stored: Poll[] = existsSync(storePath)
    ? (JSON.parse(readFileSync(storePath, "utf8")) as { polls: Poll[] }).polls
    : [];
  const polls: Poll[] = effectivePolls(POLLS, [...stored, ...collected.polls]);
  console.log(`[forecast] ${POLLS.length} curated + ${stored.length} stored = ${polls.length} polls`);
  const social = collected.social.length > 0 ? collected.social : SOCIAL_OBSERVATIONS;

  // --- Build ----------------------------------------------------------------
  const dates: string[] = [];
  for (let i = backfill; i >= 0; i--) {
    dates.push(isoDay(new Date(Date.parse(date) - i * 86400000)));
  }

  const index: { date: string; headline: string }[] = [];
  let previous: FullForecast | undefined;

  for (const d of dates) {
    const forecast = buildForecast({
      asOf: d,
      polls,
      social,
      belowThreshold: BELOW_THRESHOLD,
    });

    // Compare against the day before, whether it was built in this run or on a
    // previous one — so "movement since the last report" survives a restart.
    const prior = previous ?? loadPrevious(d);
    const report = generateReport(forecast, prior);

    writeJson(join(DATA_DIR, `forecast-${d}.json`), toSnapshot(forecast));
    writeJson(join(DATA_DIR, `report-${d}.json`), report);
    writeFileSync(join(DATA_DIR, `report-${d}.md`), reportToMarkdown(report, forecast), "utf8");

    index.push({ date: d, headline: report.headline });
    previous = forecast;
    console.log(`[forecast] ${d}  ${report.headline}`);
  }

  // Latest pointers, so the site has a stable URL to fetch on load.
  const last = dates[dates.length - 1];
  const latest = buildForecast({ asOf: last, polls, social, belowThreshold: BELOW_THRESHOLD });
  writeJson(join(DATA_DIR, "latest.json"), toSnapshot(latest));
  writeJson(join(DATA_DIR, "latest-report.json"), generateReport(latest, loadPrevious(last)));

  // Merge into the archive index rather than overwriting it.
  const indexPath = join(DATA_DIR, "index.json");
  const existing: { date: string; headline: string }[] = existsSync(indexPath)
    ? JSON.parse(readFileSync(indexPath, "utf8"))
    : [];
  const merged = new Map(existing.map((e) => [e.date, e]));
  for (const e of index) merged.set(e.date, e);
  writeJson(
    indexPath,
    [...merged.values()].sort((a, b) => b.date.localeCompare(a.date)),
  );

  // The raw inputs, published alongside the output. A forecast whose inputs are
  // not downloadable cannot be checked by anyone else.
  writeJson(join(DATA_DIR, "polls.json"), polls);

  // A compact trend series, so the site can draw the history in one request
  // instead of fetching every dated snapshot.
  writeJson(join(DATA_DIR, "trend.json"), buildTrend(merged));

  console.log(`[done] wrote ${dates.length} snapshot(s) to public/data`);
}

/**
 * Collapses every snapshot on disk into one series: seats per party per day,
 * plus the bloc totals. Reads the files rather than the in-memory run so a
 * backfill and an incremental run produce the same series.
 */
function buildTrend(index: Map<string, { date: string; headline: string }>) {
  const points: {
    date: string;
    seats: Record<string, number>;
    blocs: Record<string, number>;
  }[] = [];
  for (const { date } of [...index.values()].sort((a, b) => a.date.localeCompare(b.date))) {
    const path = join(DATA_DIR, `forecast-${date}.json`);
    if (!existsSync(path)) continue;
    const snap = JSON.parse(readFileSync(path, "utf8")) as {
      parties: { partyId: string; meanSeats: number }[];
      blocs: { bloc: string; meanSeats: number }[];
    };
    points.push({
      date,
      seats: Object.fromEntries(
        snap.parties.map((p) => [p.partyId, Number(p.meanSeats.toFixed(2))]),
      ),
      blocs: Object.fromEntries(
        snap.blocs.map((b) => [b.bloc, Number(b.meanSeats.toFixed(2))]),
      ),
    });
  }
  return points;
}

function loadPrevious(date: string): FullForecast | undefined {
  const prevDate = isoDay(new Date(Date.parse(date) - 86400000));
  const path = join(DATA_DIR, `forecast-${prevDate}.json`);
  if (!existsSync(path)) return undefined;
  try {
    return JSON.parse(readFileSync(path, "utf8")) as FullForecast;
  } catch {
    return undefined;
  }
}

function writeJson(path: string, value: unknown): void {
  writeFileSync(path, JSON.stringify(value, null, 2), "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
