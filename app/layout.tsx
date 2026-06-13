import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={archivo.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
