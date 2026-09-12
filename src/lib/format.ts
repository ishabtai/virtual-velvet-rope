/** Hebrew-locale formatting helpers. Kept in one place so every number on the
 *  site rounds and reads the same way. */

export const pct = (x: number, digits = 0) =>
  `${(x * 100).toFixed(digits)}%`;

/** Seat counts are means, so they carry one decimal — but never a bare ".0". */
export const seats = (x: number) =>
  x.toFixed(1).replace(/\.0$/, "");

export const signed = (x: number, digits = 1) =>
  `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x).toFixed(digits)}`;

/** Share points, the unit the model actually works in. */
export const pp = (x: number, digits = 2) =>
  `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x * 100).toFixed(digits)}`;

export function hebrewDate(iso: string, opts: Intl.DateTimeFormatOptions = {}): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
    ...opts,
  }).format(d);
}

export function shortDate(iso: string): string {
  return hebrewDate(iso, { day: "numeric", month: "short", year: undefined });
}

/**
 * Plain-language reading of a probability. Percentages invite false precision —
 * the difference between 23% and 26% is well inside this model's own error —
 * so probabilities are always shown with words beside the number.
 */
export function probabilityWord(p: number): string {
  if (p >= 0.95) return "כמעט ודאי";
  if (p >= 0.8) return "סביר מאוד";
  if (p >= 0.6) return "סביר";
  if (p >= 0.55) return "נוטה לכיוון הזה";
  if (p >= 0.45) return "שקול";
  if (p >= 0.35) return "נוטה נגד";
  if (p >= 0.2) return "פחות סביר";
  if (p >= 0.05) return "בלתי סביר";
  return "כמעט בלתי אפשרי";
}

export const daysWord = (n: number) =>
  n === 0 ? "היום" : n === 1 ? "מחר" : `בעוד ${n} ימים`;
