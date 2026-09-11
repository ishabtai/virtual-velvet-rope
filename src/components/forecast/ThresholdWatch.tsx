import { PARTY_BY_ID } from "@/engine/data/parties";
import { pct } from "@/lib/format";
import type { PartyEstimate } from "@/engine/types";

/**
 * The parties within reach of the 3.25% threshold.
 *
 * This is usually the most important panel on the page and the one most
 * coverage omits. A party at 3.2% does not lose a seat — it loses all four, and
 * its votes are redistributed to every surviving party including its rivals.
 * Two borderline parties in the same bloc are worth more to the 61-seat
 * arithmetic than any plausible swing between the two largest parties.
 */
export function ThresholdWatch({
  parties,
  threshold,
}: {
  parties: PartyEstimate[];
  threshold: number;
}) {
  const atRisk = parties
    .filter((p) => p.pAboveThreshold > 0.01 && p.pAboveThreshold < 0.98)
    .sort((a, b) => a.pAboveThreshold - b.pAboveThreshold);

  if (atRisk.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        אף מפלגה אינה נמצאת כרגע בטווח ההכרעה של אחוז החסימה.
      </p>
    );
  }

  // Window drawn around the threshold: ±1.5 points, which covers every party
  // whose fate is actually undecided.
  const lo = threshold - 0.015;
  const hi = threshold + 0.015;
  const x = (s: number) => `${Math.min(100, Math.max(0, ((s - lo) / (hi - lo)) * 100))}%`;

  return (
    <div className="space-y-3">
      {atRisk.map((p) => {
        const meta = PARTY_BY_ID[p.partyId];
        const above = p.share >= threshold;
        return (
          <div key={p.partyId}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">{meta?.name}</span>
              <span className="text-muted-foreground">
                <span className="tnum">{pct(p.share, 2)}</span> מהקולות ·{" "}
                <span
                  className="tnum font-semibold"
                  style={{ color: above ? "hsl(var(--good))" : "hsl(var(--warn))" }}
                >
                  {pct(p.pAboveThreshold)}
                </span>{" "}
                לעבור
              </span>
            </div>
            <div className="relative mt-1.5 h-5">
              <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted" />
              <div
                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
                style={{
                  insetInlineStart: 0,
                  width: x(p.share),
                  background: meta?.color ?? "#64748b",
                }}
              />
              <div
                className="absolute top-0 bottom-0 w-px"
                style={{ insetInlineStart: x(threshold), background: "hsl(var(--warn))" }}
              />
              <div
                className="absolute top-1/2 h-3.5 w-[2px] -translate-y-1/2 rounded-full bg-foreground"
                style={{ insetInlineStart: x(p.share) }}
              />
            </div>
          </div>
        );
      })}
      <p className="hairline pt-3 text-xs leading-relaxed text-muted-foreground">
        הקו הצהוב הוא אחוז החסימה — {pct(threshold, 2)} מהקולות הכשרים, כארבעה מנדטים.
        מפלגה שנופלת מתחתיו אינה מאבדת מנדט אחד אלא את כולם, והקולות שלה מתחלקים מחדש
        בין כל המפלגות שעברו. זהו מקור אי-הוודאות הגדול ביותר בתחזית.
      </p>
    </div>
  );
}
