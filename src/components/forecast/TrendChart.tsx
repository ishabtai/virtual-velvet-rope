import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PARTY_BY_ID, BLOC_LABELS } from "@/engine/data/parties";
import type { TrendPoint } from "@/lib/api";
import { shortDate } from "@/lib/format";

const BLOC_COLOR: Record<string, string> = {
  netanyahu: "hsl(var(--bloc-netanyahu))",
  change: "hsl(var(--bloc-change))",
  arab: "hsl(var(--bloc-arab))",
};

const axisStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 11 };

/** Only the fields this tooltip reads; recharts passes a much wider object. */
interface TooltipEntry {
  dataKey: string | number;
  name?: string;
  value?: number;
  color?: string;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}) {
  if (!active || !payload?.length || !label) return null;
  return (
    <div className="panel px-3 py-2 text-xs shadow-xl">
      <div className="mb-1 font-medium">{shortDate(label)}</div>
      {payload
        .slice()
        .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
        .map((p) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-sm" style={{ background: p.color }} />
              {p.name}
            </span>
            <span className="tnum font-semibold">{Number(p.value).toFixed(1)}</span>
          </div>
        ))}
    </div>
  );
}

/** Seat trend over time, for either the leading parties or the three blocs. */
export function TrendChart({
  trend,
  mode,
  partyIds,
}: {
  trend: TrendPoint[];
  mode: "parties" | "blocs";
  partyIds?: string[];
}) {
  const { data, series } = useMemo(() => {
    if (mode === "blocs") {
      return {
        data: trend.map((t) => ({ date: t.date, ...t.blocs })),
        series: (["netanyahu", "change", "arab"] as const).map((id) => ({
          id,
          name: BLOC_LABELS[id],
          color: BLOC_COLOR[id],
        })),
      };
    }
    const ids =
      partyIds ??
      Object.entries(trend[trend.length - 1]?.seats ?? {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([id]) => id);
    return {
      data: trend.map((t) => ({ date: t.date, ...t.seats })),
      series: ids.map((id) => ({
        id,
        name: PARTY_BY_ID[id]?.name ?? id,
        color: PARTY_BY_ID[id]?.color ?? "#64748b",
      })),
    };
  }, [trend, mode, partyIds]);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 8 }}>
        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={shortDate}
          tick={axisStyle}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={false}
          minTickGap={28}
        />
        <YAxis
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
          width={32}
          domain={mode === "blocs" ? [0, 80] : [0, "auto"]}
          orientation="right"
        />
        {mode === "blocs" && (
          <ReferenceLine
            y={61}
            stroke="hsl(var(--foreground) / 0.4)"
            strokeDasharray="4 4"
            label={{ value: "61", fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
          />
        )}
        <Tooltip content={<ChartTooltip />} />
        {series.map((s) => (
          <Line
            key={s.id}
            type="monotone"
            dataKey={s.id}
            name={s.name}
            stroke={s.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
