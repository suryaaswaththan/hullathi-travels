"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/lib/site";
import { BlurFade } from "@/components/ui/blur-fade";

export function Destinations() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {destinations.map((d, i) => (
        <BlurFade key={d.slug} delay={i * 0.1}>
          <Link
            href={`/packages/${d.slug}`}
            aria-label={`View ${d.name} packages`}
            className="group relative flex h-[26rem] flex-col justify-end overflow-hidden rounded-2xl border border-border transition-transform duration-500 ease-smooth hover:-translate-y-1 hover:border-accent"
          >
            <Image
              src={d.image}
              alt={`${d.name} — ${d.state}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
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
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">
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
        </BlurFade>
      ))}
    </div>
  );
}
