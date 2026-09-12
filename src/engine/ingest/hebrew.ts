/**
 * Recognising Israeli party names in Hebrew prose.
 *
 * This is the hard part of scraping Hebrew election coverage, and it is hard
 * for reasons that are specific to the language and the domain:
 *
 *  - Gershayim. ש"ס, רע"ם and חד"ש appear with the ASCII double quote, the
 *    Hebrew gershayim ״, a single quote, a curly quote, or nothing at all.
 *    Five spellings of the same party, often inside one article.
 *  - Prefixes. Hebrew glues ה/ו/ב/ל/מ/ש/כ onto the front of a noun, so
 *    "הליכוד", "בליכוד" and "שהליכוד" are all the Likud.
 *  - Apposition. Papers rarely print a bare name; they print
 *    "ישר בראשות גדי איזנקוט" or "מפלגת ביחד של בנט ולפיד".
 *  - Renaming. Lists merge and rename between elections, and coverage keeps
 *    using the old name for weeks — חד"ש–תע"ל for what is now הרשימה המשותפת.
 *
 * The matcher is deliberately strict rather than clever. A false positive here
 * does not produce a slightly wrong poll; it produces a fabricated one that
 * then gets averaged into a published forecast. Every ambiguous case resolves
 * to "no match", and the caller drops the article.
 */
import { REAL_PARTIES } from "../data/parties";

/**
 * Normalises a Hebrew string for matching: removes every gershayim variant,
 * collapses hyphen/maqaf forms, strips niqqud, and squeezes whitespace.
 */
