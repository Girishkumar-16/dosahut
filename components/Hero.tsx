"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HeroCarousel } from "./HeroCarousel";
import { ArrowRightIcon } from "./Icons";
import { WeekendSpecialModal } from "./WeekendSpecialModal";
import { DISHES, SITE, type Dish } from "@/lib/site";

const PLANET_NAMES = [
  "Masala Dosa",
  "Chicken 65 Biryani",
  "Chicken Dum Biryani",
  "Paneer Tikka",
  "Tandoori Chicken (Half)",
  "Paneer Butter Masala",
  "Palak Paneer",
  "Butter Chicken",
  "Chicken Madras",
  "Chilli Chicken",
  "Goat Curry",
];

const PLANETS: Dish[] = PLANET_NAMES.map((name) => DISHES.find((d) => d.name === name)!);

// The carousel shows three trios; the orbit uses the full set.
const SLIDER_DISHES = PLANETS.slice(0, 9);

const ROTATION_MS = 60000;

// Each dish is a stretched 2:1 oval with a full elliptical corner radius. The
// size is fixed in px so the ovals never resize mid-orbit, which would show up
// as a shimmer along the path.
const DISH_WIDTH = 200;
const DISH_HEIGHT = 100;

// Medium Ellipse Radius. X is pulled in to pay for the extra dish width, so the
// ovals still clear the max-w-3xl copy column at their inner edge; Y clears the
// copy block by ~190px so the ovals passing above and below it miss the text.
const ORBIT_RADIUS_X = 510;
const ORBIT_RADIUS_Y = 240;

// The orbit spans ~1220px including the dish width, so it only fits from
// Tailwind's xl breakpoint up. Below that the hero shows the carousel instead.
const ORBIT_MIN_WIDTH = 1280;

function useOrbitEnabled() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    function update() {
      setEnabled(window.innerWidth >= ORBIT_MIN_WIDTH);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return enabled;
}

