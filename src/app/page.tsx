import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, MapPin } from "lucide-react";
import { Hero } from "@/components/site/hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Destinations } from "@/components/site/destinations";
import { DestinationsCarousel } from "@/components/site/destinations-carousel";
import { Inclusions } from "@/components/site/inclusions";
import { PackageCard } from "@/components/site/package-card";
import { VehicleCarousel } from "@/components/site/vehicle-carousel";
import { Reviews } from "@/components/site/reviews";
import { CtaBand } from "@/components/site/cta-band";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { packages, fleet } from "@/lib/site";

export default function HomePage() {
  const featured = packages.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-y border-border bg-surface">
        <div className="container-wide flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-5 text-sm text-muted">
          <span className="flex items-center gap-2">
            <Star className="h-4 w-4 text-accent" fill="var(--color-accent)" />
            5.0 rated by travellers
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> Stay · Breakfast ·
            Vehicle included
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Locally run from Ooty,
            the Nilgiris
          </span>
        </div>
      </section>

      {/* Destinations */}
      <section className="container-wide py-16 md:py-24">
        <SectionHeading
          eyebrow="Where we take you"
          title="Three states, one seamless journey"
          description="Each route is shaped around the season, the light and the pace you want — from the cool Nilgiris to the Kerala backwaters and the palaces of Karnataka."
        />
        {/* Coverflow slider on small screens, grid on large */}
        <div className="mt-10 lg:hidden">
          <DestinationsCarousel />
        </div>
        <div className="mt-10 hidden lg:block">
          <Destinations />
        </div>
      </section>

      {/* Inclusions guarantee */}
      <section className="bg-surface">
        <div className="container-wide py-16 md:py-24">
          <SectionHeading
            eyebrow="The inclusions guarantee"
            title="Three things, always taken care of"
            description="No hidden extras. Every Hullathi Tours & Travels package is built around the same three pillars — so you only ever think about the view."
          />
          <div className="mt-12">
            <Inclusions />
          </div>
        </div>
      </section>

      {/* Featured packages */}
      <section className="container-wide py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Signature itineraries"
            title="Holiday packages, ready to go"
            description="From a misty Ooty getaway to a romantic Kodaikanal honeymoon — pick a journey, we handle the rest."
          />
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/packages">
              All packages <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <BlurFade key={p.slug} delay={i * 0.08}>
              <PackageCard pkg={p} />
            </BlurFade>
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/packages">
              View all packages <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Fleet */}
      <section className="overflow-hidden bg-surface">
        <div className="container-wide py-16 md:py-24">
          <SectionHeading
            eyebrow="Travel in comfort"
            title="All types of vehicles available"
            description="Sedan, SUV, Innova, Tempo Traveller or bus — clean, well-maintained vehicles with experienced local drivers, matched to your group size."
          />
          <div className="mt-12">
            <VehicleCarousel items={fleet} />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container-wide py-16 md:py-24">
        <SectionHeading
          eyebrow="Google reviews"
          title="Loved by travellers across India"
          description="Real words from families, couples and groups who let us plan their South India escape."
        />
        <div className="mt-12">
          <Reviews />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
