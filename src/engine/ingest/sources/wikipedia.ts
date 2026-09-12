import type { Poll } from "../../types";
import { fetchJson } from "../http";
import { findPartyMentions, normalizeHebrew } from "../hebrew";
import type { IngestResult, PollSource } from "../types";

/**
 * Wikipedia's opinion-polling table.
 *
 * This is the highest-value source in the project by a wide margin, and it is
 * worth being explicit about why: it is the only one that is already a TABLE.
 * Every other source is prose, where a scraper has to infer which number
 * belongs to which party. Here the columns are the parties and the rows are the
 * polls, maintained and corrected by editors who care about exactly the thing
 * we care about. It also carries what news articles usually omit — pollster,
 * sample size, and fieldwork dates rather than publication dates.
 *
 * Read through the MediaWiki API rather than by scraping the rendered page:
 * it is a published, versioned interface intended for this, it is far more
 * stable than the HTML, and it costs Wikimedia less to serve.
 */

interface WikiConfig {
  id: string;
  name: string;
  api: string;
  page: string;
  wikiBase: string;
}

const EN: WikiConfig = {
  id: "wikipedia",
  name: "Wikipedia — Opinion polling for the 2026 Israeli legislative election",
  api: "https://en.wikipedia.org/w/api.php",
  page: "Opinion polling for the 2026 Israeli legislative election",
  wikiBase: "https://en.wikipedia.org/wiki/",
};

/**
 * The Hebrew article. Worth running alongside the English one for two reasons:
 * it is often updated faster for Israeli polls, and its column headers carry
 * the parties' actual Hebrew names rather than a transliteration, which the
 * Hebrew matcher reads directly. The same poll appearing on both pages is
 * collapsed by the store's content fingerprint, not by URL, so it counts once.
 */
const HE: WikiConfig = {
  id: "wikipedia-he",
  name: "ויקיפדיה העברית — הבחירות לכנסת העשרים ושש",
  api: "https://he.wikipedia.org/w/api.php",
  page: "הבחירות לכנסת העשרים ושש",
  wikiBase: "https://he.wikipedia.org/wiki/",
};

interface ParseResponse {
  parse?: { text?: { "*": string } };
  error?: { info?: string };
}

export function hebrewWikipediaSource(): PollSource {
  return wikipediaSource(HE);
}

export function wikipediaSource(cfg: WikiConfig = EN): PollSource {
  return {
    id: cfg.id,
    name: cfg.name,
    url: cfg.wikiBase + encodeURIComponent(cfg.page.replace(/ /g, "_")),

    async fetch(): Promise<IngestResult<Poll>> {
      const warnings: string[] = [];
      const items: Poll[] = [];
      const fetchedAt = new Date().toISOString();

      const url =
        `${cfg.api}?action=parse&page=${encodeURIComponent(cfg.page)}` +
        `&prop=text&format=json&formatversion=2&origin=*`;

      const res = await fetchJson<ParseResponse>(url);
      if (res.error || !res.parse?.text) {
        throw new Error(res.error?.info ?? "no page content returned");
      }

      const html = typeof res.parse.text === "string" ? res.parse.text : res.parse.text["*"];
      const tables = extractTables(html);
      if (tables.length === 0) warnings.push("no wikitable found — page layout may have changed");

      warnings.push(`found ${tables.length} wikitable(s)`);
      tables.forEach((table, i) => {
        items.push(...parseTable(table, warnings, `table ${i + 1}`, cfg));
      });

      return { items, source: cfg.id, fetchedAt, warnings };
    },
  };
}

/** Pulls each <table class="wikitable"> out of the rendered HTML. */
function extractTables(html: string): string[] {
  const out: string[] = [];
  const re = /<table[^>]*class="[^"]*wikitable[^"]*"[\s\S]*?<\/table>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) out.push(m[0]);
  return out;
}

/**
 * Header cells often carry the party name in a `title` or `abbr` attribute
 * rather than in the visible text — Wikipedia abbreviates narrow columns. This
 * keeps both, so "UTJ" and "United Torah Judaism" are both available to match.
 */
function headerTextOf(cellHtml: string): string {
  const attrs = [...cellHtml.matchAll(/(?:title|alt|data-sort-value)="([^"]+)"/gi)].map((m) => m[1]);
  return [stripHtml(cellHtml), ...attrs].join(" ");
}

