import { randomBytes } from "node:crypto";

/**
 * The welcome rewards a new member can scratch. `type` is what goes in
 * vip_rewards.type; the rest is what the customer and the counter staff see.
 *
 * Still placeholder wording pending the owner's sign-off — the codes are what
 * the database and any redemption tooling key off, so those should not change
 * casually once members hold them.
 */
export type Reward = {
  type: string;
  /** Prefix for the customer-facing code, e.g. LASSI-HKTLMI. */
  prefix: string;
  /** Shown on the reward card and again when the card is scratched, so the
   *  customer reads the same words before and after winning. */
  label: string;
  /** One appetising line for the reward card. */
  detail: string;
  icon: string;
  weight: number;
};

export const REWARDS: Reward[] = [
  {
    type: "mango_lassi",
    prefix: "LASSI",
    icon: "\u{1F96D}",
    label: "Free Mango Lassi",
    detail: "Thick, cold and properly sweet — the house pour, on us, with any main course.",
    weight: 25,
  },
  {
    type: "10_percent_off",
    prefix: "TENOFF",
    icon: "\u{1F3F7}\u{FE0F}",
    label: "10% Off Your Next Meal",
    detail: "Straight off the bill, dine-in or takeaway. No minimum spend.",
    weight: 40,
  },
  {
    type: "free_gulab_jamun",
    prefix: "JAMUN",
    icon: "\u{1F368}",
    label: "Free Gulab Jamun",
    detail: "Warm, syrup-soaked and impossible to share. Yours with any main course.",
    weight: 25,
  },
  {
    type: "5_dollar_off",
    prefix: "FIVEOFF",
    icon: "\u{1F4B5}",
    label: "$5 Off Your Bill",
    detail: "Five dollars back on any order over $30, dine-in or takeaway.",
    weight: 10,
  },
];

/** Every welcome reward type. Used by the one-per-member database index. */
export const WELCOME_REWARD_TYPES = REWARDS.map((r) => r.type);

export const rewardByType = (type: string) =>
  REWARDS.find((r) => r.type === type);

export function pickReward(): Reward {
  const total = REWARDS.reduce((sum, r) => sum + r.weight, 0);
  let roll = Math.random() * total;
  for (const reward of REWARDS) {
    roll -= reward.weight;
    if (roll <= 0) return reward;
  }
  return REWARDS[0];
}

/** Crockford-ish alphabet: no I, O, 0 or 1, so codes survive being read aloud. */
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function randomToken(length: number): string {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

/** e.g. LASSI-HKTLMI — what the customer shows at the counter. */
export const makeRewardCode = (reward: Reward) =>
  `${reward.prefix}-${randomToken(6)}`;

/** e.g. SC-4M2X — what staff key in to mark it redeemed. */
export const makeStaffCode = () => `SC-${randomToken(4)}`;
