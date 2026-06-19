import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { ProjectCard } from "@/components/project-card";
import { CTA } from "@/components/cta";
import { sectors, projects } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((s) => s.id === slug);
  if (!sector) return {};
  return {
    title: `${sector.title} Interiors`,
    description: sector.lead,
    alternates: { canonical: `/industries/${sector.id}` },
  };
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const sector = sectors.find((s) => s.id === slug);
  if (!sector) notFound();

  const related = projects.filter((p) => p.sector === sector.title);

  const sectorJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${sector.title} Interior Fit-Out`,
    description: sector.lead,
    url: `https://orwood.com/industries/${sector.id}`,
    provider: {
      "@type": "Organization",
      name: "ORWOOD",
      url: "https://orwood.com",
      foundingDate: "2004",
    },
    ...(sector.id === "hospitality"
      ? {
          areaServed: [
            { "@type": "Country", name: "United Arab Emirates" },
            { "@type": "Country", name: "Qatar" },
            { "@type": "Country", name: "Saudi Arabia" },
            { "@type": "Country", name: "Turkey" },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Hospitality Fit-Out Services",
            itemListElement: sector.offer.map((o) => ({
              "@type": "Service",
              name: o,
            })),
          },
          subjectOf: related.map((p) => ({
            "@type": "CreativeWork",
            name: p.title,
            description: p.summary,
            locationCreated: p.location,
            url: `https://orwood.com/projects/${p.id}`,
          })),
        }
      : {}),
    serviceType: `${sector.title} interior fit-out`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sectorJsonLd) }}
      />
      <section className="shell pt-40 md:pt-52">
        <Reveal>
          <Link
            href="/industries"
            className="label inline-flex items-center gap-3 text-stone transition-colors hover:text-ink"
          >
            <span className="h-px w-8 bg-stone/50" />
            All industries
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <span className="label text-clay">Industries</span>
            <h1 className="mt-6 text-[clamp(2.8rem,7vw,6rem)] leading-[1.0]">
              <Reveal mask delay={0.05}>
                {sector.title}
              </Reveal>
            </h1>
          </div>
          <div className="self-end md:col-span-4">
            <Reveal delay={0.15}>
              <p className="text-pretty text-lg text-stone">{sector.lead}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal delay={0.15} className="mt-14 md:mt-20">
        <div className="relative h-[52vh] min-h-[380px] w-full overflow-hidden md:h-[72vh]">
          <Artwork
            tone={sector.tone}
            className="h-full w-full"
            label={sector.title}
          />
        </div>
      </Reveal>

      {/* What we deliver */}
      <section className="shell py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl md:text-4xl">
              <Reveal mask>What we deliver</Reveal>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ul>
              {sector.offer.map((o, i) => (
                <Reveal key={o} delay={i * 0.05}>
                  <li className="flex items-baseline gap-5 border-b border-line py-5 text-lg first:border-t">
                    <span className="label text-stone-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{o}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related work */}
      {related.length > 0 && (
        <section className="shell pb-24 md:pb-32">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)]">
            <Reveal mask>Selected {sector.title.toLowerCase()} work</Reveal>
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 md:gap-x-12 md:gap-y-20">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <CTA
        eyebrow={sector.title}
        title="Bring us your project."
        body="Tell us about the space and the date. We'll bring the studio, the workshops and the team to deliver it."
        cta="Start a project"
      />
    </>
  );
}
