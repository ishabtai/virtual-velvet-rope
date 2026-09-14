import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SeatBar } from "@/components/forecast/SeatBar";
import { KnessetChart } from "@/components/forecast/KnessetChart";
import { BlocGauge } from "@/components/forecast/BlocGauge";
import { TrendChart } from "@/components/forecast/TrendChart";
import { CoalitionCard } from "@/components/forecast/CoalitionCard";
import { ThresholdWatch } from "@/components/forecast/ThresholdWatch";
import { CalibrationPanel } from "@/components/forecast/CalibrationPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchLatestForecast, fetchLatestReport, fetchTrend } from "@/lib/api";
import { hebrewDate, pct, probabilityWord, seats } from "@/lib/format";
import { PARTY_BY_ID } from "@/engine/data/parties";

export default function Index() {
  const forecast = useQuery({ queryKey: ["forecast"], queryFn: fetchLatestForecast });
  const report = useQuery({ queryKey: ["report"], queryFn: fetchLatestReport });
  const trend = useQuery({ queryKey: ["trend"], queryFn: fetchTrend });

  if (forecast.isLoading) {
    return (
      <Layout>
        <div className="space-y-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      </Layout>
    );
  }

  if (forecast.isError || !forecast.data) {
    return (
      <Layout>
        <div className="panel p-6">
          <h1 className="text-lg font-bold">התחזית אינה זמינה</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            לא הצלחנו לטעון את קובץ התחזית. הריצו{" "}
            <code className="ltr rounded bg-secondary px-1.5 py-0.5 text-xs">npm run forecast</code>{" "}
            כדי לייצר אותו.
          </p>
        </div>
      </Layout>
    );
  }

  const f = forecast.data;
  const maxSeats = Math.max(...f.parties.map((p) => p.high80));
  const topPm = f.pmProbability[0];
  const netanyahu = f.blocs.find((b) => b.bloc === "netanyahu")!;
  const change = f.blocs.find((b) => b.bloc === "change")!;

  return (
    <Layout>
      {/* ---- Headline ---- */}
      <section>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>עודכן {hebrewDate(f.asOf)}</span>
          <span>·</span>
          <span className="tnum">{f.daysToElection} ימים לבחירות</span>
          <span>·</span>
          <span className="tnum">{f.pollsUsed} סקרים</span>
          <span>·</span>
          <span className="tnum">
            {f.config.simulations.toLocaleString("he-IL")} סימולציות
          </span>
        </div>

        <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
          {report.data?.headline ?? "תחזית לכנסת ה-26"}
        </h1>

        {!f.socialEnabled && (
          <div
            className="mt-4 rounded-lg border px-4 py-3 text-sm"
            style={{
              borderColor: "hsl(var(--warn) / 0.35)",
              background: "hsl(var(--warn) / 0.08)",
            }}
          >
            <strong className="font-semibold">אות הרשתות החברתיות מנוטרל.</strong>{" "}
            הצינור מיושם ונבדק במלואו, אך סדרת הנתונים המחוברת אליו כרגע מסומנת כנתוני
            הדגמה ולא כנתונים מאומתים — ולכן המנוע מאפס את תרומתה לתחזית הראשית. ניתן
            לראות את המנגנון פועל{" "}
            <Link to="/simulator" className="text-primary underline">
              בסימולטור
            </Link>
            , והסבר מלא נמצא{" "}
            <Link to="/methodology#social" className="text-primary underline">
              בעמוד המתודולוגיה
            </Link>
            .
          </div>
        )}
      </section>

      {/* ---- Who forms a government ---- */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="panel p-4">
          <div className="label-xs">הסיכוי הגבוה ביותר לראשות הממשלה</div>
          <div className="mt-1 text-lg font-bold leading-tight">{topPm?.leader ?? "—"}</div>
          <div className="tnum mt-1 text-3xl font-black text-primary">
            {pct(topPm?.probability ?? 0, 1)}
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            {probabilityWord(topPm?.probability ?? 0)}
          </div>
        </div>

        <div className="panel p-4">
          <div className="label-xs">סיכוי לתיקו פוליטי</div>
          <div className="mt-1 text-lg font-bold leading-tight">אף גוש ללא 61</div>
          <div className="tnum mt-1 text-3xl font-black" style={{ color: "hsl(var(--warn))" }}>
            {pct(f.pDeadlock, 1)}
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            התרחיש שמוביל היסטורית לסבב בחירות נוסף
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-2 panel p-4">
          <div className="label-xs">שאר ההסתברויות לראשות הממשלה</div>
          <div className="mt-2 space-y-1.5">
            {f.pmProbability.slice(0, 4).map((p) => (
              <div key={p.partyId} className="flex items-center gap-2">
                <span className="w-32 shrink-0 truncate text-xs">{p.leader}</span>
                <div className="h-2 flex-1 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${p.probability * 100}%`,
                      background: PARTY_BY_ID[p.partyId]?.color ?? "hsl(var(--primary))",
                    }}
                  />
                </div>
                <span className="tnum w-12 text-left text-xs font-semibold">
                  {pct(p.probability, 1)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            ההסתברויות משקללות גם את הסבירות הפוליטית של כל מסלול קואליציוני, ולכן אינן
            זהות לסיכוי האריתמטי של הגושים.
          </p>
        </div>
      </section>

      {/* ---- The chamber ---- */}
      <section className="mt-8 panel p-5">
        <h2 className="text-sm font-semibold">הרכב הכנסת הצפוי</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          המושבים מסודרים מימין לשמאל לפי גוש, והקו המקווקו במרכז הוא קו 61 המנדטים.
          התרשים מציג כנסת אחת קוהרנטית: אומדן אחוזי ההצבעה המרכזי מועבר דרך מקצה
          בדר-עופר האמיתי, ולא מעוגל ממוצעי מנדטים — ולכן הוא עשוי להיבדל במנדט מהטבלה
          שלמטה, וזהו הבדל אמיתי ולא שגיאת עיגול.
        </p>
        <div className="mt-4">
          <KnessetChart
            parties={f.parties}
            totalSeats={f.config.totalSeats}
            threshold={f.config.threshold}
          />
        </div>
      </section>

      {/* ---- Blocs ---- */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold">חשבון הגושים</h2>
        <div className="grid gap-3 lg:grid-cols-3">
          {f.blocs.map((b) => (
            <BlocGauge key={b.bloc} {...b} />
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          הגושים מוגדרים לפי השאלה היחידה שמכריעה קואליציה בישראל: האם המפלגה תשב בממשלה
          בראשות נתניהו. זהו סיווג קואליציוני ולא אידאולוגי — ישראל ביתנו היא מפלגת ימין
          שנמצאת בגוש השינוי, וזו החלוקה בעלת המשמעות הפוליטית.
        </p>
      </section>

      {/* ---- Party detail ---- */}
      <section className="mt-8 grid gap-4 lg:grid-cols-[1.55fr_1fr]">
        <div className="panel p-5">
          <h2 className="text-sm font-semibold">מנדטים לפי מפלגה</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            העמודה הצבעונית היא הממוצע; הקו הדק שמאחוריה הוא טווח 80% מתוך{" "}
            {f.config.simulations.toLocaleString("he-IL")} סימולציות.
          </p>
          <div className="mt-4">
            {f.parties.map((p) => (
              <SeatBar key={p.partyId} party={p} max={maxSeats} trend={p.trend14d} />
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-sm font-semibold">מעקב אחוז החסימה</h2>
          <div className="mt-4">
            <ThresholdWatch parties={f.parties} threshold={f.config.threshold} />
          </div>
        </div>
      </section>

      {/* ---- Trend ---- */}
      <section className="mt-8 panel p-5">
        <h2 className="text-sm font-semibold">מגמה לאורך זמן</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          כל נקודה היא הרצה מלאה של המודל על הסקרים שהיו זמינים באותו יום בלבד.
        </p>
        <Tabs defaultValue="blocs" className="mt-4">
          <TabsList>
            <TabsTrigger value="blocs">גושים</TabsTrigger>
            <TabsTrigger value="parties">מפלגות מובילות</TabsTrigger>
          </TabsList>
          <TabsContent value="blocs" className="mt-4">
            {trend.data && <TrendChart trend={trend.data} mode="blocs" />}
          </TabsContent>
          <TabsContent value="parties" className="mt-4">
            {trend.data && <TrendChart trend={trend.data} mode="parties" />}
          </TabsContent>
        </Tabs>
      </section>

      {/* ---- Poll-to-result calibration ---- */}
      <CalibrationPanel forecast={f} />

      {/* ---- Coalitions ---- */}
      <section className="mt-8">
        <h2 className="mb-1 text-sm font-semibold">מסלולי הרכבת קואליציה</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          מסודר לפי מכפלת הסיכוי האריתמטי בסבירות הפוליטית. שני המספרים נשמרים בנפרד
          בכוונה: קואליציה יכולה להיות ודאית מבחינה חשבונית וחסרת סיכוי מבחינה פוליטית.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {f.coalitions.map((c) => (
            <CoalitionCard key={c.id} scenario={c} />
          ))}
        </div>
      </section>

      {/* ---- Today's report ---- */}
      {report.data && (
        <section className="mt-8 panel p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-semibold">הדוח היומי</h2>
            <Link to="/report" className="text-xs text-primary hover:underline">
              לדוח המלא ולארכיון ←
            </Link>
          </div>
          <ul className="mt-3 space-y-1.5">
            {report.data.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="text-primary">▪</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {report.data.sections[0]?.body}
          </p>
        </section>
      )}

      {/* ---- Summary strip ---- */}
      <section className="mt-8 grid gap-3 text-xs sm:grid-cols-3">
        <div className="panel p-4">
          <div className="label-xs">מרווח אי-הוודאות</div>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            אי-הוודאות בתחזית זו רחבה ב-
            {((f.config.timeUncertaintyPer30Days * f.daysToElection) / 30 * 100).toFixed(0)}% לעומת
            תחזית ביום הבחירות עצמו, בשל המרחק מהמועד.
          </p>
        </div>
        <div className="panel p-4">
          <div className="label-xs">מה המודל לא יודע</div>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            שגיאה שיטתית המשותפת לכל הסוקרים אינה ניתנת לגילוי משום ממוצע סקרים, כולל זה.
            ב-2015 וב-2022 כל המכונים פספסו את הימין באותו כיוון.
          </p>
        </div>
        <div className="panel p-4">
          <div className="label-xs">הפער בראש הטבלה</div>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            {seats(Math.abs(f.parties[0].meanSeats - f.parties[1].meanSeats))} מנדטים בין שתי
            הגדולות — פחות משמעותי מהפער של{" "}
            {seats(Math.abs(change.meanSeats - netanyahu.meanSeats))} מנדטים בין הגושים,
            שהוא שקובע מי מרכיב ממשלה.
          </p>
        </div>
      </section>
    </Layout>
  );
}
