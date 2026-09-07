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
      className="absolute inset-0 z-0 overflow-hidden"
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


      <div className="pointer-events-auto absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {Array.from({ length: slideCount }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-7 bg-orange-500 shadow-[0_0_10px_rgba(241,90,39,0.9)]"
                : "w-1.5 bg-cream-0/45 hover:bg-cream-0/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
