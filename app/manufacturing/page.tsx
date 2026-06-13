import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { CTA } from "@/components/cta";
import { manufacturing, group } from "@/lib/content";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Manufacturing & Joinery",
  description:
    "ORWOOD owns its workshops — CNC technology, production facilities, quality control, material expertise and joinery, all in-house.",
};

export default function ManufacturingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Manufacturing & Joinery"
        index="In-house production"
        title={
          <>
            We don&apos;t just specify it.
            <br />
            We make it.
          </>
        }
        intro="Furniture, joinery and doors are engineered, made, tested and finished in our own workshops — so quality and programme stay in our hands."
        meta={[
          { k: "Workshops", v: "03" },
          { k: "Items / year", v: "50K" },
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

      {/* Intro */}
      <section className="shell py-24 md:py-36">
        <Reveal className="max-w-4xl">
          <p className="text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.28] tracking-[-0.01em]">
            {manufacturing.intro}
          </p>
        </Reveal>
      </section>

      {/* Capabilities */}
      <section className="shell pb-8 md:pb-16">
        {manufacturing.capabilities.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={c.title}
              className="grid gap-8 border-t border-line py-14 md:grid-cols-12 md:gap-8 md:py-20"
            >
              <div
                className={cn(
                  "md:col-span-5",
                  flip ? "md:order-2 md:col-start-8" : "md:order-1"
                )}
              >
                <Reveal>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Artwork
                      tone={c.tone}
                      className="h-full w-full"
                      label={c.title}
                    />
                  </div>
                </Reveal>
              </div>
              <div
                className={cn(
                  "self-center md:col-span-6",
                  flip ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-7"
                )}
              >
                <span className="label text-stone">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 text-[clamp(1.8rem,3.5vw,2.8rem)]">
                  <Reveal mask>{c.title}</Reveal>
                </h2>
                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-xl text-lg text-stone">{c.body}</p>
                </Reveal>
              </div>
            </div>
          );
        })}
      </section>

      {/* The group */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
              <Reveal mask>The group</Reveal>
            </h2>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xs text-stone">
                Three specialist houses behind every ORWOOD interior.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {group.map((g, i) => (
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
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Manufacturing & Joinery"
        title="Have something that needs making?"
        body="From a single signature piece to a full hotel's worth of furniture and joinery — bring us the drawings."
        cta="Talk to our workshops"
      />
    </>
  );
}
