"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VehicleItem {
  name: string;
  type: string;
  image: string;
}

export function VehicleCarousel({ items }: { items: VehicleItem[] }) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const total = items.length;
  const touchX = React.useRef<number | null>(null);

  const go = React.useCallback(
    (dir: number) => setIndex((p) => (p + dir + total) % total),
    [total]
  );

  // Autoplay
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((p) => (p + 1) % total), 3800);
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
        className="relative flex h-[300px] touch-pan-y items-center justify-center overflow-hidden [perspective:1200px] sm:h-[360px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {items.map((item, i) => {
          const offset = i - index;
          let pos = ((offset + total) % total);
          if (pos > Math.floor(total / 2)) pos -= total;

          const isCenter = pos === 0;
          const isAdjacent = Math.abs(pos) === 1;

          return (
            <div
              key={item.name + i}
              aria-hidden={!isCenter}
              className={cn(
                "pointer-events-none absolute h-[260px] w-[300px] overflow-hidden rounded-3xl border shadow-2xl transition-all duration-500 ease-smooth sm:h-[320px] sm:w-[440px]",
                isCenter ? "border-accent" : "border-white/10"
              )}
              style={{
                transform: `translateX(${pos * 52}%) scale(${
                  isCenter ? 1 : isAdjacent ? 0.82 : 0.7
                }) rotateY(${pos * -12}deg)`,
                zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                filter: isCenter ? "blur(0px)" : "blur(3px)",
                visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 80vw, 440px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
                <h3 className="font-display text-xl sm:text-2xl">{item.name}</h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/80">
                  <Users className="h-4 w-4 text-accent" />
                  {item.type}
                </p>
              </div>
            </div>
          );
        })}

        {/* Arrows */}
        <button
          type="button"
          aria-label="Previous vehicle"
          onClick={() => go(-1)}
          className="absolute left-1 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-bg/90 text-ink shadow-premium backdrop-blur transition hover:border-accent hover:text-primary sm:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next vehicle"
          onClick={() => go(1)}
          className="absolute right-1 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-bg/90 text-ink shadow-premium backdrop-blur transition hover:border-accent hover:text-primary sm:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.name + "dot"}
            type="button"
            aria-label={`Show ${item.name}`}
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
