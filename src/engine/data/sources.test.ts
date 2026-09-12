import { describe, expect, it } from "vitest";
import { SOURCES, SOURCE_BY_ID, TEXT_SOURCES } from "./sources";
import { NEWS_OUTLETS } from "../ingest/sources/hebrewNews";

describe("source registry", () => {
  it("has unique ids", () => {
    expect(new Set(SOURCES.map((s) => s.id)).size).toBe(SOURCES.length);
  });

  it("gives every source a real explanation, not a label", () => {
    for (const s of SOURCES) {
      expect(s.notes.length, `${s.id} needs a note explaining what to distrust`).toBeGreaterThan(60);
      expect(s.url).toMatch(/^https:\/\//);
    }
  });

  it("compiles every article pattern", () => {
    for (const s of SOURCES) {
      if (s.articlePattern) expect(() => new RegExp(s.articlePattern!)).not.toThrow();
    }
  });

  it("matches an article pattern against a real URL from that outlet", () => {
    const cases: [string, string][] = [
      ["n12", "https://www.mako.co.il/news-israel-elections/2026/Article-cb0dba3ba4430a1027.htm"],
      ["kan", "https://www.kan.org.il/content/kan-news/politic/1096840/"],
      ["i24", "https://www.i24news.tv/he/news/israel-elections-2026/polls/artc-a44c587c"],
      ["walla", "https://news.walla.co.il/item/3866443"],
      ["haaretz", "https://www.haaretz.co.il/news/elections/2026-09-08/ty-article/000001a0-7d4a"],
    ];
    for (const [id, url] of cases) {
      const src = SOURCE_BY_ID[id];
      expect(new RegExp(src.articlePattern!).test(url), `${id} should match ${url}`).toBe(true);
    }
  });

  it("does not follow an outlet's front page as if it were an article", () => {
    const n12 = new RegExp(SOURCE_BY_ID.n12.articlePattern!);
    expect(n12.test("https://www.mako.co.il/news-israel-elections")).toBe(false);
  });

  it("is the single list the scraper actually runs — the legend cannot drift", () => {
    // The whole point of the registry. If these ever diverge, the site is
    // describing a set of sources the model did not use.
    expect(NEWS_OUTLETS.map((o) => o.id).sort()).toEqual(TEXT_SOURCES.map((s) => s.id).sort());
    for (const outlet of NEWS_OUTLETS) {
      const src = SOURCE_BY_ID[outlet.id];
      expect(outlet.outlet).toBe(src.outlet);
      expect(outlet.pollster).toBe(src.pollster);
      expect(outlet.mode).toBe(src.mode);
    }
  });
});
