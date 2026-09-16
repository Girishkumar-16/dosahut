import { REWARDS } from "@/lib/vip/gifts";

/**
 * The four welcome rewards, as cards rather than a list — this is the section
 * that has to make joining feel worth it, so each reward gets its own object
 * with the same anatomy: badge, name, one appetising line, and the tag that
 * says it arrives immediately rather than "some time later".
 *
 * Reads from lib/vip/gifts.ts, so what is advertised here and what the scratch
 * card actually hands out can never drift apart.
 */
export default function VipRewardCards() {
  return (
    <section
      aria-labelledby="vip-rewards-heading"
      className="mx-auto w-full max-w-md sm:max-w-4xl"
    >
      <h2
        id="vip-rewards-heading"
        className="text-center font-heading text-sm uppercase tracking-widest text-maroon-900"
      >
        What you could win
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-center text-sm text-ink-600">
        Every new member scratches once and keeps whatever turns up.
      </p>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {REWARDS.map((reward) => (
          <li
            key={reward.type}
            className="flex flex-col rounded-2xl border border-maroon-900/12 bg-cream-0 p-5 shadow-sm"
          >
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/12 text-2xl"
            >
              {reward.icon}
            </span>

            <h3 className="mt-4 font-heading text-base uppercase tracking-wide text-maroon-900">
              {reward.label}
            </h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-600">
              {reward.detail}
            </p>

            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 font-heading text-[11px] uppercase tracking-wider text-orange-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
                aria-hidden="true"
              >
                <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10.5H13z" />
              </svg>
              Instant scratch reward
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-center text-xs text-ink-600">
        Offers subject to confirmation. One welcome reward per mobile number.
      </p>
    </section>
  );
}
