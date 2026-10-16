import type { Poll } from "../../types";
import { fetchText } from "../http";
import { findPartyMentions, normalizeHebrew } from "../hebrew";
import type { IngestResult, PollSource } from "../types";

/**
 * Kan's poll lobby — https://www.kan.org.il/lobby/skarim/
 *
 * The single highest-value source available for this election. It carries 241
 * polls from nine outlets going back to November 2025, where this project's
 * whole archive collapses to about eighteen effective polls. It is also the
 * closest thing to an independent check on the model: as of 2026-10-16 its
 * bloc map reads 53 / 50 / 13 against this model's 54.2 / 53.5 / 12.4, and the
 * mean absolute gap across thirteen parties is 0.73 seats. The contaminated
 * forecast this replaced read 61.1 / 48.1 — thirteen seats out.
 *
 * WHAT THIS ADAPTER TAKES, AND WHAT IT REFUSES TO TAKE. The page publishes two
 * different kinds of number and only one of them belongs here. It lists the
 * individual polls — pollster, outlet, date, seats — and that is the input this
 * wants. It ALSO publishes its own filtered average and its own bloc map, and
 * those are a competing model's output. Ingesting them would be averaging an
 * average, which double-counts every underlying poll and launders someone
 * else's modelling choices into ours as if they were evidence. So this adapter
 * takes rows that look like single polls and nothing else, and a row without a
 * named institute is left for the store's aggregator rule to handle.
 *
 * WHY IT IS WRITTEN BLIND. Every Israeli domain is blocked by policy in the
 * environment this was written in, so the page's markup could not be read, let
 * alone a selector tested against it. Guessing at a CSS path would produce a
 * scraper that fails silently the first time it runs and reports nothing.
 *
 * So it does not guess. It finds every JSON payload embedded in the page —
 * Next.js hydration data, a bare application/json script, an assigned window
 * global — and walks all of them looking for objects that are shaped like a
 * poll: something date-like, and a set of labels the Hebrew party matcher
 * recognises carrying plausible seat counts that sum near 120. That test is
 * about the data, not about the markup, so it survives a redesign.
 *
 * If the page turns out to render server-side with no JSON at all, this
 * reports exactly what it did find — how many scripts, how big, which keys —
 * and takes nothing. A first run that says "I saw these three shapes and none
 * of them were polls" is worth more than one that silently returns zero.
 */

const LOBBY_URL = "https://www.kan.org.il/lobby/skarim/";

/** A seat count has to be in range, and a party list has to be a party list. */
const MIN_PARTIES = 8;
const MAX_SEATS_PER_PARTY = 45;
const MIN_TOTAL_SEATS = 100;
const MAX_TOTAL_SEATS = 120;

/** Keys that tend to carry the things a poll needs, across naming styles. */
const DATE_KEYS = /^(date|publishdate|publishedat|pollingdate|fieldwork|createdat|updatedat|day|תאריך)$/i;
const POLLSTER_KEYS = /^(pollster|institute|company|surveyor|researchinstitute|מכון|סוקר)$/i;
const OUTLET_KEYS = /^(outlet|channel|source|publisher|media|כלי|ערוץ)$/i;
const SAMPLE_KEYS = /^(samplesize|sample|n|respondents|מדגם)$/i;
const SEAT_KEYS = /^(seats|mandates|results|parties|values|data|מנדטים|מפלגות)$/i;
const LABEL_KEYS = /^(name|party|partyname|label|title|שם|מפלגה)$/i;
const VALUE_KEYS = /^(seats|mandates|value|count|amount|מנדטים|ערך)$/i;

type Json = unknown;

export function kanLobbySource(): PollSource {
  return {
    id: "kan-lobby",
    name: "כאן 11 — לובי הסקרים",
    url: LOBBY_URL,

    async fetch(): Promise<IngestResult<Poll>> {
      return parseLobby(await fetchText(LOBBY_URL));
    },
  };
}

/**
 * The whole adapter minus the network, so it can be tested.
 *
 * Separating these is not ceremony here. The page cannot be fetched from the
 * environment this was written in, so the parse is the only half that can be
 * exercised at all before it runs live.
 */
