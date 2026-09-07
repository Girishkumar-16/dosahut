"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRightIcon, CloseIcon, MenuIcon, PinIcon } from "./Icons";
import { NAV_LINKS, SITE } from "@/lib/site";

const ORDER_PLATFORMS = [
  { label: "Order Direct", href: SITE.orderUrl, logo: null },
  { label: "Uber Eats", href: SITE.uberEatsUrl, logo: "/images/logo-ubereats.png" },
  { label: "DoorDash", href: SITE.doorDashUrl, logo: "/images/logo-doordash.png" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  // Stop the page behind the full-height drawer from scrolling.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="sticky top-0 z-30 w-full bg-maroon-900">
      {/* Mobile, tablet and iPad: logo, hamburger, location, bag. */}
      <div className="flex items-center gap-3 px-5 py-4 md:gap-4 md:px-10 lg:hidden">
        <a href="#top" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Dosa Hut logo"
            width={272}
            height={182}
            className="h-11 w-auto md:h-14"
            priority
          />
        </a>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-cream-50 transition-colors hover:text-peach-400"
        >
          <MenuIcon size={24} />
        </button>

        <a
          href="#location"
          className="font-heading ml-auto flex shrink-0 items-center gap-2 text-[11px] font-bold tracking-[0.08em] text-cream-50 uppercase transition-colors hover:text-peach-400 sm:text-xs md:text-sm"
        >
          <PinIcon size={18} />
          Find Your Coast
        </a>
      </div>

      {/* Desktop and laptop: logo left, everything else right. */}
      <div className="hidden items-center justify-between px-16 py-4 lg:flex">
        <a href="#top" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Dosa Hut logo"
            width={272}
            height={182}
            className="h-16 w-auto"
            priority
          />
        </a>

        <div className="flex items-center gap-8">
          {/* Plain anchors — no category dropdowns. */}
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-heading text-[15px] font-semibold tracking-wide text-cream-50 uppercase hover:text-peach-400"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#location"
            className="font-heading flex shrink-0 items-center gap-2 text-[15px] font-semibold tracking-wide text-cream-50 uppercase transition-colors hover:text-peach-400"
          >
            <PinIcon size={18} />
            Find Your Coast
          </a>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setOrderOpen((v) => !v)}
              className="font-heading inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-[15px] font-semibold tracking-wide text-cream-0 transition-colors hover:bg-orange-600"
            >
              ORDER ONLINE
              <ChevronRightIcon
                size={13}
                className={`transition-transform ${orderOpen ? "-rotate-90" : "rotate-90"}`}
              />
            </button>

            {orderOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close order menu"
                  onClick={() => setOrderOpen(false)}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <div className="absolute top-full right-0 z-20 mt-2 flex w-56 flex-col gap-1 rounded-2xl border border-maroon-800/10 bg-cream-0 p-2.5 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.35)]">
                  {ORDER_PLATFORMS.map((platform) => (
                    <a
                      key={platform.label}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOrderOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-maroon-800 hover:bg-cream-100"
                    >
                      {platform.logo ? (
                        <Image src={platform.logo} alt="" width={80} height={30} className="h-4 w-auto" />
                      ) : (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                      )}
                      {platform.label}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Full-height slide-out drawer */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-y-0 left-0 z-50 flex w-full flex-col bg-cream-0 shadow-2xl transition-transform duration-300 ease-out sm:max-w-sm lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-end border-b border-maroon-800/10 px-5 py-4">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center text-maroon-900 transition-colors hover:text-orange-500"
          >
            <CloseIcon size={22} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-6 overflow-y-auto bg-cream-100 px-6 py-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-heading text-2xl font-bold tracking-wide text-maroon-900 uppercase transition-colors hover:text-orange-500 sm:text-3xl"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="shrink-0 px-6 py-6">
          <a
            href={SITE.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="font-heading flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-base font-bold tracking-wide text-cream-0 uppercase transition-colors hover:bg-orange-600"
          >
            Order Now
          </a>
        </div>
      </aside>
    </div>
  );
}
