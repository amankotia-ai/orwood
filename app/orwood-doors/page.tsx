import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { CTA } from "@/components/cta";
import { resources, projects, site } from "@/lib/content";

/* ── Metadata ───────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "ORWOOD Doors — Fire Rated & Acoustic Door Systems",
  description:
    "ORWOOD Doors is a proprietary fire-rated and acoustic door system manufactured in Istanbul. BS EN 1634-1 and BS EN ISO 10140 certified, FD30/FD60 integrity, Rw 32–38 dB. Complete door sets — leaf, frame, seals and hardware — delivered as certified assemblies for hospitality, commercial and residential projects across the Middle East, GCC, Turkey and Europe.",
  keywords: [
    "fire rated doors",
    "fire rated door manufacturer",
    "acoustic door sets",
    "fire rated doors Middle East",
    "fire rated doors UAE",
    "fire rated doors Dubai",
    "BS EN 1634-1 certified doors",
    "FD30 FD60 doors",
    "hotel fire rated doors",
    "ORWOOD Doors",
    "fire door manufacturer Turkey",
    "acoustic fire rated door sets GCC",
  ],
  openGraph: {
    title: "ORWOOD Doors — Fire Rated & Acoustic Door Systems",
    description:
      "Proprietary fire-rated and acoustic door sets, manufactured in Istanbul, certified to BS EN 1634-1 and BS EN ISO 10140. FD30/FD60 integrity, Rw 32–38 dB. Delivered as complete assemblies for hospitality, commercial and residential projects.",
    url: "https://orwood.com/orwood-doors",
  },
};

/* ── Product Schema (JSON-LD) ───────────────────────────────── */

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "ORWOOD Doors — Fire Rated & Acoustic Door System",
  description:
    "Proprietary fire-rated and acoustic door sets manufactured by ORWOOD in Istanbul, Turkey. Certified to BS EN 1634-1 (fire resistance) and BS EN ISO 10140 (acoustic performance). Available in FD30 and FD60 configurations with Rw 32–38 dB sound reduction. Complete assemblies: leaf, frame, intumescent seals, and specified hardware.",
  brand: {
    "@type": "Brand",
    name: "ORWOOD Doors",
  },
  manufacturer: {
    "@type": "Organization",
    name: "ORWOOD",
    url: "https://orwood.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "İkitelli OSB, Başakşehir",
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
    foundingDate: "2004",
  },
  category: "Fire Rated Door Systems",
  material: "Timber, veneer, lacquer, composite core, intumescent seals",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Fire Rating",
      value: "FD30 (30-minute integrity) / FD60 (60-minute integrity)",
    },
    {
      "@type": "PropertyValue",
      name: "Fire Test Standard",
      value: "BS EN 1634-1 — Fire resistance tests for door and shutter assemblies",
    },
    {
      "@type": "PropertyValue",
      name: "Acoustic Performance",
      value: "Rw 32–38 dB weighted sound reduction index",
    },
    {
      "@type": "PropertyValue",
      name: "Acoustic Test Standard",
      value: "BS EN ISO 10140 — Laboratory measurement of sound insulation",
    },
    {
      "@type": "PropertyValue",
      name: "Additional Fire Standard",
      value: "BS 476-22 — Fire resistance tests for non-loadbearing elements",
    },
    {
      "@type": "PropertyValue",
      name: "Assembly Components",
      value: "Door leaf, frame, intumescent seals, hinges, closer, lock, glazing (optional)",
    },
    {
      "@type": "PropertyValue",
      name: "Finish Options",
      value: "Veneer-matched, lacquer, laminate — matched to adjacent joinery and millwork",
    },
    {
      "@type": "PropertyValue",
      name: "Manufacturing Location",
      value: "İstanbul, Turkey",
    },
    {
      "@type": "PropertyValue",
      name: "Markets Served",
      value: "GCC (UAE, Qatar, Saudi Arabia, Kuwait, Bahrain, Oman), Turkey, UK, Europe",
    },
    {
      "@type": "PropertyValue",
      name: "Quality Management",
      value: "ISO 9001:2015",
    },
    {
      "@type": "PropertyValue",
      name: "Environmental Management",
      value: "ISO 14001:2015",
    },
  ],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      description: "Project-based pricing — contact for quotation",
    },
    areaServed: [
      { "@type": "Place", name: "United Arab Emirates" },
      { "@type": "Place", name: "Qatar" },
      { "@type": "Place", name: "Saudi Arabia" },
      { "@type": "Place", name: "Turkey" },
      { "@type": "Place", name: "United Kingdom" },
      { "@type": "Place", name: "Europe" },
    ],
  },
  hasEnergyConsumptionDetails: undefined,
};

/* ── Data ───────────────────────────────────────────────────── */

const fireTestReport = resources.find(
  (r) => r.id === "fire-test-report-fd30-fd60"
)!;
const acousticReport = resources.find(
  (r) => r.id === "acoustic-test-report"
)!;
const productDatasheet = resources.find(
  (r) => r.id === "product-datasheet-fire-doors"
)!;
const pqqPack = resources.find(
  (r) => r.id === "pqq-qualification-pack"
)!;

