import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  // absolute, so the root layout's "| Dosa Hut Sunshine Coast" template does
  // not append the brand a second time.
  title: {
    absolute: "VIP Club Privacy Policy — Dosa Hut Sunshine Coast",
  },
  description:
    "How Dosa Hut Sunshine Coast collects, uses, stores and protects the personal information of VIP Club members, and how to opt out.",
};

const LAST_UPDATED = "September 2026";

/** Where privacy enquiries go, kept in one place so it cannot drift. */
const PRIVACY_EMAIL = "privacy@dosahut.com.au";

/**
 * Numbered so a member and a staff member can point at the same clause, and so
 * it lines up with /vip/terms, which is numbered the same way.
 *
 * `body` is prose; `list` is rendered as bullets beneath it.
 */
const SECTIONS: { heading: string; body?: string[]; list?: string[] }[] = [
  {
    heading: "Information We Collect",
    body: [
      `When you join the ${SITE.name} VIP Club, we collect your name, Australian mobile number, email address, and suburb. This information is provided voluntarily by you through our registration form.`,
    ],
  },
  {
    heading: "How We Use Your Information",
    body: ["We use your information to:"],
    list: [
      "Send your VIP welcome reward and unique reward code via Email or WhatsApp.",
      "Send exclusive VIP offers, promotions, and seasonal rewards.",
      `Notify you of new menu items, events, and news relevant to ${SITE.name} in the Brisbane region.`,
      "Record your reward redemptions to prevent duplicate use.",
    ],
  },
  {
    heading: "How We Store Your Information",
    body: [
      `Your information is stored securely in our cloud database, hosted in Australia. Access is restricted to authorised ${SITE.name} staff only.`,
    ],
  },
  {
    heading: "Communications & Marketing",
    body: [
      `By joining the VIP Club, you consent to receiving promotional messages, offers, and reward notifications from ${SITE.name} via Email and WhatsApp. You can opt out at any time by clicking the unsubscribe link in our emails or replying STOP to any WhatsApp message. We will honour all opt-out requests promptly.`,
    ],
  },
  {
    heading: "Sharing Your Information",
    body: [
      "We do not sell, rent, or trade your personal information to third parties. We may share your information with our communication service providers solely to deliver notifications on our behalf, under strict confidentiality obligations.",
    ],
  },
  {
    heading: "Your Rights",
    body: ["You have the right to:"],
    list: [
      "Request access to the personal information we hold about you.",
      "Request correction of inaccurate information.",
      "Request deletion of your information from our database.",
      "Withdraw your marketing consent at any time.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `For privacy enquiries regarding our Brisbane / Sunshine Coast operations, contact ${SITE.name} via your nearest branch or email ${PRIVACY_EMAIL}.`,
    ],
  },
];

export default function VipPrivacyPage() {
  return (
    <main className="vip-content-wrapper min-h-dvh overflow-hidden bg-cream-50">
      {/* Same header as /vip and /vip/terms: this page is opened in a new tab
          from the consent text, and has to read as the same site. */}
      <section className="vip-card-text bg-maroon-900 px-5 py-10 text-center text-cream-0">
        <Image
          src="/images/logo.png"
          alt={SITE.name}
          width={272}
          height={182}
          className="mx-auto h-20 w-auto sm:h-24"
          priority
        />
        <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 font-heading text-xs uppercase tracking-[0.3em] text-peach-400">
          VIP Club
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-cream-200">
          Last updated: {LAST_UPDATED}
        </p>
      </section>

      <div className="mx-auto w-full max-w-2xl px-5 py-10">
        <Link
          href="/vip"
          className="inline-flex items-center gap-2 font-heading text-sm uppercase tracking-wider text-maroon-900 underline-offset-4 hover:underline"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back to the VIP Club
        </Link>

        <ol className="vip-card-text mt-8 space-y-4">
          {SECTIONS.map((section, index) => (
            <li
              key={section.heading}
              className="vip-card-text rounded-2xl border border-maroon-900/12 bg-cream-0 p-6"
            >
              <h2 className="font-heading text-base uppercase tracking-wide text-maroon-900">
                <span className="mr-2 font-normal text-ink-600">
                  {index + 1}.
                </span>
                {section.heading}
              </h2>
              <div className="vip-card-text mt-3 space-y-3">
                {section.body?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-ink-700"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="vip-prose-list space-y-2 text-sm leading-relaxed text-ink-700">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm leading-relaxed text-ink-700">
          To exercise any of these rights, please{" "}
          <a
            href={`mailto:${PRIVACY_EMAIL}`}
            className="font-medium text-maroon-900 underline underline-offset-4"
          >
            contact us
          </a>
          .
        </p>

        <div className="vip-card-text mt-6 rounded-2xl bg-cream-100 p-6 text-sm leading-relaxed text-ink-700">
          <p className="font-heading text-sm uppercase tracking-wide text-maroon-900">
            {SITE.name}
          </p>
          <p className="mt-2">{SITE.addressFull}</p>
          <p className="mt-1">
            <a href={SITE.phoneHref} className="underline underline-offset-4">
              {SITE.phoneDisplay}
            </a>
          </p>
          <p className="mt-1">
            <a
              href={`mailto:${PRIVACY_EMAIL}`}
              className="underline underline-offset-4"
            >
              {PRIVACY_EMAIL}
            </a>
          </p>
          <p className="mt-3">
            See also the{" "}
            <Link
              href="/vip/terms"
              className="font-medium text-maroon-900 underline underline-offset-4"
            >
              VIP Club Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>

        <Link
          href="/vip"
          className="mt-8 block w-full rounded-xl bg-orange-500 px-5 py-3 text-center font-heading text-base uppercase tracking-wide text-cream-0 transition hover:bg-orange-600"
        >
          Back to VIP Home
        </Link>
      </div>
    </main>
  );
}
