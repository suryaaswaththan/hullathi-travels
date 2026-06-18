import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Clock, ArrowUpRight } from "lucide-react";
import { nav, site, mailLink, destinations } from "@/lib/site";
import {
  WhatsAppIcon,
  PhoneFilledIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/site/icons";
import { waLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-dark text-white/80">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-wide relative grid gap-12 pb-16 pt-16 md:grid-cols-12 md:pt-20">
        {/* Brand */}
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white">
              <Image
                src="/brand/logo.png"
                alt="Hullathi Tours & Travels logo"
                width={48}
                height={48}
                className="h-9 w-9 object-contain"
              />
            </span>
            <span className="font-display text-xl font-semibold text-white">
              Hullathi Tours &amp; Travels
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Curated, hassle-free holiday journeys across Tamil Nadu, Kerala and
            Karnataka — stay, breakfast and private transport, handled by your
            local hosts in Ooty.
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-accent">
            {site.tagline}
          </p>

          {/* Social */}
          <div className="mt-5 flex items-center gap-2">
            {[
              { href: site.social.facebook, icon: FacebookIcon, label: "Facebook" },
              { href: site.social.instagram, icon: InstagramIcon, label: "Instagram" },
              { href: site.social.youtube, icon: YoutubeIcon, label: "YouTube" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-accent hover:text-accent"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div className="md:col-span-2">
          <h4 className="font-display text-base text-white">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/60 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div className="md:col-span-2">
          <h4 className="font-display text-base text-white">Destinations</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link
                  href="/packages"
                  className="text-white/60 transition-colors hover:text-accent"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-4">
          <h4 className="font-display text-base text-white">Reach us — 24/7</h4>
          <p className="mt-3 text-sm text-white/55">
            {site.founder} · {site.founderRole}
          </p>
          <ul className="mt-3 space-y-3.5 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="text-white/60">
                {site.address.line1}, {site.address.line2}
              </span>
            </li>
            <li className="flex gap-3">
              <PhoneFilledIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="flex flex-col text-white/60">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:+${p.tel}`} className="hover:text-accent">
                    {p.display}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a
                href={waLink(`Hi ${site.fullName}, I'd like to plan a trip.`)}
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-accent"
              >
                WhatsApp us
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={mailLink} className="break-all text-white/60 hover:text-accent">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="text-white/60">{site.hours}</span>
            </li>
          </ul>
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            View on Google Maps <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-3 pb-28 pt-6 text-xs text-white/40 md:flex-row md:pb-6">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <p>Crafted with care in the Nilgiris · Since {site.since}</p>
        </div>
      </div>
    </footer>
  );
}
