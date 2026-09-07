"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { ArrowRightIcon } from "./Icons";
import {
  categorySlug,
  CRAVING_MENU,
  SITE,
  type Diet,
  type Dish,
  type SpiceLevel,
} from "@/lib/site";

type CategoryKey = "Dosas" | "Biryanis" | "Curries";

type CategoryConfig = {
  tabLabel: string;
  discoverHeading: string;
  menuLinkCategory: string; // category section the "view in menu" link jumps to
  dishCategories: string[]; // real categories from lib/site.ts to pull dishes from
  emptyMessage: string;
};

const GENERIC_EMPTY = "No items found matching your exact craving preferences.";

const CATEGORIES: Record<CategoryKey, CategoryConfig> = {
  Dosas: {
    tabLabel: "Dosas",
    discoverHeading: "Discover Your Perfect Dosa",
    menuLinkCategory: "Dosa",
    dishCategories: ["Dosa"],
    emptyMessage: GENERIC_EMPTY,
  },
  Biryanis: {
    tabLabel: "Biryanis",
    discoverHeading: "Discover Your Perfect Biryani",
    menuLinkCategory: "Biryani & More",
    dishCategories: ["Biryani & More"],
    emptyMessage:
      "Sorry, no Biryani options match your exact combination. Try switching to Medium or Spicy level!",
  },
  Curries: {
    tabLabel: "Curries",
    discoverHeading: "Discover Your Perfect Curry",
    menuLinkCategory: "Vegetarian Curries",
    dishCategories: ["Curries"],
    emptyMessage:
      "No curries found for this specific combination. Try selecting Mild or Medium Spice Level!",
  },
};

const TAB_ORDER: CategoryKey[] = ["Dosas", "Biryanis", "Curries"];
const SPICE_ORDER: SpiceLevel[] = ["Mild", "Medium", "Spicy"];
const DIET_ORDER: Diet[] = ["Veg", "Non-Veg", "Egg"];

const SPICE_HINT: Record<SpiceLevel, string> = {
  Mild: "No chilli",
  Medium: "🌶️",
  Spicy: "🌶️🌶️",
};

// Chilli count as printed on the menu.
const SPICE_CHILLIES: Record<SpiceLevel, string> = {
  Mild: "",
  Medium: "🌶️",
  Spicy: "🌶️🌶️",
};

const DIET_DOT: Record<Diet, string> = {
  Veg: "bg-green-500",
  "Non-Veg": "bg-red-500",
  Egg: "bg-amber-400",
};

function poolFor(config: CategoryConfig): Dish[] {
  return CRAVING_MENU.filter((dish) => config.dishCategories.includes(dish.category));
}

