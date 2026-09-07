import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "./Icons";
import { SITE } from "@/lib/site";

const EXPLORE_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "About Us", href: "#why-us" },
  { label: "Our Story", href: "#our-story" },
];

const SOCIALS = [
  { Icon: FacebookIcon, label: "Facebook", href: SITE.facebookUrl },
  { Icon: InstagramIcon, label: "Instagram", href: SITE.instagramUrl },
];

export function Footer() {
  return (
    <footer className="flex w-full flex-col gap-7 bg-maroon-900 px-5 pt-9 pb-6 md:gap-9 md:px-16 md:pt-14 md:pb-7">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-9 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
        <div className="flex flex-col gap-4 md:gap-5">
          <Image
            src="/images/logo.png"
            alt="Dosa Hut logo"
            width={272}
            height={182}
            className="h-14 w-auto self-start md:h-[64px]"
          />
          <p className="max-w-[280px] text-sm leading-relaxed text-cream-50/60">
            Authentic Indian &amp; multi-cuisine favourites, freshly made
            for the Sunshine Coast.
          </p>
          <div className="flex gap-3">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-50/30 text-cream-50 hover:border-cream-50"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <nav className="flex flex-col gap-3.5">
          <span className="text-sm font-extrabold tracking-[0.1em] text-peach-400 uppercase">
            Explore
          </span>
          {EXPLORE_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-cream-50/70 hover:text-cream-50">
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="flex flex-col gap-3.5">
          <span className="text-sm font-extrabold tracking-[0.1em] text-peach-400 uppercase">
            Order
          </span>
          <a href={SITE.orderUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-cream-50/70 hover:text-cream-50">
            Order Online
          </a>
          <a
            href={SITE.cateringUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-cream-50/70 hover:text-cream-50"
          >
            Catering
          </a>
        </nav>

        <nav className="flex flex-col gap-3.5">
          <span className="text-sm font-extrabold tracking-[0.1em] text-peach-400 uppercase">
            Visit
          </span>
          <span className="text-sm font-medium text-cream-50/70">
            {SITE.addressLine1},
            <br />
            {SITE.addressLine2}
          </span>
          <a href={SITE.phoneHref} className="text-sm font-medium text-cream-50/70 hover:text-cream-50">
            {SITE.phoneDisplay}
          </a>
          <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-cream-50/70 hover:text-cream-50">
            Get Directions
          </a>
        </nav>
      </div>

      <div className="mx-auto h-px w-full max-w-[1200px] bg-cream-50/10" />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-3 md:flex-row md:justify-center md:gap-5">
        <span className="text-base font-bold text-cream-50/70">Available to order on</span>
        <div className="flex gap-3">
          <a
            href={SITE.uberEatsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-16 items-center justify-center rounded-full bg-white px-8"
          >
            <Image
              src="/images/logo-ubereats.png"
              alt="Order on Uber Eats"
              width={120}
              height={45}
              className="h-12 w-auto"
            />
          </a>
          <a
            href={SITE.doorDashUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-16 items-center justify-center rounded-full bg-white px-8"
          >
            <Image
              src="/images/logo-doordash.png"
              alt="Order on DoorDash"
              width={120}
              height={45}
              className="h-12 w-auto"
            />
          </a>
        </div>
      </div>

      <div className="mx-auto h-px w-full max-w-[1200px] bg-cream-50/10" />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <span className="text-[13px] text-cream-50/45">
          &copy; {new Date().getFullYear()} Dosa Hut Multi Cuisine Restaurant. All rights reserved.
        </span>
        <div className="flex justify-center gap-7 md:justify-start">
          <a href={SITE.mainSiteUrl} className="text-[13px] font-medium text-cream-50/70 hover:text-cream-50">
            Privacy
          </a>
          <a href={SITE.mainSiteUrl} className="text-[13px] font-medium text-cream-50/70 hover:text-cream-50">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}
