/**
 * Seat allocation under Israeli law: the Bader-Ofer method.
 *
 * This is not a generic proportional allocator. Three features of the real
 * method decide close elections and are implemented here exactly:
 *
 *  1. The 3.25% threshold is applied FIRST, and the votes of parties that fail
 *     it are discarded entirely. A party at 3.2% elects nobody and its ~4
 *     seats' worth of votes are redistributed to everyone else.
 *  2. Seats are allocated by the largest-AVERAGE (D'Hondt) rule for remainders,
 *     not largest-remainder. D'Hondt systematically favours larger lists, which
 *     is why Israeli small parties chase surplus agreements.
 *  3. Surplus-vote agreements (הסכמי עודפים): two lists that filed an agreement
 *     are pooled into one list for the whole allocation, and their joint seats
 *     are then split between them by the same D'Hondt rule. This is worth
 *     roughly half a seat and has decided coalition majorities before.
 */

export interface AllocationInput {
  /** Vote shares (or raw votes) per party id. Need not be normalised. */
  votes: Record<string, number>;
  /** Threshold as a share of total valid votes. */
  threshold: number;
  totalSeats: number;
  /** partyId -> partner partyId. Must be symmetric to take effect. */
  surplusAgreements?: Record<string, string | undefined>;
}

export interface AllocationResult {
  seats: Record<string, number>;
  /** Parties that failed the threshold and elected nobody. */
  eliminated: string[];
  /** Share of the total vote that was wasted on sub-threshold lists. */
  wastedShare: number;
}

export function allocateSeats(input: AllocationInput): AllocationResult {
  const { votes, threshold, totalSeats } = input;
  const agreements = input.surplusAgreements ?? {};

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  if (totalVotes <= 0) {
    return { seats: {}, eliminated: Object.keys(votes), wastedShare: 0 };
  }

  // --- Step 1: threshold ---
  const qualified: Record<string, number> = {};
  const eliminated: string[] = [];
  let wasted = 0;
  for (const [id, v] of Object.entries(votes)) {
    if (v / totalVotes >= threshold) {
      qualified[id] = v;
    } else {
      eliminated.push(id);
      wasted += v;
    }
  }
  if (Object.keys(qualified).length === 0) {
    return { seats: {}, eliminated, wastedShare: 1 };
  }

  // --- Step 2: pool surplus-agreement partners into joint lists ---
  // Only mutual agreements count, matching the law's requirement that both
  // lists file the same agreement.
  const groupOf: Record<string, string> = {};
  const groupMembers: Record<string, string[]> = {};
  for (const id of Object.keys(qualified)) {
    if (groupOf[id]) continue;
    const partner = agreements[id];
    const mutual =
      partner !== undefined &&
      partner !== id &&
      qualified[partner] !== undefined &&
      agreements[partner] === id;
    if (mutual) {
      const gid = [id, partner].sort().join("+");
      groupOf[id] = gid;
      groupOf[partner] = gid;
      groupMembers[gid] = [id, partner];
    } else {
      groupOf[id] = id;
      groupMembers[id] = [id];
    }
  }

  const groupVotes: Record<string, number> = {};
  for (const [gid, members] of Object.entries(groupMembers)) {
    groupVotes[gid] = members.reduce((a, m) => a + qualified[m], 0);
  }

  // --- Step 3: allocate all seats among groups by D'Hondt ---
  const groupSeats = dHondt(groupVotes, totalSeats);

  // --- Step 4: split each joint list's seats between its two members ---
  const seats: Record<string, number> = {};
  for (const [gid, members] of Object.entries(groupMembers)) {
    if (members.length === 1) {
      seats[members[0]] = groupSeats[gid] ?? 0;
    } else {
      const inner: Record<string, number> = {};
      for (const m of members) inner[m] = qualified[m];
      const split = dHondt(inner, groupSeats[gid] ?? 0);
      for (const m of members) seats[m] = split[m] ?? 0;
    }
  }
  for (const id of eliminated) seats[id] = 0;

  return { seats, eliminated, wastedShare: wasted / totalVotes };
}

/**
 * Largest-average (D'Hondt / Jefferson) allocation.
 *
 * Implemented with a running "next quotient" scan rather than by materialising
 * every quotient, so allocating 120 seats stays cheap enough to run inside
 * 20,000 Monte Carlo iterations.
 */
export function dHondt(votes: Record<string, number>, seats: number): Record<string, number> {
  const ids = Object.keys(votes);
  const result: Record<string, number> = {};
  for (const id of ids) result[id] = 0;
  if (seats <= 0 || ids.length === 0) return result;

  for (let s = 0; s < seats; s++) {
    let bestId = ids[0];
    let bestQ = -Infinity;
    for (const id of ids) {
      const q = votes[id] / (result[id] + 1);
      // Ties broken deterministically by vote count then id, so a run is
      // reproducible. The law resolves an exact tie by lot; an exact tie in
      // continuous vote shares has probability zero.
      if (q > bestQ || (q === bestQ && votes[id] > votes[bestId])) {
        bestQ = q;
        bestId = id;
      }
    }
    result[bestId]++;
  }
  return result;
}
