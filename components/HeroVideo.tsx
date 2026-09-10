"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

// One sequence for every width this component runs at. Each clip plays right
// through and hands over on its own `ended` event, so nothing is cut short.
// The fallback is only reached if `ended` never arrives — a stalled or blocked
// load — so the hero cannot freeze on one frame; each is the clip's real
// length (20s and 21.9s) plus headroom.
const CLIPS = [
  // The externally cut copy, 17.3s, already free of the Dosa Hut logo card
  // that closed the original. Shipped exactly as supplied at 720x1280: every
  // preset available here either degraded it or matched its size for nothing.
  { src: "/videos/Lark20260910-153609.mp4", fallbackMs: 20000 },
  // Trimmed to 16s from a 20s source, stopping before its closing fade.
  { src: "/videos/Lark20260910-153613.mp4", fallbackMs: 19000 },
];

// A long, gentle dissolve rather than a cut.
const CROSSFADE_MS = 2000;
// How early the next clip starts. Kept short so the outgoing clip plays out
// almost to its final frame; the dissolve then carries on over the top of it.
const HANDOVER_LEAD_MS = 300;
// How long after a clip starts before the next one begins downloading.
const PRELOAD_NEXT_MS = 2500;

// The poster is the first clip's own opening frame, so the handover to
// playback is invisible — a different image here shows as a flash on every
// refresh.
const POSTER = "/images/hero-video-poster.jpg";

/**
 * The hero background for mobile, tablet and iPad: the clips play full-bleed,
 * one after another, looping back to the first.
 *
 * Desktop (xl and above) shows the orbiting dishes instead and never mounts
 * this component.
 */
export function HeroVideo() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  // `timeupdate` fires several times a second, so the handover window below
  // can be hit more than once. Without this guard each hit queues another
  // step increment and the sequence skips straight past the next clip.
  const advancedFromRef = useRef(-1);

  const advance = useCallback((from: number) => {
    if (advancedFromRef.current === from) return;
    advancedFromRef.current = from;
    setStep((prev) => (prev + 1) % CLIPS.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setTimeout(() => advance(step), CLIPS[step].fallbackMs);
    return () => clearTimeout(id);
  }, [step, advance, prefersReducedMotion]);

  // Hand over just before the clip ends rather than waiting for `ended`, so
  // the dissolve is already under way as the last frames play out.
  function handleTimeUpdate(e: React.SyntheticEvent<HTMLVideoElement>, i: number) {
    if (i !== step) return;
    const v = e.currentTarget;
    if (!v.duration || Number.isNaN(v.duration)) return;
    if (v.duration - v.currentTime <= HANDOVER_LEAD_MS / 1000) advance(i);
  }

  // Only the visible clip plays. Decoding both at once is what makes a video
  // hero stutter on an older phone.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const active = refs.current[step];
    if (active) {
      active.currentTime = 0;
      active.play().catch(() => {});
    }
    // The outgoing clip is left running until the fade is over; pausing it
    // straight away is what makes a cross-fade look like a freeze.
    const pauseId = setTimeout(() => {
      refs.current.forEach((v, i) => {
        if (v && i !== step) v.pause();
      });
    }, CROSSFADE_MS);

    // The next clip is fetched a few seconds in rather than up front, so the
    // first paint competes with one download instead of two — but early
    // enough that it is buffered long before the dissolve needs it.
    const preloadId = setTimeout(() => {
      const next = refs.current[(step + 1) % CLIPS.length];
      if (next && next.preload !== "auto") {
        next.preload = "auto";
        next.load();
      }
    }, PRELOAD_NEXT_MS);

    return () => {
      clearTimeout(pauseId);
      clearTimeout(preloadId);
    };
  }, [step, prefersReducedMotion]);

  return (
    <div
      aria-hidden
      className="relative z-0 h-full w-full overflow-hidden bg-maroon-950"
    >
      {CLIPS.map(({ src }, i) => (
        <video
          key={src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={src}
          poster={POSTER}
          autoPlay={!prefersReducedMotion}
          muted
          playsInline
          onEnded={() => advance(i)}
          onTimeUpdate={(e) => handleTimeUpdate(e, i)}
          preload={i === 0 ? "auto" : "none"}
          className={`transform-gpu absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out will-change-[opacity] ${
            i === step ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Contrast layer for the headline. A flat 40% wash greyed the footage
          out, so the dimming is now weighted to the top and bottom edges —
          where the navbar and the CTA buttons sit — and stays light across
          the middle, where the copy already carries its own text shadows. */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/45 via-black/15 to-black/45" />
    </div>
  );
}
