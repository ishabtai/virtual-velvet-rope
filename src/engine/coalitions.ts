import type { CoalitionScenario, ModelConfig } from "./types";
import { PARTY_BY_ID } from "./data/parties";
import type { SimulationResult } from "./simulate";

/**
 * Coalition arithmetic.
 *
 * Seats decide who CAN form a government; politics decides who WILL. The model
 * keeps these strictly separate and reports both, because collapsing them is
 * the most common way election coverage misleads people:
 *
 *  - `probability` is pure arithmetic — the share of simulations in which this
 *    exact set of parties reaches 61 seats. It contains no judgement at all.
 *  - `plausibility` is an explicit, labelled analyst prior on whether these
 *    parties would actually sit together, given what their leaders have ruled
 *    out. It is a judgement, it is stated as one, and it is never silently
 *    multiplied into the headline seat numbers.
 *
 * A coalition can be arithmetically near-certain and politically near-dead —
 * a Likud-Yashar unity government is the obvious case — and the site shows
 * both numbers side by side rather than picking one.
 */

const NETANYAHU_BLOC = ["likud", "shas", "utj", "otzma", "religious-zionism", "amcha"];
const CHANGE_BLOC = ["yashar", "byachad", "democrats", "yisrael-beiteinu", "reservists"];
const ARAB_BLOC = ["hadash-taal", "raam"];

interface ScenarioSpec {
  id: string;
  label: string;
  members: string[];
  plausibility: number;
  reasoning: string;
}

const SCENARIOS: ScenarioSpec[] = [
  {
    id: "netanyahu-bloc",
    label: "ממשלת נתניהו — הגוש הנוכחי",
    members: NETANYAHU_BLOC,
    plausibility: 0.95,
    reasoning:
      "הקואליציה היוצאת בתוספת 'עמך ישראל' של וינטר. כל המפלגות בגוש הצהירו על תמיכה בנתניהו לראשות הממשלה, ולכן אם האריתמטיקה מסתדרת — הממשלה קמה. הסיכון העיקרי אינו פוליטי אלא חשבוני: הציונות הדתית–זהות ועמך ישראל מרחפות סביב אחוז החסימה, וכישלון של אחת מהן מוחק ארבעה מנדטים מהגוש.",
  },
  {
    id: "change-bloc",
    label: "ממשלת שינוי — ללא המפלגות הערביות",
    members: CHANGE_BLOC,
    plausibility: 0.9,
    reasoning:
      "ישר, ביחד, הדמוקרטים, ישראל ביתנו והמילואימניקים. זו הקואליציה שאיזנקוט מכוון אליה במפורש. החיכוך הפנימי — ליברמן מול גולן בנושאי דת ומדינה — משמעותי אך פחות מהמשותף: הסכמה על החלפת נתניהו. תלויה קריטית בשאלה אם הנדל–זליכה חוצים את אחוז החסימה.",
  },
  {
    id: "change-plus-arab-support",
    label: "ממשלת שינוי בתמיכת המפלגות הערביות",
    members: [...CHANGE_BLOC, ...ARAB_BLOC],
    plausibility: 0.45,
    reasoning:
      "תמיכה מבחוץ או שותפות מלאה של חד\"ש–תע\"ל ורע\"מ. תקדים ממשלת בנט–לפיד (2021) מוכיח שזה אפשרי עם רע\"מ, אך ליברמן וחלק מישר הביעו הסתייגות, וחד\"ש–תע\"ל עצמה סירבה היסטורית להיכנס לקואליציה. הסתברות פוליטית בינונית — ולכן היא מוצגת בנפרד ולא מוזגת לתרחיש הגוש.",
  },
  {
    id: "unity-without-netanyahu",
    label: "ממשלת אחדות — ליכוד ללא נתניהו",
    members: ["likud", "yashar", "byachad", "yisrael-beiteinu"],
    plausibility: 0.25,
    reasoning:
      "תרחיש שנפתח רק אם הליכוד מחליף מנהיגות אחרי הבחירות. איזנקוט וליברמן לא פסלו ישיבה עם הליכוד — הם פסלו ישיבה עם נתניהו. אריתמטית זו אחת הקואליציות הקלות ביותר להרכבה; פוליטית היא דורשת אירוע שטרם קרה.",
  },
  {
    id: "grand-coalition",
    label: "ממשלת אחדות רחבה — ליכוד וישר",
    members: ["likud", "yashar"],
    plausibility: 0.12,
    reasoning:
      "שתי המפלגות הגדולות בלבד. חוסמת מבוי סתום אך דורשת מאיזנקוט לחזור בו מהתחייבותו המרכזית. מוצגת כי האריתמטיקה שלה כמעט תמיד עובדת — וזו בדיוק הסיבה לא להסיק ממנה מסקנות.",
  },
];

