import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchArchive, fetchForecast, fetchLatestReport, fetchReport } from "@/lib/api";
import { hebrewDate, pct, seats } from "@/lib/format";
import { PARTY_BY_ID } from "@/engine/data/parties";
import { cn } from "@/lib/utils";

export default function Report() {
  const archive = useQuery({ queryKey: ["archive"], queryFn: fetchArchive });
  const [selected, setSelected] = useState<string | null>(null);

  const latest = useQuery({ queryKey: ["report"], queryFn: fetchLatestReport });
  const date = selected ?? latest.data?.date ?? null;

  const report = useQuery({
    queryKey: ["report", date],
    queryFn: () => fetchReport(date!),
    enabled: !!date && date !== latest.data?.date,
  });
  const forecast = useQuery({
    queryKey: ["forecast", date],
    queryFn: () => fetchForecast(date!),
    enabled: !!date,
  });

  const shown = date === latest.data?.date ? latest.data : report.data;

  return (
    <Layout>
      <header>
        <h1 className="text-3xl font-black">הדוח היומי</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          דוח נוצר אוטומטית בכל בוקר, במבנה קבוע. אותם סעיפים, באותו סדר, המתארים את אותם
          גדלים — כדי שאפשר יהיה להשוות בין שני ימים עוקבים ולראות אם התחזית זזה או רק
          הניסוח. אף משפט בדוח אינו טוען דבר שהמודל לא חישב.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_15rem]">
        <div>
          {!shown && <Skeleton className="h-96 w-full" />}
          {shown && (
            <article className="panel p-6">
              <div className="text-xs text-muted-foreground">{hebrewDate(shown.date)}</div>
              <h2 className="mt-1 text-2xl font-black leading-tight">{shown.headline}</h2>

              {forecast.data && (
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                  <span className="tnum">{forecast.data.daysToElection} ימים לבחירות</span>
                  <span className="tnum">{forecast.data.pollsUsed} סקרים</span>
                  <span className="tnum">
                    משקל אפקטיבי {forecast.data.effectivePollCount.toFixed(1)}
                  </span>
                  <span className="tnum">
                    {forecast.data.config.simulations.toLocaleString("he-IL")} סימולציות
                  </span>
                </div>
              )}

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {shown.bullets.map((b, i) => (
                  <li key={i} className="rounded-lg bg-secondary/50 px-3 py-2 text-sm">
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-6">
                {shown.sections.map((s) => (
                  <section key={s.title}>
                    <h3 className="text-sm font-bold text-primary">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{s.body}</p>
                  </section>
                ))}
              </div>

              {forecast.data && (
                <div className="hairline mt-8 pt-5">
                  <h3 className="text-sm font-bold">טבלת מנדטים מלאה</h3>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[30rem] text-sm">
                      <thead>
                        <tr className="text-right text-[11px] uppercase tracking-wide text-muted-foreground">
                          <th className="pb-2 font-medium">מפלגה</th>
                          <th className="pb-2 text-left font-medium">אחוז קולות</th>
                          <th className="pb-2 text-left font-medium">מנדטים</th>
                          <th className="pb-2 text-left font-medium">טווח 80%</th>
                          <th className="pb-2 text-left font-medium">סיכוי לעבור</th>
                        </tr>
                      </thead>
                      <tbody>
                        {forecast.data.parties.map((p) => (
                          <tr key={p.partyId} className="border-t border-border/60">
                            <td className="py-1.5">
                              <span className="flex items-center gap-2">
                                <span
                                  className="inline-block h-2.5 w-2.5 rounded-sm"
                                  style={{ background: PARTY_BY_ID[p.partyId]?.color }}
                                />
                                {PARTY_BY_ID[p.partyId]?.name ?? p.partyId}
                              </span>
                            </td>
                            <td className="tnum py-1.5 text-left">{pct(p.share, 2)}</td>
                            <td className="tnum py-1.5 text-left font-semibold">
                              {seats(p.meanSeats)}
                            </td>
                            <td className="tnum py-1.5 text-left text-muted-foreground">
                              {p.low80}–{p.high80}
                            </td>
                            <td
                              className="tnum py-1.5 text-left"
                              style={{
                                color:
                                  p.pAboveThreshold < 0.98 && p.pAboveThreshold > 0.02
                                    ? "hsl(var(--warn))"
                                    : undefined,
                              }}
                            >
                              {pct(p.pAboveThreshold)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <a
                    href={`/data/report-${shown.date}.md`}
                    className="mt-4 inline-block text-xs text-primary hover:underline"
                    download
                  >
                    הורדת הדוח כקובץ Markdown ←
                  </a>
                </div>
              )}
            </article>
          )}
        </div>

        <aside>
          <h2 className="label-xs">ארכיון</h2>
          <div className="mt-2 max-h-[36rem] space-y-1 overflow-y-auto pl-1">
            {archive.data?.map((a) => (
              <button
                key={a.date}
                onClick={() => setSelected(a.date)}
                className={cn(
                  "w-full rounded-md px-2.5 py-2 text-right text-xs transition-colors",
                  a.date === date
                    ? "bg-secondary font-medium"
                    : "text-muted-foreground hover:bg-secondary/50",
                )}
              >
                <div className="tnum">{hebrewDate(a.date, { year: undefined })}</div>
                <div className="mt-0.5 line-clamp-2 text-[11px] opacity-75">{a.headline}</div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </Layout>
  );
}
