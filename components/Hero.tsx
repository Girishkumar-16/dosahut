"use client";

import { useState } from "react";
import { HeroVideo } from "./HeroVideo";
import { ArrowRightIcon, FlameIcon } from "./Icons";
import { WeekendSpecialModal } from "./WeekendSpecialModal";
import { SITE } from "@/lib/site";

export function Hero() {
  const [weekendOpen, setWeekendOpen] = useState(false);

  return (
    <section
      id="top"
      className="relative flex min-h-[35rem] w-full flex-col items-center justify-center overflow-hidden bg-maroon-950 py-16 md:min-h-[45rem] md:py-24"
    >
      {/* One hero for every width: the looping video, with the copy centred
          over it. Desktop no longer has a layout of its own. */}
      <div className="absolute inset-0">
        <HeroVideo />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 pt-6 pb-10 text-center sm:px-6">
        <h1 className="font-heading text-5xl leading-tight font-extrabold tracking-tight text-balance text-maroon-800 uppercase sm:text-6xl lg:text-7xl xl:text-5xl">
          India, Served with a Sunshine Coast Soul.
        </h1>

        <p className="max-w-[34rem] text-xl leading-relaxed font-semibold text-cream-0 lg:text-2xl xl:text-xl">
          Coastal vibes. Authentic Indian heat. Tandoori grills, slow-cooked
          curries, street-side chaats &amp; crispy dosas &mdash; freshly made
          in Buddina.
        </p>

        <div className="pointer-events-auto mt-2 flex w-full max-w-xs flex-col items-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <a
            href={SITE.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-glow font-heading inline-flex min-h-[44px] w-full max-w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-lg font-bold tracking-wider uppercase sm:w-auto sm:px-7 sm:py-3.5 sm:text-xl lg:px-8"
          >
            Order Now
            <ArrowRightIcon size={14} />
          </a>
          {/* Cream box, maroon flame, maroon label — no dark fill behind the
              icon. The flame is an SVG rather than the 🔥 emoji, which cannot
              be recoloured. */}
          <button
            type="button"
            onClick={() => setWeekendOpen(true)}
            className="font-heading inline-flex min-h-[44px] w-full max-w-full items-center justify-center gap-2.5 rounded-md border-2 border-maroon-800 bg-cream-0 px-5 py-3 text-lg font-bold tracking-wider text-maroon-800 uppercase shadow-sm transition-colors hover:bg-cream-50 sm:w-auto sm:px-7 sm:py-3.5 sm:text-xl lg:px-8"
          >
            <FlameIcon size={20} />
            Weekend Special
          </button>
        </div>
      </div>

      <WeekendSpecialModal open={weekendOpen} onClose={() => setWeekendOpen(false)} />
    </section>
  );
}