function seatsFor(sim: SimulationResult, members: string[], i: number): number {
  let n = 0;
  for (const m of members) n += sim.seatSamples[m]?.[i] ?? 0;
  return n;
}

export function evaluateCoalitions(
  sim: SimulationResult,
  config: ModelConfig,
): CoalitionScenario[] {
  const n = sim.simulations;
  return SCENARIOS.map((spec) => {
    let hits = 0;
    let total = 0;
    for (let i = 0; i < n; i++) {
      const seats = seatsFor(sim, spec.members, i);
      total += seats;
      if (seats >= config.majority) hits++;
    }
    return {
      id: spec.id,
      label: spec.label,
      members: spec.members,
      probability: hits / n,
      meanSeats: total / n,
      plausibility: spec.plausibility,
      reasoning: spec.reasoning,
    };
  }).sort((a, b) => b.probability * b.plausibility - a.probability * a.plausibility);
}

export interface GovernmentOutlook {
  pmProbability: { leader: string; partyId: string; probability: number }[];
  /** Probability no bloc reaches 61 and the Arab-party route is also short. */
  pDeadlock: number;
}

/**
 * Probability each leader ends up as prime minister.
 *
 * Resolved per simulation, in the order Israeli coalition-building actually
 * runs: the president gives the mandate to whoever can demonstrate 61
 * supporters. Within a simulation:
 *
 *   - If the Netanyahu bloc has 61, Netanyahu forms a government. This bloc has
 *     never failed to coalesce when it had the seats.
 *   - Otherwise, if the non-Netanyahu Zionist bloc has 61, the mandate goes to
 *     the largest party in it — Eisenkot or Bennett-Lapid, decided by that
 *     simulation's own seat draw, not by today's average.
 *   - Otherwise, if that bloc reaches 61 only with the Arab parties, the
 *     government forms with probability equal to the scenario's plausibility
 *     (0.45), and the remainder flows to deadlock.
 *   - Otherwise: deadlock — no 61 available on either side, which in Israel
 *     means a fifth election rather than a government.
 *
 * The fractional credit is what makes this a probability and not a story.
 */
export function governmentOutlook(
  sim: SimulationResult,
  config: ModelConfig,
): GovernmentOutlook {
  const n = sim.simulations;
  const credit: Record<string, number> = {};
  let deadlock = 0;

  const ARAB_SUPPORT_PLAUSIBILITY = 0.45;

  for (let i = 0; i < n; i++) {
    const net = seatsFor(sim, NETANYAHU_BLOC, i);
    const change = seatsFor(sim, CHANGE_BLOC, i);
    const arab = seatsFor(sim, ARAB_BLOC, i);

    if (net >= config.majority) {
      credit.likud = (credit.likud ?? 0) + 1;
      continue;
    }
    if (change >= config.majority) {
      const winner = largestIn(sim, CHANGE_BLOC, i);
      credit[winner] = (credit[winner] ?? 0) + 1;
      continue;
    }
    if (change + arab >= config.majority) {
      const winner = largestIn(sim, CHANGE_BLOC, i);
      credit[winner] = (credit[winner] ?? 0) + ARAB_SUPPORT_PLAUSIBILITY;
      deadlock += 1 - ARAB_SUPPORT_PLAUSIBILITY;
      continue;
    }
    deadlock++;
  }

  const pmProbability = Object.entries(credit)
    .map(([partyId, c]) => ({
      partyId,
      leader: PARTY_BY_ID[partyId]?.leader ?? partyId,
      probability: c / n,
    }))
    .filter((p) => p.probability > 0.001)
    .sort((a, b) => b.probability - a.probability);

  return { pmProbability, pDeadlock: deadlock / n };
}

function largestIn(sim: SimulationResult, members: string[], i: number): string {
  let best = members[0];
  let bestSeats = -1;
  for (const m of members) {
    const s = sim.seatSamples[m]?.[i] ?? 0;
    if (s > bestSeats) {
      bestSeats = s;
      best = m;
    }
  }
  return best;
}

export { NETANYAHU_BLOC, CHANGE_BLOC, ARAB_BLOC };
