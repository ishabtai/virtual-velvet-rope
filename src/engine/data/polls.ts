import type { Poll } from "../types";

/**
 * Published polls for the 26th Knesset.
 *
 * SOURCING RULE: every entry links to the published poll. `seats` holds only
 * numbers that were actually reported, or that follow arithmetically from a
 * reported bloc total plus the other reported parties. Where a value was
 * derived rather than printed, `partial` is set and `notes` says exactly what
 * was derived — the site surfaces both, because an aggregator that hides its
 * reconstruction is not auditable.
 *
 * A poll does NOT need a complete 120-seat breakdown to be usable. The engine
 * reads each reported party as seats/120 of the seat-winning vote, so a poll
 * that only published its top four parties still informs those four. See
 * `aggregate.ts`.
 *
 * `belowThreshold` records parties the poll explicitly placed under 3.25%.
 * That is real information — it is the difference between "not reported" and
 * "reported as failing" — and the threshold model uses it.
 */
export const POLLS: Poll[] = [
  {
    id: "c12-2026-09-11",
    date: "2026-09-11",
    pollster: "מדגם",
    outlet: "חדשות 12",
    sampleSize: null,
    mode: "mixed",
    seats: {
      likud: 24,
      yashar: 22,
      byachad: 15,
      democrats: 11,
      otzma: 9,
      "yisrael-beiteinu": 9,
      utj: 8,
      shas: 7,
      "joint-list": 7,
      "religious-zionism": 4,
      raam: 4,
    },
    provenance: "reconstructed",
    source: "https://www.mako.co.il/news-israel-elections/2026/Article-cb0dba3ba4430a1027.htm",
    partial: true,
    notes:
      "האופוזיציה 68 (57 ציוניות + 11 ערביות) מול קואליציה 52. תשע מפלגות פורסמו במפורש; הליכוד (24) וישר (22) נגזרו מסכומי הגושים שפורסמו. עמך ישראל מתחת לאחוז החסימה בתרחיש הבסיס. תאריך הפרסום משוער — לא אותר תאריך שטח מדויק.",
  },
  {
    id: "c12-2026-09-11-winter",
    date: "2026-09-11",
    pollster: "מדגם",
    outlet: "חדשות 12",
    sampleSize: null,
    mode: "mixed",
    seats: {
      yashar: 24,
      likud: 21,
      byachad: 16,
      democrats: 11,
      otzma: 9,
      "yisrael-beiteinu": 9,
      utj: 8,
      shas: 7,
      "joint-list": 7,
      amcha: 4,
      raam: 4,
    },
    shares: { "religious-zionism": 0.024 },
    provenance: "scenario",
    excludeFromAverage: true,
    source: "https://www.mako.co.il/news-israel-elections/2026/Article-15cb223b69850a1026.htm",
    partial: true,
    notes:
      "תרחיש מותנה מאותו שדה: 'וינטר עובר, סמוטריץ' בחוץ'. עמך ישראל חוצה לראשונה עם 4 מנדטים והציונות הדתית נופלת ל-2.4%. האופוזיציה עולה ל-71 (60 ציוניות) והקואליציה יורדת ל-49. אינו נספר בממוצע — הוא חולק נדגמים עם סקר הבסיס — אך זו המדידה הישירה היחידה של מה שקורה כשמפלגת סף חוצה.",
  },
  {
    id: "i24-2026-09-09",
    date: "2026-09-09",
    pollster: "דיירקט פולס",
    outlet: "i24NEWS",
    sampleSize: 500,
    mode: "online-panel",
    seats: {
      likud: 27,
      yashar: 22,
      byachad: 10,
      democrats: 9,
      utj: 8,
      otzma: 8,
      "joint-list": 7,
      "yisrael-beiteinu": 7,
      shas: 7,
      "religious-zionism": 6,
      raam: 5,
      amcha: 4,
    },
    shares: { reservists: 0.014 },
    provenance: "published-full",
    source:
      "https://www.i24news.tv/en/news/israeli-elections/artc-i24news-poll-likud-leads-with-27-seats-yashar-wins-22",
    notes:
      "פירוט מלא של 120 מנדטים כפי שפורסם. המילואימניקים והכלכלית 1.4% ו'כחול לבן' 1.1% — מתחת לאחוז החסימה.",
  },
  {
    id: "c12-2026-09-08",
    date: "2026-09-08",
    pollster: "מדגם",
    outlet: "חדשות 12",
    sampleSize: null,
    mode: "mixed",
    seats: {
      yashar: 25,
      likud: 21,
      byachad: 13,
      democrats: 11,
      "yisrael-beiteinu": 11,
      otzma: 9,
      utj: 8,
      shas: 7,
      "joint-list": 6,
      raam: 5,
      "religious-zionism": 4,
    },
    provenance: "reconstructed",
    source:
      "https://www.haaretz.com/israel-news/elections/2026-09-08/ty-article/poll-yashar-increases-lead-over-likud-eisenkot-bloc-projected-to-win-57-seats/000001a0-7e31-db0b-a1f2-7eb995c20000",
    partial: true,
    notes:
      "עשר המפלגות הראשונות פורסמו במפורש. הציונות הדתית–זהות (4) נגזרה מסך גוש נתניהו שפורסם (49) בניכוי שאר מפלגות הגוש. עמך ישראל מתחת לאחוז החסימה בסקר זה.",
  },
  {
    id: "kan-2026-09-07",
    date: "2026-09-07",
    pollster: "כאן מחקרים",
    outlet: "כאן 11",
    sampleSize: null,
    mode: "phone",
    seats: {
      yashar: 24,
      likud: 22,
      byachad: 12,
      democrats: 11,
      "yisrael-beiteinu": 10,
      "joint-list": 7,
      otzma: 7,
      utj: 7,
      shas: 7,
      raam: 5,
      reservists: 4,
      amcha: 4,
    },
    provenance: "reconstructed",
    source: "https://www.kan.org.il/content/kan-news/politic/1096840/",
    partial: true,
    notes:
      "הסקר שבו הנדל וזליכה חוצים את אחוז החסימה (4) והגוש הציוני שאינו נתניהו מגיע ל-61 ללא המפלגות הערביות (12). חלוקת המנדטים בתוך גוש נתניהו נגזרה מסך הגוש שפורסם. הציונות הדתית–זהות מתחת לאחוז החסימה.",
  },
  {
    id: "i24-2026-08-26",
    date: "2026-08-26",
    pollster: "דיירקט פולס",
    outlet: "i24NEWS",
    sampleSize: 532,
    mode: "online-panel",
    seats: {
      likud: 26,
      yashar: 23,
      byachad: 11,
      democrats: 9,
      amcha: 8,
      otzma: 8,
      "yisrael-beiteinu": 8,
      "joint-list": 7,
      utj: 7,
      shas: 7,
      raam: 6,
    },
    provenance: "reconstructed",
    source: "https://www.i24news.tv/he/news/israel-elections-2026/polls/artc-a44c587c",
    partial: true,
    notes:
      "הסקר הראשון שכלל את 'עמך ישראל' של עופר וינטר (8 מנדטים) — הליכוד איבד חמישה מנדטים לעומת 18/8. הליכוד, ישר ועמך ישראל פורסמו במפורש; שאר החלוקה נגזרה. הציונות הדתית–זהות מתחת לאחוז החסימה.",
  },
  {
    id: "c13-2026-08-19",
    date: "2026-08-19",
    pollster: "קמיל פוקס",
    outlet: "חדשות 13",
    sampleSize: null,
    mode: "mixed",
    seats: { yashar: 24, likud: 23, byachad: 13, democrats: 10 },
    provenance: "published-partial",
    source:
      "https://www.haaretz.co.il/news/elections/2026-08-19/ty-article/.premium/000001a0-1b35-dfad-a3a1-bfb7d2320000",
    partial: true,
    notes:
      "דווח: איזנקוט מתחזק אך הגוש בראשותו אינו מגיע ל-61 ללא המפלגות הערביות. רק ארבע המפלגות הגדולות דווחו — הסקר משפיע רק עליהן.",
  },
  {
    id: "i24-2026-08-18",
    date: "2026-08-18",
    pollster: "דיירקט פולס",
    outlet: "i24NEWS",
    sampleSize: null,
    mode: "online-panel",
    seats: { likud: 31, yashar: 24 },
    provenance: "published-partial",
    source: "https://www.i24news.tv/he/news/israel-elections-2026/polls",
    partial: true,
    notes:
      "נקודת הייחוס שלפיה הליכוד ירד חמישה מנדטים בסקר 26/8. רק שתי המפלגות הגדולות ידועות בוודאות — לפני השקת עמך ישראל.",
  },
  {
    id: "kan-2026-08-16",
    date: "2026-08-16",
    pollster: "כאן מחקרים",
    outlet: "כאן 11",
    sampleSize: null,
    mode: "phone",
    seats: { likud: 23, yashar: 23, byachad: 14 },
    provenance: "published-partial",
    source:
      "https://www.haaretz.co.il/news/elections/2026-08-16/ty-article/000001a0-0bac-d75f-a3be-1bfe32f80000",
    partial: true,
    notes: "גוש איזנקוט מוביל בחמישה מנדטים על מפלגות הקואליציה. שלוש הגדולות בלבד.",
  },
  {
    id: "haaretz-2026-08-06",
    date: "2026-08-06",
    pollster: "קמיל פוקס",
    outlet: "חדשות 13",
    sampleSize: null,
    mode: "mixed",
    seats: { yashar: 23, likud: 22 },
    provenance: "published-partial",
    source:
      "https://www.haaretz.com/israel-news/elections/2026-08-06/ty-article/poll-opposition-bloc-slips-to-58-seats-as-zionist-home-misses-threshold/0000019f-d5ca-d315-a1df-ffeedf480000",
    partial: true,
    notes: "גוש האופוזיציה יורד ל-58. 'הבית הציוני' אינו חוצה את אחוז החסימה.",
  },
  {
    id: "kan-2026-07-20",
    date: "2026-07-20",
    pollster: "כאן מחקרים",
    outlet: "כאן 11",
    sampleSize: null,
    mode: "phone",
    seats: { yashar: 24, likud: 23, byachad: 15 },
    provenance: "published-partial",
    source: "https://www.kan.org.il/content/kan-news/politic/1075317/",
    partial: true,
    notes:
      "איזנקוט עוקף את נתניהו לראשונה בסקר כאן; המנדט שנוסף לו הגיע מביחד ולא מהליכוד.",
  },
  {
    id: "c13-2026-07-08",
    date: "2026-07-08",
    pollster: "קמיל פוקס",
    outlet: "חדשות 13",
    sampleSize: null,
    mode: "mixed",
    seats: { yashar: 23, likud: 22, byachad: 15 },
    provenance: "published-partial",
    source:
      "https://www.haaretz.co.il/news/elections/2026-07-08/ty-article/0000019f-42db-d07c-af9f-cadf758a0000",
    partial: true,
    notes: "לראשונה מפלגת ישר עוקפת את הליכוד במנדט אחד.",
  },
];

/**
 * Parties a given poll explicitly placed below the 3.25% threshold. Keyed by
 * poll id. Distinct from simple absence: absence means "not reported", this
 * means "reported as failing", and the threshold model treats them differently.
 */
export const BELOW_THRESHOLD: Record<string, string[]> = {
  "i24-2026-09-09": ["reservists"],
  "c12-2026-09-08": ["amcha"],
  "kan-2026-09-07": ["religious-zionism"],
  "i24-2026-08-26": ["religious-zionism", "reservists"],
};
