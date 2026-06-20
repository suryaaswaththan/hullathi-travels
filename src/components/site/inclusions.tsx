"use client";

import Image from "next/image";
import { inclusions } from "@/lib/site";
import { BlurFade } from "@/components/ui/blur-fade";
import { ColorIcon } from "@/components/site/color-icon";

const icons = {
  stay: "bed",
  breakfast: "hot-beverage",
  vehicle: "automobile",
} as const;

export function Inclusions() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {inclusions.map((item, i) => {
        const iconName = icons[item.key as keyof typeof icons];
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
                <ColorIcon name={iconName} size={38} className="mb-3 text-accent drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]" />
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
