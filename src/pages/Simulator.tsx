import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { KnessetChart } from "@/components/forecast/KnessetChart";
import { BlocGauge } from "@/components/forecast/BlocGauge";
import { SeatBar } from "@/components/forecast/SeatBar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { buildForecast } from "@/engine/forecast";
import { DEFAULT_CONFIG } from "@/engine/config";
import { pct, seats, signed } from "@/lib/format";
import { PARTY_BY_ID } from "@/engine/data/parties";

/**
 * The simulator runs the real engine in the browser, not a simplified copy.
 * A methodology page that says "we do X" while the site does something else is
 * worse than no methodology page, so the same `buildForecast` that produces the
 * published snapshot produces this one too — only with fewer draws, so it stays
 * interactive on a phone.
 */
const SIMS = 4000;

interface Knobs {
  recencyHalfLifeDays: number;
  blocErrorSd: number;
  partyErrorSd: number;
  timeUncertaintyPer30Days: number;
  threshold: number;
  socialMaxAdjustmentPp: number;
  includeSocial: boolean;
}

const INITIAL: Knobs = {
  recencyHalfLifeDays: DEFAULT_CONFIG.recencyHalfLifeDays,
  blocErrorSd: DEFAULT_CONFIG.blocErrorSd,
  partyErrorSd: DEFAULT_CONFIG.partyErrorSd,
  timeUncertaintyPer30Days: DEFAULT_CONFIG.timeUncertaintyPer30Days,
  threshold: DEFAULT_CONFIG.threshold,
  socialMaxAdjustmentPp: DEFAULT_CONFIG.socialMaxAdjustmentPp,
  includeSocial: false,
};

function Knob({
  label,
  hint,
  value,
  display,
  min,
  max,
  step,
  onChange,
  changed,
}: {
  label: string;
  hint: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  changed: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <Label className="text-xs font-medium">{label}</Label>
        <span
          className={`tnum text-xs font-semibold ${changed ? "text-primary" : "text-muted-foreground"}`}
        >
          {display}
        </span>
      </div>
      <Slider
        className="mt-2"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
      />
      <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{hint}</p>
    </div>
  );
}

