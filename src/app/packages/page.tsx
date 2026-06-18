import type { Metadata } from "next";
import { BedDouble, Coffee, Car, Users, Home as HomeIcon } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { PackageCard } from "@/components/site/package-card";
import { VehicleCarousel } from "@/components/site/vehicle-carousel";
import { CtaBand } from "@/components/site/cta-band";
import { BlurFade } from "@/components/ui/blur-fade";
import { packages, fleet, stayTypes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tour Packages",
  description:
    "Curated South India holiday packages — Ooty, Coonoor, Kodaikanal, Valparai, Mysore, Coorg, Munnar, Alleppey and more. Stay, breakfast and private transport included.",
};

const included = [
  { icon: BedDouble, label: "Hand-picked stays" },
  { icon: Coffee, label: "Daily breakfast" },
  { icon: Car, label: "Private vehicle + driver" },
  { icon: Users, label: "Tailored to your group" },
];

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Tour packages"
        title="Pick your pace — we craft the rest"
        subtitle="Signature journeys across Tamil Nadu, Kerala and Karnataka. Every trip is private and fully arranged, door to door."
        image="/images/karnataka-mysore-palace.jpg"
      />

      {/* Included strip */}
      <section className="border-b border-border bg-surface">
        <div className="container-wide grid grid-cols-2 gap-4 py-8 sm:grid-cols-4">
          {included.map((it) => (
            <div
              key={it.label}
              className="flex items-center gap-3 text-sm font-medium text-ink"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-light text-primary">
                <it.icon className="h-5 w-5" />
              </span>
              {it.label}
            </div>
          ))}
        </div>
      </section>

      {/* Packages grid */}
      <section className="container-wide py-16 md:py-24">
        <SectionHeading
          eyebrow="Choose your journey"
          title="Holiday packages"
          description="Tap any package to view the full day-by-day itinerary and inclusions. Every trip is tailored to your dates, group size and choice of stays."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => (
            <BlurFade key={p.slug} delay={(i % 3) * 0.08}>
              <PackageCard pkg={p} />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Stays */}
      <section className="bg-surface">
        <div className="container-wide py-16 md:py-24">
          <SectionHeading
            eyebrow="Where you'll stay"
            title="Rooms, cottages, home stays & resorts"
            description="We match every traveller to the right kind of stay — from cosy hill cottages to premium resorts."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {stayTypes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2.5 text-sm font-medium text-ink"
              >
                <HomeIcon className="h-4 w-4 text-primary" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="container-wide overflow-hidden py-16 md:py-24">
        <SectionHeading
          align="center"
          eyebrow="Travel in comfort"
          title="All types of vehicles available"
          description="Clean, well-maintained vehicles with experienced local drivers — chosen to match your group size."
        />
        <div className="mt-12">
          <VehicleCarousel items={fleet} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
