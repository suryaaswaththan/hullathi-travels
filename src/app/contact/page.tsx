import type { Metadata } from "next";
import { MapPin, Mail, Clock, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { BlurFade } from "@/components/ui/blur-fade";
import { WhatsAppIcon, PhoneFilledIcon } from "@/components/site/icons";
import { site, mailLink, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Plan your South India trip with Hullathi Tours & Travels. Call, WhatsApp or send an enquiry — we're based in Ooty and reachable 24/7.",
};

type Quick = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  tone: "primary" | "green";
};

export default function ContactPage() {
  const quick: Quick[] = [
    ...site.phones.map((p) => ({
      icon: PhoneFilledIcon,
      label: p.label,
      value: p.display,
      href: `tel:+${p.tel}`,
      tone: "primary" as const,
    })),
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: site.phones[0].display,
      href: waLink(`Hi ${site.fullName}, I'd like to plan a trip.`),
      external: true,
      tone: "green" as const,
    },
    {
      icon: Mail,
      label: "Email",
      value: site.email,
      href: mailLink,
      tone: "primary" as const,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's plan something beautiful"
        subtitle="Tell us your dates and dreams. We reply within the hour, any time of day."
        image="/images/kerala-backwaters.jpg"
      />

      <section className="container-wide py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Left — details */}
          <div>
            <BlurFade>
              <span className="eyebrow">
                <span className="h-[3px] w-7 rounded-full bg-accent" /> Our office
              </span>
              <h2 className="mt-4 text-balance">Reach us, {site.hours.toLowerCase()}</h2>
              <p className="mt-4 max-w-prose text-muted">
                Based in the Nilgiri hills, we&apos;re always a message away —
                whether you&apos;re booking months ahead or need help on the
                road.
              </p>
            </BlurFade>

            {/* Quick actions */}
            <div className="mt-8 space-y-3">
              {quick.map((q, i) => (
                <BlurFade key={q.label} delay={i * 0.08}>
                  <a
                    href={q.href}
                    target={q.external ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-bg p-4 transition-colors duration-300 hover:border-accent"
                  >
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-white ${
                        q.tone === "green" ? "bg-[#25d366]" : "bg-primary"
                      }`}
                    >
                      <q.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-muted">
                        {q.label}
                      </span>
                      <span className="block truncate font-medium text-ink">
                        {q.value}
                      </span>
                    </span>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                </BlurFade>
              ))}
            </div>

            {/* Address + hours */}
            <BlurFade delay={0.2}>
              <div className="mt-6 rounded-2xl bg-surface p-5">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-ink">{site.fullName}</p>
                    <p className="text-xs text-accent">
                      {site.founder} · {site.founderRole}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">
                      {site.address.line1}
                      <br />
                      {site.address.line2}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <Clock className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm text-muted">
                    <span className="font-medium text-ink">{site.hours}</span> —
                    we never sleep on your holiday plans.
                  </p>
                </div>
              </div>
            </BlurFade>

            {/* Map */}
            <BlurFade delay={0.28}>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Hullathi Tours & Travels location"
                  src={site.mapsEmbed}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </BlurFade>
          </div>

          {/* Right — form card */}
          <BlurFade delay={0.12}>
            <div className="rounded-3xl border border-border bg-bg p-6 shadow-premium sm:p-8">
              <h3 className="font-display text-2xl text-ink">Send an enquiry</h3>
              <p className="mt-1.5 text-sm text-muted">
                Fill this in and we&apos;ll craft a tailored itinerary for you.
              </p>
              <div className="mt-6">
                <EnquiryForm />
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </>
  );
}
