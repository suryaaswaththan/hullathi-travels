"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { destinations } from "@/lib/site";

export function DestinationsCarousel() {
  const items = destinations;
  const total = items.length;
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touchX = React.useRef<number | null>(null);

  const go = React.useCallback(
    (dir: number) => setIndex((p) => (p + dir + total) % total),
    [total]
  );

  // Autoplay (no tap-to-switch; control via arrows / dots / auto-slide)
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((p) => (p + 1) % total), 4200);
    return () => clearInterval(t);
  }, [paused, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stage */}
      <div
        className="relative flex h-[27rem] touch-pan-y items-center justify-center overflow-hidden [perspective:1200px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {items.map((d, i) => {
          const offset = i - index;
          let pos = (offset + total) % total;
          if (pos > Math.floor(total / 2)) pos -= total;

          const isCenter = pos === 0;
          const isAdjacent = Math.abs(pos) === 1;

          return (
            <div
              key={d.slug}
              aria-hidden={!isCenter}
              className={cn(
                "absolute h-[26rem] w-[19rem] transition-all duration-500 ease-smooth sm:w-80",
                !isCenter && "pointer-events-none"
              )}
              style={{
                transform: `translateX(${pos * 56}%) scale(${
                  isCenter ? 1 : isAdjacent ? 0.84 : 0.7
                }) rotateY(${pos * -12}deg)`,
                zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                filter: isCenter ? "blur(0px)" : "blur(3px)",
                visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
              }}
            >
              <Link
                href={`/packages/${d.slug}`}
                tabIndex={isCenter ? 0 : -1}
                aria-label={`View ${d.name} packages`}
                className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-3xl border border-accent shadow-2xl"
              >
                <Image
                  src={d.image}
                  alt={`${d.name} — ${d.state}`}
                  fill
                  sizes="(max-width: 640px) 80vw, 320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/30 to-transparent transition-opacity duration-500 group-hover:from-primary-dark/95" />
                <div className="relative p-6 text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                    {d.state}
                  </p>
                  <h3 className="mt-1 flex items-center gap-2 font-display text-2xl text-white">
                    {d.name}
                    <ArrowUpRight className="h-5 w-5 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {d.blurb}
                  </p>
                  <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-primary-dark">
                    View {d.name} packages
                  </span>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {d.places.slice(0, 5).map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-white/20 px-2.5 py-0.5 text-[11px] text-white/80"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}

        {/* Arrows */}
        <button
          type="button"
          aria-label="Previous destination"
          onClick={() => go(-1)}
          className="absolute left-1 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-bg/90 text-ink shadow-premium backdrop-blur transition hover:border-accent hover:text-primary sm:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next destination"
          onClick={() => go(1)}
          className="absolute right-1 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-bg/90 text-ink shadow-premium backdrop-blur transition hover:border-accent hover:text-primary sm:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((d, i) => (
          <button
            key={d.slug + "dot"}
            type="button"
            aria-label={`Show ${d.name}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-muted/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
