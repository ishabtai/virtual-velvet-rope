import type { Party } from "../types";

/**
 * The parties judged viable for the 26th Knesset (27 October 2026).
 *
 * 38 lists were filed with the Central Elections Committee before the
 * 8 September 2026 deadline; the 14 below are the ones that have registered
 * measurable support in at least one published poll. Everything else is folded
 * into an "other" residual, which matters only because it consumes votes that
 * never convert into seats.
 *
 * Bloc assignment follows the only question that decides an Israeli coalition:
 * whether a party will sit in a Netanyahu-led government. It is a coalition
 * label, not an ideological one — Yisrael Beiteinu is a right-wing party that
 * sits in the "change" bloc, and that is the politically meaningful grouping.
 */
export const PARTIES: Party[] = [
  {
    id: "likud",
    name: "הליכוד",
    leader: "בנימין נתניהו",
    bloc: "netanyahu",
    color: "#1e5aa8",
    seats2022: 32,
    surplusPartner: "religious-zionism",
    note: "מפלגת השלטון; קיימה פריימריז בקיץ 2026",
  },
  {
    id: "yashar",
    name: "ישר",
    leader: "גדי איזנקוט",
    bloc: "change",
    color: "#0f766e",
    seats2022: 0,
    surplusPartner: "byachad",
    note: "מפלגה חדשה; מתחרה על המקום הראשון",
  },
  {
    id: "byachad",
    name: "ביחד",
    leader: "נפתלי בנט ויאיר לפיד",
    bloc: "change",
    color: "#0891b2",
    seats2022: 0,
    surplusPartner: "yashar",
    note: "איחוד בנט–לפיד",
  },
  {
    id: "democrats",
    name: "הדמוקרטים",
    leader: "יאיר גולן",
    bloc: "change",
    color: "#dc2626",
    seats2022: 4,
    surplusPartner: "yisrael-beiteinu",
    note: "איחוד העבודה ומרצ",
  },
  {
    id: "yisrael-beiteinu",
    name: "ישראל ביתנו",
    leader: "אביגדור ליברמן",
    bloc: "change",
    color: "#64748b",
    seats2022: 6,
    surplusPartner: "democrats",
  },
  {
    id: "shas",
    name: "ש\"ס",
    leader: "אריה דרעי",
    bloc: "netanyahu",
    color: "#0f172a",
    seats2022: 11,
    surplusPartner: "utj",
    note: "חרדים ספרדים",
  },
  {
    id: "utj",
    name: "יהדות התורה",
    leader: "יצחק גולדקנופף",
    bloc: "netanyahu",
    color: "#334155",
    seats2022: 7,
    surplusPartner: "shas",
    note: "חרדים אשכנזים",
  },
  {
    id: "otzma",
    name: "עוצמה יהודית",
    leader: "איתמר בן גביר",
    bloc: "netanyahu",
    color: "#854d0e",
    seats2022: 0,
    note: "התפצלה מהציונות הדתית",
  },
  {
    id: "religious-zionism",
    name: "הציונות הדתית–זהות",
    leader: "בצלאל סמוטריץ'",
    bloc: "netanyahu",
    color: "#a16207",
    seats2022: 0,
    surplusPartner: "likud",
    note: "מרחפת סביב אחוז החסימה",
  },
  {
    id: "amcha",
    name: "עמך ישראל",
    leader: "עופר וינטר",
    bloc: "netanyahu",
    color: "#b45309",
    seats2022: 0,
    note: "מפלגה חדשה; נכנסה לסקרים באוגוסט 2026",
  },
  {
    id: "reservists",
    name: "המילואימניקים והכלכלית",
    leader: "יועז הנדל וירון זליכה",
    bloc: "change",
    color: "#7c3aed",
    seats2022: 0,
    note: "מפלגה חדשה; מרחפת סביב אחוז החסימה",
  },
  {
    id: "hadash-taal",
    name: "חד\"ש–תע\"ל",
    leader: "איימן עודה",
    bloc: "arab",
    color: "#15803d",
    seats2022: 5,
    surplusPartner: "raam",
  },
  {
    id: "raam",
    name: "רע\"מ",
    leader: "מנסור עבאס",
    bloc: "arab",
    color: "#166534",
    seats2022: 5,
    surplusPartner: "hadash-taal",
  },
  {
    id: "other",
    name: "רשימות אחרות",
    leader: "—",
    bloc: "change",
    color: "#94a3b8",
    seats2022: 0,
    note: "סך כל הרשימות שאינן חוצות את אחוז החסימה",
  },
];

export const PARTY_BY_ID: Record<string, Party> = Object.fromEntries(
  PARTIES.map((p) => [p.id, p]),
);

/** Every party except the "other" residual, which never wins seats. */
export const REAL_PARTIES = PARTIES.filter((p) => p.id !== "other");

export const BLOC_LABELS: Record<string, string> = {
  netanyahu: "הגוש בראשות נתניהו",
  change: "גוש השינוי",
  arab: "המפלגות הערביות",
};
