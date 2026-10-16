import { describe, expect, it } from "vitest";
import { extractJsonBlobs, parseLobby } from "./kanLobby";

/**
 * The page's markup could not be read from the environment this was written in
 * — every Israeli domain is blocked by policy — so these tests pin the only
 * thing that can be pinned without it: the shapes the adapter claims to
 * recognise. They are the specification the first live run is checked against.
 */

const SEATS = {
  "ישר עם איזנקוט": 22,
  הליכוד: 20,
  ביחד: 12,
  "עוצמה יהודית": 9,
  הדמוקרטים: 8,
  "הרשימה המשותפת": 8,
  "יהדות התורה": 8,
  "ישראל ביתנו": 8,
  'ש"ס': 7,
  "הציונות הדתית": 5,
  'רע"ם': 5,
  "המילואימניקים והכלכלית": 4,
  "עמך ישראל": 4,
};

const page = (body: string) =>
  `<!doctype html><html><head><script src="/a.js"></script></head><body>${body}</body></html>`;

describe("extractJsonBlobs", () => {
  it("reads a typed application/json script", () => {
    const html = page(`<script type="application/json">{"polls":[{"date":"2026-10-15"}]}</script>`);
    expect(extractJsonBlobs(html)).toEqual([{ polls: [{ date: "2026-10-15" }] }]);
  });

  it("reads a Next.js hydration payload", () => {
    const html = page(`<script id="__NEXT_DATA__" type="application/json">{"props":{"x":1}}</script>`);
    expect(extractJsonBlobs(html)).toContainEqual({ props: { x: 1 } });
  });

  it("reads a global assigned in an inline script", () => {
    const html = page(`<script>window.__POLLS__ = {"items":[]};</script>`);
    expect(extractJsonBlobs(html)).toEqual([{ items: [] }]);
  });

  it("ignores inline scripts that are not data", () => {
    // A page has many inline scripts and almost none of them are JSON. A parse
    // failure here must be silent, not a warning per script tag.
    const html = page(`<script>console.log("hello");</script><script>var a=1;</script>`);
    expect(extractJsonBlobs(html)).toEqual([]);
  });

  it("returns nothing for a page with no scripts at all", () => {
    expect(extractJsonBlobs("<html><body><table></table></body></html>")).toEqual([]);
  });
});

const json = (data: unknown) =>
  page(`<script type="application/json">${JSON.stringify(data)}</script>`);

describe("parseLobby", () => {
  it("reads a poll from a label-to-seats map", () => {
    const got = parseLobby(json({ polls: [{ date: "2026-10-15", pollster: "מדגם", seats: SEATS }] }));
    expect(got.items).toHaveLength(1);
    expect(got.items[0].pollster).toBe("מדגם");
    expect(got.items[0].date).toBe("2026-10-15");
    expect(got.items[0].seats.likud).toBe(20);
    expect(got.items[0].seats.yashar).toBe(22);
    expect(Object.values(got.items[0].seats).reduce((a, b) => a + b, 0)).toBe(120);
  });

  it("reads the array-of-rows shape as well", () => {
    const parties = Object.entries(SEATS).map(([name, seats]) => ({ name, seats }));
    const got = parseLobby(json({ results: [{ date: "2026-10-15", institute: "קמיל פוקס", parties }] }));
    expect(got.items).toHaveLength(1);
    expect(got.items[0].pollster).toBe("קמיל פוקס");
    expect(got.items[0].seats.byachad).toBe(12);
  });

  it("refuses a row with no named institute", () => {
    // On this page that is the site's own filtered average. Ingesting it would
    // average an average, double-counting every poll underneath it and
    // laundering a competing model's choices into ours as evidence.
    const got = parseLobby(json({ average: [{ date: "2026-10-15", seats: SEATS }] }));
    expect(got.items).toEqual([]);
    expect(got.warnings.join(" ")).toMatch(/no named institute/);
  });

  it("refuses a bloc map, which is four numbers and not a poll", () => {
    const blocs = { "גוש נתניהו": 53, "גוש איזנקוט": 50, "מפלגות ערביות": 13, אחר: 4 };
    const got = parseLobby(json({ blocMap: [{ date: "2026-10-15", pollster: "כאן", seats: blocs }] }));
    expect(got.items).toEqual([]);
  });

  it("refuses a partial list that does not add up to a Knesset", () => {
    const half = { הליכוד: 20, ביחד: 12, "עוצמה יהודית": 9, הדמוקרטים: 8 };
    const got = parseLobby(json({ polls: [{ date: "2026-10-15", pollster: "מדגם", seats: half }] }));
    expect(got.items).toEqual([]);
  });

  it("refuses a bloc subtotal parsed as a party", () => {
    // The failure that cost this model seven seats at the bloc level: one
    // number far outside any party's range, in a row that otherwise looks fine.
    const bad = { ...SEATS, "עמך ישראל": 52 };
    const got = parseLobby(json({ polls: [{ date: "2026-10-15", pollster: "מדגם", seats: bad }] }));
    expect(got.items).toEqual([]);
  });

  it("says what it saw when the page carries no JSON", () => {
    // A first live run that reports the shape it found is worth more than one
    // that silently returns nothing, because nobody here can open the page.
    const got = parseLobby(page("<script>var a=1;</script><table><tr><td>22</td></tr></table>"));
    expect(got.items).toEqual([]);
    expect(got.warnings.join(" ")).toMatch(/no embedded JSON found.*Script tags seen: 2/s);
  });

  it("says which keys it saw when the JSON holds no polls", () => {
    const got = parseLobby(json({ config: { locale: "he" }, nav: { items: [] } }));
    expect(got.items).toEqual([]);
    expect(got.warnings.join(" ")).toMatch(/no poll-shaped object.*config\/nav/s);
  });

  it("counts one poll once when the payload repeats it", () => {
    const row = { date: "2026-10-15", pollster: "מדגם", seats: SEATS };
    const got = parseLobby(json({ latest: [row], all: [row] }));
    expect(got.items).toHaveLength(1);
  });

  it("does not take a year from a date column as a sample size", () => {
    const got = parseLobby(
      json({ polls: [{ date: "2026-10-15", pollster: "מדגם", year: 2026, n: 2026, seats: SEATS }] }),
    );
    expect(got.items[0].sampleSize).toBeNull();
  });

  it("keeps a real sample size", () => {
    const got = parseLobby(
      json({ polls: [{ date: "2026-10-15", pollster: "מדגם", sampleSize: 804, seats: SEATS }] }),
    );
    expect(got.items[0].sampleSize).toBe(804);
  });
});
