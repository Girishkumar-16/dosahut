import type { ScratchReward } from "@/lib/site";

export type ScratchOutcome = { label: string; isWin: boolean };

// A shuffled "deck" of exactly 100 outcomes matching the reward ratio (each
// reward's `weight` copies of itself, plus `loseWeight` copies of the lose
// outcome). Handing these out one at a time, in order, guarantees the ratio
// holds over every 100 rewards dispensed — a plain weighted random roll
// (Math.random() against the odds each time) only converges to the ratio
// over a large number of plays, and can drift noticeably within any given
// batch, which matters most for the rarest items (2 in 100).
//
// This runs server-side only (in the API route) so the deck and its order
// can't be seen or influenced by the client.
export function buildShuffledBatch(
  rewards: ScratchReward[],
  loseWeight: number,
  loseLabel: string,
): ScratchOutcome[] {
  const deck: ScratchOutcome[] = [];
  for (const r of rewards) {
    for (let i = 0; i < r.weight; i++) deck.push({ label: r.name, isWin: true });
  }
  for (let i = 0; i < loseWeight; i++) deck.push({ label: loseLabel, isWin: false });

  // Fisher-Yates shuffle.
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Strips everything to digits, then canonicalizes the Australian "+61"/"61"
// country-code form down to the domestic "0..." form, so "04XX XXX XXX",
// "+61 4XX XXX XXX" and "61400000000" all normalize to the same key instead
// of silently keying the same physical number to two different Firestore
// documents (and so bypassing the one-play-per-day check).
export function normalizePhone(raw: string): string {
  const digits = raw.trim().replace(/[^0-9]/g, "");
  if (digits.startsWith("61") && digits.length === 11) {
    return "0" + digits.slice(2);
  }
  return digits;
}

// Sunshine Coast, QLD doesn't observe daylight saving (AEST, UTC+10
// year-round), but the server this runs on might be in any timezone — so
// the "which day is it" check has to go through Australia/Brisbane
// explicitly rather than trusting the server's local date.
export function getBrisbaneDateKey(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Brisbane",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
