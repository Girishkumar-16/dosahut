"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

// Segment 1 is the full-bleed hero clip, which plays right through — its own
// `ended` event hands over, so the clip is never cut mid-shot. Segment 2 is the
// three-up collage, held for 9s to match, which keeps the whole cycle ~18s.
const COLLAGE_MS = 9000;
// Only used if `ended` never arrives (a stalled or blocked load), so the hero
// cannot get stuck on a frozen first frame.
const MAIN_FALLBACK_MS = 15000;

const MAIN_VIDEO = "/videos/854216-hd_1920_1080_25fps.mp4";
// Left-to-right order in the collage grid; video2 sits in the last column.
const COLLAGE_VIDEOS = ["/videos/video3.mp4", "/videos/video4.mp4", "/videos/video2.mp4"];
// The poster is the main clip's own first frame, so the handover to playback
// is invisible — a different photo here shows as a flash on every refresh.
const POSTER = "/images/hero-video-poster.jpg";

/**
 * The mobile, tablet and iPad hero background: the main clip for 7s, a
 * synchronised three-frame collage for 56s, then back to the main clip.
 *
 * The desktop hero is the orbiting dish layout instead — this component is
 * rendered inside an `xl:hidden` wrapper and never runs there.
 */
export function HeroVideo() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [segment, setSegment] = useState<0 | 1>(0);
  // The collage clips stay unmounted until the first time the sequence reaches
  // them, so the initial load fetches the 5MB main clip alone.
  const [collageMounted, setCollageMounted] = useState(false);
  const mainRef = useRef<HTMLVideoElement>(null);
  const collageRefs = useRef<(HTMLVideoElement | null)[]>([]);

  function advance() {
    setSegment((s) => (s === 0 ? 1 : 0));
    setCollageMounted(true);
  }

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setTimeout(advance, segment === 0 ? MAIN_FALLBACK_MS : COLLAGE_MS);
    return () => clearTimeout(id);
  }, [segment, prefersReducedMotion]);

  // Only the visible segment plays. iOS refuses autoplay off-screen anyway, and
  // pausing the hidden layer keeps a phone from decoding four streams at once.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const main = mainRef.current;
    const collage = collageRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (segment === 0) {
      collage.forEach((v) => v.pause());
      if (main) {
        main.currentTime = 0;
        main.play().catch(() => {});
      }
    } else {
      main?.pause();
      collage.forEach((v) => {
        v.currentTime = 0;
        v.play().catch(() => {});
      });
    }
  }, [segment, collageMounted, prefersReducedMotion]);

  return (
    <div aria-hidden className="relative z-0 h-full w-full overflow-hidden">
      {/* Segment 1 — full-bleed */}
      <video
        ref={mainRef}
        src={MAIN_VIDEO}
        poster={POSTER}
        autoPlay={!prefersReducedMotion}
        muted
        playsInline
        onEnded={advance}
        preload="auto"
        className={`transform-gpu absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
          segment === 0 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Segment 2 — three-frame collage */}
      {collageMounted && (
        <div
          // Three columns at every width, phones included: the clips are portrait,
        // so a single-column stack would crop them into wide strips. No gap, so
        // they butt together as one seamless frame with no black seam.
        className={`absolute inset-0 grid grid-cols-3 gap-0 bg-maroon-950 transition-opacity duration-1000 ease-in-out ${
            segment === 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          {COLLAGE_VIDEOS.map((src, i) => (
            <video
              key={src}
              ref={(el) => {
                collageRefs.current[i] = el;
              }}
              src={src}
              autoPlay={!prefersReducedMotion}
              muted
              playsInline
              loop
              preload="metadata"
              poster={POSTER}
              className="transform-gpu block h-full w-full object-cover will-change-[opacity]"
            />
          ))}
        </div>
      )}

      {/* Contrast layer for the headline above it. */}
      <div className="absolute inset-0 z-10 bg-black/40" />
    </div>
  );
}
