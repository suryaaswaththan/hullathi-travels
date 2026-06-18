"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Compass, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Packages", href: "/packages", icon: Compass },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between gap-1 rounded-2xl border border-white/10 bg-primary-dark p-1.5 shadow-[0_-6px_30px_-8px_rgba(0,0,0,0.5)]">
        {links.map(({ label, href, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-semibold transition-colors",
                active
                  ? "bg-accent text-primary-dark"
                  : "text-white/90 hover:bg-white/10"
              )}
            >
              <Icon className="h-[22px] w-[22px]" strokeWidth={2.2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
