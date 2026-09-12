import type { PollMode } from "../types";

/**
 * The source registry.
 *
 * ONE list, read by both the scraper and the site. That is the entire point of
 * this file: a legend that lives apart from the thing it describes starts
 * lying the first time a source is added, and a source table on a forecast site
 * is worth nothing if it is not the same table the forecast actually ran on.
 *
 * `kind` is the single most useful thing to know about a source:
 *
 *  structured  The source is already a table — columns are parties, rows are
 *              polls. Nothing has to be inferred. These also tend to carry the
 *              pollster, sample size and fieldwork dates that news articles
 *              omit. Most trustworthy by a distance.
 *  aggregator  A site whose job is collecting polls. Structured, but one
 *              remove from the publisher, so an error there propagates here.
 *  text        Ordinary prose. A parser has to work out which number belongs to
 *              which party. Fastest to publish and least reliable to read.
 */
export type SourceKind = "structured" | "aggregator" | "text";

/** Whether a source has actually produced usable polls in CI. */
export type SourceStatus = "active" | "unverified" | "failing";

export interface SourceDescriptor {
  id: string;
  /** Display name, Hebrew where the source is Hebrew. */
  name: string;
  kind: SourceKind;
  url: string;
  /** Outlet name recorded on polls from this source. */
  outlet: string;
  /** Institute this outlet commissions, when it is consistent. */
  pollster: string;
  mode: PollMode;
  status: SourceStatus;
  /** Why this source is in the list, and what to distrust about it. */
  notes: string;
  /** Section pages the scraper starts from. */
  indexUrls: string[];
  /** Article URLs must match this to be followed. */
  articlePattern?: string;
  minParties?: number;
  maxArticles?: number;
}

