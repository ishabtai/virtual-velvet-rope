import { PARTY_BY_ID } from "@/engine/data/parties";
import { GROUP_LABELS } from "@/engine/calibration";
import { HISTORICAL_MISSES, PUBLISHED_BENCHMARK } from "@/engine/data/calibration";
import { hebrewDate, signed } from "@/lib/format";
import type { ForecastSnapshot } from "@/lib/api";

/**
 * The poll-to-result correction, shown rather than applied quietly.
 *
 * A model that silently moves the right up by a seat is indistinguishable from
 * a model with its thumb on the scale. The only thing that separates them is
 * whether the reader can see the correction, its size, and the record it came
 * from — so all three are on the page, including the historical rows that argue
 * for a LARGER correction than the one actually applied.
 */
export function CalibrationPanel({ forecast }: { forecast: ForecastSnapshot }) {
  const cal = forecast.calibration;
  if (!cal) return null;

  const seats = (share: number) => (share / 0.955) * forecast.config.totalSeats;
  const moved = Object.entries(cal.partyAdjustments)
    .map(([partyId, v]) => ({ partyId, seats: seats(v) }))
    .filter((x) => Math.abs(x.seats) >= 0.05)
    .sort((a, b) => b.seats - a.seats);

  const byElection = [...HISTORICAL_MISSES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="mt-8 panel p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold">תיקון מול תוצאות אמת</h2>
        <span className="tnum text-xs text-muted-foreground">
          סך תזוזה {cal.totalSeatsMoved.toFixed(1)} מנדטים
        </span>
      </div>

      <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        כל שאר המודל מודד סקרים מול סקרים. תיקוני אפקטי-הבית ממורכזים לאפס
        בהגדרה, ולכן אם כל הענף מחמיץ את אותם מצביעים באותו כיוון — בדיוק מה שקרה
        ב-2015, באפריל 2019 ושוב ב-2022 — שום חשבון בין מכונים לא יראה את זה. המכשיר
        היחיד שיכול הוא ספירת הקולות עצמה.
      </p>

      {/* ---- What was applied ---- */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="label-xs">התיקון שהוחל</h3>
          <div className="mt-2 space-y-1">
            {moved.map((m) => (
              <div key={m.partyId} className="flex items-center gap-2 text-xs">
                <span className="w-32 shrink-0 truncate">
                  {PARTY_BY_ID[m.partyId]?.name ?? m.partyId}
                </span>
                <div className="relative h-1.5 flex-1 rounded-full bg-muted">
                  <div
                    className="absolute top-0 h-1.5 rounded-full"
                    style={{
                      insetInlineStart: m.seats > 0 ? "50%" : `${50 - Math.min(50, Math.abs(m.seats) * 40)}%`,
                      width: `${Math.min(50, Math.abs(m.seats) * 40)}%`,
                      background: m.seats > 0 ? "hsl(var(--good))" : "hsl(var(--destructive))",
                    }}
                  />
                  <div className="absolute inset-y-0 left-1/2 w-px bg-border" />
                </div>
                <span className="tnum w-12 text-left">{signed(m.seats, 2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Why it is this small ---- */}
        <div className="text-xs leading-relaxed text-muted-foreground">
          <h3 className="label-xs">למה התיקון קטן כל כך</h3>
          <ul className="mt-2 list-disc space-y-1.5 pr-4">
            <li>
              <strong>ארבע מערכות בחירות הן מדגם זעיר.</strong> הממוצע של ארבעה מספרים
              רועשים הוא בעצמו רועש, והחלה שלו כפי שהוא היא דיוק מדומה. התיקון מתכווץ
              לפי n/(n+3).
            </li>
            <li>
              <strong>השגיאה מצטמצמת.</strong> הליכוד הוערך בחסר בשמונה מנדטים ב-2015
              ובמנדט וחצי ב-2022 — הסוקרים הסתגלו. שקלול העדכניות מטפל במגמה.
            </li>
            <li>
              <strong>רוב הפער ההיסטורי אינו הטיה.</strong> באפריל 2019 ושוב ב-2022
              רשימות קטנות נפלו מתחת לאחוז החסימה ושחררו מנדטים לגדולות. המודל מדמה
              את המנגנון הזה ישירות, וספירתו שוב כהטיה הייתה כפל.
            </li>
          </ul>
          <p className="mt-3">
            אומדן שפורסם חוצה-מערכות מעמיד את ההערכה בחסר של גוש הימין על{" "}
            <span className="tnum">{PUBLISHED_BENCHMARK.rightUnderPredictedSeats}</span>{" "}
            מנדטים ({PUBLISHED_BENCHMARK.elections}). המודל מחיל פחות מרבע מזה, בכוונה.
          </p>
        </div>
      </div>

      {/* ---- The record ---- */}
      <div className="hairline mt-5 pt-4">
        <h3 className="label-xs">הרשומה ההיסטורית</h3>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-xs">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="p-1.5 text-right font-medium">בחירות</th>
                <th className="p-1.5 text-right font-medium">גוש</th>
                <th className="p-1.5 text-left font-medium">סקרים</th>
                <th className="p-1.5 text-left font-medium">תוצאה</th>
                <th className="p-1.5 text-left font-medium">פער</th>
                <th className="p-1.5 text-right font-medium">מקור</th>
              </tr>
            </thead>
            <tbody>
              {byElection.map((m, i) => {
                const gap = m.actual - m.polled;
                return (
                  <tr key={i} className="border-t border-border/60">
                    <td className="whitespace-nowrap p-1.5">
                      {hebrewDate(m.date, { day: undefined })}
                      <div className="text-[10px] text-muted-foreground">כנסת ה-{m.knesset}</div>
                    </td>
                    <td className="p-1.5">
                      {GROUP_LABELS[m.group]}
                      {m.confidence === "approx" && (
                        <span className="mr-1 text-[10px] text-muted-foreground">(מקורב)</span>
                      )}
                    </td>
                    <td className="tnum p-1.5 text-left">{m.polled}</td>
                    <td className="tnum p-1.5 text-left font-semibold">{m.actual}</td>
                    <td
                      className="tnum p-1.5 text-left font-semibold"
                      style={{ color: gap > 0 ? "hsl(var(--good))" : "hsl(var(--destructive))" }}
                    >
                      {signed(gap, 1)}
                    </td>
                    <td className="p-1.5 text-right">
                      <a
                        href={m.source}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-primary hover:underline"
                      >
                        מקור ←
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---- The variance finding ---- */}
      <div
        className="mt-5 rounded-lg border px-4 py-3 text-xs leading-relaxed"
        style={{ borderColor: "hsl(var(--warn) / 0.35)", background: "hsl(var(--warn) / 0.08)" }}
      >
        <strong className="font-semibold">
          הבדיקה מול ההיסטוריה שינתה יותר מהמרכז — היא שינתה את רוחב הטווח.
        </strong>{" "}
        הפערים ברמת הגוש בין הסקרים הסופיים לספירה נעים בין מנדט אחד לשמונה, עם סטיית
        תקן של כ-3.5 מנדטים. המודל הניח קודם כ-1.6 — כלומר הוא הֵקֵל בשגיאה המסוכנת
        ביותר בסקרים בישראל ביותר מפי שניים, וכל הסתברות להגיע ל-61 הייתה בטוחה מדי.
        תיקון המרכז לבדו היה מחמיר את זה: הוא היה מזיז את האומדן ומשאיר את הטווח צר
        מכדי להכיל את האמת.
      </div>
    </section>
  );
}