function rowsOf(table: string): string[][] {
  const rows: string[][] = [];
  const rowRe = /<tr[\s\S]*?<\/tr>/gi;
  let r: RegExpExecArray | null;
  while ((r = rowRe.exec(table)) !== null) {
    const cells: string[] = [];
    const cellRe = /<(t[hd])[^>]*>([\s\S]*?)<\/\1>/gi;
    let c: RegExpExecArray | null;
    while ((c = cellRe.exec(r[0])) !== null) cells.push(stripHtml(c[2]));
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}

function stripHtml(s: string): string {
  return s
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<sup[\s\S]*?<\/sup>/gi, "") // footnote markers
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Maps a header row onto party ids.
 *
 * Wikipedia's headers carry the English or Hebrew party name, sometimes with an
 * abbreviation. A column we cannot confidently map is left unmapped rather than
 * guessed — an unmapped column costs us one party, a mis-mapped one corrupts
 * the whole poll.
 */
function mapHeader(header: string[]): (string | null)[] {
  const ENGLISH: Record<string, string> = {
    likud: "likud",
    yashar: "yashar",
    yisraelbeiteinu: "yisrael-beiteinu",
    yisraelbeytenu: "yisrael-beiteinu",
    shas: "shas",
    utj: "utj",
    unitedtorahjudaism: "utj",
    otzmayehudit: "otzma",
    otzma: "otzma",
    religiouszionism: "religious-zionism",
    thedemocrats: "democrats",
    democrats: "democrats",
    byachad: "byachad",
    together: "byachad",
    raam: "raam",
    ual: "raam",
    hadashtaal: "joint-list",
    jointlist: "joint-list",
    amchaisrael: "amcha",
    amcha: "amcha",
  };

  return header.map((cell) => {
    const key = cell.toLowerCase().replace(/[^a-z]/g, "");
    if (ENGLISH[key]) return ENGLISH[key];
    const heb = findPartyMentions(normalizeHebrew(cell));
    if (heb.length === 1) return heb[0].partyId;
    return null;
  });
}

function parseTable(table: string, warnings: string[], label: string, cfg: WikiConfig): Poll[] {
  const rows = rowsOf(table);
  const headerRows = headerRowsOf(table);
  if (rows.length < 2) return [];

  // Wikipedia polling tables routinely use TWO header rows (a grouping row over
  // a party row), and sometimes carry the party name only in a title attribute.
  // Trying every header row and keeping the best mapping is what turns "one
  // poll parsed" into the whole table: the first live run mapped the grouping
  // row, found almost nothing, and silently returned a single row.
  let columns: (string | null)[] = [];
  let headerIndex = -1;
  for (let i = 0; i < Math.min(headerRows.length, 4); i++) {
    const candidate = mapHeader(headerRows[i]);
    if (candidate.filter(Boolean).length > columns.filter(Boolean).length) {
      columns = candidate;
      headerIndex = i;
    }
  }

  const mapped = columns.filter(Boolean).length;
  if (mapped < 5) {
    warnings.push(
      `${label}: only ${mapped} party column(s) mapped from ${headerRows.length} header row(s) ` +
        `— header sample: ${(headerRows[0] ?? []).slice(0, 8).join(" | ").slice(0, 160)}`,
    );
    return [];
  }
  warnings.push(
    `${label}: mapped ${mapped} party columns from header row ${headerIndex + 1}; ${rows.length - 1} data row(s) to read`,
  );

  const polls: Poll[] = [];
  let skippedNoDate = 0;
  let skippedFewSeats = 0;

  for (const row of rows.slice(1)) {
    if (row.length < columns.length - 2) continue;

    const seats: Record<string, number> = {};
    for (let i = 0; i < columns.length && i < row.length; i++) {
      const partyId = columns[i];
      if (!partyId) continue;
      const n = Number(row[i].replace(/[^\d.]/g, ""));
      if (!Number.isFinite(n) || n <= 0) continue;
      // Same impossibility rule as everywhere else: no delegation of 1-3.
      if (n < 4 || n > 120) continue;
      seats[partyId] = Math.round(n);
    }

    const total = Object.values(seats).reduce((a, b) => a + b, 0);
    if (Object.keys(seats).length < 5 || total > 120) {
      skippedFewSeats++;
      continue;
    }

    // The leading cells carry dates, pollster and sample size in some order.
    const lead = row.slice(0, 4).join(" | ");
    const date = isoDateFrom(lead);
    if (!date) {
      skippedNoDate++;
      if (skippedNoDate <= 3) {
        warnings.push(`${label}: no parsable date in "${lead.slice(0, 70)}"`);
      }
      continue;
    }

    const sampleSize = sampleSizeFrom(lead);
    const pollster = pollsterFrom(row);

    polls.push({
      id: `${cfg.id}-${date}-${slug(pollster)}`,
      date,
      pollster,
      outlet: outletFrom(row) || "ויקיפדיה",
      sampleSize,
      mode: "unknown",
      seats,
      provenance: total === 120 ? "published-full" : "published-partial",
      source: cfg.wikiBase + encodeURIComponent(cfg.page.replace(/ /g, "_")),
      partial: total !== 120,
      notes: `נקלט אוטומטית מטבלת הסקרים בוויקיפדיה (${total} מנדטים).`,
    });
  }

  warnings.push(
    `${label}: ${polls.length} poll(s) parsed, ${skippedNoDate} skipped for date, ` +
      `${skippedFewSeats} skipped for seat count`,
  );
  return polls;
}

/** Rows that are all <th> — the header rows, of which there may be several. */
function headerRowsOf(table: string): string[][] {
  const out: string[][] = [];
  const rowRe = /<tr[\s\S]*?<\/tr>/gi;
  let r: RegExpExecArray | null;
  while ((r = rowRe.exec(table)) !== null) {
    const cells = [...r[0].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((m) => headerTextOf(m[1]));
    const dataCells = (r[0].match(/<td[^>]*>/gi) ?? []).length;
    // A header row is one with several <th> and no <td>.
    if (cells.length >= 3 && dataCells === 0) out.push(cells);
    if (out.length >= 4) break;
  }
  return out;
}

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

/** Wikipedia writes fieldwork as "5-7 Sep 2026"; we want the END of fieldwork. */
function isoDateFrom(text: string): string | null {
  const m = text.match(/(\d{1,2})(?:\s*[-–—]\s*(\d{1,2}))?\s+([A-Za-z]{3})[a-z]*\s+(\d{4})/);
  if (m) {
    const day = m[2] ?? m[1]; // end of the fieldwork window
    const mon = MONTHS[m[3].toLowerCase()];
    if (mon) return `${m[4]}-${String(mon).padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  // "September 5, 2026"
  const monthFirst = text.match(/([A-Za-z]{3})[a-z]*\s+(\d{1,2})(?:\s*[-–—]\s*(\d{1,2}))?,?\s+(\d{4})/);
  if (monthFirst) {
    const mon = MONTHS[monthFirst[1].toLowerCase()];
    const day = monthFirst[3] ?? monthFirst[2];
    if (mon) return `${monthFirst[4]}-${String(mon).padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  const iso = text.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return iso[0];
  // "5/9/2026" — day first, which is the convention on the Hebrew page.
  const dmy = text.match(/(\d{1,2})[./](\d{1,2})[./](\d{4})/);
  if (dmy) {
    return `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`;
  }
  return null;
}

function sampleSizeFrom(text: string): number | null {
  const m = text.match(/\b(\d{3,5})\b(?!\s*(?:-|–|\/))/g);
  if (!m) return null;
  for (const raw of m) {
    const n = Number(raw);
    if (n < 300 || n > 20000) continue;
    // Every four-digit number in a plausible year range is rejected outright.
    // The first live run read a poll's date column as its sample size and
    // recorded "2024 respondents". A real sample of exactly 2024 people does
    // exist in principle, and losing it is a far cheaper mistake than weighting
    // a poll by its own year.
    if (n >= 1990 && n <= 2100) continue;
    return n;
  }
  return null;
}

function pollsterFrom(row: string[]): string {
  const KNOWN = ["מדגם", "כאן מחקרים", "קמיל פוקס", "לאזר", "פאנלס פוליטיקס", "דיירקט פולס"];
  const ENGLISH: Record<string, string> = {
    midgam: "מדגם", kan: "כאן מחקרים", "camil fuchs": "קמיל פוקס",
    lazar: "לאזר", panels: "פאנלס פוליטיקס", "direct polls": "דיירקט פולס",
  };
  for (const cell of row.slice(0, 4)) {
    for (const k of KNOWN) if (cell.includes(k)) return k;
    const low = cell.toLowerCase();
    for (const [en, he] of Object.entries(ENGLISH)) if (low.includes(en)) return he;
  }
  return "לא ידוע";
}

function outletFrom(row: string[]): string {
  const OUTLETS: Record<string, string> = {
    "channel 12": "חדשות 12", "channel 13": "חדשות 13", "kan": "כאן 11",
    "i24": "i24NEWS", "maariv": "מעריב", "walla": "וואלה",
  };
  for (const cell of row.slice(0, 4)) {
    const low = cell.toLowerCase();
    for (const [en, he] of Object.entries(OUTLETS)) if (low.includes(en)) return he;
  }
  return "";
}

function slug(s: string): string {
  return s.replace(/\s+/g, "-").slice(0, 24);
}
