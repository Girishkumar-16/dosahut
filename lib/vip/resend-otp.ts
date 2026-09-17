/**
 * Email delivery of the verification code, via Resend.
 *
 * ---------------------------------------------------------------------------
 * The live channel until WATI credentials are set. Nothing selects this module
 * by hand — lib/vip/notify.ts picks it whenever WhatsApp is unconfigured, and
 * stops picking it the moment WATI credentials appear in the environment.
 *
 * This module only DELIVERS. Generating the code, hashing it, the 5-minute
 * expiry, the 5-attempt lockout and the 30-second resend cooldown all live in
 * lib/vip/otp.ts and are shared by both channels — nothing here duplicates any
 * of it, so a future switch cannot drift the two apart.
 * ---------------------------------------------------------------------------
 */

// The result shape is shared with lib/vip/wati.ts so callers need no
// branching; `sentTo` is what the screen shows, and it comes from whichever
// module actually did the sending.
import type { SendResult } from "./notify";
import { maskEmail } from "./mobile";

const TIMEOUT_MS = 10_000;

const MAROON = "#570B0B";
const ORANGE = "#F15A27";
const CREAM = "#FFF7F4";
const INK = "#241512";

function template(firstName: string, code: string): string {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:${CREAM};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="background:${CREAM};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="max-width:480px;background:#ffffff;border-radius:12px;overflow:hidden;
                    font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
        <tr><td style="background:${MAROON};padding:26px 28px;text-align:center;">
          <div style="color:${CREAM};font-size:20px;font-weight:700;letter-spacing:.5px;">
            Dosa Hut Sunshine Coast
          </div>
          <div style="color:${ORANGE};font-size:12px;font-weight:700;
                      letter-spacing:3px;text-transform:uppercase;margin-top:6px;">
            VIP Club
          </div>
        </td></tr>

        <tr><td style="padding:30px 28px 8px;">
          <p style="margin:0;color:${INK};font-size:16px;line-height:1.5;">
            Hi ${firstName}, here is your verification code.
          </p>
        </td></tr>

        <tr><td style="padding:12px 28px 4px;" align="center">
          <div style="display:inline-block;background:${CREAM};border:2px dashed ${ORANGE};
                      border-radius:10px;padding:16px 28px;color:${MAROON};
                      font-size:34px;font-weight:700;letter-spacing:10px;
                      font-family:'Courier New',Courier,monospace;">${code}</div>
        </td></tr>

        <tr><td style="padding:14px 28px 30px;">
          <p style="margin:0;color:#5C4A44;font-size:14px;line-height:1.6;text-align:center;">
            This code expires in 5 minutes.<br>
            If you did not ask to join the VIP Club, you can ignore this email.
          </p>
        </td></tr>

        <tr><td style="background:${MAROON};padding:16px 28px;text-align:center;">
          <p style="margin:0;color:${CREAM};font-size:12px;">
            5 Lutana Street, Buddina QLD 4575 &nbsp;&middot;&nbsp; 0423 841 991
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/**
 * @param phone normalised E.164, used only for logging and the mock line
 * @param code  the code already issued by lib/vip/otp.ts
 * @param opts  where to send it. WATI's version takes `memberExists` here.
 */
export async function sendOtp(
  phone: string,
  code: string,
  opts: { email: string; name: string },
): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.RESEND_FROM?.trim() || "Dosa Hut VIP <onboarding@resend.dev>";
  const firstName = opts.name.split(" ")[0] || "there";

  if (!key) {
    if (process.env.NODE_ENV === "production") {
      // Never claim a code was sent, and never print one into platform logs.
      console.error("[Resend] Not configured. Set RESEND_API_KEY and RESEND_FROM.");
      return { ok: false, error: "Email sending is not configured." };
    }
    console.log(`[Resend mock] OTP for ${opts.email} (${phone}) is ${code}`);
    return { ok: true, delivered: false, queued: false, channel: "email", sentTo: maskEmail(opts.email) };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [opts.email],
        subject: `${code} is your Dosa Hut VIP code`,
        html: template(firstName, code),
        text:
          `Hi ${firstName},\n\n` +
          `Your Dosa Hut Sunshine Coast VIP Club verification code is ${code}.\n` +
          `It expires in 5 minutes.\n\n` +
          `If you did not ask to join, you can ignore this email.`,
      }),
      // A hung request would otherwise hold the invocation open until the
      // platform kills it, with no useful error for the customer.
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[Resend] HTTP ${res.status}: ${detail.slice(0, 300)}`);
      return { ok: false, error: `Resend responded ${res.status}` };
    }

    return { ok: true, delivered: true, queued: false, channel: "email", sentTo: maskEmail(opts.email) };
  } catch (error) {
    const message =
      error instanceof Error && error.name === "TimeoutError"
        ? `Resend did not respond within ${TIMEOUT_MS / 1000}s`
        : error instanceof Error
          ? error.message
          : "Unknown error contacting Resend";
    console.error(`[Resend] ${message}`);
    return { ok: false, error: message };
  }
}

/**
 * The welcome email a new member gets once their reward is issued.
 *
 * Deliberately separate from sendOtp and deliberately best-effort: the caller
 * fires it without awaiting the result, because a member who has already
 * earned their reward must never lose it to a mail provider having a bad day.
 */
export async function sendWelcomeEmail(
  to: string,
  name: string,
  reward: { rewardCode: string; staffCode: string | null; type: string },
): Promise<void> {
  const key = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.RESEND_FROM?.trim() || "Dosa Hut VIP <onboarding@resend.dev>";
  const firstName = name.split(" ")[0] || "there";

  const { rewardByType } = await import("./gifts");
  const catalogue = rewardByType(reward.type);
  const label = catalogue?.label ?? reward.type;
  const detail = catalogue?.detail ?? "";

  if (!key) {
    console.log(
      `[Resend mock] welcome email for ${to} — ${label}, code ${reward.rewardCode}`,
    );
    return;
  }

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:${CREAM};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="background:${CREAM};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="max-width:480px;background:#ffffff;border-radius:12px;overflow:hidden;
                    font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
        <tr><td style="background:${MAROON};padding:26px 28px;text-align:center;">
          <div style="color:${CREAM};font-size:20px;font-weight:700;">Dosa Hut Sunshine Coast</div>
          <div style="color:${ORANGE};font-size:12px;font-weight:700;
                      letter-spacing:3px;text-transform:uppercase;margin-top:6px;">VIP Club</div>
        </td></tr>

        <tr><td style="padding:30px 28px 6px;">
          <p style="margin:0;color:${INK};font-size:18px;font-weight:700;">
            Welcome to the club, ${firstName}.
          </p>
          <p style="margin:10px 0 0;color:#5C4A44;font-size:15px;line-height:1.6;">
            You scratched and you won:
          </p>
        </td></tr>

        <tr><td style="padding:14px 28px 4px;" align="center">
          <div style="background:${CREAM};border:2px dashed ${ORANGE};border-radius:10px;padding:18px 24px;">
            <div style="color:${MAROON};font-size:20px;font-weight:700;">${label}</div>
            <div style="color:#5C4A44;font-size:13px;margin-top:6px;line-height:1.5;">${detail}</div>
            <div style="margin-top:14px;color:${MAROON};font-size:22px;font-weight:700;
                        letter-spacing:4px;font-family:'Courier New',Courier,monospace;">
              ${reward.rewardCode}
            </div>
          </div>
        </td></tr>

        <tr><td style="padding:16px 28px 30px;">
          <p style="margin:0;color:#5C4A44;font-size:14px;line-height:1.6;text-align:center;">
            Show this code in store to redeem. Keep this email — it is your
            proof of the reward.
          </p>
        </td></tr>

        <tr><td style="background:${MAROON};padding:16px 28px;text-align:center;">
          <p style="margin:0;color:${CREAM};font-size:12px;">
            5 Lutana Street, Buddina QLD 4575 &nbsp;&middot;&nbsp; 0423 841 991
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `You're in — your Dosa Hut VIP reward is ${label}`,
      html,
      text:
        `Welcome to the club, ${firstName}.\n\n` +
        `You won: ${label}\n${detail}\n\n` +
        `Your code: ${reward.rewardCode}\n\n` +
        `Show this code in store at Dosa Hut Sunshine Coast to redeem.`,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) {
    const detailText = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detailText.slice(0, 200)}`);
  }
}
