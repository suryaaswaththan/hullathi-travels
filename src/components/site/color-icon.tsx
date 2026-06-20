"use client";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

/**
 * One coordinated icon style across the site: bold solid glyphs (Font Awesome 6
 * Solid). Colour follows `currentColor`, so set a `text-*` class to theme them
 * per surface. Icons load at runtime from the Iconify API.
 * ponytail: short names map to icon ids here so call sites stay tidy.
 */
const ICONS: Record<string, string> = {
  bed: "fa6-solid:bed",
  food: "maki:restaurant",
  "hot-beverage": "maki:restaurant",
  automobile: "fa6-solid:car-side",
  "round-pushpin": "fa6-solid:location-dot",
  star: "fa6-solid:star",
  shield: "fa6-solid:shield-halved",
  herb: "fa6-solid:leaf",
  handshake: "fa6-solid:handshake",
  sparkles: "fa6-solid:wand-magic-sparkles",
  "alarm-clock": "fa6-solid:clock",
  "busts-in-silhouette": "fa6-solid:users",
  house: "fa6-solid:house",
  envelope: "fa6-solid:envelope",
};

export function ColorIcon({
  name,
  size = 32,
  className,
  float = true,
}: {
  name: string;
  size?: number;
  className?: string;
  float?: boolean;
}) {
  return (
    <Icon
      icon={ICONS[name] ?? name}
      width={size}
      height={size}
      className={cn(
        "inline-block shrink-0 text-primary",
        float && "icon-float",
        className
      )}
    />
  );
}