export const SOURCES: SourceDescriptor[] = [
  // ---- Structured ----------------------------------------------------------
  {
    id: "wikipedia",
    name: "ויקיפדיה האנגלית — טבלת הסקרים",
    kind: "structured",
    url: "https://en.wikipedia.org/wiki/Opinion_polling_for_the_2026_Israeli_legislative_election",
    outlet: "ויקיפדיה",
    pollster: "משתנה",
    mode: "unknown",
    status: "active",
    notes:
      "המקור בעל הערך הגבוה ביותר בפרויקט, בפער. הוא היחיד שהוא כבר טבלה — עמודות הן מפלגות ושורות הן סקרים — ולכן שום דבר בו לא צריך להיות מוסק. הוא גם מפרסם מכון, גודל מדגם ותאריכי שטח, שכתבות חדשות כמעט תמיד משמיטות. נקרא דרך MediaWiki API ולא בגריפת HTML: זה ממשק מתועד ויציב בהרבה, והוא עולה לוויקימדיה פחות.",
    indexUrls: [],
  },
  {
    id: "wikipedia-he",
    name: "ויקיפדיה העברית — הבחירות לכנסת ה-26",
    kind: "structured",
    url: "https://he.wikipedia.org/wiki/הבחירות_לכנסת_העשרים_ושש",
    outlet: "ויקיפדיה",
    pollster: "משתנה",
    mode: "unknown",
    status: "unverified",
    notes:
      "הגרסה העברית מתעדכנת לעיתים מהר יותר מהאנגלית בסקרים ישראליים, ושמות המפלגות בה הם השמות המקוריים ולא תעתיק. כפילויות מול הגרסה האנגלית נתפסות בטביעת האצבע של הסקר ולא בכתובת, ולכן אותו סקר בשתי השפות נספר פעם אחת.",
    indexUrls: [],
  },

  // ---- Aggregators ---------------------------------------------------------
  {
    id: "skarim",
    name: "סקר הסקרים",
    kind: "aggregator",
    url: "https://www.skarim.org/",
    outlet: "סקר הסקרים",
    pollster: "משתנה",
    mode: "unknown",
    status: "unverified",
    notes:
      "אגרגטור ישראלי שמרכז סקרים מכל הערוצים. מבני ולכן קל לקריאה, אבל הוא מרחק אחד מהמפרסם — שגיאה אצלו מתפשטת לכאן. מסומן במפורש, ולכן סקר שמגיע ממנו ולא ממקור ראשון ניתן לזיהוי.",
    indexUrls: ["https://www.skarim.org/"],
    articlePattern: "^https://www\\.skarim\\.org/",
  },
  {
    id: "israelvoting",
    name: "Israel Voting — סקרי מנדטים",
    kind: "aggregator",
    url: "https://israelvoting.com/polls",
    outlet: "Israel Voting",
    pollster: "משתנה",
    mode: "unknown",
    status: "unverified",
    notes: "אגרגטור נוסף. מוחזק כגיבוי לסקר הסקרים — שני אגרגטורים בלתי תלויים מקטינים את הסיכון ששבירה של אחד תשתיק את הערוץ כולו.",
    indexUrls: ["https://israelvoting.com/polls"],
    articlePattern: "^https://israelvoting\\.com/",
  },

  // ---- Television and daily press -----------------------------------------
  {
    id: "n12",
    name: "חדשות 12 (mako)",
    kind: "text",
    url: "https://www.mako.co.il/news-israel-elections",
    outlet: "חדשות 12",
    pollster: "מדגם",
    mode: "mixed",
    status: "active",
    notes:
      "הסקר הנצפה ביותר בישראל, בביצוע מכון מדגם. מפרסם ראשון ולעיתים קרובות בפירוט מלא, אך לא תמיד מפרסם גודל מדגם.",
    indexUrls: [
      "https://www.mako.co.il/news-israel-elections",
      "https://www.mako.co.il/news-israel-elections/2026",
    ],
    articlePattern: "^https://www\\.mako\\.co\\.il/news-israel-elections/.+\\.htm$",
  },
  {
    id: "kan",
    name: "כאן 11 — תאגיד השידור",
    kind: "text",
    url: "https://www.kan.org.il/content/kan-news/politic/",
    outlet: "כאן 11",
    pollster: "כאן מחקרים",
    mode: "phone",
    status: "active",
    notes:
      "דגימה טלפונית עם משקל מוגבר לציבור הערבי ולחרדי — שתי האוכלוסיות שסקרים מחמיצים באופן שיטתי, ולכן זה יתרון מתודולוגי אמיתי ולא ניסוח.",
    indexUrls: ["https://www.kan.org.il/content/kan-news/politic/"],
    articlePattern: "^https://www\\.kan\\.org\\.il/content/kan-news/politic/\\d+/?$",
  },
  {
    id: "c13",
    name: "חדשות 13",
    kind: "text",
    url: "https://13tv.co.il/news/",
    outlet: "חדשות 13",
    pollster: "קמיל פוקס",
    mode: "mixed",
    status: "unverified",
    notes: "מכון ותיק בראשות פרופ' קמיל פוקס. שיטה מעורבת ופרסום עקבי לאורך מערכות בחירות רבות.",
    indexUrls: ["https://13tv.co.il/news/", "https://13tv.co.il/tag/בחירות-2026/"],
    articlePattern: "^https://13tv\\.co\\.il/item/news/",
  },
  {
    id: "i24",
    name: "i24NEWS",
    kind: "text",
    url: "https://www.i24news.tv/he/news/israel-elections-2026/polls",
    outlet: "i24NEWS",
    pollster: "דיירקט פולס",
    mode: "online-panel",
    status: "active",
    notes:
      "פאנל דיגיטלי. מפרסם גודל מדגם — יתרון שקיפות — אך מדגמיו קטנים (כ-500) ומציגים היסטורית הטיה חיובית לימין מול הממוצע. תיקון אפקטי-הבית מטפל בכך.",
    indexUrls: ["https://www.i24news.tv/he/news/israel-elections-2026/polls"],
    articlePattern: "^https://www\\.i24news\\.tv/he/news/israel-elections-2026/.+",
  },
  {
    id: "ynet",
    name: "ynet",
    kind: "text",
    url: "https://www.ynet.co.il/news/category/3082",
    outlet: "ynet",
    pollster: "לא ידוע",
    mode: "unknown",
    status: "unverified",
    notes: "אתר החדשות הנקרא ביותר בישראל. מסקר סקרים של אחרים לצד סקרים משלו, ולכן מזהה המכון אינו קבוע.",
    indexUrls: ["https://www.ynet.co.il/news/category/3082", "https://www.ynet.co.il/elections2026"],
    articlePattern: "^https://www\\.ynet\\.co\\.il/.+/article/",
  },
  {
    id: "israelhayom",
    name: "ישראל היום — מדד בחירות",
    kind: "text",
    url: "https://www.israelhayom.co.il/electionmonitor26",
    outlet: "ישראל היום",
    pollster: "מעריב לאזר",
    mode: "phone",
    status: "unverified",
    notes: "מפעיל מדד בחירות ייעודי. נוטה לכסות סקרים שמיטיבים עם הימין בהבלטה גבוהה יותר — מה שמשפיע על מה שנסרק, ולכן תיקון אפקטי-הבית נמדד מול המכון ולא מול כלי התקשורת.",
    indexUrls: [
      "https://www.israelhayom.co.il/electionmonitor26",
      "https://www.israelhayom.co.il/news/politics/election2026",
    ],
    articlePattern: "^https://www\\.israelhayom\\.co\\.il/news/.+/article/\\d+",
  },
  {
    id: "maariv",
    name: "מעריב",
    kind: "text",
    url: "https://www.maariv.co.il/elections2026",
    outlet: "מעריב",
    pollster: "לאזר",
    mode: "phone",
    status: "failing",
    notes:
      "מכון לאזר, שמדווח גודל מדגם בשקיפות יחסית. האתר החזיר 403 לסורק בריצות הראשונות — ייתכן חסימת בוטים שדורשת התאמה, ולכן הוא מסומן ככושל ולא כפעיל.",
    indexUrls: ["https://www.maariv.co.il/elections2026"],
    articlePattern: "^https://www\\.maariv\\.co\\.il/.+/article-\\d+",
  },
  {
    id: "walla",
    name: "וואלה",
    kind: "text",
    url: "https://elections.walla.co.il/",
    outlet: "וואלה",
    pollster: "לא ידוע",
    mode: "unknown",
    status: "unverified",
    notes: "מדור בחירות ייעודי. מסקר סקרים של ערוצים אחרים, ולכן שימושי בעיקר כרשת ביטחון כשמקור ראשון נשבר.",
    indexUrls: ["https://elections.walla.co.il/", "https://news.walla.co.il/"],
    articlePattern: "^https://(elections|news)\\.walla\\.co\\.il/item/\\d+",
  },
  {
    id: "haaretz",
    name: "הארץ — בחירות 2026",
    kind: "text",
    url: "https://www.haaretz.co.il/news/elections",
    outlet: "הארץ",
    pollster: "לא ידוע",
    mode: "unknown",
    status: "unverified",
    notes: "מדווח סקרים של ערוצים אחרים בפירוט גבוה יחסית, כולל סכומי גושים — מה שמאפשר לגזור מפלגה חסרה. חלק מהתוכן מאחורי תשלום ולכן ייתכן שהסורק יראה רק פסקה ראשונה.",
    indexUrls: ["https://www.haaretz.co.il/news/elections"],
    articlePattern: "^https://www\\.haaretz\\.co\\.il/news/elections/.+",
  },

  // ---- Sector press --------------------------------------------------------
  // Worth its own group: these cover the Haredi and religious-Zionist parties
  // in far more detail than the general press, and those are exactly the
  // parties sitting on the threshold where the forecast is most sensitive.
  {
    id: "srugim",
    name: "סרוגים",
    kind: "text",
    url: "https://www.srugim.co.il/",
    outlet: "סרוגים",
    pollster: "לא ידוע",
    mode: "unknown",
    status: "unverified",
    notes:
      "אתר הציונות הדתית. מסקר בפירוט את הציונות הדתית ואת עוצמה יהודית — שתי מפלגות שמרחפות סביב אחוז החסימה, ששם התחזית רגישה ביותר, ושהעיתונות הכללית מסקרת בגסות.",
    indexUrls: ["https://www.srugim.co.il/category/news"],
    articlePattern: "^https://www\\.srugim\\.co\\.il/\\d+",
  },
  {
    id: "kikar",
    name: "כיכר השבת",
    kind: "text",
    url: "https://www.kikar.co.il/",
    outlet: "כיכר השבת",
    pollster: "לא ידוע",
    mode: "unknown",
    status: "unverified",
    notes:
      "אתר חרדי. מכסה את ש\"ס ואת יהדות התורה לעומק, והוא מהמקורות הבודדים שמדווחים על תנועות פנימיות בהן. מאותה סיבה אין לו כיסוי מאוזן על שאר המפה.",
    indexUrls: ["https://www.kikar.co.il/political-news"],
    articlePattern: "^https://www\\.kikar\\.co\\.il/.+",
  },
  {
    id: "davar",
    name: "דבר",
    kind: "text",
    url: "https://www.davar1.co.il/",
    outlet: "דבר",
    pollster: "לא ידוע",
    mode: "unknown",
    status: "unverified",
    notes: "אתר ההסתדרות. מסקר את מפלגות המרכז-שמאל ואת נתוני ההצבעה המגזריים בפירוט גבוה מהממוצע.",
    indexUrls: ["https://www.davar1.co.il/category/politics/"],
    articlePattern: "^https://www\\.davar1\\.co\\.il/\\d+",
  },
];

export const SOURCE_BY_ID: Record<string, SourceDescriptor> = Object.fromEntries(
  SOURCES.map((s) => [s.id, s]),
);

/** Sources the scraper follows as prose. */
export const TEXT_SOURCES = SOURCES.filter((s) => s.indexUrls.length > 0);

export const KIND_LABELS: Record<SourceKind, string> = {
  structured: "מבני",
  aggregator: "אגרגטור",
  text: "טקסט חופשי",
};

/**
 * These describe the SCRAPER for a source, not the outlet's standing. An outlet
 * can be marked "unverified" here while contributing several polls to the
 * forecast, because those polls were entered by hand from the published report.
 * The distinction matters and the labels say so explicitly.
 */
export const STATUS_LABELS: Record<SourceStatus, string> = {
  active: "הסורק פעיל — החזיר סקרים",
  unverified: "הסורק טרם אומת בריצה חיה",
  failing: "הסורק כושל — לא מחזיר סקרים",
};