export function FlavorFinder() {
  const [category, setCategory] = useState<CategoryKey>("Dosas");
  const [spice, setSpice] = useState<SpiceLevel | null>(null);
  const [diet, setDiet] = useState<Diet | null>(null);

  const config = CATEGORIES[category];
  const pool = useMemo(() => poolFor(config), [config]);

  // Only offer filter values this category's menu actually contains, so no
  // option is a guaranteed dead end.
  const spiceOptions = useMemo(
    () => SPICE_ORDER.filter((level) => pool.some((dish) => dish.spiceLevel === level)),
    [pool],
  );
  const dietOptions = useMemo(
    () => DIET_ORDER.filter((value) => pool.some((dish) => dish.diet === value)),
    [pool],
  );

  // Strict match only — both selected criteria must equal the dish's own
  // stated values. Nothing is widened or inferred when there is no match.
  const results = useMemo(() => {
    if (!spice || !diet) return null;
    return pool.filter((dish) => dish.spiceLevel === spice && dish.diet === diet);
  }, [pool, spice, diet]);

  function switchCategory(key: CategoryKey) {
    setCategory(key);
    setSpice(null);
    setDiet(null);
  }

  function reset() {
    setSpice(null);
    setDiet(null);
  }

  const step = spice === null ? 0 : 1;

  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-gradient-to-b from-[#FFF8F5] via-[#FDEDE3] to-[#F8E1D3] px-5 py-12 md:px-16 md:py-20">
      {/* Soft dot pattern keeps this section feeling playful and interactive,
          in contrast to the solid dark Catering banner directly below it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(rgba(58,13,13,0.10) 1px, transparent 1px)",
          backgroundSize: "1.25rem 1.25rem",
        }}
      />

      <div className="relative flex w-full flex-col items-center gap-6 md:gap-9">
      <div className="flex max-w-[38.75rem] flex-col items-center gap-3 text-center md:gap-4">
        <h2 className="font-display text-[28px] font-semibold text-maroon-800 md:text-[42px]">
          Craving Finder
        </h2>
        <p className="text-sm font-semibold tracking-wide text-orange-500 uppercase md:text-base">
          Answer 2 Questions, Get Your Perfect Meal
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {TAB_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => switchCategory(key)}
            className={`rounded-full border px-5 py-2.5 text-sm font-bold tracking-wide uppercase transition-colors ${
              category === key
                ? "border-orange-500 bg-orange-500 text-cream-0"
                : "border-maroon-800/20 bg-cream-0 text-maroon-700 hover:border-maroon-800/40"
            }`}
          >
            {CATEGORIES[key].tabLabel}
          </button>
        ))}
      </div>

      <span className="font-display text-xl font-semibold text-maroon-900 md:text-2xl">
        {config.discoverHeading}
      </span>

      <div className="flex w-full max-w-[45rem] flex-col items-center gap-6 rounded-[26px] border border-orange-500/20 bg-cream-0/95 p-6 shadow-[0_28px_60px_-28px_rgba(58,13,13,0.45)] backdrop-blur-sm md:p-10">
        {!results && (
          <>
            <div className="flex items-center gap-2">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 w-8 rounded-full transition-colors ${
                    i <= step ? "bg-orange-500" : "bg-maroon-800/10"
                  }`}
                />
              ))}
            </div>

            <span className="font-display text-xl font-semibold text-maroon-900 md:text-2xl">
              {step === 0 ? "Spice Level" : "Diet"}
            </span>

            <div className="flex w-full flex-wrap items-center justify-center gap-3">
              {step === 0
                ? spiceOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSpice(option)}
                      className="flex flex-col items-center gap-0.5 rounded-2xl border border-maroon-800/20 bg-cream-50 px-6 py-3 text-sm font-bold tracking-wide text-maroon-700 uppercase transition-colors hover:border-orange-500 hover:text-orange-500"
                    >
                      {option}
                      <span className="text-[10px] font-semibold tracking-normal normal-case opacity-70">
                        {SPICE_HINT[option]}
                      </span>
                    </button>
                  ))
                : dietOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDiet(option)}
                      className="rounded-full border border-maroon-800/20 bg-cream-50 px-6 py-3 text-sm font-bold tracking-wide text-maroon-700 uppercase transition-colors hover:border-orange-500 hover:text-orange-500"
                    >
                      {option}
                    </button>
                  ))}
            </div>

            {step === 1 && (
              <button
                type="button"
                onClick={() => setSpice(null)}
                className="text-sm font-bold tracking-wide text-maroon-700 underline underline-offset-4 hover:text-orange-500"
              >
                Back
              </button>
            )}
          </>
        )}

        {results && (
          <>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span className="font-display text-xl font-semibold text-maroon-900 md:text-2xl">
                {results.length > 0 ? "Perfect Picks For You" : "Nothing Matches Yet"}
              </span>
              <span className="text-[11px] font-bold tracking-[0.14em] text-orange-500 uppercase">
                {config.tabLabel} &middot; {diet} &middot; {spice}
              </span>
            </div>

            {results.length === 0 ? (
              <p className="max-w-[28rem] text-center text-sm leading-relaxed text-ink-600">
                {config.emptyMessage}
              </p>
            ) : (
              <>
                <ul className="scrollbar-thin -mx-2 flex w-full snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-2 pb-3">
                  {results.map((dish) => (
                    <li
                      key={dish.name}
                      className="relative flex min-h-[17rem] min-w-[13.75rem] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[18px] bg-[#4A0E17] sm:min-w-[16.25rem]"
                    >
                      {dish.image ? (
                        <>
                          <Image
                            src={dish.image}
                            alt={dish.alt ?? dish.name}
                            fill
                            sizes="(max-width: 640px) 220px, 260px"
                            className="object-cover"
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10"
                          />
                        </>
                      ) : (
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(241,90,39,0.35),transparent_60%)]"
                        >
                          <span className="absolute inset-0 flex items-center justify-center text-5xl opacity-15">
                            🍛
                          </span>
                        </span>
                      )}

                      <div className="relative flex flex-col items-start gap-2 p-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-bold tracking-wide text-cream-0 uppercase backdrop-blur-sm">
                            {dish.spiceLevel}
                            {dish.spiceLevel && SPICE_CHILLIES[dish.spiceLevel]
                              ? ` ${SPICE_CHILLIES[dish.spiceLevel]}`
                              : ""}
                          </span>
                          {dish.diet && (
                            <span className="flex items-center gap-1 rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-bold tracking-wide text-cream-0 uppercase backdrop-blur-sm">
                              <span
                                aria-hidden
                                className={`h-1.5 w-1.5 rounded-full ${DIET_DOT[dish.diet]}`}
                              />
                              {dish.diet}
                            </span>
                          )}
                        </div>

                        <span className="font-display text-lg leading-tight font-semibold text-cream-0">
                          {dish.name}
                        </span>

                        <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[13px] font-bold text-cream-0">
                          {dish.price}
                        </span>

                        <a
                          href={SITE.orderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Order ${dish.name} online`}
                          className="mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-cream-0/35 bg-cream-0/10 px-3 py-2 text-[12px] font-bold tracking-wide text-cream-0 uppercase backdrop-blur-sm transition-colors hover:bg-cream-0/20"
                        >
                          Order Now
                          <ArrowRightIcon size={12} />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
                <span className="-mt-2 text-[11px] font-semibold text-ink-600">
                  {results.length === 1
                    ? "1 match"
                    : `${results.length} matches · swipe to browse`}
                </span>
              </>
            )}

            <div className="flex w-full max-w-sm flex-col gap-2.5 sm:max-w-none sm:flex-row sm:justify-center">
              <Button href={SITE.orderUrl} size="md" full className="sm:w-auto">
                ORDER ONLINE
                <ArrowRightIcon size={13} />
              </Button>
              <a
                href={`#menu-${categorySlug(config.menuLinkCategory)}`}
                className="inline-flex w-full items-center justify-center rounded-full border border-maroon-800/25 px-5 py-2.5 text-[12.5px] font-bold tracking-wide whitespace-nowrap text-maroon-800 transition-colors hover:border-maroon-800 sm:w-auto"
              >
                VIEW IN MENU
              </a>
            </div>

            <button
              type="button"
              onClick={reset}
              className="text-sm font-bold tracking-wide text-maroon-700 underline underline-offset-4 hover:text-orange-500"
            >
              Start Over
            </button>
          </>
        )}
        </div>
      </div>
    </section>
  );
}