const doorProjects = projects.filter(
  (p) => p.services.includes("Fire Rated Doors")
);

const certifications = [
  {
    standard: "BS EN 1634-1",
    scope: "Fire resistance — door and shutter assemblies",
    detail: "FD30 (30-minute) and FD60 (60-minute) integrity ratings, tested as complete assemblies including leaf, frame, seals and hardware.",
  },
  {
    standard: "BS EN ISO 10140",
    scope: "Acoustic performance — laboratory measurement",
    detail: "Rw 32–38 dB weighted sound reduction index, measured on the complete door set as installed.",
  },
  {
    standard: "BS 476-22",
    scope: "Fire resistance — non-loadbearing elements",
    detail: "Complementary fire performance data for configurations requiring British Standard assessment.",
  },
  {
    standard: "ISO 9001:2015",
    scope: "Quality management",
    detail: "Covers design, manufacture, and installation of interior fit-out, joinery, and door systems.",
  },
  {
    standard: "ISO 14001:2015",
    scope: "Environmental management",
    detail: "Sustainable manufacturing and site operations across all ORWOOD production facilities.",
  },
];

const specifications = [
  { label: "Fire ratings", value: "FD30 · FD60" },
  { label: "Acoustic performance", value: "Rw 32–38 dB" },
  { label: "Leaf construction", value: "Solid core, composite or timber" },
  { label: "Frame", value: "Timber or steel-reinforced timber" },
  { label: "Seals", value: "Intumescent and smoke seals, factory-fitted" },
  { label: "Finishes", value: "Veneer, lacquer, laminate — matched to millwork" },
  { label: "Glazing", value: "Fire-rated vision panels, optional" },
  { label: "Hardware", value: "Hinges, closer, lock — specified per project" },
  { label: "Max leaf height", value: "Up to 2,400 mm" },
  { label: "Max leaf width", value: "Up to 1,100 mm" },
];

/* ── Page ───────────────────────────────────────────────────── */

