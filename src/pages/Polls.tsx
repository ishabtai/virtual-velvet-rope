import { Fragment, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLatestForecast, fetchPolls } from "@/lib/api";
import { hebrewDate, pp } from "@/lib/format";
import { PARTY_BY_ID, REAL_PARTIES } from "@/engine/data/parties";
import { POLLSTERS } from "@/engine/data/pollsters";
import { DEFAULT_CONFIG } from "@/engine/config";
import { pollWeight } from "@/engine/aggregate";

export default function Polls() {
  const polls = useQuery({ queryKey: ["polls"], queryFn: fetchPolls });
  const forecast = useQuery({ queryKey: ["forecast"], queryFn: fetchLatestForecast });

  const asOf = forecast.data?.asOf ?? new Date().toISOString().slice(0, 10);

  const rows = useMemo(() => {
    if (!polls.data) return [];
    return polls.data
      .map((poll) => ({ poll, w: pollWeight(poll, asOf, DEFAULT_CONFIG) }))
      .sort((a, b) => Date.parse(b.poll.date) - Date.parse(a.poll.date));
  }, [polls.data, asOf]);

  const columns = REAL_PARTIES.filter((p) =>
    rows.some(({ poll }) => poll.seats[p.id] !== undefined),
  );

  return (
    <Layout>
      <header>
        <h1 className="text-3xl font-black">הסקרים</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          כל סקר שנכנס למודל, עם קישור לפרסום המקורי והמשקל שהוא מקבל. סקר שסומן{" "}
          <span className="rounded bg-secondary px-1.5 py-0.5 text-xs">חלקי</span> הוא סקר
          שהפרסום שלו לא כלל פילוח מלא, וחלק מהערכים נגזרו מסך גוש שכן פורסם. כל גזירה
          כזו מתועדת בהערה שמתחת לשורה — אגרגטור שמסתיר את השחזור שלו אינו ניתן לביקורת.
        </p>
      </header>

      {polls.isLoading && <Skeleton className="mt-8 h-96 w-full" />}

      {rows.length > 0 && (
        <section className="mt-8 panel overflow-x-auto p-2">
          <table className="w-full min-w-[70rem] text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="p-2 text-right font-medium">תאריך</th>
                <th className="p-2 text-right font-medium">מכון / כלי תקשורת</th>
                <th className="p-2 text-left font-medium">מדגם</th>
                <th className="p-2 text-left font-medium">משקל</th>
                {columns.map((c) => (
                  <th key={c.id} className="px-1.5 py-2 text-center font-medium">
                    <span
                      className="block max-w-[4.5rem] leading-tight"
                      style={{ color: c.color }}
                    >
                      {c.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ poll, w }) => (
                <Fragment key={poll.id}>
                  <tr className="border-t border-border/60">
                    <td className="whitespace-nowrap p-2 text-xs">
                      {hebrewDate(poll.date, { year: undefined })}
                    </td>
                    <td className="p-2">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="whitespace-nowrap font-medium">{poll.pollster}</span>
                        <a
                          href={poll.source}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="whitespace-nowrap text-[11px] text-primary hover:underline"
                        >
                          {poll.outlet} ←
                        </a>
                        {poll.partial && (
                          <span className="rounded bg-secondary px-1.5 py-px text-[10px] text-muted-foreground">
                            חלקי
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="tnum p-2 text-left text-xs">
                      {poll.sampleSize ?? (
                        <span className="text-muted-foreground">לא פורסם</span>
                      )}
                    </td>
                    <td className="p-2 text-left">
                      <div
                        className="tnum text-xs font-semibold"
                        title={`עדכניות ${w.recency.toFixed(2)} × מדגם ${w.sample.toFixed(2)} × דירוג ${w.grade.toFixed(2)} × שיטה ${w.mode.toFixed(2)}${w.partial !== 1 ? ` × חלקיות ${w.partial.toFixed(2)}` : ""}`}
                      >
                        {w.weight.toFixed(3)}
                      </div>
                      <div className="mt-1 h-1 w-14 rounded-full bg-muted">
                        <div
                          className="h-1 rounded-full bg-primary"
                          style={{ width: `${Math.min(100, w.weight * 100)}%` }}
                        />
                      </div>
                    </td>
                    {columns.map((c) => (
                      <td key={c.id} className="tnum p-2 text-center">
                        {poll.seats[c.id] ?? (
                          <span className="text-muted-foreground/40">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  {poll.notes && (
                    <tr>
                      <td />
                      <td colSpan={columns.length + 3} className="px-2 pb-2.5">
                        <p className="text-[11px] leading-relaxed text-muted-foreground">
                          {poll.notes}
                        </p>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* ---- House effects ---- */}
      {forecast.data && (
        <section className="mt-10">
          <h2 className="text-lg font-bold">אפקטי-בית</h2>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            הסטייה השיטתית של כל מכון מהקונצנזוס, בנקודות אחוז. מספר חיובי משמעו שהמכון
            נותן למפלגה יותר מהממוצע באופן עקבי — והמודל מנכה את ההפרש הזה לפני השקלול.
            האמידה נעשית בשיטת leave-one-out: סקריו של מכון אינם נכללים בקונצנזוס שמולו
            הוא נמדד, כדי שמכון פורה לא יוכל להגדיר את המרכז ואז לקבל הטיה אפס בהגדרה.
            ההערכות ממורכזות לאפס — הטיה נמדדת רק ביחס לממוצע, לא במוחלט.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {Object.entries(forecast.data.houseEffects).map(([pollster, effects]) => {
              const profile = POLLSTERS.find((p) => p.pollster === pollster);
              const top = Object.entries(effects)
                .filter(([, v]) => Math.abs(v) > 0.001)
                .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
                .slice(0, 5);
              return (
                <div key={pollster} className="panel p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold">{pollster}</h3>
                    {profile && (
                      <span className="tnum text-xs text-muted-foreground">
                        דירוג {profile.grade.toFixed(2)}
                        {profile.meanAbsSeatError !== null &&
                          ` · שגיאה היסטורית ${profile.meanAbsSeatError} מנדטים`}
                      </span>
                    )}
                  </div>
                  {profile && (
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      {profile.notes}
                    </p>
                  )}
                  <div className="mt-3 space-y-1">
                    {top.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        אין סטייה שיטתית מובהקת מהקונצנזוס.
                      </p>
                    )}
                    {top.map(([partyId, v]) => (
                      <div key={partyId} className="flex items-center gap-2 text-xs">
                        <span className="w-28 shrink-0 truncate">
                          {PARTY_BY_ID[partyId]?.name ?? partyId}
                        </span>
                        <div className="relative h-1.5 flex-1 rounded-full bg-muted">
                          <div
                            className="absolute top-0 h-1.5 rounded-full"
                            style={{
                              insetInlineStart: v > 0 ? "50%" : `${50 - Math.min(50, Math.abs(v) * 2000)}%`,
                              width: `${Math.min(50, Math.abs(v) * 2000)}%`,
                              background: v > 0 ? "hsl(var(--good))" : "hsl(var(--destructive))",
                            }}
                          />
                          <div className="absolute inset-y-0 left-1/2 w-px bg-border" />
                        </div>
                        <span className="tnum w-12 text-left">{pp(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </Layout>
  );
}
