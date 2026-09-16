import { rewardByType } from "@/lib/vip/gifts";
import {
  clearAttempts,
  findRedeemable,
  formatBrisbane,
  isValidPin,
  recordWrongPin,
  redeemReward,
  throttleState,
} from "@/lib/vip/redeem";

/**
 * Staff marks a reward used.
 *
 * POST { rewardCode, pin } — the code may be either the customer-facing
 * reward code or the staff code, since either may be what is on screen.
 */
export async function POST(request: Request) {
  let body: { rewardCode?: unknown; pin?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const rewardCode =
    typeof body.rewardCode === "string" ? body.rewardCode.trim() : "";
  const pin = typeof body.pin === "string" ? body.pin.trim() : "";

  // One counter per client, so one till guessing does not lock out the others.
  const client =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const throttle = throttleState(client);
  if (throttle.blocked) {
    return Response.json(
      {
        error: `Too many incorrect PINs. Try again in ${Math.ceil(
          throttle.retryAfterSeconds / 60,
        )} minutes.`,
      },
      { status: 429 },
    );
  }

  if (!isValidPin(pin)) {
    recordWrongPin(client);
    return Response.json({ error: "Invalid staff PIN" }, { status: 401 });
  }
  clearAttempts(client);

  if (!rewardCode) {
    return Response.json({ error: "Reward code not found" }, { status: 404 });
  }

  const found = await findRedeemable(rewardCode);
  if (!found) {
    return Response.json({ error: "Reward code not found" }, { status: 404 });
  }

  if (found.status === "redeemed") {
    return Response.json(
      {
        error: `Reward was already redeemed on ${formatBrisbane(
          found.redeemedAt ?? Date.now(),
        )}`,
      },
      { status: 400 },
    );
  }

  const outcome = await redeemReward(found.id);
  if (!outcome) {
    return Response.json({ error: "Reward code not found" }, { status: 404 });
  }

  // Lost the race to another till between the check above and the update.
  if (outcome.status === "already") {
    return Response.json(
      {
        error: `Reward was already redeemed on ${formatBrisbane(
          outcome.reward.redeemedAt ?? Date.now(),
        )}`,
      },
      { status: 400 },
    );
  }

  const catalogue = rewardByType(outcome.reward.type);

  return Response.json({
    success: true,
    message: "Reward successfully redeemed",
    reward: {
      type: outcome.reward.type,
      label: catalogue?.label ?? outcome.reward.type,
      rewardCode: outcome.reward.rewardCode,
      redeemedAt: outcome.reward.redeemedAt,
      redeemedAtLabel: formatBrisbane(outcome.reward.redeemedAt ?? Date.now()),
    },
  });
}
