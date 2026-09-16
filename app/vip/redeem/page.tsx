import type { Metadata } from "next";
import StaffRedeemForm from "@/components/vip/StaffRedeemForm";

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
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-peach-400">
            Dosa Hut Sunshine Coast
          </p>
          <h1 className="mt-2 font-display text-3xl text-cream-0">
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
