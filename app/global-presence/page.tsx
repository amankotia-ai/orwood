import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { CTA } from "@/components/cta";
import { presence, projects, projectRegion } from "@/lib/content";

export const metadata: Metadata = {
  title: "Global Presence",
  description:
    "Designed and made in İstanbul, delivered across the GCC, Türkiye and Europe — interiors in 15 countries and counting.",
};

export default function GlobalPresencePage() {
  const countFor = (name: string) =>
    projects.filter((p) => projectRegion(p) === name).length;

  return (
    <>
      <PageHeader
        eyebrow="Global Presence"
        index="15 countries"
        title={
          <>
            Made in İstanbul.
            <br />
            Delivered worldwide.
          </>
        }
        intro={presence.intro}
        meta={[
          { k: "Countries", v: "15" },
          { k: "Projects", v: "200+" },
          { k: "Regions", v: "03" },
          { k: "Since", v: "2004" },
        ]}
      />

      {/* Map visual */}
      <Reveal>
        <div className="relative h-[44vh] min-h-[300px] w-full overflow-hidden md:h-[60vh]">
          <Artwork
            tone={4}
            className="h-full w-full"
            label="Regional operations — GCC · Türkiye · UK & Europe"
          />
        </div>
      </Reveal>

      {/* Regions */}
      <section className="shell py-24 md:py-32">
        {presence.regions.map((r, i) => (
          <Reveal key={r.id}>
            <div className="grid grid-cols-12 gap-6 border-t border-line py-12 last:border-b md:py-16">
              <div className="col-span-12 flex items-baseline gap-5 md:col-span-4">
                <span className="label text-clay">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)]">{r.name}</h2>
              </div>
              <div className="col-span-12 md:col-span-5">
                <p className="text-lg text-stone">{r.note}</p>
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-stone-soft">
                  {r.countries.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 md:text-right">
                <span className="label text-stone">Selected projects</span>
                <div className="mt-2 text-4xl tracking-[-0.02em]">
                  {countFor(r.name)}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <CTA
        eyebrow="Global Presence"
        title="Building outside our map?"
        body="We deliver wherever the work is. Tell us where, and what you're building."
        cta="Start a project"
      />
    </>
  );
}
