import { DeviceIcon, FlameIcon, LeafIcon, UtensilsIcon } from "./Icons";
import { FEATURES } from "@/lib/site";

const ICONS = [FlameIcon, UtensilsIcon, LeafIcon, DeviceIcon];

export function WhyUs() {
  return (
    <section id="why-us" className="flex w-full flex-col items-center gap-6 bg-maroon-900 px-5 py-10 md:gap-10 md:px-16 md:py-16">
      <div className="flex max-w-[680px] flex-col items-center gap-3 text-center md:gap-4">
        <span className="text-sm font-bold tracking-[0.16em] text-peach-400 uppercase md:text-[15px] md:tracking-[0.18em]">
          Why Sunshine Coast Loves Us
        </span>
        <h2 className="font-display text-3xl leading-snug font-bold sm:text-4xl lg:text-5xl text-cream-0">
          Not Just Food, It&rsquo;s a 90-Dosa Culinary Journey Right Here in Buddina.
        </h2>
      </div>

      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
        {FEATURES.map((feature, i) => {
          const Icon = ICONS[i];
          return (
            <div
              key={feature.title}
              className="flex flex-col gap-3.5 rounded-[18px] border border-cream-50/14 bg-cream-50/5 p-6 md:gap-4.5 md:rounded-[20px] md:p-8.5"
            >
              <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[14px] border border-orange-500/40 bg-orange-500/15 md:h-14 md:w-14 md:rounded-2xl">
                <Icon size={22} color="#F2A574" />
              </div>
              <span className="font-display text-2xl font-bold sm:text-3xl lg:text-4xl text-cream-0">
                {feature.title}
              </span>
              <p className="text-lg leading-relaxed text-cream-50/70 sm:text-xl">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
