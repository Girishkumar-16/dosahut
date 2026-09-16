import { createHash, timingSafeEqual } from "node:crypto";
import { and, eq, or, sql } from "drizzle-orm";
import { getDb } from "./db";
import { BRANCH, vipRewards, type VipReward } from "./schema";

/**
 * Staff-side redemption. Kept in its own module so nothing the customer-facing
 * flow depends on has to change.
 */

const PIN = () => process.env.STAFF_PIN?.trim() || "1234";

/**
 * Constant-time PIN comparison.
 *
 * `===` on a secret returns as soon as two characters differ, and the time
 * that takes is measurable over enough requests. Hashing both sides first also
 * makes the buffers equal length, which timingSafeEqual requires.
 */
export function isValidPin(candidate: string): boolean {
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(PIN()).digest();
  return timingSafeEqual(a, b);
}

/**
 * Wrong-PIN throttle.
 *
 * A four-digit PIN is ten thousand guesses, which is seconds of scripted
 * traffic against a page that gives away food. This holds attempts per client
 * in memory — it stops casual guessing, but it is per-instance and resets on
 * deploy, so it is a speed bump rather than a lock. A durable limit needs a
 * table, which this change deliberately does not add.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_WRONG = 8;
const globalForThrottle = globalThis as unknown as {
  vipRedeemAttempts?: Map<string, { count: number; first: number }>;
};
const attempts = (globalForThrottle.vipRedeemAttempts ??= new Map());

export function throttleState(client: string): { blocked: boolean; retryAfterSeconds: number } {
  const entry = attempts.get(client);
  if (!entry) return { blocked: false, retryAfterSeconds: 0 };
  if (Date.now() - entry.first > WINDOW_MS) {
    attempts.delete(client);
    return { blocked: false, retryAfterSeconds: 0 };
  }
  if (entry.count < MAX_WRONG) return { blocked: false, retryAfterSeconds: 0 };
  return {
    blocked: true,
    retryAfterSeconds: Math.ceil((WINDOW_MS - (Date.now() - entry.first)) / 1000),
  };
}

export function recordWrongPin(client: string): void {
  const entry = attempts.get(client);
  if (!entry || Date.now() - entry.first > WINDOW_MS) {
    attempts.set(client, { count: 1, first: Date.now() });
    return;
  }
  entry.count += 1;
}

export const clearAttempts = (client: string) => attempts.delete(client);

/** Staff may read either code off the customer's screen, so both are accepted. */
export async function findRedeemable(code: string): Promise<VipReward | null> {
  const db = await getDb();
  const upper = code.trim().toUpperCase();
  const [row] = await db
    .select()
    .from(vipRewards)
    .where(or(eq(vipRewards.rewardCode, upper), eq(vipRewards.staffCode, upper)))
    .limit(1);
  return row ?? null;
}

export type RedeemOutcome =
  | { status: "redeemed"; reward: VipReward }
  | { status: "already"; reward: VipReward };

/**
 * Marks the reward used.
 *
 * The WHERE clause carries `status <> 'redeemed'`, so two staff scanning the
 * same code at the same moment cannot both succeed: the second matches no rows
 * and is told it was already used. The database decides, not a prior read.
 */
export async function redeemReward(id: number): Promise<RedeemOutcome | null> {
  const db = await getDb();
  const [row] = await db
    .update(vipRewards)
    .set({
      status: "redeemed",
      redeemedAt: Date.now(),
      redeemedBy: BRANCH,
    })
    .where(and(eq(vipRewards.id, id), sql`${vipRewards.status} <> 'redeemed'`))
    .returning();

  if (row) return { status: "redeemed", reward: row };

  const [current] = await db
    .select()
    .from(vipRewards)
    .where(eq(vipRewards.id, id))
    .limit(1);
  return current ? { status: "already", reward: current } : null;
}

/** Sunshine Coast is AEST year-round; the server may be anywhere. */
export function formatBrisbane(ms: number): string {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Brisbane",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(ms));
}
