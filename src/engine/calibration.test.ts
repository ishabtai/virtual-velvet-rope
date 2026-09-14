import { describe, expect, it } from "vitest";
import { computeCalibration } from "./calibration";
import { DEFAULT_CONFIG } from "./config";
import { buildForecast } from "./forecast";
import { HISTORICAL_MISSES } from "./data/calibration";
import { REAL_PARTIES } from "./data/parties";

const cfg = DEFAULT_CONFIG;
const seats = (share: number) => (share / 0.955) * cfg.totalSeats;

describe("historical record", () => {
  it("cites a source and an explanation for every entry", () => {
    for (const m of HISTORICAL_MISSES) {
      expect(m.source, `${m.date} ${m.group}`).toMatch(/^https:\/\//);
      expect(m.note.length, `${m.date} ${m.group}`).toBeGreaterThan(40);
      expect(m.polled).toBeGreaterThan(0);
      expect(m.actual).toBeGreaterThan(0);
    }
  });

  it("covers more than one election, in both directions", () => {
    const dates = new Set(HISTORICAL_MISSES.map((m) => m.date));
    expect(dates.size).toBeGreaterThanOrEqual(4);
    const errors = HISTORICAL_MISSES.map((m) => m.actual - m.polled);
    expect(errors.some((e) => e > 0)).toBe(true);
    expect(errors.some((e) => e < 0)).toBe(true);
  });
});

describe("computeCalibration", () => {
  const c = computeCalibration(cfg);

  it("shrinks every correction well below its raw historical mean", () => {
    // Four elections is a tiny sample and the error has been shrinking; using
    // the raw mean at face value would be false precision.
    for (const g of c.groups) {
      if (Math.abs(g.rawMeanSeats) < 0.01) continue;
      expect(Math.abs(g.appliedSeats), g.group).toBeLessThan(Math.abs(g.rawMeanSeats));
    }
  });

  it("caps any single bloc's correction", () => {
    for (const g of c.groups) expect(Math.abs(g.appliedSeats)).toBeLessThanOrEqual(2.5001);
  });

  it("moves support between parties rather than inventing it", () => {
    const total = Object.values(c.partyAdjustments).reduce((a, b) => a + b, 0);
    expect(Math.abs(total)).toBeLessThan(1e-12);
  });

  it("corrects the Netanyahu bloc upward and the change bloc downward", () => {
    // The direction the record actually shows: polls have understated the right
    // in 2015, April 2019 and 2022, and overstated the centre-left.
    const net = c.groups.find((g) => g.group === "netanyahu")!;
    const change = c.groups.find((g) => g.group === "change")!;
    expect(net.appliedSeats).toBeGreaterThan(0);
    expect(change.appliedSeats).toBeLessThan(0);
  });

  it("keeps the total movement to a couple of seats, not the raw historical gap", () => {
    // The published cross-election benchmark is 5.71 seats of right-bloc
    // understatement, but most of that is threshold failures the simulation
    // already models. Counting it again as bias would double-count it.
    expect(c.totalSeatsMoved).toBeGreaterThan(1);
    expect(c.totalSeatsMoved).toBeLessThan(8);
  });

  it("distributes a bloc's correction by present strength, not by 2022 seats", () => {
    // Yashar leads the change bloc today and did not exist in 2022. Weighting
    // by 2022 seats handed it almost none of its own bloc's correction.
    const shares: Record<string, number> = {};
    for (const p of REAL_PARTIES) shares[p.id] = p.id === "yashar" ? 0.19 : 0.02;
    const byNow = computeCalibration(cfg, shares);
    const byDefault = computeCalibration(cfg);
    expect(Math.abs(byNow.partyAdjustments.yashar)).toBeGreaterThan(
      Math.abs(byDefault.partyAdjustments.yashar),
    );
  });

  it("reads a bloc error out of the record that is larger than the old assumption", () => {
    // The finding that prompted widening blocErrorSd: historical bloc misses
    // scatter by ~3.5 seats, where the model had assumed ~1.6.
    expect(seats(c.impliedBlocErrorSd)).toBeGreaterThan(2.5);
    expect(seats(DEFAULT_CONFIG.blocErrorSd)).toBeGreaterThan(2.5);
  });
});

describe("calibration inside the forecast", () => {
  const on = buildForecast({ asOf: "2026-09-14", config: { simulations: 2000 } });
  const off = buildForecast({
    asOf: "2026-09-14",
    includeCalibration: false,
    config: { simulations: 2000 },
  });

  it("is applied by default and can be switched off", () => {
    expect(on.calibrationEnabled).toBe(true);
    expect(off.calibrationEnabled).toBe(false);
  });

  it("still allocates exactly the full house", () => {
    expect(on.parties.reduce((a, p) => a + p.meanSeats, 0)).toBeCloseTo(120, 6);
  });

  it("shifts the Netanyahu bloc up relative to an uncalibrated run", () => {
    const a = on.blocs.find((b) => b.bloc === "netanyahu")!.meanSeats;
    const b = off.blocs.find((x) => x.bloc === "netanyahu")!.meanSeats;
    expect(a).toBeGreaterThan(b);
  });

  it("does not let the Arab bloc vanish once bloc error scales with bloc size", () => {
    // Applying the Netanyahu-calibrated absolute error to an 8% bloc gave it an
    // 80% interval starting at zero seats.
    expect(on.blocs.find((b) => b.bloc === "arab")!.low80).toBeGreaterThan(0);
  });
});
