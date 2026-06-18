"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { galleryImages } from "@/lib/site";
import { BlurFade } from "@/components/ui/blur-fade";

export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % galleryImages.length)),
    []
  );
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length
      ),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <>
      <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] md:grid-cols-4">
        {galleryImages.map((img, i) => (
          <BlurFade
            key={img.src}
            delay={(i % 8) * 0.05}
            className={cn(
              img.span === "tall" && "row-span-2",
              img.span === "wide" && "col-span-2"
            )}
          >
            <button
              onClick={() => setActive(i)}
              aria-label={`Open image: ${img.alt}`}
              className="group relative h-full w-full overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary-dark/0 transition-colors duration-500 group-hover:bg-primary-dark/25" />
            </button>
          </BlurFade>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-dark/95 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-6"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-6"
            >
              <ChevronRight />
            </button>

            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[82vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative mx-auto aspect-[3/2] max-h-[78vh] w-full">
                <Image
                  src={galleryImages[active].src}
                  alt={galleryImages[active].alt}
                  fill
                  sizes="100vw"
                  className="rounded-xl object-contain"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-white/70">
                {galleryImages[active].alt} · {active + 1} /{" "}
                {galleryImages.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