export function parseLobby(html: string): IngestResult<Poll> {
  const warnings: string[] = [];
  const fetchedAt = new Date().toISOString();

  const blobs = extractJsonBlobs(html);
  if (blobs.length === 0) {
    warnings.push(
      `no embedded JSON found in ${html.length} bytes of HTML — the page may render ` +
        `server-side or load its data from an API. Script tags seen: ${countScripts(html)}`,
    );
    return { items: [], source: "kan-lobby", fetchedAt, warnings };
  }

  const candidates: PollShape[] = [];
  for (const blob of blobs) {
    walk(blob, (node) => {
      const shape = asPollShape(node);
      if (shape) candidates.push(shape);
    });
  }

  if (candidates.length === 0) {
    warnings.push(
      `found ${blobs.length} JSON payload(s) but no poll-shaped object in them. ` +
        `Top-level keys seen: ${describeKeys(blobs)}`,
    );
    return { items: [], source: "kan-lobby", fetchedAt, warnings };
  }

  const items: Poll[] = [];
  const seen = new Set<string>();
  let unattributed = 0;

  for (const c of candidates) {
    if (!c.pollster) {
      // Almost certainly the page's own average rather than a poll. The store
      // has a rule for unattributed rows; this does not pretend otherwise.
      unattributed++;
      continue;
    }
    const id = `kan-lobby-${c.date}-${slug(c.pollster)}`;
    if (seen.has(id)) continue;
    seen.add(id);
    items.push({
      id,
      date: c.date,
      pollster: c.pollster,
      outlet: c.outlet ?? "כאן 11",
      sampleSize: c.sampleSize,
      mode: "unknown",
      seats: c.seats,
      provenance: "published-full",
      source: LOBBY_URL,
      notes: `נקלט אוטומטית מלובי הסקרים של כאן (${sum(c.seats)} מנדטים).`,
    });
  }

  if (unattributed > 0) {
    warnings.push(
      `skipped ${unattributed} poll-shaped row(s) with no named institute — ` +
        `on this page those are most likely the site's own filtered average, not polls`,
    );
  }
  warnings.push(`read ${items.length} poll(s) from ${candidates.length} candidate row(s)`);

  return { items, source: "kan-lobby", fetchedAt, warnings };
}

interface PollShape {
  date: string;
  pollster: string | null;
  outlet: string | null;
  sampleSize: number | null;
  seats: Record<string, number>;
}

/**
 * Decides whether an arbitrary object is a poll.
 *
 * Deliberately strict in both directions. Too loose and the page's own average
 * or a chart's axis data enters the model as evidence; too strict and a
 * redesign silently empties the source. The test is: a date we can parse, at
 * least eight labels the Hebrew matcher maps to distinct parties, every count
 * inside the plausible range, and a total near a full Knesset.
 */
function asPollShape(node: Json): PollShape | null {
  if (!isRecord(node)) return null;

  const date = findDate(node);
  if (!date) return null;

  const seats = findSeats(node);
  if (!seats) return null;

  return {
    date,
    pollster: findString(node, POLLSTER_KEYS),
    outlet: findString(node, OUTLET_KEYS),
    sampleSize: findSample(node),
    seats,
  };
}

function findSeats(node: Record<string, Json>): Record<string, number> | null {
  // Either the party map is a nested field, or the object IS the party map.
  for (const [key, value] of Object.entries(node)) {
    if (!SEAT_KEYS.test(key)) continue;
    const got = readPartyMap(value);
    if (got) return got;
  }
  return readPartyMap(node);
}

/** Reads {label: seats} or [{name, seats}] into party ids, or returns null. */
function readPartyMap(value: Json): Record<string, number> | null {
  const pairs: [string, number][] = [];

  if (Array.isArray(value)) {
    for (const row of value) {
      if (!isRecord(row)) return null;
      const label = findString(row, LABEL_KEYS);
      const n = findNumber(row, VALUE_KEYS);
      if (label === null || n === null) continue;
      pairs.push([label, n]);
    }
  } else if (isRecord(value)) {
    for (const [label, n] of Object.entries(value)) {
      if (typeof n !== "number") continue;
      pairs.push([label, n]);
    }
  } else {
    return null;
  }

  const seats: Record<string, number> = {};
  for (const [label, n] of pairs) {
    const id = partyIdOf(label);
    // A label the matcher does not know is metadata sitting in the same object
    // — an id, a total, a timestamp. Skipping it is right.
    if (!id) continue;
    // A label it DOES know, carrying an impossible number, is a different
    // thing: the extraction has gone wrong, and the other numbers in the row
    // cannot be trusted either. That is how a bloc subtotal read as a party
    // reached the model with the row's remaining twelve parties intact. Reject
    // the row, not the party.
    if (!Number.isFinite(n) || n < 0 || n > MAX_SEATS_PER_PARTY) return null;
    if (seats[id] !== undefined) continue;
    seats[id] = Math.round(n);
  }

  if (Object.keys(seats).length < MIN_PARTIES) return null;
  const total = sum(seats);
  if (total < MIN_TOTAL_SEATS || total > MAX_TOTAL_SEATS) return null;
  return seats;
}

