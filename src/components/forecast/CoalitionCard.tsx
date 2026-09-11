import { PARTY_BY_ID } from "@/engine/data/parties";
import { pct, probabilityWord, seats } from "@/lib/format";
import type { CoalitionScenario } from "@/engine/types";

/**
 * A coalition path, with its two numbers deliberately shown side by side and
 * never multiplied together: what the seats allow, and what the politics allow.
 */
export function CoalitionCard({ scenario }: { scenario: CoalitionScenario }) {
  return (
    <div className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug">{scenario.label}</h3>
        <span className="tnum shrink-0 text-xl font-black">{seats(scenario.meanSeats)}</span>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {scenario.members.map((id) => (
          <span
            key={id}
            className="rounded px-1.5 py-0.5 text-[11px]"
            style={{
              background: `${PARTY_BY_ID[id]?.color ?? "#64748b"}22`,
              color: PARTY_BY_ID[id]?.color ?? "#94a3b8",
            }}
          >
            {PARTY_BY_ID[id]?.name ?? id}
          </span>
        ))}
      </div>

      <div className="hairline mt-3 grid grid-cols-2 gap-3 pt-3">
        <div>
          <div className="label-xs">סיכוי אריתמטי ל-61</div>
          <div className="tnum text-lg font-bold">{pct(scenario.probability, 1)}</div>
          <div className="text-[11px] text-muted-foreground">חישוב בלבד</div>
        </div>
        <div>
          <div className="label-xs">סבירות פוליטית</div>
          <div className="tnum text-lg font-bold">{scenario.plausibility.toFixed(2)}</div>
          <div className="text-[11px] text-muted-foreground">
            {probabilityWord(scenario.plausibility)} · הערכת אנליסט
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{scenario.reasoning}</p>
    </div>
  );
}
