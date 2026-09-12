import { describe, expect, it } from "vitest";
import { allocateSeats, dHondt } from "./baderOfer";

describe("dHondt", () => {
  it("allocates every seat", () => {
    const r = dHondt({ a: 100, b: 60, c: 40 }, 10);
    expect(Object.values(r).reduce((x, y) => x + y, 0)).toBe(10);
  });

  it("favours the larger list over largest-remainder", () => {
    // Under largest-remainder a=3,b=2,c=1; D'Hondt gives the last seat to `a`.
    const r = dHondt({ a: 100, b: 80, c: 39 }, 6);
    expect(r.a).toBe(3);
    expect(r.b).toBe(2);
    expect(r.c).toBe(1);
  });

  it("returns zeros for zero seats", () => {
    expect(dHondt({ a: 5, b: 5 }, 0)).toEqual({ a: 0, b: 0 });
  });
});

describe("allocateSeats — threshold", () => {
  it("eliminates parties below the threshold and reports wasted vote", () => {
    const r = allocateSeats({
      votes: { big: 0.5, mid: 0.44, tiny: 0.03, micro: 0.03 },
      threshold: 0.0325,
      totalSeats: 120,
    });
    expect(r.seats.tiny).toBe(0);
    expect(r.seats.micro).toBe(0);
    expect(r.eliminated.sort()).toEqual(["micro", "tiny"]);
    expect(r.wastedShare).toBeCloseTo(0.06, 6);
    expect(r.seats.big + r.seats.mid).toBe(120);
  });

  it("redistributes a failing party's votes to the survivors", () => {
    const withFailure = allocateSeats({
      votes: { a: 0.5, b: 0.47, tiny: 0.03 },
      threshold: 0.0325,
      totalSeats: 120,
    });
    const withoutTiny = allocateSeats({
      votes: { a: 0.5, b: 0.47 },
      threshold: 0.0325,
      totalSeats: 120,
    });
    // The failing party is still keyed, at zero; the survivors split the house
    // exactly as if it had never run.
    expect(withFailure.seats.tiny).toBe(0);
    expect(withFailure.seats.a).toBe(withoutTiny.seats.a);
    expect(withFailure.seats.b).toBe(withoutTiny.seats.b);
  });

  it("is a cliff, not a ramp: 3.24% elects nobody, 3.26% elects four", () => {
    const just_below = allocateSeats({
      votes: { a: 0.6, b: 0.3676, x: 0.0324 },
      threshold: 0.0325,
      totalSeats: 120,
    });
    const just_above = allocateSeats({
      votes: { a: 0.6, b: 0.3674, x: 0.0326 },
      threshold: 0.0325,
      totalSeats: 120,
    });
    expect(just_below.seats.x).toBe(0);
    expect(just_above.seats.x).toBeGreaterThanOrEqual(3);
  });

  it("always allocates exactly the full house", () => {
    const r = allocateSeats({
      votes: { a: 0.21, b: 0.19, c: 0.12, d: 0.1, e: 0.09, f: 0.08, g: 0.07, h: 0.06, i: 0.05, j: 0.03 },
      threshold: 0.0325,
      totalSeats: 120,
    });
    expect(Object.values(r.seats).reduce((x, y) => x + y, 0)).toBe(120);
  });
});

describe("allocateSeats — surplus agreements", () => {
  it("only pools partners when the agreement is mutual", () => {
    const oneSided = allocateSeats({
      votes: { a: 0.4, b: 0.35, c: 0.25 },
      threshold: 0.0325,
      totalSeats: 120,
      surplusAgreements: { b: "c" }, // c did not reciprocate
    });
    const none = allocateSeats({
      votes: { a: 0.4, b: 0.35, c: 0.25 },
      threshold: 0.0325,
      totalSeats: 120,
    });
    expect(oneSided.seats).toEqual(none.seats);
  });

  it("can win a partnership an extra seat at the largest party's expense", () => {
    const votes = { a: 0.46, b: 0.28, c: 0.26 };
    const without = allocateSeats({ votes, threshold: 0.0325, totalSeats: 120 });
    const with_ = allocateSeats({
      votes,
      threshold: 0.0325,
      totalSeats: 120,
      surplusAgreements: { b: "c", c: "b" },
    });
    const pairWithout = without.seats.b + without.seats.c;
    const pairWith = with_.seats.b + with_.seats.c;
    expect(pairWith).toBeGreaterThanOrEqual(pairWithout);
    expect(with_.seats.a + pairWith).toBe(120);
  });

  it("never pools a partner that failed the threshold", () => {
    const r = allocateSeats({
      votes: { a: 0.5, b: 0.47, tiny: 0.03 },
      threshold: 0.0325,
      totalSeats: 120,
      surplusAgreements: { b: "tiny", tiny: "b" },
    });
    expect(r.seats.tiny).toBe(0);
    expect(r.seats.a + r.seats.b).toBe(120);
  });

  it("is deterministic across repeated runs", () => {
    const args = {
      votes: { a: 0.3, b: 0.3, c: 0.2, d: 0.2 },
      threshold: 0.0325,
      totalSeats: 120,
    };
    expect(allocateSeats(args).seats).toEqual(allocateSeats(args).seats);
  });
});
