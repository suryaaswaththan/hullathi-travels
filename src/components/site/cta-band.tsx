import Link from "next/link";
import Image from "next/image";
import { site, waLink } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { CallButton } from "@/components/site/call-button";
import { WhatsAppIcon, PhoneFilledIcon } from "@/components/site/icons";

export function CtaBand() {
  return (
    <section className="container-wide py-16 md:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-primary-dark px-6 py-14 text-center md:px-16 md:py-20">
        <Image
          src="/images/kerala-village-aerial.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-primary-dark/60" />
        <div className="relative mx-auto max-w-2xl">
          <BlurFade>
            <span className="eyebrow justify-center text-accent">
              <span className="h-[3px] w-7 rounded-full bg-accent" /> Ready when you are
            </span>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="mt-4 text-balance text-white">
              Let&apos;s plan your South India escape
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mx-auto mt-4 max-w-prose text-white/70">
              Tell us your dates and dreams — we&apos;ll craft a private
              itinerary with stay, breakfast and transport, end to end. Replies
              within the hour, {site.hours.toLowerCase()}.
            </p>
          </BlurFade>
          <BlurFade delay={0.24}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                variant="accent"
                size="lg"
                className="btn-shine h-14 px-9 text-base transition-transform hover:-translate-y-0.5 sm:h-16"
              >
                <Link href="/contact">Start an enquiry</Link>
              </Button>
              <Button
                asChild
                variant="light"
                size="lg"
                className="btn-shine h-14 px-9 text-base transition-transform hover:-translate-y-0.5 sm:h-16"
              >
                <a href={waLink(`Hi ${site.fullName}, I'd like to plan a trip.`)} target="_blank" rel="noreferrer">
                  <WhatsAppIcon className="h-5 w-5 text-[#25d366]" /> WhatsApp us
                </a>
              </Button>
              <CallButton
                ariaLabel="Call us"
                className="btn-shine inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/25 px-9 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:h-16"
              >
                <PhoneFilledIcon className="h-5 w-5" /> Call us
              </CallButton>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