export function Hero() {
  const orbitEnabled = useOrbitEnabled();
  const [angle, setAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<Dish | null>(null);
  const [weekendOpen, setWeekendOpen] = useState(false);

  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    if (!orbitEnabled) return;
    function tick(ts: number) {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;
      if (!paused) {
        setAngle((a) => (a + (dt / ROTATION_MS) * 360) % 360);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, orbitEnabled]);

  const handleMouseEnter = (dish: Dish) => {
    setPaused(true);
    setActive(dish);
  };

  const handleMouseLeave = () => {
    setPaused(false);
    setActive(null);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[35rem] w-full flex-col items-center justify-center overflow-hidden bg-maroon-950 py-16 md:min-h-[45rem] md:py-24 xl:bg-cream-50"
    >
      {/* Mobile and tablet: full-bleed timed carousel. */}
      <div className="absolute inset-0 z-0 xl:hidden">
        <HeroCarousel dishes={SLIDER_DISHES} enabled={!orbitEnabled} />
      </div>

      {/* Laptop and up: the original light gradient behind the orbiting dishes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden xl:block"
        style={{
          background:
            "radial-gradient(circle at center, #FFF7F4 0%, #F9ECE4 55%, #F2DDD0 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_center,rgba(241,90,39,0.12),transparent_60%)] xl:block"
      />

      {/* Orbiting Dishes */}
      {orbitEnabled && (
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center xl:flex">
          {PLANETS.map((dish, i) => {
            const baseDeg = (360 / PLANETS.length) * i;
            const deg = ((baseDeg + angle) * Math.PI) / 180;
            const x = ORBIT_RADIUS_X * Math.cos(deg);
            const y = ORBIT_RADIUS_Y * Math.sin(deg);

            const isActive = active?.name === dish.name;

            return (
              <div
                key={dish.name}
                className="group pointer-events-auto absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  zIndex: isActive ? 20 : 1,
                }}
                onMouseEnter={() => handleMouseEnter(dish)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Shadow */}
                <div
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-300 ease-out"
                  style={{
                    bottom: isActive ? -20 : -16,
                    width: isActive ? 176 : 156,
                    height: isActive ? 18 : 14,
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 80%)",
                    opacity: isActive ? 1 : 0.7,
                    filter: "blur(5px)",
                  }}
                />

                <a
                  href={SITE.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Order ${dish.name} online`}
                  style={{ height: DISH_HEIGHT, width: DISH_WIDTH }}
                  className={`relative block overflow-hidden rounded-[50%] border-2 border-maroon-800/15 shadow-[0_10px_24px_-8px_rgba(58,13,13,0.35)] transition-all duration-300 ease-out ${
                    isActive ? "scale-110 border-orange-500 drop-shadow-2xl" : "scale-100"
                  }`}
                >
                  {dish.image ? (
                    <Image
                      src={dish.image}
                      alt={dish.alt ?? dish.name}
                      fill
                      sizes={`${DISH_WIDTH}px`}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-maroon-800">
                      <span className="font-display px-1 text-center text-sm font-semibold text-cream-50/90">
                        {dish.name}
                      </span>
                    </div>
                  )}
                </a>

                {/* Floating glass badge. It sits outside the anchor because the
                    anchor is an elliptical clip — a badge inside it would be
                    cut off by the curve — and below the photo so the dish stays
                    fully visible. */}
                <div className="pointer-events-none absolute top-full left-1/2 mt-5 flex w-max max-w-[14rem] -translate-x-1/2 translate-y-2 flex-col rounded-xl border border-white/10 bg-maroon-950/90 p-3 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-base leading-tight font-bold tracking-wide text-white uppercase">
                      {dish.name}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-orange-500">
                      {dish.price}
                    </span>
                  </div>
                  <span className="mt-1 flex items-center gap-1 text-[11.5px] leading-none font-medium tracking-wider text-peach-400 uppercase">
                    Click to order online
                    <ArrowRightIcon size={9} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Overlay is click-through below xl so swipes reach the carousel
          underneath; only the buttons take pointer events. */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 pb-10 text-center sm:px-6 xl:pb-0">
        {/* Below xl the copy sits directly on the photos — no dimming overlay —
            so legibility comes from text shadows instead. */}
        <h1 className="font-heading text-5xl leading-tight font-extrabold tracking-tight text-balance text-cream-0 uppercase [text-shadow:0_2px_10px_rgba(0,0,0,0.85),0_1px_3px_rgba(0,0,0,0.95)] sm:text-6xl lg:text-7xl xl:text-maroon-900 xl:[text-shadow:none]">
          India, Served with a Sunshine Coast Soul.
        </h1>

        <p className="max-w-[34rem] text-xl leading-relaxed text-cream-0 [text-shadow:0_1px_8px_rgba(0,0,0,0.9),0_1px_2px_rgba(0,0,0,0.95)] lg:text-2xl xl:text-ink-600 xl:[text-shadow:none]">
          Where coastal relaxation meets authentic Indian heat. Sizzling
          tandoori grills, rich slow-cooked curries, street-side chaats, and
          iconic crispy dosas &mdash; crafted fresh right here in Buddina.
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
          <button
            type="button"
            onClick={() => setWeekendOpen(true)}
            className="font-heading inline-flex min-h-[44px] w-full max-w-full items-center justify-center gap-2.5 rounded-md border border-cream-0/45 bg-cream-0/10 px-5 py-3 text-lg font-bold tracking-wider text-cream-0 uppercase backdrop-blur-sm sm:w-auto sm:px-7 sm:py-3.5 sm:text-xl lg:px-8 transition-colors hover:border-cream-0 hover:bg-cream-0/20 xl:border-maroon-800/25 xl:bg-transparent xl:text-maroon-800 xl:backdrop-blur-none xl:hover:border-maroon-800 xl:hover:bg-transparent"
          >
            🔥 Weekend Special
          </button>
        </div>
      </div>

      <WeekendSpecialModal open={weekendOpen} onClose={() => setWeekendOpen(false)} />
    </section>
  );
}
