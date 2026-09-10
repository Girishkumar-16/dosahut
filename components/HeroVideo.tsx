"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const MAIN_VIDEO = "/videos/854216-hd_1920_1080_25fps.mp4";
// Collage order, left to right: the pour, then the dosa.
const SECONDARY_VIDEOS = ["/videos/video3.mp4", "/videos/mysore-masala-dosa.mp4"];
// The phone sequence is its own shortlist, not the collage's: video4 opens on
// six static seconds and video2 was dropped, so full-bleed gets the dosa clip
// and the pour instead. Each clip carries its own hold: the dosa clip runs its
// natural 4.9s rather than being cut short, while the 8s pour is capped at 4s
// to keep the pace up.
const MOBILE_SECONDARY_VIDEOS = [
  { src: "/videos/video3.mp4", ms: 4000 },
  // Slowed to 0.7x, which stretches the 4.9s clip to just under 7s — the hold
  // below matches. Done with playbackRate rather than a re-encode so there is
  // no second copy of the asset to keep in step.
  { src: "/videos/mysore-masala-dosa.mp4", ms: 7000, rate: 0.7 },
];
const POSTER = "/images/hero-video-poster.jpg";

const MOBILE_MAIN_MS = 7000;
const MOBILE_STEP_COUNT = MOBILE_SECONDARY_VIDEOS.length + 1;

// Tablet and iPad keep the two-segment shape: the main clip, then the three-up
// collage, both on a fast rotation so the hero never dwells.
const MAIN_MS = 7000;
const COLLAGE_MS = 9000;

const COLLAGE_MIN_WIDTH = 768;

function useIsMobile() {
  // Server-rendered markup assumes the wider layout; the first client effect
  // corrects it. Both layouts open on the same clip and poster, so there is
  // nothing to see during that swap.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${COLLAGE_MIN_WIDTH - 1}px)`);
    function update() {
      setIsMobile(query.matches);
    }
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isMobile;
}

/**
 * The mobile, tablet and iPad hero background.
 *
 * Under 768px the four clips play in sequence, each full-bleed. From 768px up
 * the main clip is followed by a three-frame collage. Desktop (xl and above)
 * shows the orbiting dishes instead and never mounts this component.
 */
export function HeroVideo() {
  const isMobile = useIsMobile();
  // Keyed on the layout: switching between the two remounts the player, which
  // restarts the sequence at step 0 without an effect reaching for setState.
  return <HeroVideoPlayer key={isMobile ? "sequence" : "collage"} isMobile={isMobile} />;
}

function HeroVideoPlayer({ isMobile }: { isMobile: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const mainRef = useRef<HTMLVideoElement>(null);
  const sequenceRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const collageRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const stepCount = isMobile ? MOBILE_STEP_COUNT : 2;
  // Clips mount only once the sequence has reached them, so the first load
  // fetches the main clip alone rather than all four.
  const [maxReached, setMaxReached] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ms = isMobile
      ? step === 0
        ? MOBILE_MAIN_MS
        : MOBILE_SECONDARY_VIDEOS[step - 1].ms
      : step === 0
        ? MAIN_MS
        : COLLAGE_MS;
    const id = setTimeout(() => {
      const next = (step + 1) % stepCount;
      setStep(next);
      setMaxReached((m) => Math.max(m, next));
    }, ms);
    return () => clearTimeout(id);
  }, [step, stepCount, isMobile, prefersReducedMotion]);

  // Only the visible clip plays. Decoding four streams at once is what makes a
  // video hero stutter on an older phone.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const all = [
      mainRef.current,
      ...sequenceRefs.current,
      ...collageRefs.current,
    ].filter(Boolean) as HTMLVideoElement[];

    const playing: HTMLVideoElement[] = [];
    if (step === 0 && mainRef.current) playing.push(mainRef.current);
    if (isMobile && step > 0) {
      const el = sequenceRefs.current[step - 1];
      if (el) playing.push(el);
    }
    if (!isMobile && step === 1) {
      playing.push(...(collageRefs.current.filter(Boolean) as HTMLVideoElement[]));
    }

    all.forEach((v) => {
      if (playing.includes(v)) return;
      v.pause();
    });
    playing.forEach((v) => {
      v.currentTime = 0;
      v.playbackRate =
        isMobile && step > 0 ? (MOBILE_SECONDARY_VIDEOS[step - 1].rate ?? 1) : 1;
      v.play().catch(() => {});
    });
  }, [step, isMobile, maxReached, prefersReducedMotion]);

  const videoClass =
    "transform-gpu absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out will-change-[opacity]";

  return (
    <div aria-hidden className="relative z-0 h-full w-full overflow-hidden bg-maroon-950">
      {/* Step 1 on both layouts — the full-bleed main clip. */}
      <video
        ref={mainRef}
        src={MAIN_VIDEO}
        poster={POSTER}
        autoPlay={!prefersReducedMotion}
        muted
        playsInline
        loop
        preload="auto"
        className={`${videoClass} ${step === 0 ? "opacity-100" : "opacity-0"}`}
      />

      {/* Under 768px — the remaining clips, one at a time, full-bleed. */}
      {isMobile &&
        MOBILE_SECONDARY_VIDEOS.map(({ src }, i) =>
          i + 1 > maxReached ? null : (
            <video
              key={`seq-${src}`}
              ref={(el) => {
                sequenceRefs.current[i] = el;
              }}
              src={src}
              poster={POSTER}
              autoPlay={!prefersReducedMotion}
              muted
              playsInline
              loop
              preload="metadata"
              className={`${videoClass} ${step === i + 1 ? "opacity-100" : "opacity-0"}`}
            />
          ),
        )}

      {/* 768px and up — the two-frame collage. */}
      {!isMobile && maxReached > 0 && (
        <div
          // Two equal columns, no gap, on a solid ground so neither cell can
          // flash through to the page background while a clip buffers.
          className={`absolute inset-0 grid grid-cols-2 gap-0 bg-maroon-950 transition-opacity duration-1000 ease-in-out ${
            step === 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          {SECONDARY_VIDEOS.map((src, i) => (
            <video
              key={`collage-${src}`}
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