export default function Simulator() {
  const [knobs, setKnobs] = useState<Knobs>(INITIAL);
  const set = <K extends keyof Knobs>(k: K, v: Knobs[K]) =>
    setKnobs((prev) => ({ ...prev, [k]: v }));

  const asOf = "2026-09-11";

  const baseline = useMemo(
    () => buildForecast({ asOf, config: { simulations: SIMS } }),
    [],
  );

  const result = useMemo(
    () =>
      buildForecast({
        asOf,
        includeSocial: knobs.includeSocial,
        config: {
          simulations: SIMS,
          recencyHalfLifeDays: knobs.recencyHalfLifeDays,
          blocErrorSd: knobs.blocErrorSd,
          partyErrorSd: knobs.partyErrorSd,
          timeUncertaintyPer30Days: knobs.timeUncertaintyPer30Days,
          threshold: knobs.threshold,
          socialMaxAdjustmentPp: knobs.socialMaxAdjustmentPp,
        },
      }),
    [knobs],
  );

  const maxSeats = Math.max(...result.parties.map((p) => p.high80));
  const dirty = JSON.stringify(knobs) !== JSON.stringify(INITIAL);

  const delta = (partyId: string) => {
    const now = result.parties.find((p) => p.partyId === partyId)?.meanSeats ?? 0;
    const before = baseline.parties.find((p) => p.partyId === partyId)?.meanSeats ?? 0;
    return now - before;
  };

  return (
    <Layout>
      <header>
        <h1 className="text-3xl font-black">הסימולטור</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          כל קבוע במודל הוא החלטה של מי שבנה אותו, ולכן כל קבוע פתוח כאן לשינוי. הסימולטור
          מריץ את המנוע האמיתי בדפדפן — אותה פונקציה בדיוק שמייצרת את התחזית המתפרסמת,
          רק עם {SIMS.toLocaleString("he-IL")} סימולציות במקום{" "}
          {DEFAULT_CONFIG.simulations.toLocaleString("he-IL")} כדי שיישאר מהיר. אם קבוע
          נראה לכם שגוי, הזיזו אותו וראו כמה זה באמת משנה.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[19rem_1fr]">
        {/* ---- Controls ---- */}
        <aside className="panel h-fit space-y-6 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">הנחות המודל</h2>
            {dirty && (
              <Button variant="ghost" size="sm" onClick={() => setKnobs(INITIAL)}>
                איפוס
              </Button>
            )}
          </div>

          <Knob
            label="זמן מחצית של סקר"
            hint="אחרי כמה ימים סקר שווה מחצית ממשקלו. קצר יותר = תגובה מהירה לחדשות ורגישות גבוהה יותר לסקר חריג."
            value={knobs.recencyHalfLifeDays}
            display={`${knobs.recencyHalfLifeDays} ימים`}
            min={3}
            max={45}
            step={1}
            onChange={(v) => set("recencyHalfLifeDays", v)}
            changed={knobs.recencyHalfLifeDays !== INITIAL.recencyHalfLifeDays}
          />

          <Knob
            label="שגיאה מתואמת ברמת הגוש"
            hint="כמה גדול הסיכון שכל מפלגות הגוש מפוספסות יחד באותו כיוון. זה הפרמטר החשוב ביותר בכל המודל — אפס בו משמעו ביטחון כוזב בסך הגוש."
            value={knobs.blocErrorSd * 100}
            display={`${(knobs.blocErrorSd * 100).toFixed(1)} נק' אחוז`}
            min={0}
            max={3}
            step={0.1}
            onChange={(v) => set("blocErrorSd", v / 100)}
            changed={knobs.blocErrorSd !== INITIAL.blocErrorSd}
          />

          <Knob
            label="שגיאה ספציפית למפלגה"
            hint="סטיית התקן עבור מפלגה על 10% מהקולות; מפלגות קטנות מקבלות פחות, לפי שורש גודלן."
            value={knobs.partyErrorSd * 100}
            display={`${(knobs.partyErrorSd * 100).toFixed(1)} נק' אחוז`}
            min={0.2}
            max={3}
            step={0.1}
            onChange={(v) => set("partyErrorSd", v / 100)}
            changed={knobs.partyErrorSd !== INITIAL.partyErrorSd}
          />

          <Knob
            label="הרחבת אי-ודאות לכל 30 יום"
            hint="כמה רחבה התחזית היום לעומת תחזית ביום הבחירות. אפס בו מניח שהציבור כבר סיים להחליט."
            value={knobs.timeUncertaintyPer30Days * 100}
            display={`+${(knobs.timeUncertaintyPer30Days * 100).toFixed(0)}%`}
            min={0}
            max={100}
            step={5}
            onChange={(v) => set("timeUncertaintyPer30Days", v / 100)}
            changed={knobs.timeUncertaintyPer30Days !== INITIAL.timeUncertaintyPer30Days}
          />

          <Knob
            label="אחוז החסימה"
            hint="קבוע בחוק על 3.25%. אפשר לשנות אותו כאן כדי לראות כמה מהתוצאה תלוי דווקא בסף הזה."
            value={knobs.threshold * 100}
            display={`${(knobs.threshold * 100).toFixed(2)}%`}
            min={0}
            max={6}
            step={0.25}
            onChange={(v) => set("threshold", v / 100)}
            changed={knobs.threshold !== INITIAL.threshold}
          />

          <div className="hairline pt-5">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="social" className="text-xs font-medium">
                הפעלת אות הרשתות החברתיות
              </Label>
              <Switch
                id="social"
                checked={knobs.includeSocial}
                onCheckedChange={(v) => set("includeSocial", v)}
              />
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
              מנוטרל בתחזית הראשית כל עוד הנתונים מסומנים כהדגמה. ההפעלה כאן מדגימה את
              המנגנון — התוצאה אינה תחזית.
            </p>
            {knobs.includeSocial && (
              <div className="mt-4">
                <Knob
                  label="תקרת התיקון"
                  hint="התזוזה המרבית שהאות רשאי לגרום למפלגה אחת. ברירת המחדל 0.6 נקודות אחוז — פחות ממנדט."
                  value={knobs.socialMaxAdjustmentPp}
                  display={`${knobs.socialMaxAdjustmentPp.toFixed(1)} נק' אחוז`}
                  min={0}
                  max={3}
                  step={0.1}
                  onChange={(v) => set("socialMaxAdjustmentPp", v)}
                  changed={knobs.socialMaxAdjustmentPp !== INITIAL.socialMaxAdjustmentPp}
                />
              </div>
            )}
          </div>
        </aside>

        {/* ---- Output ---- */}
        <div className="space-y-6">
          <div className="panel p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-sm font-semibold">התוצאה</h2>
              {dirty && (
                <span className="text-[11px] text-primary">
                  משווה מול הנחות ברירת המחדל
                </span>
              )}
            </div>
            <div className="mt-4">
              <KnessetChart
                parties={result.parties}
                totalSeats={result.config.totalSeats}
                threshold={result.config.threshold}
              />
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {result.blocs.map((b) => (
              <BlocGauge key={b.bloc} {...b} />
            ))}
          </div>

          <div className="panel p-5">
            <h2 className="text-sm font-semibold">מנדטים לפי מפלגה</h2>
            <div className="mt-3">
              {result.parties.map((p) => (
                <SeatBar key={p.partyId} party={p} max={maxSeats} />
              ))}
            </div>
          </div>

          {dirty && (
            <div className="panel p-5">
              <h2 className="text-sm font-semibold">מה השתנה לעומת ברירת המחדל</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {result.parties
                  .map((p) => ({ p, d: delta(p.partyId) }))
                  .filter((x) => Math.abs(x.d) >= 0.1)
                  .sort((a, b) => Math.abs(b.d) - Math.abs(a.d))
                  .map(({ p, d }) => (
                    <div
                      key={p.partyId}
                      className="flex items-center justify-between rounded-md bg-secondary/40 px-3 py-1.5 text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-sm"
                          style={{ background: PARTY_BY_ID[p.partyId]?.color }}
                        />
                        {PARTY_BY_ID[p.partyId]?.name}
                      </span>
                      <span
                        className="tnum font-semibold"
                        style={{ color: d > 0 ? "hsl(var(--good))" : "hsl(var(--destructive))" }}
                      >
                        {signed(d)}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="hairline mt-4 grid gap-3 pt-4 text-xs sm:grid-cols-3">
                {result.blocs.map((b) => {
                  const before = baseline.blocs.find((x) => x.bloc === b.bloc)!;
                  return (
                    <div key={b.bloc}>
                      <div className="label-xs">סיכוי ל-61</div>
                      <div className="tnum mt-0.5">
                        {pct(before.pMajority, 1)} ← <strong>{pct(b.pMajority, 1)}</strong>
                      </div>
                      <div className="tnum text-muted-foreground">
                        {seats(before.meanSeats)} ← {seats(b.meanSeats)} מנדטים
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
