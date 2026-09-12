import type { PollsterProfile } from "../types";

/**
 * Institute quality grades.
 *
 * `grade` is a transparency-and-method score in [0,1], not a claim about who is
 * "right". It rewards: disclosing sample size, disclosing fieldwork dates,
 * publishing a full party-by-party breakdown, and using probability-based or
 * mixed-mode sampling rather than a pure opt-in web panel. Where an institute
 * has a public track record of final pre-election polls, that is recorded in
 * `meanAbsSeatError` and folded into the grade.
 *
 * Grades are deliberately compressed into a narrow band (0.6-0.95). A poll
 * aggregator that lets grades swing an order of magnitude is really just
 * publishing its favourite pollster.
 */
export const POLLSTERS: PollsterProfile[] = [
  {
    pollster: "מדגם",
    grade: 0.92,
    elections: 5,
    meanAbsSeatError: 2.1,
    notes:
      "מנהל שיטת מדידה מעורבת (טלפון + פאנל) עבור חדשות 12. ותק ארוך וסטייה היסטורית נמוכה יחסית; לא תמיד מפרסם גודל מדגם.",
  },
  {
    pollster: "כאן מחקרים",
    grade: 0.9,
    elections: 4,
    meanAbsSeatError: 2.3,
    notes:
      "סקרי תאגיד השידור הציבורי. דגימה טלפונית עם משקל מוגבר לציבור הערבי והחרדי — שתי האוכלוסיות שסקרים מחמיצים באופן שיטתי.",
  },
  {
    pollster: "קמיל פוקס",
    grade: 0.88,
    elections: 6,
    meanAbsSeatError: 2.4,
    notes: "מכון ותיק עבור חדשות 13. שיטה מעורבת, פרסום עקבי.",
  },
  {
    pollster: "לאזר",
    grade: 0.85,
    elections: 4,
    meanAbsSeatError: 2.6,
    notes: "סוקר עבור מעריב/פאנל4. דיווח שקוף יחסית של גודל המדגם.",
  },
  {
    pollster: "פאנלס פוליטיקס",
    grade: 0.8,
    elections: 4,
    meanAbsSeatError: 2.9,
    notes: "פאנל אינטרנטי. תדירות גבוהה, שונות גבוהה יותר בין סקר לסקר.",
  },
  {
    pollster: "דיירקט פולס",
    grade: 0.7,
    elections: 3,
    meanAbsSeatError: 3.4,
    notes:
      "פאנל דיגיטלי בראשות צוריאל שרון עבור i24NEWS. מפרסם גודל מדגם — יתרון שקיפות — אך מדגמיו קטנים (כ-500) ומציגים היסטורית הטיה חיובית לימין מול הממוצע. תיקון ההטיה ב-houseEffects מטפל בכך.",
  },
];

export const POLLSTER_BY_NAME: Record<string, PollsterProfile> = Object.fromEntries(
  POLLSTERS.map((p) => [p.pollster, p]),
);

/** Grade used for an institute with no profile on file. */
export const DEFAULT_GRADE = 0.6;
