import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { MobileDock } from "@/components/site/mobile-dock";
import { site } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hullathitoursandtravels.com"),
  title: {
    default: `${site.fullName} — Curated Tours of Tamil Nadu, Kerala & Karnataka`,
    template: `%s · ${site.name}`,
  },
  description:
    "Premium, hassle-free holiday packages across South India — stay, breakfast and private transport included. Local experts based in Ooty, the Nilgiris. Explore, experience, enjoy.",
  keywords: [
    "South India tour packages",
    "Ooty tour package",
    "Munnar holiday",
    "Kerala backwaters",
    "Karnataka tours",
    "Tamil Nadu travel",
    "Hullathi Tours and Travels",
  ],
  openGraph: {
    title: `${site.fullName}`,
    description:
      "Curated South India holiday packages — stay, breakfast & private transport included.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
        <MobileDock />
      </body>
    </html>
  );
}
