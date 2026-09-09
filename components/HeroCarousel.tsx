"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Dish } from "@/lib/site";

// Slide 1 is the full-bleed banner, slides 2-4 are three-column collages.
const BANNER_MS = 5000;
const COLLAGE_MS = 7000;
const SWIPE_THRESHOLD_PX = 40;

export function HeroCarousel({ dishes, enabled }: { dishes: Dish[]; enabled: boolean }) {
  const trios = [dishes.slice(0, 3), dishes.slice(3, 6), dishes.slice(6, 9)].filter(
    (trio) => trio.length === 3,
  );
  const slideCount = 1 + trios.length;

  const [index, setIndex] = useState(0);
  // Slides mount only once they have been reached, so the first paint fetches
  // the banner alone rather than all ten hero images at once.
  const [maxReached, setMaxReached] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function goTo(next: number) {
    setIndex(next);
    setMaxReached((m) => Math.max(m, next));
  }

  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(
      () => goTo((index + 1) % slideCount),
      index === 0 ? BANNER_MS : COLLAGE_MS,
    );
    return () => clearTimeout(id);
  }, [enabled, index, slideCount]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    goTo((index + (dx < 0 ? 1 : -1) + slideCount) % slideCount);
  }

  return (
    <div
      role="group"
      aria-label="Featured dishes"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="absolute inset-0 overflow-hidden"
    >
      {/* Slide 1 — full-bleed banner */}
      <div
        aria-hidden={index !== 0}
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          index === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/images/hero-banner.png"
          alt="A spread of Dosa Hut curries, biryani, chutneys and fresh roti"
          fill
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Slides 2-4 — seamless three-column collages */}
      {trios.map((trio, t) => {
        const slide = t + 1;
        if (slide > maxReached) return null;
        return (
          <div
            key={slide}
            aria-hidden={index !== slide}
            className={`absolute inset-0 grid grid-cols-3 gap-0 transition-opacity duration-1000 ease-in-out ${
              index === slide ? "opacity-100" : "opacity-0"
            }`}
          >
            {trio.map((dish) => (
              <div key={dish.name} className="relative h-full w-full border-0">
                <Image
                  src={dish.image!}
                  alt={dish.alt ?? dish.name}
                  fill
                  sizes="34vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        );
      })}


      {/* The dots sit above every other hero layer and take pointer events of
          their own, so neither the copy overlay nor the slides can swallow a
          tap. Each dash is only 6px tall, so the button around it is padded out
          to a 44px target and the dash itself is drawn as an inner span. */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-2 z-30 flex items-center justify-center">
        {Array.from({ length: slideCount }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center bg-transparent"
          >
            <span
              aria-hidden
              className={`block h-2 rounded-full transition-all duration-300 ease-out ${
                i === index
                  ? "w-6 bg-orange-500 shadow-[0_0_10px_rgba(241,90,39,0.9)]"
                  : "w-2 bg-cream-0/50 hover:bg-cream-0"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