export function normalizeHebrew(s: string): string {
  return s
    // Niqqud and cantillation — but NOT U+05BE maqaf, which sits inside the
    // same Unicode block and is a dash, not a diacritic. Stripping it here
    // instead of converting it to a space silently welds compound list names
    // together ("חד״ש־תע״ל" → "חדשתעל") and they then never match.
    .replace(/[\u0591-\u05BD\u05BF-\u05C7]/g, "")
    .replace(/["'`׳״‘’“”]/g, "") // every quote form
    .replace(/[־‐-―-]/g, " ") // maqaf and dash forms
    .replace(/\s+/g, " ")
    .trim();
}

/** Strips the inseparable Hebrew prefixes that glue onto a name. */
function stripPrefixes(word: string): string {
  return word.replace(/^(?:ו|ש|כש)?(?:ה|ב|ל|מ|כ)?/, "");
}

/**
 * Extra spellings per party beyond the registry name. Includes former names
 * still in circulation, because coverage lags a merger by weeks.
 */
const ALIASES: Record<string, string[]> = {
  likud: ["הליכוד", "ליכוד"],
  yashar: ["ישר", "מפלגת ישר", "ישר עם איזנקוט", "איזנקוט"],
  byachad: ["ביחד", "מפלגת ביחד", "בנט לפיד"],
  democrats: ["הדמוקרטים", "דמוקרטים", "העבודה מרצ"],
  "yisrael-beiteinu": ["ישראל ביתנו", "ישראל ביתינו"],
  shas: ["שס"],
  utj: ["יהדות התורה", "אגודת ישראל", "דגל התורה"],
  otzma: ["עוצמה יהודית", "עוצמה"],
  "religious-zionism": [
    "הציונות הדתית",
    "ציונות דתית",
    "הציונות הדתית זהות",
    "זהות",
  ],
  amcha: ["עמך ישראל", "עמך"],
  reservists: [
    "המילואימניקים והכלכלית",
    "המילואימניקים",
    "הנדל זליכה",
    "המילואימניקים והמפלגה הכלכלית",
  ],
  "joint-list": [
    "הרשימה המשותפת",
    "רשימה משותפת",
    "חדש תעל",
    "חדש בלד תעל",
    "חדש",
  ],
  raam: ["רעם", "הרשימה הערבית המאוחדת"],
};

interface Alias {
  partyId: string;
  /** Normalised alias text. */
  text: string;
  /** Word count, used to prefer the most specific match. */
  words: number;
}

const ALIAS_TABLE: Alias[] = buildAliasTable();

function buildAliasTable(): Alias[] {
  const out: Alias[] = [];
  const seen = new Set<string>();

  for (const party of REAL_PARTIES) {
    const forms = [party.name, ...(ALIASES[party.id] ?? [])];
    for (const form of forms) {
      const text = normalizeHebrew(form);
      if (!text) continue;
      const key = text;
      // A spelling that could denote two parties is worse than useless: drop it
      // from both rather than silently assigning it to whichever was declared
      // first.
      if (seen.has(key)) {
        const clash = out.findIndex((a) => a.text === key);
        if (clash >= 0 && out[clash].partyId !== party.id) out.splice(clash, 1);
        continue;
      }
      seen.add(key);
      out.push({ partyId: party.id, text, words: text.split(" ").length });
    }
  }

  // Longest alias first, so "הציונות הדתית זהות" wins over "זהות".
  return out.sort((a, b) => b.text.length - a.text.length);
}

/** Every party mentioned in a piece of text, with the index of each mention. */
export interface Mention {
  partyId: string;
  index: number;
  length: number;
  /** Words in the matched alias — a proxy for how specific the match was. */
  specificity: number;
}

export function findPartyMentions(text: string): Mention[] {
  const normalized = normalizeHebrew(text);
  const mentions: Mention[] = [];
  // Tracks which character ranges are already claimed, so a long alias is not
  // also matched by its own shorter substring.
  const claimed: [number, number][] = [];

  for (const alias of ALIAS_TABLE) {
    let from = 0;
    for (;;) {
      const at = normalized.indexOf(alias.text, from);
      if (at < 0) break;
      from = at + 1;

      const end = at + alias.text.length;
      if (claimed.some(([s, e]) => at < e && end > s)) continue;

      // Must sit on word boundaries once Hebrew prefixes are accounted for.
      const before = normalized.slice(Math.max(0, at - 4), at);
      const after = normalized[end] ?? " ";
      const startsWord = at === 0 || /[\s,.:;()א-ת]/.test(before.slice(-1));
      const endsWord = /[\s,.:;()\-–—0-9]/.test(after) || end === normalized.length;
      if (!startsWord || !endsWord) continue;

      // Reject a match that is only the tail of a longer Hebrew word.
      const wordStart = normalized.lastIndexOf(" ", at - 1) + 1;
      const prefixChars = normalized.slice(wordStart, at);
      if (prefixChars.length > 0 && stripPrefixes(prefixChars + alias.text) !== alias.text) {
        if (prefixChars.length > 2) continue;
      }

      claimed.push([at, end]);
      mentions.push({
        partyId: alias.partyId,
        index: at,
        length: alias.text.length,
        specificity: alias.words,
      });
    }
  }

  return mentions.sort((a, b) => a.index - b.index);
}

/**
 * Pulls a seat count out of the text immediately following a party mention.
 *
 * Israeli coverage writes this in a small number of shapes — "הליכוד מקבל 24
 * מנדטים", "ישר 22", "ביחד בראשות בנט – 15" — so the rule is: take the first
 * integer within `window` characters after the name that is a legal seat count,
 * and strongly prefer one followed by the word מנדט.
 *
 * Returns null rather than guessing. Three quarters of the value of this
 * function is in what it refuses to return.
 */
export function seatsAfterMention(
  normalizedText: string,
  mention: Mention,
  window = 60,
): number | null {
  const start = mention.index + mention.length;
  const slice = normalizedText.slice(start, start + window);

  // A following party name ends this mention's scope — otherwise
  // "ישר, הליכוד 24" would credit 24 seats to both.
  const nextParty = findPartyMentions(slice)[0];
  let bounded = nextParty ? slice.slice(0, nextParty.index) : slice;

  // So does the end of the sentence. Without this, a party named at the end of
  // one sentence absorbs the first number of the next — and election copy is
  // full of unrelated numbers ("הבחירות ייערכו בעוד 46 ימים") that are in
  // perfectly legal seat range.
  const sentenceEnd = bounded.search(/[.!?|]/);
  if (sentenceEnd >= 0) bounded = bounded.slice(0, sentenceEnd);

  const withUnit = bounded.match(/(\d{1,3})(?:\.\d)?\s*מנדט/);
  if (withUnit) return legalSeatCount(Number(withUnit[1]));

  const bare = bounded.match(/(?:^|[\s\-–—:(])(\d{1,3})(?:\.\d)?(?:$|[\s,.)])/);
  if (bare) return legalSeatCount(Number(bare[1]));

  return null;
}

/**
 * A seat count that cannot exist is a parse error, not a data point.
 * Under a 3.25% threshold the smallest possible delegation is four, so 1-3
 * means the number we grabbed was something else — a date, a percentage, a
 * count of something unrelated.
 */
function legalSeatCount(n: number): number | null {
  if (!Number.isFinite(n)) return null;
  if (n === 0) return 0;
  if (n < 4 || n > 120) return null;
  return n;
}

/** Reads a Hebrew or numeric date out of an article, as an ISO day. */
export function extractDate(text: string, fallback: string): string {
  const HEB_MONTHS: Record<string, number> = {
    בינואר: 1, בפברואר: 2, במרץ: 3, באפריל: 4, במאי: 5, ביוני: 6,
    ביולי: 7, באוגוסט: 8, בספטמבר: 9, באוקטובר: 10, בנובמבר: 11, בדצמבר: 12,
  };
  const heb = text.match(/(\d{1,2})\s+(ב[א-ת]+)\s+(\d{4})/);
  if (heb && HEB_MONTHS[heb[2]]) {
    const [, d, m, y] = heb;
    return `${y}-${String(HEB_MONTHS[m]).padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  const iso = text.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return iso[0];
  const dmy = text.match(/(\d{1,2})[./](\d{1,2})[./](\d{4})/);
  if (dmy) {
    const [, d, m, y] = dmy;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return fallback;
}
