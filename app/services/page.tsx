import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { CTA } from "@/components/cta";
import { services, process } from "@/lib/content";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design & Build, FF&E Procurement, Furniture Solutions, Joinery & Manufacturing, Fire Rated Doors, Interior Fit-Out, Value Engineering and Project Management — every discipline an interior needs, under one roof.",
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
            needs, under one roof.
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
                  <span className="label text-stone-soft">{p.index}</span>
                  <h3 className="mt-4 font-serif text-2xl text-bone">{p.title}</h3>
                  <p className="mt-3 text-paper/70">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Services"
        title="Not sure which scope you need?"
        body="Tell us about the space and the date. We'll help you shape the brief and the right mix of disciplines."
        cta="Talk to us"
      />
    </>
  );
}
