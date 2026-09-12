import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLatestForecast, fetchPolls } from "@/lib/api";
import { hebrewDate, pct, pp } from "@/lib/format";
import { KIND_LABELS, SOURCES, STATUS_LABELS, type SourceKind, type SourceStatus } from "@/engine/data/sources";
import { POLLSTERS, DEFAULT_GRADE } from "@/engine/data/pollsters";
import { DEFAULT_CONFIG } from "@/engine/config";
import { pollWeight } from "@/engine/aggregate";
import { PARTY_BY_ID } from "@/engine/data/parties";

const KIND_TONE: Record<SourceKind, string> = {
  structured: "hsl(var(--good))",
  aggregator: "hsl(var(--primary))",
  text: "hsl(var(--muted-foreground))",
};

const STATUS_TONE: Record<SourceStatus, string> = {
  active: "hsl(var(--good))",
  unverified: "hsl(var(--muted-foreground))",
  failing: "hsl(var(--destructive))",
};

export default function Sources() {
  const polls = useQuery({ queryKey: ["polls"], queryFn: fetchPolls });
  const forecast = useQuery({ queryKey: ["forecast"], queryFn: fetchLatestForecast });
  const asOf = forecast.data?.asOf ?? new Date().toISOString().slice(0, 10);

  /**
   * Live contribution per outlet and per institute.
   *
   * Computed from the published poll file with the same `pollWeight` the model
   * uses, not from a hand-maintained table. A legend that is written separately
   * from the thing it describes is wrong the first time anything changes.
   */
  const contribution = useMemo(() => {
    const byOutlet = new Map<string, { count: number; weight: number }>();
    const byPollster = new Map<string, { count: number; weight: number }>();
    let totalWeight = 0;

    for (const poll of polls.data ?? []) {
      if (poll.excludeFromAverage) continue;
      const w = pollWeight(poll, asOf, DEFAULT_CONFIG).weight;
      totalWeight += w;
      for (const [map, key] of [
        [byOutlet, poll.outlet],
        [byPollster, poll.pollster],
      ] as const) {
        const prev = map.get(key) ?? { count: 0, weight: 0 };
        map.set(key, { count: prev.count + 1, weight: prev.weight + w });
      }
    }
    return { byOutlet, byPollster, totalWeight };
  }, [polls.data, asOf]);

  const grouped = useMemo(
    () => ({
      structured: SOURCES.filter((s) => s.kind === "structured"),
      aggregator: SOURCES.filter((s) => s.kind === "aggregator"),
      text: SOURCES.filter((s) => s.kind === "text"),
    }),
    [],
  );

  const cfg = forecast.data?.config ?? DEFAULT_CONFIG;

  return (
    <Layout>
      <header>
        <h1 className="text-3xl font-black">מקרא המקורות</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          כל מקור שהמודל קורא ממנו, מה המשקל שהוא מקבל, ומה כדאי לא לבטוח בו. הרשימה
          הזו אינה מתוחזקת בנפרד — היא ומנוע הסריקה קוראים מאותו קובץ, כך שמקרא שמתאר
          מקור שכבר לא קיים, או שמחמיץ מקור שנוסף, אינו אפשרי.
        </p>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          תגית הסטטוס מתארת את <strong>הסורק</strong> ולא את כלי התקשורת. מקור יכול להיות
          מסומן כלא מאומת ובכל זאת לתרום סקרים לתחזית — אלה סקרים שהוזנו ידנית מהפרסום.
        </p>
      </header>

      {/* ---- How weight is built ---- */}
      <section className="mt-8 panel p-5">
        <h2 className="text-sm font-semibold">איך נקבע המשקל</h2>
        <div className="ltr mt-3 overflow-x-auto rounded-lg bg-secondary/60 px-4 py-3 font-mono text-[13px]">
          weight = recency × sample × grade × mode × partial
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 text-xs">
          {[
            { k: "עדכניות", v: `זמן מחצית ${cfg.recencyHalfLifeDays} ימים`, d: "סקר בן שבועיים שווה מחצית מסקר של היום" },
            { k: "גודל מדגם", v: `תקרה ${cfg.referenceSampleSize.toLocaleString("he-IL")}`, d: "מי שלא מפרסם גודל מדגם מטופל כאילו הוא קטן" },
            { k: "דירוג מכון", v: "0.60–0.95", d: "ציון שקיפות ושיטה, לא טענה על מי צודק" },
            { k: "שיטת דגימה", v: `טלפון ${cfg.modeWeights.phone} · פאנל ${cfg.modeWeights["online-panel"]}`, d: "דגימה הסתברותית מעל פאנל אינטרנטי פתוח" },
            { k: "קנס חלקיות", v: String(cfg.partialPollPenalty), d: "לסקר שחלק מהפילוח שלו שוחזר" },
          ].map((x) => (
            <div key={x.k} className="rounded-lg bg-secondary/40 p-3">
              <div className="label-xs">{x.k}</div>
              <div className="tnum mt-0.5 font-semibold">{x.v}</div>
              <p className="mt-1 leading-relaxed text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Sources by kind ---- */}
      {(["structured", "aggregator", "text"] as SourceKind[]).map((kind) => (
        <section key={kind} className="mt-8">
          <div className="flex items-baseline gap-3">
            <h2 className="text-lg font-bold" style={{ color: KIND_TONE[kind] }}>
              {KIND_LABELS[kind]}
            </h2>
            <span className="tnum text-xs text-muted-foreground">{grouped[kind].length} מקורות</span>
          </div>
          <p className="mt-1 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {kind === "structured" &&
              "המקור הוא כבר טבלה — עמודות הן מפלגות ושורות הן סקרים. שום דבר לא צריך להיות מוסק, ובדרך כלל מפורסמים גם מכון, גודל מדגם ותאריכי שטח. המהימן ביותר בפער."}
            {kind === "aggregator" &&
              "אתרים שתפקידם לאסוף סקרים. מבניים, אך מרחק אחד מהמפרסם — שגיאה אצלם מתפשטת לכאן."}
            {kind === "text" &&
              "פרוזה רגילה. פרסר צריך להסיק איזה מספר שייך לאיזו מפלגה. המהיר ביותר לפרסם והקשה ביותר לקרוא — ולכן כל מה שנקלט מכאן מסומן כלא מאומת אנושית."}
          </p>

          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            {grouped[kind].map((src) => {
              const live = contribution.byOutlet.get(src.outlet);
              const share = live && contribution.totalWeight > 0 ? live.weight / contribution.totalWeight : 0;
              const grade = POLLSTERS.find((p) => p.pollster === src.pollster)?.grade;
              return (
                <div key={src.id} className="panel p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm font-semibold hover:text-primary hover:underline"
                      >
                        {src.name}
                      </a>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">
                        מכון: {src.pollster}
                        {grade !== undefined && (
                          <span className="tnum"> · דירוג {grade.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    <span
                      className="shrink-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px]"
                      style={{
                        background: `color-mix(in srgb, ${STATUS_TONE[src.status]} 14%, transparent)`,
                        color: STATUS_TONE[src.status],
                      }}
                    >
                      {STATUS_LABELS[src.status]}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{src.notes}</p>

                  <div className="hairline mt-3 flex items-center gap-4 pt-3 text-xs">
                    <div>
                      <div className="label-xs" title="כולל סקרים שהוזנו ידנית מהפרסום, לא רק כאלה שנסרקו">
                        סקרים בתחזית
                      </div>
                      <div className="tnum font-semibold">{live?.count ?? 0}</div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="label-xs">חלק מהמשקל הכולל</div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-muted">
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${share * 100}%`, background: KIND_TONE[kind] }}
                          />
                        </div>
                        <span className="tnum w-10 text-left font-semibold">{pct(share, 1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* ---- Institutes ---- */}
      <section className="mt-10">
        <h2 className="text-lg font-bold">מכוני הסקרים</h2>
        <p className="mt-1 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          הדירוג הוא ציון שקיפות ושיטה בטווח [0,1], לא טענה על מי צודק. הוא מתגמל פרסום
          גודל מדגם ותאריכי שטח, פילוח מלא, ודגימה הסתברותית או מעורבת על פני פאנל
          אינטרנטי פתוח. הדירוגים דחוסים בכוונה לטווח צר — אגרגטור שנותן לדירוגים
          להשתולל בסדר גודל בסך הכול מפרסם את המכון האהוב עליו.
        </p>

        {polls.isLoading && <Skeleton className="mt-4 h-64 w-full" />}

        <div className="mt-4 overflow-x-auto panel p-2">
          <table className="w-full min-w-[46rem] text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="p-2 text-right font-medium">מכון</th>
                <th className="p-2 text-left font-medium">דירוג</th>
                <th className="p-2 text-left font-medium">שגיאה היסטורית</th>
                <th className="p-2 text-left font-medium">סקרים</th>
                <th className="p-2 text-left font-medium">חלק מהמשקל</th>
                <th className="p-2 text-left font-medium">אפקט-בית בולט</th>
              </tr>
            </thead>
            <tbody>
              {POLLSTERS.map((p) => {
                const live = contribution.byPollster.get(p.pollster);
                const share = live && contribution.totalWeight > 0 ? live.weight / contribution.totalWeight : 0;
                const effects = forecast.data?.houseEffects?.[p.pollster] ?? {};
                const top = Object.entries(effects)
                  .filter(([, v]) => Math.abs(v) > 0.002)
                  .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))[0];
                return (
                  <tr key={p.pollster} className="border-t border-border/60 align-top">
                    <td className="p-2">
                      <div className="font-medium">{p.pollster}</div>
                      <p className="mt-0.5 max-w-md text-[11px] leading-relaxed text-muted-foreground">
                        {p.notes}
                      </p>
                    </td>
                    <td className="tnum p-2 text-left font-semibold">{p.grade.toFixed(2)}</td>
                    <td className="tnum p-2 text-left text-muted-foreground">
                      {p.meanAbsSeatError !== null ? `${p.meanAbsSeatError} מנדטים` : "—"}
                      <div className="text-[10px]">{p.elections} מערכות</div>
                    </td>
                    <td className="tnum p-2 text-left">{live?.count ?? 0}</td>
                    <td className="tnum p-2 text-left">{pct(share, 1)}</td>
                    <td className="p-2 text-left">
                      {top ? (
                        <span className="tnum whitespace-nowrap text-xs">
                          {PARTY_BY_ID[top[0]]?.name ?? top[0]}{" "}
                          <span style={{ color: top[1] > 0 ? "hsl(var(--good))" : "hsl(var(--destructive))" }}>
                            {pp(top[1])}
                          </span>
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              <tr className="border-t border-border/60">
                <td className="p-2 text-muted-foreground">מכון ללא פרופיל</td>
                <td className="tnum p-2 text-left">{DEFAULT_GRADE.toFixed(2)}</td>
                <td className="p-2 text-left text-muted-foreground">—</td>
                <td className="p-2 text-left text-muted-foreground">—</td>
                <td className="p-2 text-left text-muted-foreground">—</td>
                <td className="p-2 text-left text-muted-foreground">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-6 text-xs text-muted-foreground">
        נכון ל-{hebrewDate(asOf)}. חלקי המשקל מחושבים מקובץ הסקרים המפורסם באותה פונקציה
        שמריצה את התחזית עצמה.
      </p>
    </Layout>
  );
}
