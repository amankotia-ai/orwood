import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { StatCounter } from "@/components/stat-counter";
import { CTA } from "@/components/cta";
import { ArrowLink } from "@/components/ui/button";
import {
  values,
  stats,
  group,
  site,
  vision,
  mission,
  leadership,
  sustainability,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Twenty years of interior fit-out. ORWOOD designs, manufactures and delivers from three owned workshops — one team, one standard, every project.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            To be a part of
            <br />
            every project.
          </>
        }
        intro="ORWOOD began as a workshop and grew into a global fit-out house — without ever letting go of the bench."
        meta={[
          { k: "Founded", v: "2004" },
          { k: "Projects", v: "200+" },
          { k: "Countries", v: "15" },
          { k: "Workshops", v: "03" },
        ]}
      />

      {/* Story */}
      <section className="shell py-28 md:py-40">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Artwork tone={5} label="The workshop" className="h-full w-full" />
              </div>
            </Reveal>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-stone md:col-span-6 md:col-start-7 md:self-center">
            <Reveal delay={0.05}>
              <p>
                We started in {site.since} with a small joinery shop and a simple
                idea: the people who design an interior should be close enough to
                smell the sawdust. Two decades later, that idea still runs the
                company.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Today ORWOOD delivers complete interiors — design, joinery,
                contract furniture, doors and FF&amp;E — for hospitality,
                commercial and residential clients in fifteen countries. What
                hasn&apos;t changed is the workshop at the centre of it all.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-2xl leading-snug text-ink">
                &ldquo;{site.promise}&rdquo; isn&apos;t a slogan. It&apos;s how we
                decide what to take on.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-sand">
        <div className="shell grid gap-12 py-24 md:grid-cols-2 md:gap-16 md:py-36">
          <Reveal>
            <span className="label text-clay">Our vision</span>
            <p className="mt-6 text-[clamp(1.5rem,2.6vw,2.1rem)] leading-snug">
              {vision}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="label text-clay">Our mission</span>
            <p className="mt-6 text-[clamp(1.5rem,2.6vw,2.1rem)] leading-snug">
              {mission}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="shell py-28 md:py-40">
        <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
          <Reveal mask>What we believe</Reveal>
        </h2>
        <div className="mt-14 grid gap-x-16 gap-y-14 md:mt-20 md:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.index} delay={(i % 2) * 0.08}>
              <div className="border-t border-line pt-6">
                <h3 className="text-2xl md:text-3xl">{v.title}</h3>
                <p className="mt-4 max-w-md text-stone">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="shell py-28 md:py-40">
        <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
          <Reveal mask>Leadership</Reveal>
        </h2>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-lg text-stone">
            The people who set the standard — each close enough to the work to
            check it themselves.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-x-12 gap-y-16 md:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((l, i) => (
            <Reveal key={l.id} delay={(i % 4) * 0.06}>
              <div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  {l.portrait ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={l.portrait}
                      alt={l.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Artwork
                      tone={l.tone}
                      label={l.name}
                      className="h-full w-full"
                    />
                  )}
                </div>
                <div className="mt-5">
                  <h3 className="text-xl">{l.name}</h3>
                  <p className="label mt-1 text-clay">{l.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-stone">
                    {l.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
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

      {/* Group */}
      <section className="shell py-28 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
              <Reveal mask>The group</Reveal>
            </h2>
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

      {/* Sustainability */}
      <section className="shell py-28 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
              <Reveal mask>Sustainability</Reveal>
            </h2>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-sm text-stone">{sustainability.intro}</p>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            {sustainability.points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="border-t border-line py-6">
                  <h3 className="text-xl">{p.title}</h3>
                  <p className="mt-3 text-stone">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="bg-sand">
        <div className="shell py-24 md:py-36">
          <div className="max-w-4xl">
            <p className="text-[clamp(1.5rem,3vw,2.4rem)] leading-snug">
              <Reveal mask>Every project runs to a documented method —</Reveal>
              <Reveal mask delay={0.05}>
                <span className="text-stone">
                  inspected at the bench, on the line and on site,
                </span>
              </Reveal>
              <Reveal mask delay={0.1}>
                so the tenth year looks like the first.
              </Reveal>
            </p>
            <Reveal delay={0.15}>
              <div className="mt-10">
                <ArrowLink href="/contact">
                  Request our method statement
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