export default function OrwoodDoorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <PageHeader
        title={
          <>
            ORWOOD Doors
          </>
        }
        intro="A proprietary fire-rated and acoustic door system — engineered as a product, manufactured as a complete certified assembly, and finished to match the interior it belongs to."
        meta={[
          { k: "Fire ratings", v: "FD30 · FD60" },
          { k: "Acoustic", v: "Rw 32–38 dB" },
          { k: "Standards", v: "BS EN 1634-1 · BS EN ISO 10140" },
          { k: "Made in", v: "İstanbul" },
        ]}
      />

      {/* ── What is ORWOOD Doors ─────────────────────────────── */}
      <section className="border-t border-line">
        <div className="shell grid gap-10 py-16 md:grid-cols-12 md:gap-8 md:py-24">
          <div className="md:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Artwork tone={4} className="h-full w-full" label="ORWOOD Doors" />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)]">
                A complete door system,<br />not a collection of parts.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-lg text-stone">
                <p>
                  ORWOOD Doors is a dedicated product line within the ORWOOD group — a proprietary acoustic and fire-rated door system designed, engineered, and manufactured in our Istanbul production facilities. Every assembly — leaf, frame, intumescent seals, and specified hardware — is produced, tested, and delivered as a single certified unit.
                </p>
                <p>
                  Unlike assemblies sourced from multiple suppliers, an ORWOOD door set is tested in the exact configuration it ships in. The test report covers the assembly as built, not a theoretical combination of parts from different factories. When the authority reviews the documentation, the installed product matches the tested product.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 border border-line bg-bone/40 p-5">
                <p className="label text-stone">Single-source accountability</p>
                <p className="mt-2 text-sm text-stone">
                  Leaf, frame, seals and hardware from one manufacturer. One test report. One team responsible for the assembly as a whole — not five suppliers pointing at each other when the fire authority asks for documentation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Certifications & Standards ───────────────────────── */}
      <section className="border-t border-line bg-bone/30">
        <div className="shell py-16 md:py-24">
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)]">
              Certifications &amp; test standards
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-stone">
              Every ORWOOD door set is tested to international fire and acoustic standards. Certification covers the complete assembly, not individual components.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <Reveal key={cert.standard} delay={0.05}>
                <div className="border border-line bg-bone p-6 h-full">
                  <p className="text-xl font-medium">{cert.standard}</p>
                  <p className="label mt-2 text-stone">{cert.scope}</p>
                  <p className="mt-4 text-sm text-stone">{cert.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Specifications ─────────────────────────── */}
      <section className="border-t border-line">
        <div className="shell grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-4">
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3vw,2.6rem)]">
                Technical specifications
              </h2>
              <p className="mt-4 text-stone">
                Standard configurations for hospitality, commercial and residential projects. Bespoke dimensions and finishes available on request.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.05}>
              <dl className="divide-y divide-line border-y border-line">
                {specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-6 py-4"
                  >
                    <dt className="text-sm text-stone">{spec.label}</dt>
                    <dd className="text-sm font-medium text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Why it matters ───────────────────────────────────── */}
      <section className="bg-walnut text-paper">
        <div className="shell py-28 md:py-40">
          <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3.6rem)] text-bone">
            <Reveal mask delay={0.05}>Why single-source</Reveal>
            <Reveal mask delay={0.12}>door sets matter.</Reveal>
          </h2>
          <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {[
              {
                title: "Certification that travels",
                body: "A door set tested as a complete assembly carries its certification across jurisdictions — GCC, UK, Europe. No re-sourcing, no re-approval market by market.",
              },
              {
                title: "Programme protection",
                body: "One manufacturer, one production schedule. When the base build slips, we re-sequence production in one decision — not five separate negotiations with five suppliers.",
              },
              {
                title: "Finish-matched to the interior",
                body: "ORWOOD door sets are veneer-matched to the adjacent millwork using the same stock, by the same finishing team. The performance never shows — the door reads as joinery.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="border-t border-line-inv pt-5">
                  <h3 className="font-serif text-2xl text-bone">{item.title}</h3>
                  <p className="mt-3 text-paper/70">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project references ───────────────────────────────── */}
      {doorProjects.length > 0 && (
        <section className="border-t border-line">
          <div className="shell py-16 md:py-24">
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3vw,2.6rem)]">
                Project references
              </h2>
              <p className="mt-4 max-w-2xl text-stone">
                ORWOOD Doors installed across hospitality, commercial and residential projects.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {doorProjects.map((p) => (
                <Reveal key={p.id} delay={0.05}>
                  <Link
                    href={`/projects/${p.id}`}
                    className="group block border border-line p-6 transition-colors hover:border-accent/40"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl font-medium group-hover:text-accent transition-colors">
                        {p.title}
                      </h3>
                      <span className="label shrink-0 text-stone">
                        {p.location}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-stone">{p.size}</p>
                    {p.fireRating && (
                      <p className="mt-3 text-sm">
                        <span className="text-stone">Fire rating:</span>{" "}
                        {p.fireRating}
                      </p>
                    )}
                    {p.acousticRating && (
                      <p className="mt-1 text-sm">
                        <span className="text-stone">Acoustic:</span>{" "}
                        {p.acousticRating}
                      </p>
                    )}
                    <p className="mt-4 text-sm text-stone">{p.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Downloads & Documents ────────────────────────────── */}
      <section className="border-t border-line bg-bone/30">
        <div className="shell grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-4">
            <Reveal>
              <p className="label text-stone">Technical documents</p>
              <h2 className="mt-3 text-2xl md:text-3xl">
                Specification &amp; certification
              </h2>
              <p className="mt-4 text-stone">
                Request test reports, technical datasheets and qualification documents for your tender or pre-qualification process.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.05}>
              <ul className="divide-y divide-line border-y border-line">
                {[
                  {
                    label: "Fire Test Report — FD30 & FD60 Door Sets",
                    resource: fireTestReport,
                  },
                  {
                    label: "Acoustic Performance Report — BS EN ISO 10140",
                    resource: acousticReport,
                  },
                  {
                    label: "Product Datasheet — Fire Rated Doors",
                    resource: productDatasheet,
                  },
                  {
                    label: "Pre-Qualification Questionnaire (PQQ) Pack",
                    resource: pqqPack,
                  },
                ].map((doc) => (
                  <li
                    key={doc.label}
                    className="flex items-center justify-between gap-6 py-4"
                  >
                    <span className="text-sm">{doc.label}</span>
                    <a
                      href={`mailto:${site.email}?subject=Document request — ${doc.resource.title}`}
                      className="label shrink-0 text-sm text-accent transition-colors hover:text-accent/70"
                    >
                      Request {doc.resource.format}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href="/resources"
                  className="label text-ink underline-offset-4 transition-colors hover:text-clay hover:underline"
                >
                  View all resources &amp; downloads
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Markets served ───────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="shell grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3vw,2.6rem)]">
                Markets &amp; delivery
              </h2>
              <p className="mt-4 text-stone">
                Manufactured in İstanbul and delivered to project sites across the GCC, Turkey, UK and Europe. Direct shipping to the Middle East in days, not weeks.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.05}>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {[
                  { region: "GCC", markets: "UAE · Qatar · Saudi Arabia · Kuwait · Bahrain · Oman" },
                  { region: "Türkiye", markets: "Istanbul production base" },
                  { region: "UK & Europe", markets: "United Kingdom · Germany · France" },
                ].map((r) => (
                  <div key={r.region} className="border-t border-line pt-4">
                    <p className="label text-stone">{r.region}</p>
                    <p className="mt-2 text-sm">{r.markets}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA
        eyebrow="ORWOOD Doors"
        title="Specify ORWOOD Doors for your next project."
        body="Tell us about your project — key count, fire rating requirements, and programme. We will provide a specification, test documentation, and a quotation for certified door sets delivered to site."
        cta="Request a specification"
        href="/contact?intent=fire-rated-doors"
      />
    </>
  );
}
