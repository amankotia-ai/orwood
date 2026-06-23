import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { site, projects } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CookieBanner } from "@/components/cookie-banner";
import { Panorama } from "@/components/panorama";
import { Analytics } from "@/components/analytics";
import { PostHogTracking } from "@/components/posthog-provider";
import { GTMScript, GTMNoScript } from "@/components/google-tag-manager";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orwood.com"),
  title: {
    default: "ORWOOD — Finishing & Furnishing",
    template: "%s — ORWOOD",
  },
  description: site.description,
  keywords: [
    "interior fit-out",
    "FF&E",
    "contract furniture",
    "joinery",
    "design and build",
    "turnkey interiors",
    "ORWOOD",
  ],
  openGraph: {
    type: "website",
    title: "ORWOOD — Finishing & Furnishing",
    description: site.description,
    siteName: "ORWOOD",
    url: "https://orwood.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORWOOD — Finishing & Furnishing",
    description: site.description,
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ORWOOD",
  url: "https://orwood.com",
  description: site.description,
  email: site.email,
  telephone: site.phone,
  foundingDate: "2004",
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line2,
    addressLocality: "İstanbul",
    addressCountry: "TR",
  },
  sameAs: site.social.map((s) => s.href),
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Turkey" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  knowsAbout: [
    "hotel interior fit-out",
    "hospitality FF&E procurement",
    "resort interior design and build",
    "fire-rated door manufacturing",
    "bespoke joinery for hotels",
    "turnkey interior fit-out",
    "contract furniture manufacturing",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Hospitality Interior Fit-Out",
      description:
        "Turnkey hotel and resort interior fit-out — design & build, FF&E procurement, joinery manufacturing, and fire-rated doors — delivered from our own workshops in İstanbul.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Qatar" },
        { "@type": "Country", name: "Saudi Arabia" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Hospitality Fit-Out Services",
        itemListElement: [
          { "@type": "Service", name: "Design & Build" },
          { "@type": "Service", name: "FF&E Procurement" },
          { "@type": "Service", name: "Joinery & Manufacturing" },
          { "@type": "Service", name: "Fire Rated Doors" },
          { "@type": "Service", name: "Interior Fit-Out" },
          { "@type": "Service", name: "Furniture Solutions" },
        ],
      },
    },
  },
  subjectOf: projects
    .filter((p) => p.sector === "Hospitality")
    .map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.summary,
      locationCreated: p.location,
      url: `https://orwood.com/projects/${p.id}`,
    })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={archivo.variable}>
      <body>
        <GTMScript />
        <GTMNoScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppButton />
        <CookieBanner />
        <Panorama />
        <Analytics />
        <PostHogTracking />
      </body>
    </html>
  );
}
