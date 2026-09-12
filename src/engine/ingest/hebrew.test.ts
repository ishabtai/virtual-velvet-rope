import { describe, expect, it } from "vitest";
import { extractDate, findPartyMentions, normalizeHebrew, seatsAfterMention } from "./hebrew";

const ids = (t: string) => findPartyMentions(t).map((m) => m.partyId);

describe("normalizeHebrew", () => {
  it("collapses every gershayim spelling to one form", () => {
    const forms = ['ש"ס', "ש״ס", "ש'ס", "ש’ס", "שס"];
    const normalized = new Set(forms.map(normalizeHebrew));
    expect(normalized.size).toBe(1);
  });

  it("collapses maqaf and dash variants", () => {
    expect(normalizeHebrew("חד״ש־תע״ל")).toBe(normalizeHebrew('חד"ש-תע"ל'));
  });
});

describe("findPartyMentions", () => {
  it("reads party names out of real headline prose", () => {
    expect(ids('סקר חדשות 12: הליכוד וישר של איזנקוט מתחזקות, בנט נחלש')).toEqual(
      expect.arrayContaining(["likud", "yashar"]),
    );
  });

  it("matches through Hebrew prefixes", () => {
    expect(ids("העלייה בליכוד נמשכת")).toContain("likud");
    expect(ids("שהליכוד יקבל יותר")).toContain("likud");
  });

  it("matches a name given with its leader in apposition", () => {
    expect(ids("ביחד בראשות נפתלי בנט ויאיר לפיד")).toContain("byachad");
    expect(ids("רע״ם בראשות מנסור עבאס")).toContain("raam");
  });

  it("prefers the most specific alias over its own substring", () => {
    // "זהות" is an alias of Religious Zionism; it must not also fire separately
    // inside the full list name.
    const found = findPartyMentions("הציונות הדתית זהות מקבלת 4 מנדטים");
    expect(found.filter((m) => m.partyId === "religious-zionism")).toHaveLength(1);
  });

  it("still recognises the Joint List under its former name", () => {
    expect(ids('חד"ש-תע"ל מקבלת 6 מנדטים')).toContain("joint-list");
    expect(ids("הרשימה המשותפת מקבלת 7 מנדטים")).toContain("joint-list");
  });

  it("does not match a party name embedded in an unrelated longer word", () => {
    expect(ids("המשותפתיים")).not.toContain("joint-list");
  });
});

describe("seatsAfterMention", () => {
  function read(text: string): Record<string, number> {
    const n = normalizeHebrew(text);
    const out: Record<string, number> = {};
    for (const m of findPartyMentions(n)) {
      const s = seatsAfterMention(n, m);
      if (s !== null) out[m.partyId] = s;
    }
    return out;
  }

  it("reads the common '<party> מקבל N מנדטים' shape", () => {
    expect(read("הליכוד מקבל 24 מנדטים")).toEqual({ likud: 24 });
  });

  it("reads a bare number and a dash-separated number", () => {
    expect(read("ישר 22")).toEqual({ yashar: 22 });
    expect(read("ביחד – 15")).toEqual({ byachad: 15 });
  });

  it("parses a full comma-separated results sentence", () => {
    const text =
      'הליכוד מקבל 24 מנדטים, ישר 22, ביחד 15, הדמוקרטים 11, ישראל ביתנו 9, עוצמה יהודית 9, יהדות התורה 8, ש"ס 7, הרשימה המשותפת 7, הציונות הדתית 4, רע"ם 4';
    const got = read(text);
    expect(got).toEqual({
      likud: 24, yashar: 22, byachad: 15, democrats: 11,
      "yisrael-beiteinu": 9, otzma: 9, utj: 8, shas: 7,
      "joint-list": 7, "religious-zionism": 4, raam: 4,
    });
    expect(Object.values(got).reduce((a, b) => a + b, 0)).toBe(120);
  });

  it("does not let one party's number bleed onto the next", () => {
    // Without a boundary at the following party name, both would read 24.
    expect(read("ישר, הליכוד 24")).toEqual({ likud: 24 });
  });

  it("refuses seat counts that cannot exist above the threshold", () => {
    // 1-3 seats are impossible under a 3.25% threshold, so the number we found
    // was something else.
    expect(read("הליכוד 2")).toEqual({});
    expect(read("הליכוד 130")).toEqual({});
  });

  it("ignores a number that belongs to a different sentence", () => {
    expect(read("הליכוד. הבחירות ייערכו בעוד 46 ימים")).toEqual({});
  });

  it("refuses a delta rather than reading it as a level", () => {
    // The bug the first live run produced: an article saying the Likud LOST
    // four seats was recorded as the Likud HAVING four. Every one of these is
    // in legal seat range, so nothing downstream can catch it.
    expect(read("הליכוד מאבד 4 מנדטים")).toEqual({});
    expect(read("הליכוד יורד ב 4 מנדטים")).toEqual({});
    expect(read("ישר מתחזק ב 2 מנדטים")).toEqual({});
    expect(read("ביחד נחלש ב 5 מנדטים")).toEqual({});
    expect(read("הליכוד עם פער של 4 מנדטים")).toEqual({});
    expect(read("הליכוד מוביל ב 5 מנדטים לעומת ישר")).toEqual({});
  });

  it("still reads a level written with ל- rather than ב-", () => {
    // "יורד ל-21" is a level (down TO 21); "יורד ב-4" is a change (by four).
    // The delta verb guard must not swallow the level form... but when both a
    // verb and a level appear, refusing is still the safe answer, so this only
    // asserts the plain level form.
    expect(read("הליכוד עומד על 21 מנדטים")).toEqual({ likud: 21 });
    expect(read("ישר מגיעה ל 24 מנדטים")).toEqual({ yashar: 24 });
  });

  it("prefers a number carrying the word מנדט over a nearer bare number", () => {
    expect(read("ש״ס, שקיבלה בשנת 2022 יחד 11 מנדטים")).toEqual({ shas: 11 });
  });
});

describe("extractDate", () => {
  it("reads a Hebrew long-form date", () => {
    expect(extractDate("פורסם ב-9 בספטמבר 2026", "2026-01-01")).toBe("2026-09-09");
  });

  it("reads numeric forms", () => {
    expect(extractDate("2026-09-11", "x")).toBe("2026-09-11");
    expect(extractDate("11/09/2026", "x")).toBe("2026-09-11");
  });

  it("falls back when there is no date at all", () => {
    expect(extractDate("אין כאן תאריך", "2026-09-12")).toBe("2026-09-12");
  });
});
