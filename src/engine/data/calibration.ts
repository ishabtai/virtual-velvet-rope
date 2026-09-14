/**
 * How wrong Israeli polls have actually been.
 *
 * This file is the empirical answer to the one thing the rest of the model
 * cannot discover on its own. House effects measure how institutes differ from
 * EACH OTHER; they are centred to zero by construction and can never reveal an
 * error the whole industry shares. That error is only visible by comparing
 * final polls against the count — which is what this record does.
 *
 * SOURCING. Every entry cites where the poll figure and the result came from.
 * `confidence` says how firm the pairing is:
 *   firm    Final pre-election polls and the official result, both published
 *           as seat counts, directly comparable.
 *   approx  The poll figure is an exit poll or a reported bloc total rather
 *           than an average of final pre-election polls. Directionally sound,
 *           but the exact magnitude carries more slack.
 *
 * A NOTE ON WHAT THIS IS NOT. Two of the largest historical "errors" were not
 * really errors about party support at all: in April 2019 several small lists
 * failed the threshold and freed roughly ten seats, which flowed mostly to the
 * big parties, and in 2022 Meretz and Balad did the same. The model already
 * simulates that mechanism directly. What remains here — after the threshold
 * effect — is the genuine industry-wide bias, and it is smaller than the raw
 * headline numbers suggest. That is why the corrections computed from this file
 * are shrunk hard rather than applied at face value.
 */
import type { BlocId } from "../types";

/** Bloc groupings used for calibration. "haredi" is a subset of "netanyahu". */
export type CalibrationGroup = BlocId | "haredi";

export interface HistoricalMiss {
  /** Election day, ISO. */
  date: string;
  knesset: number;
  group: CalibrationGroup;
  /** What the final polls said, in seats. */
  polled: number;
  /** What the count said, in seats. */
  actual: number;
  confidence: "firm" | "approx";
  source: string;
  note: string;
}

/**
 * The record. Ordered oldest first; `calibration.ts` weights recent elections
 * far more heavily, because the error has shrunk steadily as pollsters adapted
 * — Likud was understated by eight seats in 2015 and by one and a half in 2022,
 * and treating those as equally informative about 2026 would badly over-correct.
 */
