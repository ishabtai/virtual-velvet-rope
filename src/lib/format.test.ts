import { describe, expect, it } from "vitest";
import { pct } from "./format";

describe("pct", () => {
  it("keeps 100% for certainty only", () => {
    expect(pct(1)).toBe("100%");
    expect(pct(0.99885)).toBe(">99%");
    expect(pct(0.996)).toBe(">99%");
  });

  it("keeps 0% for impossibility only", () => {
    expect(pct(0)).toBe("0%");
    expect(pct(0.0012)).toBe("<1%");
  });

  it("leaves ordinary probabilities alone", () => {
    expect(pct(0.542)).toBe("54%");
    expect(pct(0.086)).toBe("9%");
    expect(pct(0.18105, 1)).toBe("18.1%");
  });
});
