import { PARTY_BY_ID } from "@/engine/data/parties";
import { pct, seats, signed } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PartyEstimate } from "@/engine/types";

/**
 * One party's row: mean seats, the 80% interval drawn to scale, and the
 * threshold probability when it is genuinely in doubt.
 *
 * The interval is the point of this component. A bar showing only the mean
 * invites readers to treat "24.8" as a prediction of 25 seats; drawing the
 * 80% range on the same axis makes the uncertainty impossible to skip past.
 */
export function SeatBar({
  party,
  max,
  trend,
}: {
  party: PartyEstimate;
  max: number;
  trend?: number;
}) {
  const meta = PARTY_BY_ID[party.partyId];
  const scale = (n: number) => `${(n / max) * 100}%`;
  const atRisk = party.pAboveThreshold < 0.97 && party.pAboveThreshold > 0.02;

  return (
    <div className="grid grid-cols-[8.5rem_1fr_auto] items-center gap-3 py-1.5">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{meta?.name ?? party.partyId}</div>
        <div className="truncate text-[11px] text-muted-foreground">{meta?.leader}</div>
      </div>

      <div className="relative h-7">
        {/* 80% credible interval */}
        <div
          className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-muted-foreground/25"
          style={{ insetInlineStart: scale(party.low80), width: scale(party.high80 - party.low80) }}
        />
        {/* Mean-seat bar */}
        <div
          className="absolute top-1/2 h-4 -translate-y-1/2 rounded-[3px]"
          style={{ width: scale(party.meanSeats), background: meta?.color ?? "#64748b" }}
        />
        {/* Mean marker */}
        <div
          className="absolute top-1/2 h-6 w-[2px] -translate-y-1/2 bg-foreground/80"
          style={{ insetInlineStart: scale(party.meanSeats) }}
        />
      </div>

      <div className="flex items-center gap-3 text-left">
        {atRisk && (
          <span
            className="tnum rounded px-1.5 py-0.5 text-[11px] font-medium"
            style={{
              background: "hsl(var(--warn) / 0.14)",
              color: "hsl(var(--warn))",
            }}
            title="הסתברות לחצות את אחוז החסימה"
          >
            {pct(party.pAboveThreshold)} לעבור
          </span>
        )}
        {trend !== undefined && Math.abs(trend) >= 0.05 && (
          <span
            className={cn(
              "tnum text-[11px]",
              trend > 0 ? "text-[hsl(var(--good))]" : "text-destructive",
            )}
            title="שינוי בממוצע הסקרים ב-14 הימים האחרונים, בנקודות אחוז"
          >
            {signed(trend * 100, 1)}
          </span>
        )}
        <span className="tnum w-16 text-right text-base font-bold">
          {seats(party.meanSeats)}
        </span>
        <span className="tnum w-14 text-right text-[11px] text-muted-foreground">
          {party.low80}–{party.high80}
        </span>
      </div>
    </div>
  );
}