export const HISTORICAL_MISSES: HistoricalMiss[] = [
  // ---- 2015, 20th Knesset -------------------------------------------------
  {
    date: "2015-03-17",
    knesset: 20,
    group: "netanyahu",
    polled: 53,
    actual: 61,
    confidence: "approx",
    source: "https://www.timesofisrael.com/israeli-pollsters-our-off-mark-2015-surveys-were-entirely-different-to-us-election-failure/",
    note:
      "הפספוס הגדול בתולדות הסקרים בישראל. הליכוד נחזה על 22 מנדטים וקיבל 30. מדגמי ערב הבחירות הראו תיקו בין הליכוד למחנה הציוני, בעוד בפועל הליכוד ניצח בשישה מנדטים.",
  },
  {
    date: "2015-03-17",
    knesset: 20,
    group: "change",
    polled: 50,
    actual: 43,
    confidence: "approx",
    source: "https://thejerusalemfund.org/2015/03/israeli-election-results-2015-mean/",
    note: "הצד השני של אותו פספוס: גוש המרכז-שמאל נחזה ביתר.",
  },

  // ---- April 2019, 21st Knesset -------------------------------------------
  {
    date: "2019-04-09",
    knesset: 21,
    group: "netanyahu",
    polled: 60,
    actual: 65,
    confidence: "approx",
    source: "https://www.timesofisrael.com/israels-exit-polls-show-no-clear-election-winner-netanyahu-far-from-majority/",
    note:
      "מדגם ערוץ 12 חזה 60 מנדטים לגוש הימין; בפועל 65. חלק ניכר מהפער נבע מרשימות קטנות שלא עברו את אחוז החסימה ושחררו כעשרה מנדטים — מנגנון שהמודל מדמה ישירות.",
  },

  // ---- September 2019, 22nd Knesset ---------------------------------------
  {
    date: "2019-09-17",
    knesset: 22,
    group: "netanyahu",
    polled: 57,
    actual: 58,
    confidence: "approx",
    source: "https://www.timesofisrael.com/israels-exit-polls-show-no-clear-election-winner-netanyahu-far-from-majority/",
    note: "סבב שני — הפער כמעט נסגר. המדגמים הראו את הגוש כמה מנדטים מתחת ל-61, והתוצאה הייתה 58.",
  },

  // ---- 2021, 24th Knesset -------------------------------------------------
  {
    date: "2021-03-23",
    knesset: 24,
    group: "netanyahu",
    polled: 53,
    actual: 52,
    confidence: "approx",
    source: "https://en.wikipedia.org/wiki/2021_Israeli_legislative_election",
    note:
      "המערכת המדויקת ביותר. הליכוד נחזה על 31 במדגמים וקיבל 30. הפספוס היחיד המשמעותי היה בכיוון ההפוך: רע\"ם נחזתה מתחת לאחוז החסימה וקיבלה ארבעה מנדטים.",
  },
  {
    date: "2021-03-23",
    knesset: 24,
    group: "arab",
    polled: 8,
    actual: 10,
    confidence: "approx",
    source: "https://en.wikipedia.org/wiki/2021_Israeli_legislative_election",
    note: "רע\"ם נחזתה מתחת לאחוז החסימה במדגמים וקיבלה ארבעה מנדטים — המפלגות הערביות הוערכו בחסר.",
  },

  // ---- 2022, 25th Knesset -------------------------------------------------
  // The best-documented case: four final polls published the night before,
  // and an official count. Party-level numbers are exact.
  {
    date: "2022-11-01",
    knesset: 25,
    group: "netanyahu",
    polled: 60.5,
    actual: 64,
    confidence: "firm",
    source: "https://www.haaretz.com/israel-news/elections/2022-11-03/ty-article/israel-election-final-results-netanyahu-jewish-far-right-win-power-fiasco-for-left/00000184-3e80-daf1-abc4-7f9a53f40000",
    note:
      "ארבעת הסקרים הסופיים (קנטר, מדגם, קמיל פוקס, דיירקט פולס) נתנו לליכוד 30.5 בממוצע; התוצאה 32. הגוש כולו נחזה על כ-60.5 וקיבל 64.",
  },
  {
    date: "2022-11-01",
    knesset: 25,
    group: "haredi",
    polled: 17.25,
    actual: 18,
    confidence: "firm",
    source: "https://en.idi.org.il/articles/46229",
    note:
      "ש\"ס נחזתה על 10 בכל ארבעת הסקרים וקיבלה 11; יהדות התורה נחזתה על 7.25 וקיבלה 7. אחוז ההצבעה בציבור החרדי זינק ב-19% לעומת הבחירות הקודמות — בדיוק האוכלוסייה שסקרים מחמיצים.",
  },
  {
    date: "2022-11-01",
    knesset: 25,
    group: "change",
    polled: 50,
    actual: 46,
    confidence: "firm",
    source: "https://www.ynet.co.il/news/election2022/article/hyaueuwho",
    note:
      "מרצ חצתה את אחוז החסימה בכל סקר בחודשיים שקדמו לבחירות, ונפלה ל-3.14%. בל\"ד נפלה ל-2.94%. שני כישלונות סף שהמודל מדמה ישירות.",
  },
];

/**
 * A published cross-election estimate, kept as a sanity check on the numbers
 * computed from the table above rather than as an input to them.
 *
 * Across 2015, 2020 and 2022 the right-wing bloc was under-predicted by an
 * average of 5.71 seats and the left/centre/Arab bloc over-predicted by 2.52.
 * Those figures are larger than what this model applies, deliberately: they
 * include the threshold-failure effect, which is simulated directly here rather
 * than baked into a bias term.
 */
export const PUBLISHED_BENCHMARK = {
  rightUnderPredictedSeats: 5.71,
  leftOverPredictedSeats: 2.52,
  elections: "2015, 2020, 2022",
  source: "https://danielspeaksup.substack.com/p/election-polling-bias",
};
