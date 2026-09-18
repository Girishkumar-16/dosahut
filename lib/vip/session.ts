import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NotifyChannel } from "./notify";

/**
 * A signed cookie proving "this browser completed the OTP for member N".
 * Without it, /api/vip/scratch-card would hand a gift to anyone who POSTs a
 * mobile number.
 */
export const SESSION_COOKIE = "dh_vip";
const MAX_AGE_SECONDS = 60 * 60; // an hour is plenty to scratch a card

/**
 * No fallback. A signed cookie is the only thing standing between a POSTed
 * mobile number and someone else's gift, so a guessable secret would not be a
 * weaker version of this protection — it would be none at all, silently, in
 * whichever environment forgot the variable. Failing loudly at the first
 * signature keeps that from shipping unnoticed.
 */
function secret(): string {
  const value = process.env.VIP_SESSION_SECRET?.trim();
  if (!value) {
    throw new Error(
      "VIP_SESSION_SECRET is not set. Generate one with " +
        `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))" ` +
        "and set it in .env.local locally and in the Vercel project settings.",
    );
  }
  return value;
}

const sign = (payload: string) =>
  createHmac("sha256", secret()).update(payload).digest("base64url");

export async function createSession(memberId: number, phone: string) {
  const payload = `${memberId}.${phone}.${Date.now() + MAX_AGE_SECONDS * 1000}`;
  const jar = await cookies();
  jar.set(SESSION_COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function readSession(): Promise<{
  memberId: number;
  phone: string;
} | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  const parts = raw.split(".");
  if (parts.length !== 4) return null;
  const [id, phone, expiry, signature] = parts;

  const expected = Buffer.from(sign(`${id}.${phone}.${expiry}`));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }
  if (Number(expiry) < Date.now()) return null;

  return { memberId: Number(id), phone };
}

export async function clearSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/**
 * Which channel actually carried the verification code.
 *
 * The code is sent by one request and checked by another, and the delivery log
 * can only be written by the second — vip_wa_logs has a foreign key to
 * vip_members, and the member does not exist until verification. So the fact
 * travels in a signed cookie rather than being guessed at the far end: asking
 * the environment again would answer "what would we use now", which is a
 * different question, and wrong for any code that fell back to email.
 *
 * Signed with the same secret as the session, so the browser cannot claim a
 * WhatsApp delivery that never happened. Bound to the phone so a cookie left
 * over from another number cannot be read as this one's.
 */
export const OTP_CHANNEL_COOKIE = "dh_vip_ch";
const CHANNEL_MAX_AGE_SECONDS = 15 * 60; // the code itself expires in 5

export async function rememberOtpChannel(phone: string, channel: NotifyChannel) {
  const payload = `${channel}.${phone}.${Date.now() + CHANNEL_MAX_AGE_SECONDS * 1000}`;
  const jar = await cookies();
  jar.set(OTP_CHANNEL_COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CHANNEL_MAX_AGE_SECONDS,
  });
}

/** Null when absent, tampered with, expired, or written for another number. */
export async function readOtpChannel(
  phone: string,
): Promise<NotifyChannel | null> {
  const jar = await cookies();
  const raw = jar.get(OTP_CHANNEL_COOKIE)?.value;
  if (!raw) return null;

  const parts = raw.split(".");
  if (parts.length !== 4) return null;
  const [channel, cookiePhone, expiry, signature] = parts;

  const expected = Buffer.from(sign(`${channel}.${cookiePhone}.${expiry}`));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }
  if (Number(expiry) < Date.now()) return null;
  if (cookiePhone !== phone) return null;
  if (channel !== "whatsapp" && channel !== "email") return null;

  return channel;
}

export async function clearOtpChannel() {
  (await cookies()).delete(OTP_CHANNEL_COOKIE);
}
