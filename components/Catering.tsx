import Image from "next/image";
import { PrimaryGlowButton } from "./PrimaryGlowButton";
import { ArrowRightIcon } from "./Icons";
import { SITE } from "@/lib/site";

const HIGHLIGHTS = [
  "House parties & birthdays",
  "Weddings & functions",
  "Corporate & office catering",
];

const COLLAGE = [
  {
    src: "/images/catering-buffet.jpg",
    alt: "Chafing dishes of chilli chicken and butter chicken set up on a Dosa Hut catering buffet",
    className: "sm:row-span-2",
    sizes: "(max-width: 640px) 100vw, 280px",
    position: "object-center",
  },
  {
    src: "/images/catering-platter.jpg",
    alt: "A packed Dosa Hut catering tray of rice, roti, dal makhani, butter chicken and chilli chicken",
    className: "",
    sizes: "(max-width: 640px) 100vw, 280px",
    position: "object-center",
  },
  {
    src: "/images/catering/new-catering.jpg",
    alt: "Garnished rice and salad in a chafing dish on a Dosa Hut catering buffet, with further trays behind",
    className: "",
    sizes: "(max-width: 640px) 100vw, 280px",
    // The front tray fills the frame with no dead space to crop away, so this
    // one needs no offset — the object-[35%_42%] that used to sit here was
    // measured against the old biryani photo and would now cut the tray.
    position: "object-center",
  },
];

export function Catering() {
  return (
    <section
      id="catering"
      className="relative flex w-full justify-center overflow-hidden bg-maroon-950 px-5 py-14 md:px-16 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(241,90,39,0.28),transparent_55%)]"
      />

      <div className="relative grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="flex flex-col items-start gap-5 text-left md:gap-6">
          <span className="rounded-full border border-peach-400/40 px-3.5 py-1.5 text-[12.5px] font-bold tracking-[0.2em] text-peach-400 uppercase">
            Catering & Events
          </span>
          <h2 className="font-display text-3xl leading-snug font-bold sm:text-4xl lg:text-5xl text-cream-0">
            Great Food for Your Next Event
          </h2>
          <p className="max-w-[38rem] text-xl leading-relaxed text-cream-50/70 lg:text-2xl">
            From house parties to weddings and corporate events, we bring
            biryanis, butter chicken, dosas, and more &mdash; freshly made,
            never compromising quality for quantity.
          </p>

          <ul className="flex flex-col gap-2.5">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span className="text-base text-cream-50/85 md:text-[17px]">{item}</span>
              </li>
            ))}
          </ul>

          <PrimaryGlowButton href={SITE.cateringUrl} className="mt-2 w-full sm:w-auto">
            ENQUIRE ABOUT CATERING
            <ArrowRightIcon size={15} />
          </PrimaryGlowButton>
        </div>

        {/* Borderless bento collage: featured shot spans the full height on the
            left, two detail shots stack on the right. Separation comes from the
            grid gap alone — no borders, rings or shadows on any tile. */}
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:grid-rows-2 sm:gap-3 sm:h-[23.75rem] md:h-[28.125rem]">
          {COLLAGE.map((shot) => (
            <div
              key={shot.src}
              className={`group relative h-52 overflow-hidden rounded-2xl border-0 sm:h-full ${shot.className}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes={shot.sizes}
                className={`h-full w-full border-0 object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${shot.position}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
