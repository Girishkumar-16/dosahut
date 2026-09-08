import Image from "next/image";
import { STORY_STATS } from "@/lib/site";

export function OurStory() {
  return (
    <section id="our-story" className="flex w-full justify-center px-5 py-10 md:px-16 md:py-16">
      <div className="grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div className="flex flex-col gap-4 md:gap-5">
          <span className="text-sm font-bold tracking-[0.16em] text-orange-500 uppercase md:text-[15px] md:tracking-[0.18em]">
            Our Story
          </span>
          <h2 className="font-display text-3xl leading-snug font-bold sm:text-4xl lg:text-5xl text-maroon-800">
            Australia&rsquo;s Fastest-Growing Indian Restaurant Chain
          </h2>
          <p className="text-xl leading-relaxed text-ink-600 lg:text-2xl">
            It started in 2007 in Footscray, when two friends who couldn&rsquo;t
            find a proper dosa decided to make their own. Nearly two decades
            on, Dosa Hut has grown into a family of 25+ branches across
            Australia &mdash; without ever compromising on quality, or
            forgetting that our customers come first.
          </p>

          <div className="mt-2 grid grid-cols-3 gap-4 md:mt-3 md:gap-6">
            {STORY_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-display text-4xl font-semibold text-maroon-800 md:text-[46px]">
                  {stat.value}
                </span>
                <span className="text-[15px] leading-snug text-ink-600 md:text-[17px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto h-[260px] w-full max-w-[520px] overflow-hidden rounded-[22px] shadow-[0_24px_48px_-24px_rgba(58,13,13,0.35)] md:h-[340px]">
          <Image
            src="/images/original-storefront.png"
            alt="The original Dosa Hut storefront where it all began"
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