/** Maps a Hebrew label to a party id using the matcher the rest of the pipeline uses. */
function partyIdOf(label: string): string | null {
  const mentions = findPartyMentions(normalizeHebrew(label));
  if (mentions.length !== 1) return null;
  return mentions[0].partyId;
}

function findDate(node: Record<string, Json>): string | null {
  for (const [key, value] of Object.entries(node)) {
    if (!DATE_KEYS.test(key)) continue;
    if (typeof value !== "string" && typeof value !== "number") continue;
    const parsed = Date.parse(String(value));
    if (Number.isNaN(parsed)) continue;
    const iso = new Date(parsed).toISOString().slice(0, 10);
    // A poll from before the campaign or from the future is a parse error.
    if (iso < "2025-01-01" || parsed > Date.now() + 86400000) continue;
    return iso;
  }
  return null;
}

function findString(node: Record<string, Json>, keys: RegExp): string | null {
  for (const [key, value] of Object.entries(node)) {
    if (keys.test(key) && typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function findNumber(node: Record<string, Json>, keys: RegExp): number | null {
  for (const [key, value] of Object.entries(node)) {
    if (!keys.test(key)) continue;
    if (typeof value === "number") return value;
    if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value.trim())) return Number(value);
  }
  return null;
}

function findSample(node: Record<string, Json>): number | null {
  const n = findNumber(node, SAMPLE_KEYS);
  // Guard against a year read out of a date column, the way one already was.
  if (n === null || n < 200 || n > 20000 || (n >= 1990 && n <= 2100)) return null;
  return Math.round(n);
}

/**
 * Pulls every JSON payload out of a page.
 *
 * Covers the three shapes a modern site ships data in — a typed JSON script
 * (Next.js `__NEXT_DATA__` and friends), a bare `application/json` script, and
 * a global assigned in an inline script. Anything that does not parse is
 * skipped rather than reported: a page has many inline scripts and almost none
 * of them are data.
 */
export function extractJsonBlobs(html: string): Json[] {
  const out: Json[] = [];

  const typed = /<script[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const m of html.matchAll(typed)) push(out, m[1]);

  const assigned = /(?:window|self|globalThis)\.[A-Za-z_$][\w$]*\s*=\s*(\{[\s\S]*?\})\s*;?\s*<\/script>/gi;
  for (const m of html.matchAll(assigned)) push(out, m[1]);

  const nextData = /<script[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i.exec(html);
  if (nextData) push(out, nextData[1]);

  return out;
}

function push(out: Json[], raw: string): void {
  const text = raw.trim();
  if (!text.startsWith("{") && !text.startsWith("[")) return;
  try {
    out.push(JSON.parse(text));
  } catch {
    // Not data. Pages are full of inline scripts that are not.
  }
}

/** Depth-limited walk: a hydration payload nests deeply and can self-reference. */
function walk(node: Json, visit: (n: Json) => void, depth = 0): void {
  if (depth > 12 || node === null || typeof node !== "object") return;
  visit(node);
  for (const value of Object.values(node as Record<string, Json>)) {
    walk(value, visit, depth + 1);
  }
}

function describeKeys(blobs: Json[]): string {
  return blobs
    .map((b) => (isRecord(b) ? Object.keys(b).slice(0, 8).join("/") : Array.isArray(b) ? `array[${b.length}]` : typeof b))
    .join(" | ")
    .slice(0, 400);
}

const countScripts = (html: string) => (html.match(/<script/gi) ?? []).length;
const sum = (m: Record<string, number>) => Object.values(m).reduce((a, b) => a + b, 0);
const isRecord = (v: Json): v is Record<string, Json> =>
  typeof v === "object" && v !== null && !Array.isArray(v);
const slug = (s: string) =>
  normalizeHebrew(s).replace(/\s+/g, "-").slice(0, 24) || "unknown";
