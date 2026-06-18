import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual journey through South India — hills, backwaters, palaces, stays and cuisine from Hullathi Tours & Travels.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The South, as our travellers see it"
        subtitle="Misty mornings, golden temples, palm-lined backwaters and the little moments in between. Tap any image to explore."
        image="/images/resort-pool.jpg"
      />

      <section className="container-wide py-16 md:py-24">
        <GalleryGrid />
      </section>

      <CtaBand />
    </>
  );
}
