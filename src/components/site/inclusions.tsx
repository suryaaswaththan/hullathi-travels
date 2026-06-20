"use client";

import Image from "next/image";
import { BedDouble, Coffee, Car } from "lucide-react";
import { inclusions } from "@/lib/site";
import { BlurFade } from "@/components/ui/blur-fade";

const icons = {
  stay: BedDouble,
  breakfast: Coffee,
  vehicle: Car,
} as const;

export function Inclusions() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {inclusions.map((item, i) => {
        const Icon = icons[item.key as keyof typeof icons];
        return (
          <BlurFade key={item.key} delay={i * 0.1}>
            <div className="group relative h-80 overflow-hidden rounded-2xl border border-border">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="neon-icon mb-3 inline-grid place-items-center text-accent">
                  <Icon className="h-8 w-8" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-xl text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                  {item.desc}
                </p>
              </div>
            </div>
          </BlurFade>
        );
      })}
    </div>
  );
}
