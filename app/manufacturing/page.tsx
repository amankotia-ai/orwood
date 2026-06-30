import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { CTA } from "@/components/cta";
import { DocumentRequestLink } from "@/components/document-request-link";
import { manufacturing, group, services, sectors, projects, resources, site } from "@/lib/content";

/* ── Metadata ───────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Joinery & Manufacturing: Bespoke Hotel Millwork",
  description:
    "Bespoke joinery and cabinetry, manufactured in-house at Hi Mobilya and finished with SILADU surfaces. Fire-rated compliance built in.",
  keywords: [
    "bespoke joinery hotel contractors",
    "hotel millwork suppliers",
    "custom cabinetry fit-out",
    "joinery and manufacturing",
    "hotel joinery contractor",
    "fire-rated joinery",
    "bespoke cabinetry hospitality",
    "millwork manufacturer Istanbul",
    "joinery contractor GCC",
    "ORWOOD joinery",
  ],
  alternates: { canonical: "/manufacturing" },
  openGraph: {
    title: "Joinery & Manufacturing: Bespoke Hotel Millwork",
    description:
      "Bespoke joinery and cabinetry, manufactured in-house at Hi Mobilya and finished with SILADU surfaces. Fire-rated compliance built in.",
    url: "https://orwood.com/manufacturing",
  },
};

/* ── Service Schema (JSON-LD) ──────────────────────────────── */

const joinery = services.find((s) => s.id === "joinery")!;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ORWOOD Joinery & Manufacturing",
  serviceType: "Joinery and Manufacturing",
  description:
    "Bespoke joinery, built-in cabinetry and millwork designed alongside the interior scheme and manufactured in-house at Hi Mobilya, with materials and surfaces from SILADU. Fire-rated joinery compliance is built in at the design stage, not retrofitted at certification.",
  provider: {
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
  audience: {
    "@type": "Audience",
    audienceType:
      "Hospitality groups, hotel owners, developers, architects, interior designers and procurement teams",
  },
  category: "Joinery and Millwork Manufacturing",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Joinery & Manufacturing capabilities",
    itemListElement: joinery.capabilities.map((c) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: c },
    })),
  },
};

/* ── Data ───────────────────────────────────────────────────── */

const industryIds = [
  "hospitality",
  "commercial",
  "residential",
  "retail",
  "food-beverage",
  "mixed-use",
];
const industries = industryIds
  .map((id) => sectors.find((s) => s.id === id))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

const joineryProjects = projects.filter((p) =>
  p.services.includes("Joinery & Manufacturing")
);

const iso9001 = resources.find((r) => r.id === "iso-9001-certificate")!;
const iso14001 = resources.find((r) => r.id === "iso-14001-certificate")!;
const fireTestReport = resources.find(
  (r) => r.id === "fire-test-report-fd30-fd60"
)!;
const pqqPack = resources.find((r) => r.id === "pqq-qualification-pack")!;

const whyCards = [
  {
    title: "Hospitality principals & developers",
    body: "Joinery anchors the guest experience and operational durability. Custom cabinetry in lobbies, suites, and back-of-house is built to withstand heavy use, designed to brand standards, and delivered on schedule as part of one accountable team.",
  },
  {
    title: "Architects & interior designers",
    body: "ORWOOD's in-house joinery capability removes the coordination burden. Materials and finishes are specified with direct access to Hi Mobilya manufacturing, so detail intent is preserved in production.",
  },
  {
    title: "Procurement teams",
    body: "The result is consolidation: one supplier, one invoice, one warranty, across custom joinery, materials, and installation.",
  },
];

/* ── Page ───────────────────────────────────────────────────── */

