import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  // absolute, so the root layout's "| Dosa Hut Sunshine Coast" template does
  // not append the brand a second time.
  title: {
    absolute: "VIP Club Terms & Conditions — Dosa Hut Sunshine Coast",
  },
  description:
    "Terms and conditions for the Dosa Hut Sunshine Coast VIP Club, including eligibility, welcome rewards, reward codes and communications.",
};

/** Numbered so staff and customers can point at the same clause. */
const SECTIONS = [
  {
    heading: "Eligibility",
    body: [
      `Membership of the ${SITE.name} VIP Club is open to Australian residents aged 18 years or over.`,
      "A valid Australian mobile number is required to join. It identifies your membership, and is how we recognise you when you return.",
      "Employees of the venue and their immediate families may join, but are not eligible to receive welcome rewards.",
    ],
  },
  {
    heading: "Welcome Reward",
    body: [
      "New members receive one welcome reward, issued at random from the current reward pool. The reward you receive is determined at the moment you scratch and cannot be chosen, exchanged or swapped.",
      "The current pool is: 30% off your bill up to a maximum of $25, $5 off your bill, one free Mango Lassi, and one free serve of Biryani.",
      "Welcome rewards are valid for dine-in only. They are not transferable, hold no cash value, cannot be exchanged for cash, and cannot be combined with any other offer, discount or promotion.",
    ],
  },
  {
    heading: "Reward Code",
    body: [
      "Each reward is issued with a unique code. A reward becomes active 12 hours after it is issued and cannot be redeemed before that time.",
      "Once active, a reward is valid for 30 days. Any reward not redeemed within that window expires and cannot be reinstated.",
      "A reward code may be redeemed once only, in person at the counter, with a staff member present. Codes presented by screenshot, forwarded message or any means other than the member's own device may be refused.",
    ],
  },
  {
    heading: "One Membership Per Person",
    body: [
      "Strictly one membership per mobile number. Attempting to register more than once — including with a different name, email or suburb — does not create a second membership and does not issue a second welcome reward.",
      "If a number is already registered, the member is recognised and no further reward is issued.",
    ],
  },
  {
    heading: "Communications",
    body: [
      "By joining, you consent to receiving email or SMS communications from us about your membership. These include transactional messages, such as your verification code and reward details, and promotional messages about offers, events and menu changes.",
      "You may opt out of promotional messages at any time — reply STOP to an SMS, or use the unsubscribe link in any email. Transactional messages relating to a reward you already hold may still be sent.",
      "We do not sell or share your contact details with third parties for their own marketing.",
    ],
  },
  {
    heading: "Fraud & Misuse",
    body: [
      "Any attempt to obtain rewards by fraud, misrepresentation, automated means, duplicate registration or interference with the system will result in immediate disqualification.",
      "We may cancel any membership and void any reward, issued or unredeemed, where we reasonably believe these terms have been breached. Our decision in these matters is final.",
    ],
  },
  {
    heading: "Modifications",
    body: [
      `${SITE.name} reserves the right to change these terms, alter the reward pool, or suspend or end the VIP Club at any time, without prior notice.`,
      "Changes take effect when published on this page. Rewards already issued and still within their validity window will be honoured on the terms that applied when they were issued.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about your membership or a reward should be directed to the ${SITE.name} branch.`,
    ],
  },
];

export default function VipTermsPage() {
  return (
    <main className="min-h-dvh bg-cream-50">
      {/* Same maroon header and logo as /vip: the customer opens this page
          from the consent checkbox, in a new tab, and has to recognise
          instantly that it is still Dosa Hut. The logo carries the brand name,
          so it replaces the text eyebrow rather than sitting above it. */}
      <section className="bg-maroon-900 px-5 py-10 text-center text-cream-0">
        <Image
          src="/images/logo.png"
          alt={SITE.name}
          width={272}
          height={182}
          className="mx-auto h-20 w-auto sm:h-24"
          priority
        />
        <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
          VIP Club Terms &amp; Conditions
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-cream-200">
          Please read these before joining. They apply to every membership and
          every reward.
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

        <ol className="mt-8 space-y-4">
          {SECTIONS.map((section, index) => (
            <li
              key={section.heading}
              className="rounded-2xl border border-maroon-900/12 bg-cream-0 p-6"
            >
              <h2 className="font-heading text-base uppercase tracking-wide text-maroon-900">
                <span className="mr-2 font-normal text-ink-600">
                  {index + 1}.
                </span>
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-ink-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-2xl bg-cream-100 p-6 text-sm leading-relaxed text-ink-700">
          <p className="font-heading text-sm uppercase tracking-wide text-maroon-900">
            {SITE.name}
          </p>
          <p className="mt-2">{SITE.addressFull}</p>
          <p className="mt-1">
            <a href={SITE.phoneHref} className="underline underline-offset-4">
              {SITE.phoneDisplay}
            </a>
          </p>
        </div>

        <Link
          href="/vip"
          className="mt-8 block w-full rounded-xl bg-orange-500 px-5 py-3 text-center font-heading text-base uppercase tracking-wide text-cream-0 transition hover:bg-orange-600"
        >
          Back to the VIP Club
        </Link>
      </div>
    </main>
  );
}
