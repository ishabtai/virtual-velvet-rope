import { useMemo } from "react";
import { PARTY_BY_ID } from "@/engine/data/parties";
import type { PartyEstimate } from "@/engine/types";
import { allocateSeats } from "@/engine/baderOfer";
import { surplusMap } from "@/engine/aggregate";

/**
 * The 120-seat chamber, drawn as the parliament itself is seated.
 *
 * Seats are rounded from the model's mean, which never sums to exactly 120, so
 * the remainder is allocated by largest fractional part — the same
 * largest-remainder rule used to round any set of percentages to a total.
 * Parties are ordered by bloc so the 61-seat line falls in a meaningful place:
 * the reader can see whether a bloc reaches the middle of the room.
 */

const ROWS = 5;
const SEAT_R = 5.6;

interface Seat {
  x: number;
  y: number;
  partyId: string;
}

function layout(order: { partyId: string; seats: number }[]): { seats: Seat[]; width: number; height: number } {
  const total = order.reduce((a, p) => a + p.seats, 0) || 120;

  // Distribute seats across rows in proportion to each arc's length, so the
  // spacing between seats stays even from the inner row to the outer one.
  const radii = Array.from({ length: ROWS }, (_, i) => 74 + i * 26);
  const arcWeight = radii.reduce((a, r) => a + r, 0);
  const perRow = radii.map((r) => Math.max(1, Math.round((total * r) / arcWeight)));
  let drift = total - perRow.reduce((a, b) => a + b, 0);
  for (let i = perRow.length - 1; drift !== 0 && i >= 0; i--) {
    const step = Math.sign(drift);
    perRow[i] += step;
    drift -= step;
  }

  // Walk every row position in angular order, filling from one flank to the
  // other, so each party's seats form one contiguous wedge.
  const slots: { angle: number; radius: number }[] = [];
  radii.forEach((radius, rowIndex) => {
    const n = perRow[rowIndex];
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      slots.push({ angle: Math.PI * t, radius });
    }
  });
  slots.sort((a, b) => a.angle - b.angle || a.radius - b.radius);

  const maxR = radii[radii.length - 1] + SEAT_R + 2;
  const seats: Seat[] = [];
  let cursor = 0;
  for (const party of order) {
    for (let i = 0; i < party.seats && cursor < slots.length; i++, cursor++) {
      const { angle, radius } = slots[cursor];
      seats.push({
        // +cos, not −cos: the first party in `order` must seat on the RIGHT
        // flank, because the page is RTL and Israeli coverage seats the
        // Netanyahu bloc on the right. Mirroring this silently would put the
        // caption and the chart in contradiction.
        x: maxR + Math.cos(angle) * radius,
        y: maxR - Math.sin(angle) * radius,
        partyId: party.partyId,
      });
    }
  }
  return { seats, width: maxR * 2, height: maxR + SEAT_R + 2 };
}

/**
 * Produces the one chamber the diagram draws.
 *
 * Rounding each party's MEAN seats does not work. A mean of 2.4 is not a
 * possible outcome — under a 3.25% threshold the smallest delegation is four,
 * and a mean below four only means the party usually fails and occasionally
 * wins four or more. Rounding would draw a Knesset that cannot legally exist,
 * and patching it afterwards just moves the distortion somewhere else.
 *
 * So the diagram is allocated the same way the real election is: the central
 * vote-share estimate is run through the actual Bader-Ofer allocator, threshold
 * and surplus agreements included. What comes out is one coherent, legal
 * chamber consistent with the central estimate — which is what a seating chart
 * should show. It can differ by a seat from the mean-seat table beside it, and
 * that difference is real rather than a rounding artefact.
 */
function centralChamber(parties: PartyEstimate[], totalSeats: number, threshold: number) {
  const votes: Record<string, number> = {};
  for (const p of parties) votes[p.partyId] = p.share;
  // The share not accounted for by any listed party is wasted on micro-lists.
  const assigned = Object.values(votes).reduce((a, b) => a + b, 0);
  if (assigned < 1) votes.__other = Math.max(0, 1 - assigned);

  const { seats } = allocateSeats({
    votes,
    threshold,
    totalSeats,
    surplusAgreements: surplusMap(),
  });

  return parties
    .map((p) => ({ partyId: p.partyId, seats: seats[p.partyId] ?? 0 }))
    .filter((p) => p.seats > 0);
}

const BLOC_ORDER = { netanyahu: 0, change: 2, arab: 1 } as const;

export function KnessetChart({
  parties,
  totalSeats = 120,
  threshold = 0.0325,
}: {
  parties: PartyEstimate[];
  totalSeats?: number;
  threshold?: number;
}) {
  const { seats, width, height, ordered } = useMemo(() => {
    const rounded = centralChamber(parties, totalSeats, threshold);
    // Right flank to left flank: Netanyahu bloc, then the Arab parties in the
    // centre, then the change bloc. Within a bloc, largest party outermost.
    const ordered = rounded.sort((a, b) => {
      const ba = BLOC_ORDER[PARTY_BY_ID[a.partyId]?.bloc ?? "change"];
      const bb = BLOC_ORDER[PARTY_BY_ID[b.partyId]?.bloc ?? "change"];
      return ba - bb || b.seats - a.seats;
    });
    return { ...layout(ordered), ordered };
  }, [parties, totalSeats, threshold]);

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="תרשים הכנסת: 120 מנדטים לפי מפלגה"
      >
        {/* The 61-seat line: the only number in Israeli politics that matters. */}
        <line
          x1={width / 2}
          y1={4}
          x2={width / 2}
          y2={height - 2}
          stroke="hsl(var(--foreground) / 0.22)"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        {seats.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={SEAT_R}
            fill={PARTY_BY_ID[s.partyId]?.color ?? "#64748b"}
          >
            <title>{PARTY_BY_ID[s.partyId]?.name ?? s.partyId}</title>
          </circle>
        ))}
      </svg>
      <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
        {ordered.map((p) => (
          <span key={p.partyId} className="flex items-center gap-1.5 text-[11px]">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ background: PARTY_BY_ID[p.partyId]?.color }}
            />
            <span className="text-muted-foreground">{PARTY_BY_ID[p.partyId]?.name}</span>
            <span className="tnum font-semibold">{p.seats}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
