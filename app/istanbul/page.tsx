import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { StatCounter } from "@/components/stat-counter";
import { CTA } from "@/components/cta";
import { ArrowLink } from "@/components/ui/button";
import { istanbul, site, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About ORWOOD İstanbul — Interior Fit-Out Contractor",
  description:
    "ORWOOD is an İstanbul-headquartered interior fit-out contractor — design, joinery, FF&E, and fire-rated doors manufactured in-house since 2004. 200+ projects across 15 countries.",
  alternates: {
    canonical: "https://orwood.com/istanbul",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://orwood.com/#organization",
  name: "ORWOOD",
  alternateName: "ORWOOD Finishing & Furnishing",
  description:
    "İstanbul-headquartered interior fit-out contractor specialising in design & build, bespoke joinery, FF&E procurement, contract furniture, and fire-rated door systems for hospitality, commercial, and residential projects.",
  url: "https://orwood.com",
  telephone: site.phone,
  email: site.email,
  foundingDate: "2004",
  foundingLocation: {
    "@type": "Place",
    name: "İstanbul, Türkiye",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "İkitelli OSB, Başakşehir",
    addressLocality: "İstanbul",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0712,
    longitude: 28.7899,
  },
  areaServed: [
    { "@type": "Country", name: "Turkey" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "France" },
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
    maxValue: 200,
  },
  knowsAbout: [
    "Interior fit-out",
    "FF&E procurement",
    "Bespoke joinery",
    "Contract furniture manufacturing",
    "Fire-rated door systems",
    "Hospitality interior design",
    "Hotel fit-out",
    "Commercial interior fit-out",
    "Value engineering",
    "Turnkey interiors",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "ORWOOD Interior Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Design & Build",
          description:
            "One accountable team from first sketch to final handover — concept, technical detail, and on-site delivery.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "FF&E Procurement",
          description:
            "Furniture, fixtures and equipment — specified, sourced, and installed to the design intent.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Joinery & Manufacturing",
          description:
            "Bespoke joinery manufactured in owned İstanbul workshops — panelling, cabinetry, and architectural millwork.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fire Rated Door Systems",
          description:
            "Proprietary ORWOOD Doors — acoustic and fire-rated, engineered, tested, and manufactured as complete certified assemblies.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Contract Furniture",
          description:
            "Bespoke and series furniture for hospitality and commercial projects, produced in-house by Hi Mobilya.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interior Fit-Out",
          description:
            "Complete interior construction from shell to finish — partitions, ceilings, flooring, and M&E coordination.",
        },
      },
    ],
  },
  sameAs: site.social.map((s) => s.href),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "About ORWOOD İstanbul — Interior Fit-Out Contractor",
  description:
    "ORWOOD is an İstanbul-headquartered interior fit-out contractor — design, joinery, FF&E, and fire-rated doors manufactured in-house since 2004.",
  url: "https://orwood.com/istanbul",
  isPartOf: {
    "@type": "WebSite",
    name: "ORWOOD",
    url: "https://orwood.com",
  },
  about: {
    "@id": "https://orwood.com/#organization",
  },
};

export default function IstanbulPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <PageHeader
        eyebrow="Headquarters"
        title={
          <>
            Headquartered in İstanbul.
            <br />
            Delivering worldwide.
          </>
        }
        intro={istanbul.intro}
        meta={[
          { k: "Founded", v: "2004" },
          { k: "Headquarters", v: "İstanbul" },
          { k: "Projects", v: "200+" },
          { k: "Countries", v: "15" },
        ]}
      />

      {/* Story */}
      <section className="shell py-28 md:py-40">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Artwork
                  tone={4}
                  label="ORWOOD İstanbul headquarters and production campus"
                  className="h-full w-full"
                />
              </div>
            </Reveal>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-stone md:col-span-6 md:col-start-7 md:self-center">
            {istanbul.story.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing capabilities */}
      <section className="bg-sand">
        <div className="shell py-24 md:py-36">
          <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
            <Reveal mask>Three workshops, one standard</Reveal>
          </h2>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-lg text-stone">
              Furniture, joinery, and doors — designed, engineered, and
              manufactured under one roof in İstanbul. Owned facilities, our own
              teams.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-x-16 gap-y-14 md:mt-20 md:grid-cols-2">
            {istanbul.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.08}>
                <div className="border-t border-line pt-6">
                  <h3 className="text-2xl md:text-3xl">{c.title}</h3>
                  <p className="mt-4 max-w-md text-stone">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-walnut text-paper">
        <div className="shell py-24 md:py-32">
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div>
                  <div className="text-[clamp(2.6rem,5vw,4.4rem)] leading-none text-bone">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-4 max-w-[14ch] text-sm text-paper/70">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="shell py-28 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
              <Reveal mask>At a glance</Reveal>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {istanbul.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.04}>
                <div className="grid grid-cols-12 gap-4 border-b border-line py-5 first:border-t">
                  <span className="label col-span-5 text-stone">
                    {f.label}
                  </span>
                  <span className="col-span-7">{f.value}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why İstanbul */}
      <section className="bg-sand">
        <div className="shell py-24 md:py-36">
          <div className="max-w-4xl">
            <p className="text-[clamp(1.5rem,3vw,2.4rem)] leading-snug">
              <Reveal mask>
                İstanbul sits at the crossroads of Europe and the Gulf —
              </Reveal>
              <Reveal mask delay={0.05}>
                <span className="text-stone">
                  a city with deep craft traditions, modern production capacity,
                </span>
              </Reveal>
              <Reveal mask delay={0.1}>
                and direct access to every market where interiors are being
                built.
              </Reveal>
            </p>
            <Reveal delay={0.15}>
              <div className="mt-10">
                <ArrowLink href="/journal/why-istanbul-for-hospitality-fit-out-manufacturing">
                  Read: Why İstanbul for hospitality manufacturing
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA
        eyebrow="İstanbul Headquarters"
        title="Start a conversation"
        body="Whether you are building in the GCC, Türkiye, or Europe — the work begins here."
        cta="Get in touch"
      />
    </>
  );
}
