import type { Poll, PollMode } from "../../types";
import { fetchText, isAllowed } from "../http";
import { extractDate, findPartyMentions, normalizeHebrew, seatsAfterMention } from "../hebrew";
import type { IngestResult, PollSource } from "../types";
import { validatePoll } from "../types";

/**
 * Reads poll results out of Hebrew election coverage.
 *
 * This is the source that makes the aggregator grow. Wikipedia is more
 * reliable, but it lags — an editor has to get to it, and in the last weeks of
 * a campaign polls land nightly. The outlets publish first.
 *
 * The method is deliberately dumb and deliberately suspicious. Fetch the
 * outlet's election section, follow links that look like poll articles, and run
 * the Hebrew matcher over the text. Then throw away almost everything:
 *
 *  - Fewer than `minParties` parties found → discard. A real poll article names
 *    most of the Knesset; two parties means we matched a passing reference in a
 *    political column.
 *  - Seats summing above 120 → discard. We picked up percentages, a previous
 *    election's results, or two polls in one article.
 *  - Any impossible delegation → the whole article is discarded by
 *    `validatePoll`, not just that party, because one bad number means the
 *    extraction was unreliable and the others cannot be trusted either.
 *
 * Everything that survives is still marked `published-partial` and carries a
 * note saying it was machine-extracted, so a reader on the site can see which
 * rows a human never checked. The quarantine in ../store.ts holds anything
 * that parsed but looked wrong, so failures are inspectable instead of silent.
 */

export interface NewsOutletConfig {
  id: string;
  name: string;
  /** Hebrew outlet name as it should appear on the site. */
  outlet: string;
  /** Polling institute this outlet commissions, when it is consistent. */
  pollster: string;
  mode: PollMode;
  /** Section pages listing election coverage. */
  indexUrls: string[];
  /** Article URLs must match this to be followed. */
  articlePattern: RegExp;
  /** Only follow links whose anchor text suggests a poll. */
  linkTextPattern?: RegExp;
  /** Minimum parties that must be extracted for the article to count. */
  minParties?: number;
  maxArticles?: number;
}

export const NEWS_OUTLETS: NewsOutletConfig[] = [
  {
    id: "n12",
    name: "חדשות 12 (mako)",
    outlet: "חדשות 12",
    pollster: "מדגם",
    mode: "mixed",
    indexUrls: [
      "https://www.mako.co.il/news-israel-elections",
      "https://www.mako.co.il/news-israel-elections/2026",
    ],
    articlePattern: /^https:\/\/www\.mako\.co\.il\/news-israel-elections\/.+\.htm$/,
  },
  {
    id: "kan",
    name: "כאן 11",
    outlet: "כאן 11",
    pollster: "כאן מחקרים",
    mode: "phone",
    indexUrls: ["https://www.kan.org.il/content/kan-news/politic/"],
    articlePattern: /^https:\/\/www\.kan\.org\.il\/content\/kan-news\/politic\/\d+\/?$/,
  },
  {
    id: "i24",
    name: "i24NEWS",
    outlet: "i24NEWS",
    pollster: "דיירקט פולס",
    mode: "online-panel",
    indexUrls: ["https://www.i24news.tv/he/news/israel-elections-2026/polls"],
    articlePattern: /^https:\/\/www\.i24news\.tv\/he\/news\/israel-elections-2026\/.+/,
  },
  {
    id: "walla",
    name: "וואלה",
    outlet: "וואלה",
    pollster: "לא ידוע",
    mode: "unknown",
    indexUrls: ["https://elections.walla.co.il/"],
    articlePattern: /^https:\/\/(elections|news)\.walla\.co\.il\/item\/\d+/,
  },
  {
    id: "maariv",
    name: "מעריב",
    outlet: "מעריב",
    pollster: "לאזר",
    mode: "phone",
    indexUrls: ["https://www.maariv.co.il/elections2026"],
    articlePattern: /^https:\/\/www\.maariv\.co\.il\/.+\/article-\d+/,
  },
];

const POLL_WORDS = /סקר|מנדטים|מנדט/;

