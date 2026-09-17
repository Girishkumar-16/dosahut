/**
 * Australian mobile numbers, since the branch is Sunshine Coast.
 *
 * Accepts every shape a customer actually types — 424 124 020, 0424124020,
 * +61 424 124 020, (04) 2412 4020 — and stores one canonical form, so the
 * UNIQUE constraint on phone genuinely means one person rather than one
 * spelling of a person.
 */

/** What the customer is told when the number does not look right. */
export const PHONE_ERROR =
  "Please enter a valid 10-digit Australian mobile number (e.g. 0412 345 678).";

/**
 * Strips spaces, brackets and dashes but keeps a leading +.
 *
 * Removing every non-digit would take the + with it, and +61424124020 would
 * then read as 61424124020, which no Australian mobile pattern matches — so a
 * number the customer typed correctly would be rejected.
 */
const clean = (input: string) => {
  const trimmed = input.trim();
  const digits = trimmed.replace(/\D/g, "");
  return trimmed.startsWith("+") ? `+${digits}` : digits;
};

/** Matches the three forms a mobile is written in, cleaned as above. */
export const AU_MOBILE = /^(?:\+61|61|0)?4\d{8}$/;

export const isValidMobile = (input: string) => AU_MOBILE.test(clean(input));

/**
 * To E.164, e.g. +61424124020. Returns null when the number is not a valid
 * Australian mobile.
 */
export function normaliseMobile(input: string): string | null {
  const value = clean(input);
  if (!AU_MOBILE.test(value)) return null;

  // Whatever the prefix was, the last nine digits are the number itself.
  const local = value.slice(-9);
  return `+61${local}`;
}

/**
 * The nine digits after the country code, e.g. 412345678.
 *
 * Drops a leading +61, 61 or 0 so that every shape the customer types collapses
 * to the same local number. Partial input is returned as typed, because this
 * runs on every keystroke — the lone "0" someone starts with has to survive
 * until the "4" arrives and makes it a prefix worth dropping.
 */
export function toLocalMobile(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("614")) return digits.slice(2, 11);
  if (digits.startsWith("04")) return digits.slice(1, 10);
  return digits.slice(0, 9);
}

/** Groups the local number as 412 345 678, for reading back a typed number. */
export function formatLocalMobile(input: string): string {
  const local = toLocalMobile(input);
  return [local.slice(0, 3), local.slice(3, 6), local.slice(6, 9)]
    .filter(Boolean)
    .join(" ");
}

/** Good enough to catch typos; real validation is the code we send. */
export const isPlausibleEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 255;

export const maskMobile = (mobile: string) =>
  mobile.length < 4 ? mobile : `${"•".repeat(mobile.length - 3)}${mobile.slice(-3)}`;

/** e.g. ma•••@zenithitservices.com.au — enough to recognise, not to read. */
export function maskEmail(email: string): string {
  const at = email.lastIndexOf("@");
  if (at < 1) return email;
  const local = email.slice(0, at);
  const domain = email.slice(at);
  const keep = local.length <= 2 ? 1 : 2;
  return `${local.slice(0, keep)}${"•".repeat(Math.max(local.length - keep, 1))}${domain}`;
}
