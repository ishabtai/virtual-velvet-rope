import type { FullForecast } from "./forecast";
import { BLOC_LABELS, PARTY_BY_ID } from "./data/parties";

/**
 * The daily report.
 *
 * Written to a fixed structure so that two consecutive days are comparable:
 * the same sections, in the same order, describing the same quantities. A daily
 * brief whose shape changes with the news is a column, not a report — you
 * cannot tell whether the forecast moved or the writer did.
 *
 * Everything here is generated from the forecast object. No sentence in the
 * output asserts anything the model did not compute.
 */

export interface DailyReport {
  date: string;
  headline: string;
  sections: { title: string; body: string }[];
  /** One-line bullets for the summary card on the home page. */
  bullets: string[];
}

const pct = (x: number) => `${(x * 100).toFixed(0)}%`;
const pct1 = (x: number) => `${(x * 100).toFixed(1)}%`;
const seats = (x: number) => x.toFixed(1).replace(/\.0$/, "");
const name = (id: string) => PARTY_BY_ID[id]?.name ?? id;

function hebrewDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function generateReport(f: FullForecast, previous?: FullForecast): DailyReport {
  const [first, second] = f.parties;
  const net = f.blocs.find((b) => b.bloc === "netanyahu")!;
  const change = f.blocs.find((b) => b.bloc === "change")!;
  const arab = f.blocs.find((b) => b.bloc === "arab")!;
  const topPm = f.pmProbability[0];

  const gap = first.meanSeats - second.meanSeats;
  const headline =
    Math.abs(gap) < 1
      ? `${name(first.partyId)} ו${name(second.partyId)} צמודות בראש — ${seats(first.meanSeats)} מול ${seats(second.meanSeats)} מנדטים`
      : `${name(first.partyId)} מובילה עם ${seats(first.meanSeats)} מנדטים, ${seats(gap)} לפני ${name(second.partyId)}`;

  const sections: { title: string; body: string }[] = [];

  // --- 1. The state of play ---
  sections.push({
    title: "תמונת המצב",
    body: [
      `נכון ל-${hebrewDate(f.asOf)}, ${f.daysToElection} ימים לפני הבחירות לכנסת ה-26, התחזית מבוססת על ${f.pollsUsed} סקרים שקיבלו משקל לא-זניח — משקל אפקטיבי של ${f.effectivePollCount.toFixed(1)} סקרים מלאים.`,
      `${name(first.partyId)} מקבלת ${seats(first.meanSeats)} מנדטים בממוצע (טווח 80%: ${first.low80}–${first.high80}) ו-${name(second.partyId)} ${seats(second.meanSeats)} (${second.low80}–${second.high80}).`,
      `ההסתברות ש${name(first.partyId)} תהיה המפלגה הגדולה ביותר עומדת על ${pct(first.pLargest)}, מול ${pct(second.pLargest)} ל${name(second.partyId)}.`,
      `חשוב להבהיר: המפלגה הגדולה אינה מרכיבה בהכרח את הממשלה. בישראל הנשיא מטיל את המנדט על מי שמסוגל להציג 61 תומכים, ופער של מנדט או שניים בראש הטבלה משנה הרבה פחות מהרכב הגושים.`,
    ].join(" "),
  });

  // --- 2. Bloc arithmetic ---
  sections.push({
    title: "חשבון הגושים",
    body: [
      `${BLOC_LABELS.netanyahu} עומד על ${seats(net.meanSeats)} מנדטים (${net.low80}–${net.high80}) עם ${pct1(net.pMajority)} סיכוי להגיע ל-61 לבדו.`,
      `${BLOC_LABELS.change} עומד על ${seats(change.meanSeats)} (${change.low80}–${change.high80}) עם ${pct1(change.pMajority)}.`,
      `${BLOC_LABELS.arab} — ${seats(arab.meanSeats)} מנדטים (${arab.low80}–${arab.high80}).`,
      `ההסתברות לתיקו פוליטי — מצב שבו אף גוש אינו מגיע ל-61 והמסלול דרך המפלגות הערביות אינו נסגר — היא ${pct1(f.pDeadlock)}. זהו התרחיש שמוביל היסטורית לסבב בחירות נוסף, והוא כרגע אחד התרחישים הבודדים בעלי המשקל הגבוה ביותר.`,
    ].join(" "),
  });

  // --- 3. The threshold watch: usually the real story ---
  const atRisk = f.parties
    .filter((p) => p.pAboveThreshold > 0.02 && p.pAboveThreshold < 0.97)
    .sort((a, b) => a.pAboveThreshold - b.pAboveThreshold);
  if (atRisk.length > 0) {
    sections.push({
      title: "מעקב אחוז החסימה",
      body: [
        `${atRisk.length} מפלגות נמצאות בטווח ההכרעה של אחוז החסימה (3.25%):`,
        atRisk
          .map((p) => `${name(p.partyId)} — ${pct1(p.share)} מהקולות, ${pct(p.pAboveThreshold)} סיכוי לעבור`)
          .join("; ") + ".",
        `זהו מקור אי-הוודאות הגדול ביותר בתחזית כולה. מפלגה שנופלת מתחת לאחוז החסימה אינה מאבדת מנדט אחד אלא את כל ארבעת המנדטים שלה, והקולות שלה מתחלקים מחדש בין כל שאר המפלגות — כולל יריבותיה. ${atRisk.filter((p) => PARTY_BY_ID[p.partyId]?.bloc === "netanyahu").length} מהן שייכות לגוש נתניהו, ולכן כשל של אחת מהן משנה את חשבון ה-61 יותר מכל תזוזה סבירה בסקרים.`,
      ].join(" "),
    });
  }

  // --- 4. Movement since yesterday ---
  if (previous) {
    const moves = f.parties
      .map((p) => {
        const before = previous.parties.find((q) => q.partyId === p.partyId);
        return { p, delta: before ? p.meanSeats - before.meanSeats : 0 };
      })
      .filter((m) => Math.abs(m.delta) >= 0.3)
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
    sections.push({
      title: "תזוזה מאז הדוח הקודם",
      body:
        moves.length === 0
          ? `אין תזוזה משמעותית מאז הדוח הקודם (${hebrewDate(previous.asOf)}). היעדר תזוזה אינו היעדר מידע: הוא אומר שהסקרים שהתפרסמו מאז אישרו את התמונה הקיימת.`
          : moves
              .map(
                (m) =>
                  `${name(m.p.partyId)} ${m.delta > 0 ? "+" : ""}${m.delta.toFixed(1)} מנדטים`,
              )
              .join(", ") +
            `. יש לזכור שתזוזה יומית בממוצע סקרים משוקלל היא כמעט תמיד רעש ולא מגמה — הממוצע זז גם כשאף בוחר לא שינה את דעתו, פשוט מפני שסקר ישן איבד משקל.`,
    });
  }

  // --- 5. Coalition paths ---
  const topCoalitions = [...f.coalitions]
    .sort((a, b) => b.probability * b.plausibility - a.probability * a.plausibility)
    .slice(0, 3);
  sections.push({
    title: "מסלולי הרכבת קואליציה",
    body:
      topCoalitions
        .map(
          (c) =>
            `${c.label}: ${seats(c.meanSeats)} מנדטים בממוצע, ${pct1(c.probability)} סיכוי אריתמטי להגיע ל-61, סבירות פוליטית ${c.plausibility.toFixed(2)}`,
        )
        .join(". ") +
      `. שני המספרים נשמרים בנפרד בכוונה. ההסתברות האריתמטית היא חישוב בלבד; הסבירות הפוליטית היא הערכת אנליסט מוצהרת. קואליציה יכולה להיות ודאית מבחינה חשבונית וחסרת סיכוי מבחינה פוליטית.`,
  });

  // --- 6. Who forms the government ---
  sections.push({
    title: "מי ירכיב ממשלה",
    body:
      (topPm
        ? `ההסתברות הגבוהה ביותר לראשות הממשלה: ${topPm.leader} — ${pct1(topPm.probability)}. `
        : "") +
      (f.pmProbability.length > 1
        ? `אחריו: ` +
          f.pmProbability
            .slice(1, 4)
            .map((p) => `${p.leader} ${pct1(p.probability)}`)
            .join(", ") +
          ". "
        : "") +
      `ללא הכרעה — ${pct1(f.pDeadlock)}. ההסתברויות האלה כוללות את הסבירות הפוליטית של כל מסלול, ולכן אינן זהות להסתברות האריתמטית של הגושים.`,
  });

  // --- 7. What the model is not telling you ---
  sections.push({
    title: "מגבלות התחזית",
    body: [
      `אי-הוודאות בתחזית זו מוכפלת פי ${f.uncertaintyMultiplier.toFixed(2)} לעומת תחזית ביום הבחירות עצמו, בשל המרחק מהמועד.`,
      f.socialEnabled
        ? `אות הרשתות החברתיות פעיל ומוגבל לתזוזה של עד ${f.config.socialMaxAdjustmentPp} נקודות אחוז למפלגה.`
        : `אות הרשתות החברתיות אינו משפיע על התחזית הראשית: הנתונים מסומנים כנתוני הדגמה ולא כנתונים מאומתים, והמנוע מאפס את התיקון עד לחיבור מקור מאומת.`,
      `מקור השגיאה שאינו מופיע בטווחי הביטחון הוא שגיאה שיטתית המשותפת לכל הסוקרים. אם כל המכונים בישראל מפספסים את אותה אוכלוסייה באותו כיוון — כפי שקרה ב-2015 וב-2022 — שום ממוצע סקרים לא יגלה זאת, כולל זה.`,
    ].join(" "),
  });

  const bullets = [
    `${name(first.partyId)} ${seats(first.meanSeats)} מנדטים · ${name(second.partyId)} ${seats(second.meanSeats)}`,
    `${BLOC_LABELS.netanyahu}: ${seats(net.meanSeats)} (${pct1(net.pMajority)} ל-61)`,
    `${BLOC_LABELS.change}: ${seats(change.meanSeats)} (${pct1(change.pMajority)} ל-61)`,
    `סיכוי לתיקו פוליטי: ${pct1(f.pDeadlock)}`,
    atRisk.length > 0
      ? `${atRisk.length} מפלגות בטווח הכרעה של אחוז החסימה`
      : `אין מפלגה בטווח הכרעה של אחוז החסימה`,
  ];

  return { date: f.asOf, headline, sections, bullets };
}

export function reportToMarkdown(r: DailyReport, f: FullForecast): string {
  const lines: string[] = [];
  lines.push(`# דוח יומי — ${hebrewDate(r.date)}`);
  lines.push("");
  lines.push(`**${r.headline}**`);
  lines.push("");
  lines.push(`_${f.daysToElection} ימים לבחירות · ${f.pollsUsed} סקרים · ${f.config.simulations.toLocaleString("he-IL")} סימולציות_`);
  lines.push("");
  for (const s of r.sections) {
    lines.push(`## ${s.title}`);
    lines.push("");
    lines.push(s.body);
    lines.push("");
  }
  lines.push("## טבלת מנדטים");
  lines.push("");
  lines.push("| מפלגה | אחוז קולות | מנדטים (ממוצע) | טווח 80% | סיכוי לעבור אחוז חסימה |");
  lines.push("| --- | --- | --- | --- | --- |");
  for (const p of f.parties) {
    lines.push(
      `| ${name(p.partyId)} | ${pct1(p.share)} | ${seats(p.meanSeats)} | ${p.low80}–${p.high80} | ${pct(p.pAboveThreshold)} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}