export function hebrewNewsSource(cfg: NewsOutletConfig): PollSource {
  const minParties = cfg.minParties ?? 6;
  const maxArticles = cfg.maxArticles ?? 12;

  return {
    id: cfg.id,
    name: cfg.name,
    url: cfg.indexUrls[0],

    async fetch(): Promise<IngestResult<Poll>> {
      const warnings: string[] = [];
      const items: Poll[] = [];
      const fetchedAt = new Date().toISOString();
      const today = fetchedAt.slice(0, 10);

      // --- Collect candidate article links from the section pages ---
      const candidates = new Set<string>();
      for (const indexUrl of cfg.indexUrls) {
        if (!(await isAllowed(indexUrl))) {
          warnings.push(`robots.txt disallows ${indexUrl}`);
          continue;
        }
        let html: string;
        try {
          html = await fetchText(indexUrl);
        } catch (err) {
          warnings.push(`index ${indexUrl}: ${(err as Error).message}`);
          continue;
        }
        for (const link of extractLinks(html, indexUrl)) {
          if (!cfg.articlePattern.test(link.href)) continue;
          if (cfg.linkTextPattern && !cfg.linkTextPattern.test(link.text)) continue;
          // Cheap pre-filter: the anchor text of a poll article almost always
          // says so, and this saves fetching dozens of unrelated pieces.
          if (link.text && !POLL_WORDS.test(link.text)) continue;
          candidates.add(link.href);
        }
      }

      if (candidates.size === 0) {
        warnings.push("no candidate poll articles found — section layout may have changed");
      }

      // --- Read each candidate ---
      for (const href of [...candidates].slice(0, maxArticles)) {
        try {
          if (!(await isAllowed(href))) continue;
          const html = await fetchText(href);
          const poll = extractPoll(html, href, cfg, today, minParties);
          if (poll) items.push(poll);
        } catch (err) {
          warnings.push(`${href}: ${(err as Error).message}`);
        }
      }

      return { items, source: cfg.id, fetchedAt, warnings };
    },
  };
}

interface Link {
  href: string;
  text: string;
}

function extractLinks(html: string, baseUrl: string): Link[] {
  const out: Link[] = [];
  const re = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    let href: string;
    try {
      href = new URL(m[1], baseUrl).toString().split("#")[0];
    } catch {
      continue;
    }
    out.push({ href, text: textOf(m[2]) });
  }
  return out;
}

function textOf(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/\s+/g, " ")
    .trim();
}

/** Strips an article page down to readable body text. */
function articleText(html: string): string {
  return textOf(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
      .replace(/<footer[\s\S]*?<\/footer>/gi, " "),
  );
}

function extractPoll(
  html: string,
  url: string,
  cfg: NewsOutletConfig,
  today: string,
  minParties: number,
): Poll | null {
  const raw = articleText(html);
  if (!POLL_WORDS.test(raw)) return null;

  const text = normalizeHebrew(raw);
  const seats: Record<string, number> = {};
  for (const mention of findPartyMentions(text)) {
    // First reading of a party wins: articles repeat the headline numbers in
    // the body, but they also discuss LAST week's poll further down.
    if (seats[mention.partyId] !== undefined) continue;
    const n = seatsAfterMention(text, mention);
    if (n !== null && n > 0) seats[mention.partyId] = n;
  }

  const found = Object.keys(seats).length;
  if (found < minParties) return null;

  const total = Object.values(seats).reduce((a, b) => a + b, 0);
  if (total > 120) return null;

  const date = extractDate(raw, today);
  const poll: Poll = {
    id: `${cfg.id}-${date}-${hash(url)}`,
    date,
    pollster: cfg.pollster,
    outlet: cfg.outlet,
    sampleSize: sampleSizeFrom(raw),
    mode: cfg.mode,
    seats,
    provenance: "published-partial",
    source: url,
    partial: true,
    notes:
      `נקלט אוטומטית מטקסט הכתבה (${found} מפלגות, ${total} מנדטים). ` +
      `לא עבר אימות אנושי — ראו עמוד המתודולוגיה.`,
  };

  // One impossible number means the extraction was unreliable, so the whole
  // article goes, not just the offending party.
  return validatePoll(poll).length === 0 ? poll : null;
}

function sampleSizeFrom(text: string): number | null {
  const m = text.match(/(\d{3,5})\s*(?:נדגמים|משיבים|מרואיינים)/);
  if (m) {
    const n = Number(m[1]);
    if (n >= 300 && n <= 20000) return n;
  }
  return null;
}

function hash(s: string): string {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}
