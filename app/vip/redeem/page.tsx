import type { Metadata } from "next";
import Image from "next/image";
import StaffRedeemForm from "@/components/vip/StaffRedeemForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redeem a VIP reward — Dosa Hut Sunshine Coast",
  // Staff-only tool; keep it out of search results.
  robots: { index: false, follow: false },
};

export default function RedeemPage() {
  return (
    <main className="min-h-dvh bg-maroon-900 px-5 py-10">
      <div className="mx-auto w-full max-w-sm">
        <header className="text-center">
          {/* Matches the /vip header, a little smaller: this runs on a phone
              behind the counter, so the form itself has to stay above the
              fold. The logo carries the brand name, so it replaces the text
              eyebrow rather than repeating it. */}
          <Image
            src="/images/logo.png"
            alt={SITE.name}
            width={272}
            height={182}
            className="mx-auto h-16 w-auto sm:h-20"
            priority
          />
          <h1 className="mt-5 font-display text-3xl text-cream-0">
            Redeem a reward
          </h1>
          <p className="mt-2 text-sm text-cream-200">
            Enter the code from the customer&rsquo;s screen.
          </p>
        </header>

        <div className="mt-7">
          <StaffRedeemForm />
        </div>
      </div>
    </main>
  );
}