export default function ManufacturingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHeader
        title={
          <>
            Joinery &amp; Manufacturing.
            <br />
            Made, not just specified.
          </>
        }
        intro="Bespoke joinery and built-in cabinetry, designed alongside the interior scheme and manufactured in-house at Hi Mobilya, our İstanbul production facility."
        meta={[
          { k: "Workshops", v: "03" },
          { k: "Industries served", v: "06" },
          { k: "Countries", v: "15" },
          { k: "Since", v: "2004" },
        ]}
      />

      {/* Factory image */}
      <Reveal>
        <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden md:h-[70vh]">
          <Artwork
            tone={0}
            className="h-full w-full"
            label="Production facility — İkitelli, İstanbul"
          />
        </div>
      </Reveal>

      {/* What is Joinery & Manufacturing */}
      <section className="border-t border-line">
        <div className="shell grid gap-10 py-16 md:grid-cols-12 md:gap-8 md:py-24">
          <div className="md:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Artwork tone={3} className="h-full w-full" label="Joinery workshop" />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)]">
                The element that separates a finished room from an assembled one.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-lg text-stone">
                {joinery.body!.slice(0, 2).map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 border border-line bg-bone/40 p-5">
                <p className="label text-stone">No handoff, no margin stack</p>
                <p className="mt-2 text-sm text-stone">
                  {joinery.detail}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="border-t border-line bg-bone/30">
        <div className="shell py-16 md:py-24">
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)]">Scope</h2>
            <p className="mt-4 max-w-2xl text-lg text-stone">
              The full range of custom-built elements that form part of an interior fit-out, from a single fitted wardrobe to a multi-floor hotel millwork programme.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {joinery.capabilities.map((c) => (
              <Reveal key={c} delay={0.05}>
                <div className="border border-line bg-bone p-6 h-full">
                  <p className="text-base font-medium">{c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we manufacture */}
      <section className="border-t border-line">
        <div className="shell py-16 md:py-24">
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)]">How we manufacture</h2>
            <p className="mt-4 max-w-2xl text-lg text-stone">
              Owning our workshops is the difference between specifying a detail and guaranteeing it.
            </p>
          </Reveal>
          {manufacturing.capabilities.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={c.title}
                className="grid gap-8 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14"
              >
                <div
                  className={
                    flip
                      ? "self-center md:order-2 md:col-span-6 md:col-start-7"
                      : "self-center md:order-1 md:col-span-6"
                  }
                >
                  <span className="label text-stone">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl font-medium">{c.title}</h3>
                  <p className="mt-3 max-w-xl text-stone">{c.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Hi Mobilya & SILADU */}
      <section className="border-t border-line bg-bone/30">
        <div className="shell grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
              <Reveal mask>Hi Mobilya &amp; SILADU</Reveal>
            </h2>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xs text-stone">
                The two houses behind every piece of ORWOOD joinery.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {group
              .filter((g) => g.id === "hi-mobilya" || g.id === "siladu")
              .map((g, i) => (
                <Reveal key={g.id} delay={i * 0.06}>
                  <div className="grid grid-cols-12 gap-4 border-b border-line py-7 first:border-t">
                    <h3 className="col-span-12 text-xl md:col-span-4">{g.name}</h3>
                    <span className="label col-span-12 self-center text-stone md:col-span-3">
                      {g.role}
                    </span>
                    <p className="col-span-12 text-stone md:col-span-5">{g.note}</p>
                  </div>
                </Reveal>
              ))}
            <Reveal delay={0.15}>
              <p className="mt-8 text-stone">{joinery.body![2]}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/journal/material-specification-luxury-hotel-interiors"
                className="mt-4 inline-block label text-sm text-accent transition-colors hover:text-accent/70"
              >
                How materials are specified for luxury hotel interiors →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Industries we serve */}
      <section className="border-t border-line">
        <div className="shell py-16 md:py-24">
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)]">Industries we serve</h2>
            <p className="mt-4 max-w-2xl text-lg text-stone">
              ORWOOD joinery and millwork is delivered across six industries, from a hotel lobby to a private home.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.04}>
                <Link
                  href={`/industries/${s.id}`}
                  className="group block border border-line bg-bone p-6 h-full transition-colors hover:border-accent/40"
                >
                  <h3 className="text-lg font-medium group-hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-stone">{s.blurb}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fire compliance */}
      <section className="border-t border-line bg-bone/30">
        <div className="shell grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-4">
            <Reveal>
              <p className="label text-stone">Certifications &amp; qualification</p>
              <h2 className="mt-3 text-2xl md:text-3xl">Fire compliance, built in</h2>
              <p className="mt-4 text-stone">
                Fire-rated joinery is specified and tested for local building codes during design, not retrofitted during certification.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.05}>
              <ul className="divide-y divide-line border-y border-line">
                {[
                  { label: "ISO 9001:2015 — Quality Management", resource: iso9001 },
                  { label: "ISO 14001:2015 — Environmental Management", resource: iso14001 },
                  { label: "Fire Test Report — FD30 & FD60 Door Sets", resource: fireTestReport },
                  { label: "Pre-Qualification Questionnaire (PQQ) Pack", resource: pqqPack },
                ].map((doc) => (
                  <li
                    key={doc.label}
                    className="flex items-center justify-between gap-6 py-4"
                  >
                    <span className="text-sm">{doc.label}</span>
                    <DocumentRequestLink
                      href={`mailto:${site.email}?subject=Document request — ${doc.resource.title}`}
                      documentId={doc.resource.id}
                      documentTitle={doc.resource.title}
                      className="label shrink-0 text-sm text-accent transition-colors hover:text-accent/70"
                    >
                      Request {doc.resource.format}
                    </DocumentRequestLink>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <Link
                  href="/orwood-doors"
                  className="label text-accent transition-colors hover:text-accent/70"
                >
                  Fire-rated door systems →
                </Link>
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

      {/* Why ORWOOD joinery */}
      <section className="bg-walnut text-paper">
        <div className="shell py-28 md:py-40">
          <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3.6rem)] text-bone">
            <Reveal mask delay={0.05}>Why ORWOOD</Reveal>
            <Reveal mask delay={0.12}>joinery.</Reveal>
          </h2>
          <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {whyCards.map((item, i) => (
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

      {/* Project references */}
      {joineryProjects.length > 0 && (
        <section className="border-t border-line">
          <div className="shell py-16 md:py-24">
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3vw,2.6rem)]">Project references</h2>
              <p className="mt-4 max-w-2xl text-stone">
                {joinery.body![4]}
              </p>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {joineryProjects.map((p) => (
                <Reveal key={p.id} delay={0.05}>
                  <Link
                    href={`/projects/${p.id}`}
                    className="group block border border-line p-6 transition-colors hover:border-accent/40"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl font-medium group-hover:text-accent transition-colors">
                        {p.title}
                      </h3>
                      <span className="label shrink-0 text-stone">{p.location}</span>
                    </div>
                    <p className="mt-2 text-sm text-stone">{p.size}</p>
                    <p className="mt-4 text-sm text-stone">{p.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA
        eyebrow="Joinery & Manufacturing"
        title="Have something that needs making?"
        body="From a single signature piece to a full hotel's worth of joinery and millwork, bring us the drawings and the date."
        cta="Talk to our workshops"
        href="/contact?intent=joinery-manufacturing"
      />
    </>
  );
}
