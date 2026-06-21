"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { site, waLink, asset } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/icons";

const stats = [
  { value: site.travellers, label: "Happy travellers" },
  { value: "3", label: "South Indian states" },
  { value: "24/7", label: "On-call support" },
  { value: "100%", label: "Private journeys" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // iOS/Android only autoplay a genuinely muted video. React often fails to apply
  // the `muted` prop to the live element, so enforce it imperatively and kick off play.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    // Retry once the tab/app regains focus (Low Power Mode often blocks the first attempt).
    document.addEventListener("visibilitychange", tryPlay);
    return () => document.removeEventListener("visibilitychange", tryPlay);
  }, []);

  return (
    <section className="relative w-full">
      {/* Landing view — exactly one viewport tall, so the 4K video stays crisp (no stretch) */}
      <div className="relative h-[100svh] overflow-hidden bg-primary-dark">
        {/* Mobile: centre-crop to fill. Desktop: contain — never crop or stretch the 4K frame. */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center md:object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={asset("/images/kerala-aerial-poster.jpg")}
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src={asset("/video/kerala-aerial-4k.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary-dark/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/55 via-transparent to-primary-dark/80" />
        {/* Bottom fade — the video melts into the dark block below for a smooth cut */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-primary-dark" />

        {/* Block 1 — brand name + tagline */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {site.motto}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.12, ease }}
          className="mt-6 max-w-5xl text-balance font-display text-5xl font-semibold leading-[1.05] text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.55)] sm:text-7xl lg:text-8xl"
        >
          Hullathi Tours &amp; Travels
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="mt-6 text-base font-medium uppercase tracking-[0.42em] text-accent sm:text-xl sm:tracking-[0.5em]"
        >
          Explore · Experience · Enjoy
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 md:bottom-10"
        >
          <motion.span
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-white/75"
          >
            <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.div>
        </div>
      </div>

      {/* Block 2 — value prop + CTAs + stats, on a solid dark backing */}
      <div className="relative z-10 flex min-h-[88svh] flex-col items-center justify-center bg-primary-dark px-5 pb-28 pt-10 text-center md:pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="max-w-3xl text-balance text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.5)]"
        >
          Explore the magic of South India
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg"
        >
          Hand-crafted, private holidays across Tamil Nadu, Kerala and Karnataka
          — stay, breakfast and transport included. Crafted by local hosts in
          Ooty, the Nilgiris.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild variant="accent" size="lg" className="h-14 gap-2.5 px-10 text-base sm:h-16 sm:text-lg">
            <Link href="/packages">
              View packages <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="light" size="lg" className="h-14 gap-2.5 px-10 text-base sm:h-16 sm:text-lg">
            <a
              href={waLink(`Hi ${site.fullName}, I'd like to plan a trip.`)}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon className="h-6 w-6 text-[#25d366]" /> Enquire on WhatsApp
            </a>
          </Button>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.28, ease }}
          className="mx-auto mt-14 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-5 text-center">
              <dt className="font-display text-2xl text-white sm:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-[11px] uppercase tracking-wider text-white/75">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
