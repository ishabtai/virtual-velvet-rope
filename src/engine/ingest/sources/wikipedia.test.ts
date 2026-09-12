import { describe, expect, it } from "vitest";
import { __testing } from "./wikipedia";

const { mapHeader } = __testing;

describe("wikipedia header mapping", () => {
  it("maps the real header shapes the live run produced", () => {
    // Verbatim from the CI log: 49 tables found, every header read correctly,
    // and zero columns mapped, because an exact-key lookup on "Likud Likud"
    // gives "likudlikud".
    const header = [
      "Fieldwork date", "Polling firm", "Publisher", "Sample size",
      "Likud Likud", "Together Together (Israel)",
      "Yashar Yashar (political party)", "RZP Religious Zionist Party",
      "Otzma Otzma Yehudit", "Shas Shas", "UTJ United Torah Judaism",
      "Joint List Joint List", "Ra'am United Arab List",
    ];
    expect(mapHeader(header)).toEqual([
      null, null, null, null,
      "likud", "byachad", "yashar", "religious-zionism",
      "otzma", "shas", "utj", "joint-list", "raam",
    ]);
  });

  it("prefers the specific name over a fragment of itself", () => {
    // "RZP - Zehut Religious Zionist Party Zehut" must not resolve on "zehut"
    // before the full party name is considered — both land on the same id here,
    // but the ordering rule is what keeps that true as names are added.
    expect(mapHeader(["RZP - Zehut Religious Zionist Party Zehut"])).toEqual([
      "religious-zionism",
    ]);
  });

  it("leaves a non-party column unmapped rather than guessing", () => {
    expect(
      mapHeader(["Date", "Polling firm", "Publisher", "Gov.", "Opposition", "Other"]),
    ).toEqual([null, null, null, null, null, null]);
  });

  it("skips leadership-poll headers entirely", () => {
    expect(
      mapHeader(["Netanyahu Benjamin Netanyahu", "Eisenkot Gadi Eisenkot", "Neither"]),
    ).toEqual([null, null, null]);
  });

  it("reads Hebrew headers, including a name repeated in one cell", () => {
    expect(mapHeader(["הליכוד הליכוד", "ישר", "ש\"ס"])).toEqual(["likud", "yashar", "shas"]);
  });

  it("returns null when one cell names two different parties", () => {
    expect(mapHeader(["הליכוד וישר"])).toEqual([null]);
  });
});
