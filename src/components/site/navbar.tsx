"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { CallButton } from "@/components/site/call-button";
import { PhoneFilledIcon } from "@/components/site/icons";

function BrandMark() {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.25)] md:h-11 md:w-11">
      <Image
        src="/brand/logo.png"
        alt="Hullathi Tours & Travels logo"
        width={44}
        height={44}
        className="h-8 w-8 object-contain md:h-9 md:w-9"
      />
    </span>
  );
}

/**
 * Reads the effective background behind a screen point and decides whether it's
 * dark (→ light text) or light (→ dark text). Walks up the DOM until it finds an
 * opaque background colour; treats any background-image (the photo/gradient
 * heroes) as dark.
 * ponytail: heuristic — full-bleed image sections on this site are always dark-overlaid.
 */
function isBackgroundDark(x: number, y: number): boolean {
  let el = document.elementFromPoint(x, y) as HTMLElement | null;
  while (el && el !== document.documentElement) {
    const s = getComputedStyle(el);
    if (s.backgroundImage && s.backgroundImage !== "none") return true;
    const m = s.backgroundColor.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const [r, g, b, a = 1] = m[1].split(",").map(Number);
      if (a > 0.1) return 0.299 * r + 0.587 * g + 0.114 * b < 140;
    }
    el = el.parentElement;
  }
  return false; // page background is white
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [bgDark, setBgDark] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setBgDark(isBackgroundDark(window.innerWidth / 2, 84));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <nav
        className={cn(
          "container mx-auto flex h-14 items-center justify-between gap-3 rounded-2xl px-3 py-2 transition-all duration-500 ease-smooth md:h-16 md:px-5",
          "border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl",
          bgDark
            ? scrolled
              ? "border-white/10 bg-primary-dark/95"
              : "border-white/15 bg-primary-dark/65"
            : scrolled
              ? "border-black/10 bg-white/95"
              : "border-black/10 bg-white/80"
        )}
      >
        {/* Brand */}
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <BrandMark />
          <span className="flex min-w-0 flex-col leading-none">
            <span
              className={cn(
                "truncate font-display text-[15px] font-semibold sm:text-lg",
                bgDark
                  ? "text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]"
                  : "text-ink"
              )}
            >
              Hullathi Tours &amp; Travels
            </span>
            <span className="mt-0.5 hidden text-[10px] uppercase tracking-[0.22em] text-accent sm:block">
              Explore · Experience · Enjoy
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    bgDark
                      ? "text-white/85 hover:bg-white/10 hover:text-white"
                      : "text-ink/70 hover:bg-black/5 hover:text-ink",
                    active && (bgDark ? "bg-white/10 text-white" : "bg-black/5 text-ink")
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions (desktop — mobile uses the bottom dock + floating buttons) */}
        <div className="hidden items-center gap-2 md:flex">
          <CallButton
            ariaLabel="Call us"
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border transition",
              bgDark
                ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border-black/10 bg-black/5 text-ink hover:bg-black/10"
            )}
          >
            <PhoneFilledIcon className="h-[18px] w-[18px]" />
          </CallButton>
          <Button asChild variant="accent" size="sm">
            <Link href="/contact">Plan my trip</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
