import { isMockDb } from "@/lib/vip/db";
import { PHONE_ERROR, isPlausibleEmail, maskMobile, normaliseMobile } from "@/lib/vip/mobile";
import { issueOtp } from "@/lib/vip/otp";
import { findByPhone } from "@/lib/vip/repo";
import { sendVerificationCode } from "@/lib/vip/notify";

/**
 * Issues a verification code.
 *
 * The channel is not chosen here. lib/vip/notify.ts picks WhatsApp or email
 * from the environment on every send, so adding WATI credentials switches this
 * route over without a line changing.
 *
 * Deliberately writes no member row — the member is created on verification,
 * so an abandoned form leaves nothing behind.
 */
export async function POST(request: Request) {
  let body: { name?: unknown; phone?: unknown; email?: unknown; suburb?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = normaliseMobile(
    typeof body.phone === "string" ? body.phone : "",
  );
  const suburb = typeof body.suburb === "string" ? body.suburb.trim() : "";

  if (name.length < 2 || name.length > 255) {
    return Response.json(
      { success: false, message: "Please enter your name." },
      { status: 400 },
    );
  }
  if (!phone) {
    return Response.json(
      { success: false, message: PHONE_ERROR },
      { status: 400 },
    );
  }
  // Required whichever channel is live: it is how the code reaches the
  // customer while WhatsApp is unconfigured, and the fallback if a WhatsApp
  // send fails once it is. Only an unregistered number reaches this route — an
  // existing member is recognised by check-phone and never asked for one.
  if (!email) {
    return Response.json(
      {
        success: false,
        message:
          "Please add your email address — we send your verification code and your reward confirmation there.",
      },
      { status: 400 },
    );
  }
  if (!isPlausibleEmail(email)) {
    return Response.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Guard in case this is called out of order. An existing member — including
  // one migrated in from the contact list — never needs a code.
  const alreadyMember = await findByPhone(phone);
  if (alreadyMember) {
    return Response.json(
      {
        success: false,
        isExisting: true,
        message: "You're already a VIP member.",
        member: {
          name: alreadyMember.name,
          visitCount: alreadyMember.visitCount ?? 1,
        },
      },
      { status: 409 },
    );
  }

  const issued = await issueOtp(phone);
  if (!issued.ok) {
    return Response.json(
      {
        success: false,
        message: `Please wait ${issued.retryAfterSeconds}s before requesting another code.`,
      },
      { status: 429 },
    );
  }

  // memberExists is false by definition here: the member row is written at
  // verification, and vip_wa_logs cannot reference a member that does not
  // exist yet — so a WhatsApp send is logged in verify-otp instead.
  const sent = await sendVerificationCode({
    phone,
    code: issued.code,
    email,
    name,
    memberExists: false,
  });
  if (!sent.ok) {
    return Response.json(
      { success: false, message: "We could not send your verification code. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({
    success: true,
    message: "OTP sent successfully",
    suburb: suburb || undefined,
    phone,
    phoneMasked: maskMobile(phone),
    // Where the code actually went, straight from the sender — so the screen
    // and the channel can never disagree.
    channel: sent.channel,
    sentTo: sent.sentTo,
    delivered: sent.delivered,
    // Present only while nothing is really being sent AND the database is the
    // local one, so a deployed instance never returns a live code.
    devCode: !sent.delivered && isMockDb() ? issued.code : undefined,
  });
}
