import { maskMobile } from "./mobile";
import { logWhatsApp } from "./repo";
import type { SendResult } from "./notify";

/**
 * WATI WhatsApp delivery.
 *
 * Dormant until WATI_API_ENDPOINT, WATI_BEARER_TOKEN and WATI_TEMPLATE_NAME
 * are set. Nothing here has to be switched on by hand — lib/vip/notify.ts
 * checks isWatiConfigured() on every send and routes to this module the moment
 * the credentials exist.
 *
 * Every attempt is recorded in vip_wa_logs with its real outcome, 'sent' or
 * 'failed'. Nothing is ever written as 'queued', so there is no backlog to
 * drain on the day WhatsApp goes live — the first message simply sends.
 */
const TIMEOUT_MS = 10_000;

/** The template placeholder the code is injected into. Must match WATI. */
const OTP_PARAM_NAME = process.env.WATI_TEMPLATE_PARAM?.trim() || "otp";

export const isWatiConfigured = () =>
  Boolean(
    process.env.WATI_API_ENDPOINT?.trim() &&
      process.env.WATI_BEARER_TOKEN?.trim() &&
      process.env.WATI_TEMPLATE_NAME?.trim(),
  );

/**
 * WATI_API_ENDPOINT may be the tenant base URL or the full send endpoint.
 * Both are accepted, so a value pasted from the dashboard works either way.
 */
function buildSendUrl(endpoint: string, whatsappNumber: string): string {
  const trimmed = endpoint.replace(/\/+$/, "");
  const base = trimmed.includes("/api/")
    ? trimmed
    : `${trimmed}/api/v1/sendTemplateMessage`;
  return `${base}?whatsappNumber=${encodeURIComponent(whatsappNumber)}`;
}

/**
 * @param opts.memberExists vip_wa_logs.member_phone has a foreign key to
 *   vip_members, so a number with no member row yet has nowhere to hang a log.
 */
export async function sendOtp(
  phone: string,
  code: string,
  opts: { memberExists: boolean },
): Promise<SendResult> {
  const endpoint = process.env.WATI_API_ENDPOINT!.trim();
  const token = process.env.WATI_BEARER_TOKEN!.trim();
  const template = process.env.WATI_TEMPLATE_NAME!.trim();

  // WATI expects the number without a leading '+'.
  const whatsappNumber = phone.replace(/^\+/, "");

  const record = async (status: "sent" | "failed") => {
    if (!opts.memberExists) return;
    try {
      await logWhatsApp(phone, status);
    } catch (error) {
      // A failed log must not cost the customer their registration.
      console.error(`[WATI] could not log ${status} for ${phone}:`, error);
    }
  };

  try {
    const res = await fetch(buildSendUrl(endpoint, whatsappNumber), {
      method: "POST",
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template_name: template,
        broadcast_name: "dosa-hut-vip-otp",
        parameters: [{ name: OTP_PARAM_NAME, value: code }],
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(
        `[WATI] HTTP ${res.status} sending to ${whatsappNumber}: ${detail.slice(0, 300)}`,
      );
      await record("failed");
      return { ok: false, error: `WATI responded ${res.status}` };
    }

    // WATI answers 200 even when it refuses the send, with the reason in the
    // body — so the status code alone is not proof of delivery.
    const payload: unknown = await res.json().catch(() => null);
    if (payload && typeof payload === "object") {
      const body = payload as { result?: unknown; info?: unknown };
      const refused =
        body.result === false ||
        body.result === "false" ||
        (typeof body.result === "string" &&
          body.result.toLowerCase() === "failure");
      if (refused) {
        const info =
          typeof body.info === "string" ? body.info : "WATI refused the send";
        console.error(`[WATI] Refused for ${whatsappNumber}: ${info}`);
        await record("failed");
        return { ok: false, error: info };
      }
    }

    await record("sent");
    return {
      ok: true,
      delivered: true,
      channel: "whatsapp",
      sentTo: maskMobile(phone),
    };
  } catch (error) {
    const message =
      error instanceof Error && error.name === "TimeoutError"
        ? `WATI did not respond within ${TIMEOUT_MS / 1000}s`
        : error instanceof Error
          ? error.message
          : "Unknown error contacting WATI";
    console.error(`[WATI] ${message}`);
    await record("failed");
    return { ok: false, error: message };
  }
}
