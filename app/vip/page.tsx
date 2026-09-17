import type { Metadata } from "next";
import Image from "next/image";
import VipBenefits from "@/components/vip/VipBenefits";
import VipRewardCards from "@/components/vip/VipRewardCards";
import VipJoinFlow from "@/components/vip/VipJoinFlow";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "VIP Club — Dosa Hut Sunshine Coast",
  description:
    "Join the Dosa Hut Sunshine Coast VIP Club. Register in seconds, verify your details and scratch your welcome gift.",
};

export default function VipPage() {
  return (
    <main className="vip-content-wrapper min-h-dvh overflow-hidden bg-cream-50">
      <section className="vip-card-text bg-maroon-900 px-5 py-10 text-center text-cream-0">
        {/* Visitors arrive here by scanning the in-store poster, so the first
            thing on screen has to be the same mark they just scanned from.
            The logo replaces what used to be the restaurant's name in text. */}
        <Image
          src="/images/logo.png"
          alt={SITE.name}
          width={272}
          height={182}
          className="mx-auto h-20 w-auto sm:h-24"
          priority
        />
        <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
          Join the VIP Club
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-cream-200">
          Register in seconds, verify your details, and scratch your welcome
          gift. Members hear about specials first.
        </p>
      </section>

      {/* Benefits and rewards come before the form: the visitor arriving from
          the poster wants to know what they get before handing over a number. */}
      <section className="px-5 pt-10 pb-8">
        <VipBenefits />
      </section>

      <section className="px-5 pb-10">
        <VipRewardCards />
      </section>

      <section id="join" className="bg-cream-100 px-5 py-12">
        <div className="vip-card-text mx-auto w-full max-w-md">
          <h2 className="text-center font-heading text-sm uppercase tracking-widest text-maroon-900">
            Join the club
          </h2>
          <p className="mx-auto mt-2 mb-6 max-w-sm text-center text-sm text-ink-600">
            Takes about twenty seconds. Your reward is waiting on the other
            side.
          </p>
          <VipJoinFlow />
        </div>
      </section>
    </main>
  );
}
