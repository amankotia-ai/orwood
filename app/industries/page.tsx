import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { CTA } from "@/components/cta";
import { Arrow } from "@/components/ui/button";
import { sectors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Hospitality, commercial, residential, retail, F&B and mixed-use — interiors designed, manufactured and delivered by one accountable team.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        index="06 sectors"
        title={
          <>
            Sectors we
            <br />
            build for.
          </>
        }
        intro="Every interior we make is engineered for the way its space is used — from a 300-key hotel to a single private residence."
        meta={[
          { k: "Sectors", v: "06" },
          { k: "Countries", v: "15" },
          { k: "Projects", v: "200+" },
          { k: "Since", v: "2004" },
        ]}
      />

      <div className="shell pb-24 md:pb-32">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 md:gap-x-12 md:gap-y-20">
          {sectors.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 0.06}>
              <Link href={`/industries/${s.id}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Artwork
                    tone={s.tone}
                    className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    label={s.title}
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h2 className="text-3xl tracking-[-0.01em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 md:text-4xl">
                    {s.title}
                  </h2>
                  <Arrow className="shrink-0 -translate-x-2 text-stone opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100" />
                </div>
                <p className="mt-3 max-w-xl text-stone">{s.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <CTA
        eyebrow="Industries"
        title="Building in one of these sectors?"
        body="Tell us about the space and the date. We'll bring the studio, the workshops and the team to deliver it."
        cta="Start a project"
      />
    </>
  );
}
