"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { site } from "@/lib/site";
import { PhoneFilledIcon } from "@/components/site/icons";

interface Props {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

/**
 * Renders a trigger that opens a sheet letting the caller pick which of the
 * two business numbers to dial. Both numbers are always offered.
 */
export function CallButton({ className, children, ariaLabel = "Call us" }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const sheet = (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-primary-dark/60 backdrop-blur-sm p-4 sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label="Choose a number to call"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-white/85 p-5 shadow-hover backdrop-blur-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-xl text-ink">Call us</p>
                  <p className="mt-0.5 text-sm text-muted">
                    Pick a number — we&apos;re available {site.hours.toLowerCase()}.
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-surface"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {site.phones.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:+${p.tel}`}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-bg p-3.5 transition-colors hover:border-accent"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-white">
                      <PhoneFilledIcon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-wider text-muted">
                        {p.label}
                      </span>
                      <span className="block whitespace-nowrap font-semibold text-ink">
                        {p.display}
                      </span>
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={className}
      >
        {children}
      </button>
      {mounted && createPortal(sheet, document.body)}
    </>
  );
}
