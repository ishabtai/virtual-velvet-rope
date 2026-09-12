import { BLOC_LABELS } from "@/engine/data/parties";
import { pct, probabilityWord, seats } from "@/lib/format";
import type { BlocId } from "@/engine/types";

const BLOC_COLOR: Record<BlocId, string> = {
  netanyahu: "hsl(var(--bloc-netanyahu))",
  change: "hsl(var(--bloc-change))",
  arab: "hsl(var(--bloc-arab))",
};

/**
 * A bloc's position against the 61-seat line.
 *
 * The gauge is drawn on a fixed 0-120 axis rather than scaled to the data, so
 * the three blocs are visually comparable and the 61 mark sits in the same
 * place on every one of them.
 */
export function BlocGauge({
  bloc,
  meanSeats,
  low80,
  high80,
  pMajority,
}: {
  bloc: BlocId;
  meanSeats: number;
  low80: number;
  high80: number;
  pMajority: number;
}) {
  const x = (n: number) => `${(n / 120) * 100}%`;
  const color = BLOC_COLOR[bloc];

  return (
    <div className="panel p-4">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium">{BLOC_LABELS[bloc]}</span>
        <span className="tnum text-2xl font-black" style={{ color }}>
          {seats(meanSeats)}
        </span>
      </div>

      <div className="relative mt-3 h-8">
        <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-muted" />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full opacity-35"
          style={{ insetInlineStart: x(low80), width: x(high80 - low80), background: color }}
        />
        <div
          className="absolute top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full"
          style={{ insetInlineStart: x(meanSeats), background: color }}
        />
        <div
          className="absolute top-0 bottom-0 w-px bg-foreground/45"
          style={{ insetInlineStart: x(61) }}
        />
        <span
          className="absolute -top-0.5 text-[10px] text-muted-foreground"
          style={{ insetInlineStart: `calc(${x(61)} + 4px)` }}
        >
          61
        </span>
      </div>

      <div className="mt-1 flex items-baseline justify-between text-xs text-muted-foreground">
        <span className="tnum">
          טווח 80%: {low80}–{high80}
        </span>
        <span>
          <span className="tnum font-semibold text-foreground">{pct(pMajority, 1)}</span>{" "}
          להגיע ל-61 לבדו · {probabilityWord(pMajority)}
        </span>
      </div>
    </div>
  );
}
