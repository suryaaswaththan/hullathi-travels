"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { reviews } from "@/lib/site";
import { BlurFade } from "@/components/ui/blur-fade";

type Review = (typeof reviews)[number];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i < n ? "var(--color-accent)" : "transparent"}
          stroke="var(--color-accent)"
        />
      ))}
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1C6.2 6.9 8.9 4.8 12 4.8z"
      />
    </svg>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-2xl bg-primary-dark text-white">
      <div className="relative -mt-px overflow-hidden rounded-2xl">
        <Image
          src={r.avatar}
          alt=""
          width={600}
          height={400}
          className="h-44 w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary-dark to-transparent" />
        <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white shadow-premium">
          <GoogleGlyph />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5">
        <Stars n={r.rating} />
        <blockquote className="mt-3 flex-1 border-b border-white/10 pb-4 text-sm leading-relaxed text-white/85">
          “{r.text}”
        </blockquote>
        <figcaption className="mt-4">
          <p className="font-medium text-white">{r.name}</p>
          <p className="text-xs text-accent">{r.role}</p>
        </figcaption>
      </div>
    </figure>
  );
}

/**
 * Mobile reviews: a native horizontal scroller that auto-glides, pauses the
 * instant you touch/hold it, lets you scroll by hand, and resumes auto-glide
 * 1 second after you stop interacting.
 */
function ReviewsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const posRef = useRef(0); // float accumulator (scrollLeft rounds sub-pixel away)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const SPEED = 0.5; // px per frame

    const tick = () => {
      const half = el.scrollWidth / 2;
      if (half > 0 && !pausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= half) posRef.current -= half; // seamless wrap (2× content)
        el.scrollLeft = posRef.current;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };
  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      // re-sync the accumulator to wherever the user left it, then resume
      if (ref.current) posRef.current = ref.current.scrollLeft;
      pausedRef.current = false;
    }, 1000);
  };

  return (
    <div
      ref={ref}
      onTouchStart={pause}
      onTouchEnd={scheduleResume}
      onPointerDown={pause}
      onPointerUp={scheduleResume}
      onWheel={() => {
        pause();
        scheduleResume();
      }}
      className="no-scrollbar flex gap-4 overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      {[...reviews, ...reviews].map((r, i) => (
        <div
          key={r.name + i}
          className="w-[80vw] max-w-xs shrink-0"
          aria-hidden={i >= reviews.length}
        >
          <ReviewCard r={r} />
        </div>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <>
      {/* Desktop / tablet: static grid */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r, i) => (
          <BlurFade key={r.name} delay={i * 0.08}>
            <ReviewCard r={r} />
          </BlurFade>
        ))}
      </div>

      {/* Mobile: interactive auto-scroll */}
      <div className="sm:hidden">
        <ReviewsMarquee />
      </div>
    </>
  );
}
