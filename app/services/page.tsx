import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { CTA } from "@/components/cta";
import { DocumentRequestLink } from "@/components/document-request-link";
import { services, process, projects, resources, site } from "@/lib/content";
import { cn } from "@/lib/cn";

/** One named project reference per service block, where data supports it. */
const serviceReferences: Record<string, string> = {
  "design-build": "aram-hotel",
  ffe: "aram-hotel",
  "furniture-solutions": "northbank-hq",
  joinery: "maren-residence",
  doors: "cedar-house",
  "interior-fit-out": "solis-resort",
  "value-engineering": "northbank-hq",
  "project-management": "lumen-offices",
};

/** Cross-links to /industries sector pages per service. */
const serviceSectors: Record<string, { id: string; label: string }[]> = {
  "design-build": [
    { id: "hospitality", label: "Hospitality" },
    { id: "commercial", label: "Commercial" },
    { id: "mixed-use", label: "Mixed-use" },
  ],
  ffe: [
    { id: "hospitality", label: "Hospitality" },
    { id: "commercial", label: "Commercial" },
  ],
  doors: [
    { id: "hospitality", label: "Hospitality" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
  ],
  "interior-fit-out": [
    { id: "hospitality", label: "Hospitality" },
    { id: "commercial", label: "Commercial" },
    { id: "mixed-use", label: "Mixed-use" },
  ],
  "value-engineering": [
    { id: "hospitality", label: "Hospitality" },
    { id: "commercial", label: "Commercial" },
  ],
  "project-management": [
    { id: "hospitality", label: "Hospitality" },
    { id: "commercial", label: "Commercial" },
    { id: "mixed-use", label: "Mixed-use" },
  ],
  joinery: [
    { id: "hospitality", label: "Hospitality" },
    { id: "commercial", label: "Commercial" },
    { id: "residential", label: "Residential" },
    { id: "retail", label: "Retail" },
    { id: "food-beverage", label: "F&B" },
    { id: "mixed-use", label: "Mixed-use" },
  ],
};

const fireTestReport = resources.find(
  (r) => r.id === "fire-test-report-fd30-fd60"
)!;
const pqqPack = resources.find((r) => r.id === "pqq-qualification-pack")!;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design & Build, FF&E Procurement, Furniture Solutions, Joinery & Manufacturing, Fire Rated Doors, Interior Fit-Out, Value Engineering and Project Management — every discipline an interior needs, from our own workshops.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        index="08 disciplines"
        title={
          <>
            Everything an interior
            <br />
            needs — made, not outsourced.
          </>
        }
        intro="We hold design, manufacture and delivery in the same building — so the people who draw a detail are the people who make it."
        meta={[
          { k: "Disciplines", v: "08" },
          { k: "Workshops", v: "03" },
          { k: "Countries", v: "15" },
          { k: "Since", v: "2004" },
        ]}
      />

      <div className="shell">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={s.id}
              id={s.id}
              className="grid scroll-mt-28 gap-10 border-t border-line py-16 md:grid-cols-12 md:gap-8 md:py-24"
            >
              <div
                className={cn(
                  "md:col-span-5",
                  flip ? "md:order-2 md:col-start-8" : "md:order-1"
                )}
              >
                <Reveal>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Artwork tone={s.tone} className="h-full w-full" label={s.title} />
                  </div>
                </Reveal>
              </div>

              <div
                className={cn(
                  "md:col-span-6 md:row-span-1",
                  flip ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-7"
                )}
              >
                <div className="flex items-baseline gap-4">
                  <span className="label text-stone">{s.index}</span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)]">
                  <Reveal mask>{s.title}</Reveal>
                </h2>
                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-xl text-lg text-stone">{s.detail}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                    {s.capabilities.map((c) => (
                      <li
                        key={c}
                        className="flex items-center gap-3 border-t border-line-soft py-2.5 text-sm"
                      >
                        <span className="text-stone">+</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Residential-register callout — Furniture Solutions & Joinery */}
                {(s.id === "furniture-solutions" || s.id === "joinery") && (
                  <Reveal delay={0.2}>
                    <div className="mt-8 border border-line bg-bone/40 p-5">
                      <p className="label text-stone">Private &amp; residential</p>
                      <p className="mt-2 text-sm text-stone">
                        {s.id === "furniture-solutions"
                          ? "For private homes and branded residences, we work at a different register — bespoke, one-of-a-kind pieces, hand-finished to the tolerance of a made object rather than a production run."
                          : "In residential work, our joinery is finished like furniture — matched veneers, hand-fitted shadow gaps, and the close, quiet quality of a crafted object."}
                      </p>
                      <Link
                        href="/industries/residential"
                        className="mt-3 inline-block label text-sm text-accent transition-colors hover:text-accent/70"
                      >
                        See our residential work →
                      </Link>
                    </div>
                  </Reveal>
                )}

                {/* SILADU callout — Joinery */}
                {s.id === "joinery" && (
                  <Reveal delay={0.22}>
                    <div className="mt-6 border border-line bg-bone/40 p-5">
                      <p className="label text-stone">Materials &amp; surfaces</p>
                      <p className="mt-2 text-sm text-stone">
                        SILADU, our in-house materials and surfaces operation, handles veneer sourcing, surface development, and finish specification alongside the joinery floor. Design teams can test material feasibility against real production knowledge during design development, before the specification is fixed.
                      </p>
                      <Link
                        href="/journal/material-specification-luxury-hotel-interiors"
                        className="mt-3 inline-block label text-sm text-accent transition-colors hover:text-accent/70"
                      >
                        How materials are specified for luxury hotel interiors →
                      </Link>
                    </div>
                  </Reveal>
                )}

                {/* Certifications callout — Fire Rated Doors */}
                {s.id === "doors" && (
                  <Reveal delay={0.2}>
                    <div className="mt-8 border border-line bg-bone/40 p-5">
                      <p className="label text-stone">Certifications &amp; qualification</p>
                      <p className="mt-2 text-sm text-stone">
                        Tested to BS EN 1634-1 &amp; BS EN ISO 10140. FD30 / FD60 integrity ratings, Rw 32–38 dB acoustic performance.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                        <Link
                          href="/orwood-doors"
                          className="label text-sm text-accent transition-colors hover:text-accent/70"
                        >
                          ORWOOD Doors — full product page →
                        </Link>
                        <DocumentRequestLink
                          href={`mailto:${site.email}?subject=Document request — ${fireTestReport.title}`}
                          documentId={fireTestReport.id}
                          documentTitle={fireTestReport.title}
                          className="label text-sm text-accent transition-colors hover:text-accent/70"
                        >
                          Request fire test report ↗
                        </DocumentRequestLink>
                        <DocumentRequestLink
                          href={`mailto:${site.email}?subject=Document request — ${pqqPack.title}`}
                          documentId={pqqPack.id}
                          documentTitle={pqqPack.title}
                          className="label text-sm text-accent transition-colors hover:text-accent/70"
                        >
                          Request PQQ pack ↗
                        </DocumentRequestLink>
                        <Link
                          href="/resources"
                          className="label text-sm text-ink underline-offset-4 transition-colors hover:text-clay hover:underline"
                        >
                          All downloads
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Certifications callout — Interior Fit-Out */}
                {s.id === "interior-fit-out" && (
                  <Reveal delay={0.2}>
                    <div className="mt-8 border border-line bg-bone/40 p-5">
                      <p className="label text-stone">Certifications &amp; qualification</p>
                      <p className="mt-2 text-sm text-stone">
                        ISO 9001:2015 quality management and ISO 14001:2015 environmental management certified. Fire-rated and acoustic door sets installed as part of our fit-out scope are tested to BS EN 1634-1.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                        <DocumentRequestLink
                          href={`mailto:${site.email}?subject=Document request — ${pqqPack.title}`}
                          documentId={pqqPack.id}
                          documentTitle={pqqPack.title}
                          className="label text-sm text-accent transition-colors hover:text-accent/70"
                        >
                          Request PQQ pack ↗
                        </DocumentRequestLink>
                        <Link
                          href="/resources"
                          className="label text-sm text-ink underline-offset-4 transition-colors hover:text-clay hover:underline"
                        >
                          All downloads
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Named project reference with scope/scale */}
                {(() => {
                  const refId = serviceReferences[s.id];
                  const ref = refId
                    ? projects.find((p) => p.id === refId && p.referenceAvailable)
                    : undefined;
                  if (!ref) return null;
                  return (
                    <Reveal delay={0.22}>
                      <p className="mt-6 text-sm text-stone">
                        <span className="text-ink">Reference:</span>{" "}
                        <Link
                          href={`/projects/${ref.id}`}
                          className="underline underline-offset-4 transition-colors hover:text-clay"
                        >
                          {ref.title}
                        </Link>
                        {" — "}
                        {ref.size} · {ref.location}, {ref.year}
                      </p>
                    </Reveal>
                  );
                })()}

                {/* Cross-links to relevant /industries sector pages */}
                {serviceSectors[s.id] && (
                  <Reveal delay={0.25}>
                    <p className="mt-4 text-sm text-stone">
                      <span className="text-ink">See this in:</span>{" "}
                      {serviceSectors[s.id].map((sector, idx) => (
                        <span key={sector.id}>
                          {idx > 0 && ", "}
                          <Link
                            href={`/industries/${sector.id}`}
                            className="underline underline-offset-4 transition-colors hover:text-clay"
                          >
                            {sector.label}
                          </Link>
                        </span>
                      ))}
                    </p>
                  </Reveal>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* Process */}
      <section className="mt-8 bg-walnut text-paper">
        <div className="shell py-28 md:py-40">
          <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3.6rem)] text-bone">
            <Reveal mask delay={0.05}>From a brief to a</Reveal>
            <Reveal mask delay={0.12}>finished room.</Reveal>
          </h2>

          <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.index} delay={i * 0.08}>
                <div className="border-t border-line-inv pt-5">
                  <span className="label text-bone/60">{p.index}</span>
                  <h3 className="mt-4 font-serif text-2xl text-bone">{p.title}</h3>
                  <p className="mt-3 text-paper/70">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Downloads — page-level qualification strip */}
      <section className="border-t border-line">
        <div className="shell grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-4">
            <Reveal>
              <p className="label text-stone">Certifications &amp; downloads</p>
              <h2 className="mt-3 text-2xl md:text-3xl">
                Qualification documents
              </h2>
              <p className="mt-4 text-stone">
                ISO-certified, independently tested, and ready for your
                pre-qualification process.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.05}>
              <ul className="divide-y divide-line border-y border-line">
                {[
                  {
                    label: "ISO 9001:2015 — Quality Management",
                    id: "iso-9001-certificate",
                  },
                  {
                    label: "ISO 14001:2015 — Environmental Management",
                    id: "iso-14001-certificate",
                  },
                  {
                    label: "Fire Test Report — FD30 & FD60 Door Sets",
                    id: "fire-test-report-fd30-fd60",
                  },
                  {
                    label: "Pre-Qualification Questionnaire (PQQ) Pack",
                    id: "pqq-qualification-pack",
                  },
                ].map((doc) => {
                  const r = resources.find((res) => res.id === doc.id);
                  return (
                    <li
                      key={doc.id}
                      className="flex items-center justify-between gap-6 py-4"
                    >
                      <span className="text-sm">{doc.label}</span>
                      {r && (
                        <DocumentRequestLink
                          href={`mailto:${site.email}?subject=Document request — ${r.title}`}
                          documentId={r.id}
                          documentTitle={r.title}
                          className="label shrink-0 text-sm text-accent transition-colors hover:text-accent/70"
                        >
                          Request {r.format}
                        </DocumentRequestLink>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-6">
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

      <CTA
        eyebrow="Services"
        title="Not sure which scope you need?"
        body="Tell us about your project — whether it's a hotel opening, a headquarters move-in, or a private home. We'll help you shape the brief and the right mix of disciplines."
        cta="Talk to us"
      />
    </>
  );
}
