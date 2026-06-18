"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  BedDouble,
  Coffee,
  Car,
  MapPin,
  ArrowRight,
  X,
  Check,
  CalendarDays,
  Route,
} from "lucide-react";
import { type Pkg, site, waLink } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/icons";

export function PackageCard({ pkg }: { pkg: Pkg }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const enquire = waLink(
    `Hi ${site.fullName}, I'm interested in the "${pkg.title}" (${pkg.duration}) package. Could you share details & availability?`
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg transition-colors duration-500 ease-smooth hover:border-accent">
        {/* Media */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={pkg.image}
            alt={`${pkg.title} — ${pkg.region}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/55 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-accent/0 transition-colors duration-500 ease-smooth group-hover:bg-accent/15" />
          {pkg.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary-dark">
              {pkg.badge}
            </span>
          )}
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-dark backdrop-blur">
            {pkg.duration}
          </span>
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-xs font-medium text-white">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {pkg.region}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl text-ink">{pkg.title}</h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">
            {pkg.ideal}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{pkg.blurb}</p>

          {/* Route */}
          <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-primary">
            {pkg.route.map((r, i) => (
              <span key={r} className="inline-flex items-center gap-1.5">
                {i > 0 && <span className="text-muted/50">›</span>}
                <span className="font-medium">{r}</span>
              </span>
            ))}
          </div>

          {/* Inclusions icons */}
          <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-primary">
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <BedDouble className="h-4 w-4" /> Stay
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <Coffee className="h-4 w-4" /> Breakfast
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <Car className="h-4 w-4" /> Vehicle
            </span>
          </div>

          {/* Action */}
          <div className="mt-5 flex items-center justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={() => setOpen(true)}
            >
              View itinerary <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>

      {/* Itinerary modal (portaled to body to escape transformed ancestors) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-primary-dark/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${pkg.title} itinerary`}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-bg sm:rounded-3xl"
            >
              {/* Header image */}
              <div className="relative h-40 shrink-0">
                <Image
                  src={pkg.image}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/30 to-transparent" />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  {pkg.badge && (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-primary-dark">
                      {pkg.badge}
                    </span>
                  )}
                  <h3 className="mt-2 font-display text-2xl text-white">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Scroll body */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    {pkg.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Route className="h-4 w-4 text-primary" />
                    {pkg.route.join(" › ")}
                  </span>
                </div>

                {/* Itinerary */}
                <h4 className="mt-5 font-display text-lg text-ink">Itinerary</h4>
                <ol className="mt-3 space-y-4 border-l border-border pl-5">
                  {pkg.itinerary.map((d) => (
                    <li key={d.day} className="relative">
                      <span className="absolute -left-[1.55rem] top-1 grid h-4 w-4 place-items-center rounded-full bg-accent text-[8px] font-bold text-primary-dark">
                        •
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {d.day}
                      </p>
                      <p className="font-medium text-ink">{d.title}</p>
                      <p className="mt-0.5 text-sm text-muted">
                        {d.items.join(" · ")}
                      </p>
                    </li>
                  ))}
                </ol>

                {/* Inclusions */}
                <h4 className="mt-6 font-display text-lg text-ink">
                  What&apos;s included
                </h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {pkg.inclusions.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer CTA */}
              <div className="shrink-0 border-t border-border bg-surface p-4">
                <Button asChild variant="accent" className="w-full">
                  <a href={enquire} target="_blank" rel="noreferrer">
                    <WhatsAppIcon className="h-5 w-5" /> Enquire about this package
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
