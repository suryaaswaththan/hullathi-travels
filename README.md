# Hullathi Tour's and Travels — Website

A premium, multi-page marketing site for **Hullathi Tour's and Travels**, a
family-run tour operator in Ooty (the Nilgiris) offering curated holiday
packages across **Tamil Nadu, Kerala & Karnataka**.

Built to the project's `DESIGN.md` (Nilgiri-hills palette, Playfair Display +
Outfit) and `PRODUCT.md` (premium, frictionless, conversion-focused).

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with OKLCH design tokens + shadcn-style structure
  (`components/ui`, `lib/utils`)
- **Framer Motion** for animations (blur-fade reveals, scroll-expand hero,
  lightbox, mobile menu)
- **lucide-react** icons

## Pages

| Route        | Highlights |
|--------------|-----------|
| `/`          | Scroll-to-expand video hero (Munnar 4K), destinations, inclusions guarantee, featured packages, gallery teaser, Google-style reviews, CTA |
| `/about`     | Brand story, values, USPs, inclusions |
| `/packages`  | All 6 duration packages (1N/2D → 6N/7D) + vehicle fleet |
| `/gallery`   | Masonry gallery with keyboard-navigable lightbox |
| `/contact`   | Split-screen office details + map + 7-field enquiry form |

## Key features

- **Mobile-first**: responsive layouts, an accessible bottom dock
  (Home / Packages / Gallery / WhatsApp), full-screen mobile menu.
- **Frictionless conversion**: floating WhatsApp + Call panel (desktop),
  enquiry form that composes a prefilled WhatsApp message or email.
- **Elegant motion**: scroll-expand hero, in-view blur-fade reveals, gold
  overlay card hovers (no image zoom, per the design spec).
- **Accessibility**: semantic HTML, ARIA labels, keyboard lightbox,
  `prefers-reduced-motion` support.

## Editing content

All business data (phone, WhatsApp, email, address, packages, destinations,
reviews, gallery) lives in **`src/lib/site.ts`** — edit there, no component
changes needed.

Images are in `public/images/`, the hero video in `public/video/`, and the
logo in `public/brand/`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

> Note: don't run `next dev` and `next start` at the same time — they share the
> `.next/` directory and will clobber each other's build output.
