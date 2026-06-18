import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { PackageCard } from "@/components/site/package-card";
import { VehicleCarousel } from "@/components/site/vehicle-carousel";
import { CtaBand } from "@/components/site/cta-band";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import {
  destinations,
  getDestination,
  getPackagesByState,
  fleet,
  statePlaces,
  type StateSlug,
} from "@/lib/site";

export function generateStaticParams() {
  return destinations.map((d) => ({ state: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { state: string };
}): Metadata {
  const dest = getDestination(params.state);
  if (!dest) return { title: "Packages" };
  return {
    title: `${dest.name} Tour Packages`,
    description: `Curated ${dest.name} holiday packages — ${dest.places
      .slice(0, 5)
      .join(", ")} and more. Stay, breakfast and private transport included.`,
  };
}

export default function StatePackagesPage({
  params,
}: {
  params: { state: string };
}) {
  const dest = getDestination(params.state);
  if (!dest) notFound();

  const list = getPackagesByState(params.state);

  return (
    <>
      <PageHero
        eyebrow={dest.state}
        title={`${dest.name} holiday packages`}
        subtitle={dest.blurb}
        image={dest.image}
      />

      <section className="container-wide py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={`${list.length} ${list.length === 1 ? "journey" : "journeys"}`}
            title={`Curated ${dest.name} journeys`}
            description={`Handpicked routes across ${dest.places
              .slice(0, 4)
              .join(", ")} and beyond — tap any package for the full day-by-day itinerary.`}
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/packages">
              <ArrowLeft className="h-4 w-4" /> All packages
            </Link>
          </Button>
        </div>

        {list.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <BlurFade key={p.slug} delay={(i % 3) * 0.08}>
                <PackageCard pkg={p} />
              </BlurFade>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-border bg-surface p-10 text-center">
            <p className="text-muted">
              New {dest.name} packages are on the way. Message us and we&apos;ll
              craft one just for you.
            </p>
            <Button asChild variant="accent" className="mt-5">
              <Link href="/contact">Plan a custom trip</Link>
            </Button>
          </div>
        )}

        {/* Explore other states */}
        <div className="mt-14 border-t border-border pt-10">
          <p className="text-sm font-medium uppercase tracking-wider text-muted">
            Explore other states
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {destinations
              .filter((d) => d.slug !== params.state)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/packages/${d.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-primary"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {d.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Places we cover */}
      <section className="bg-surface">
        <div className="container-wide py-16 md:py-24">
          <SectionHeading
            align="center"
            eyebrow="Destinations we cover"
            title={`Places we'll take you in ${dest.name}`}
            description="Every itinerary is built to taste — mix and match any of these into your trip."
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {statePlaces[params.state as StateSlug].map((place, i) => (
              <BlurFade key={place.name} delay={(i % 4) * 0.06}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 p-3 text-white">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <span className="font-display text-base leading-tight">
                      {place.name}
                    </span>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="overflow-hidden">
        <div className="container-wide py-16 md:py-24">
          <SectionHeading
            align="center"
            eyebrow="Travel in comfort"
            title="All types of vehicles available"
            description="Every journey includes a clean, well-maintained vehicle with an experienced local driver — matched to your group size."
          />
          <div className="mt-12">
            <VehicleCarousel items={fleet} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
