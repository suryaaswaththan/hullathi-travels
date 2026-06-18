import type { Metadata } from "next";
import Image from "next/image";
import {
  Leaf,
  HandHeart,
  Sparkles,
  Clock,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Inclusions } from "@/components/site/inclusions";
import { CtaBand } from "@/components/site/cta-band";
import { BlurFade } from "@/components/ui/blur-fade";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Hullathi Tours & Travels is a family of local hosts in Ooty crafting premium, hassle-free South India holidays since 2026.",
};

const values = [
  {
    icon: Leaf,
    title: "Serene & nature-infused",
    desc: "We design around the quiet — misty hills, green estates and unhurried mornings, not crowded checklists.",
  },
  {
    icon: HandHeart,
    title: "Trustworthy & local",
    desc: "Rooted in Ooty, we know the roads, the seasons and the people. You travel with insiders, not a call centre.",
  },
  {
    icon: Sparkles,
    title: "Sophisticated & premium",
    desc: "Considered stays, clean private vehicles and thoughtful touches — an elevated experience, end to end.",
  },
];

const usps = [
  { icon: ShieldCheck, label: "Stay, breakfast & private vehicle in every package" },
  { icon: Clock, label: "24/7 reachable on call & WhatsApp" },
  { icon: MapPin, label: "Local Ooty experts across TN, Kerala & Karnataka" },
  { icon: HandHeart, label: "Private, family-run service — never mass tourism" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Local hosts, crafting the South India you came for"
        subtitle="Born in the Nilgiri hills, built on warmth, local knowledge and a love for getting every detail right."
        image="/images/tamilnadu-nilgiris-hills.jpg"
      />

      {/* Story */}
      <section className="container-wide py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={`Since ${site.since}`}
              title="A family business with the hills in its heart"
            />
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
              <BlurFade>
                <p>
                  Hullathi Tours & Travels began in the small village of
                  Hullathi, just outside Ooty in the Nilgiris. What started as
                  showing friends our favourite corners of the hills has grown
                  into curated journeys across Tamil Nadu, Kerala and Karnataka.
                </p>
              </BlurFade>
              <BlurFade delay={0.1}>
                <p>
                  We believe a holiday should feel effortless. So we handle the
                  parts that usually cause stress — the stay, the breakfast, the
                  driving — and hand you back the parts that matter: the views,
                  the food, the slow evenings and the stories.
                </p>
              </BlurFade>
              <BlurFade delay={0.2}>
                <p>
                  Already trusted by{" "}
                  <span className="font-medium text-primary">
                    {site.travellers} travellers
                  </span>
                  , we&apos;re reachable {site.hours.toLowerCase()} — because the
                  best trips are the ones where someone always has your back.
                </p>
              </BlurFade>
            </div>
          </div>

          <BlurFade delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/kerala-backwaters.jpg"
                  alt="Kerala backwaters"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-8 space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/images/tamilnadu-temple-1.jpg"
                    alt="Temple at golden hour"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/images/ooty-viewpoint.jpg"
                    alt="Travellers at an Ooty viewpoint"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface">
        <div className="container-wide py-16 md:py-24">
          <SectionHeading
            align="center"
            eyebrow="What we stand for"
            title="A quieter, kinder way to travel"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <BlurFade key={v.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-border bg-bg p-7 transition-colors duration-500 hover:border-accent">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-light text-primary">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {v.desc}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* USP strip */}
      <section className="container-wide py-16 md:py-24">
        <SectionHeading
          eyebrow="Why travellers choose us"
          title="The Hullathi difference"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {usps.map((u, i) => (
            <BlurFade key={u.label} delay={i * 0.08}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-bg p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-white">
                  <u.icon className="h-5 w-5" />
                </span>
                <p className="text-[15px] font-medium text-ink">{u.label}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Inclusions */}
      <section className="bg-surface">
        <div className="container-wide py-16 md:py-24">
          <SectionHeading
            align="center"
            eyebrow="Always included"
            title="The three pillars of every trip"
          />
          <div className="mt-12">
            <Inclusions />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
