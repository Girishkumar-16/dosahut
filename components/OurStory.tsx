import Image from "next/image";
import { STORY_STATS } from "@/lib/site";

export function OurStory() {
  return (
    <section id="our-story" className="flex w-full justify-center px-5 py-10 md:px-16 md:py-16">
      <div className="grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-12 lg:gap-14">
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

        <div className="group relative mx-auto h-[320px] w-full overflow-hidden rounded-3xl border border-orange-500/20 shadow-2xl sm:h-[400px] lg:h-[500px] lg:min-h-[480px]">
          <Image
            src="/images/dosa-hut-storefront.jpg"
            alt="The Dosa Hut Sunshine Coast shopfront on Lutana Street, its sign above the awning, seen from across the road"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            // The source is a tall portrait shot: sky fills the top half and
            // road the bottom third, with the shopfront in a band around 60%
            // down. A centred cover crop frames the roofline and the empty
            // street instead, so the focal point is pushed down onto the sign
            // and the entrance. 60% was chosen by rendering 60/72/85/100 and
            // comparing: past 60 the sky disappears and the frame fills with
            // road without bringing the shopfront any closer.
            className="object-cover object-[50%_60%] transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
