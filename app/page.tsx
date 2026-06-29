import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { StatCounter } from "@/components/stat-counter";
import { ProjectCard } from "@/components/project-card";
import { CTA } from "@/components/cta";
import { Button, ArrowLink, Arrow } from "@/components/ui/button";
import {
  projects,
  sectors,
  services,
  stats,
  group,
  site,
  manufacturing,
  process,
  presence,
  testimonials,
  clients,
} from "@/lib/content";
import { cn } from "@/lib/cn";

export default function HomePage() {
  const lead = projects[0];

  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="pt-32 md:pt-40">
        <div className="shell">
          <Reveal>
            <span suppressHydrationWarning className="label inline-flex items-center gap-3 text-stone">
              Global interior fit-out · since {site.since}
            </span>
          </Reveal>

          <h1 data-pano="hero-headline" className="mt-10 max-w-5xl text-[clamp(2.2rem,6vw,5rem)] leading-[1.05] tracking-[-0.03em]">
            <Reveal mask delay={0.05}>We finish &amp; furnish</Reveal>
            <Reveal mask delay={0.12}>spaces worth remembering.</Reveal>
          </h1>

          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal delay={0.25}>
              <p data-pano="hero-subhead" className="max-w-md text-stone">
                A design-and-build atelier where concept, joinery, furniture and
                FF&amp;E are delivered as one project — in {stats[2].value}{" "}
                countries and counting.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div data-pano="cta-button">
                <Button href="/contact">Bring us the brief</Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* full-bleed hero image */}
        <Reveal delay={0.15} className="mt-20 md:mt-32">
          <div className="relative h-[64vh] min-h-[440px] w-full overflow-hidden md:h-[88vh]">
            <Artwork
              tone={0}
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80&auto=format&fit=crop"
              className="h-full w-full"
              label="The Aram Hotel — Hospitality · Doha"
            />
          </div>
        </Reveal>
      </section>

      {/* ─────────────────── Positioning statement ─────────────────── */}
      <section className="shell py-32 md:py-56">
        <Reveal className="max-w-5xl">
          <p data-pano="positioning-statement" className="text-[clamp(1.6rem,3.3vw,2.9rem)] leading-[1.22] tracking-[-0.01em]">
            For two decades, ORWOOD has built interiors for the people who build
            everything else — hotels, headquarters and homes across fifteen
            countries. Three workshops. One project team. Every detail designed, made and delivered — not outsourced.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12">
            <ArrowLink href="/about">Read our story</ArrowLink>
          </div>
        </Reveal>
      </section>

      {/* ─────────────────── Featured work ─────────────────── */}
      <section className="pb-32 md:pb-56">
        <div className="shell flex items-end justify-between">
          <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
            <Reveal mask>Selected work</Reveal>
          </h2>
          <ArrowLink href="/projects" className="hidden md:inline-flex">
            All projects
          </ArrowLink>
        </div>

        {/* large lead project */}
        <Reveal className="mt-14 md:mt-20">
          <Link href={`/projects/${lead.id}`} className="group block">
            <div className="relative h-[58vh] min-h-[380px] w-full overflow-hidden md:h-[84vh]">
              <Artwork
                tone={lead.tone}
                src={lead.image}
                className="h-full w-full"
                label={`${lead.sector} · ${lead.location}`}
              />
            </div>
            <div className="shell mt-6 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-2xl tracking-[-0.02em] md:text-4xl">
                {lead.title}
              </h3>
              <span className="label text-stone">
                {lead.scope} — {lead.year}
              </span>
            </div>
          </Link>
        </Reveal>

        {/* two-up */}
        <div className="shell mt-20 grid gap-x-8 gap-y-16 md:mt-28 md:grid-cols-2 md:gap-x-12">
          {projects.slice(1, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <div className="shell mt-12 md:hidden">
          <ArrowLink href="/projects">All projects</ArrowLink>
        </div>
      </section>

      {/* ───────────────── Sectors — editorial rows ───────────────── */}
      <section className="shell pt-32 pb-16 md:pt-56 md:pb-28">
        <div className="flex items-end justify-between gap-6">
          <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)]">
            <Reveal mask>Industries we serve</Reveal>
          </h2>
          <ArrowLink href="/industries" className="hidden md:inline-flex">
            All industries
          </ArrowLink>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-20 md:grid-cols-3 md:gap-y-16">
          {sectors.map((sec, i) => (
            <Reveal key={sec.id} delay={(i % 3) * 0.06}>
              <Link href={`/industries/${sec.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Artwork
                    tone={sec.tone}
                    src={sec.image}
                    className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    label={sec.title}
                  />
                </div>
                <h3 className="mt-5 text-2xl transition-colors group-hover:text-clay">
                  {sec.title}
                </h3>
                <p className="mt-2 text-sm text-stone">{sec.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <ArrowLink href="/industries">All industries</ArrowLink>
        </div>
      </section>

      {/* ───────────────────────── Stats ───────────────────────── */}
      <section className="shell py-24 md:py-32">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div>
                <div className="text-[clamp(2.6rem,5vw,4.2rem)] leading-none tracking-[-0.02em]">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-4 text-sm text-stone">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────── Services — airy index ───────────────── */}
      <section className="shell pt-16 pb-32 md:pt-24 md:pb-56">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
              <Reveal mask>Services</Reveal>
            </h2>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xs text-stone">
                Three workshops, one project team — so nothing is lost between
                design and delivery.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8">
                <ArrowLink href="/services">All services</ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <ul>
              {services.map((s, i) => (
                <li key={s.id}>
                  <Reveal delay={i * 0.04}>
                    <Link
                      href="/services"
                      className="group flex items-center justify-between gap-6 border-b border-line py-7"
                    >
                      <h3 className="text-2xl tracking-[-0.01em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 md:text-3xl">
                        {s.title}
                      </h3>
                      <Arrow className="shrink-0 -translate-x-2 text-stone opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100" />
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────────── The group ───────────────── */}
      <section data-section="group" className="shell pb-32 md:pb-56">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
              <Reveal mask>The group</Reveal>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {group.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.06}>
                <div className="grid grid-cols-12 gap-x-4 gap-y-3 border-b border-line py-7">
                  <h3 className="col-span-12 text-xl md:col-span-4">{g.name}</h3>
                  <span className="label col-span-12 self-center text-stone md:col-span-3">
                    {g.role}
                  </span>
                  <p className="col-span-12 mt-0 text-stone md:col-span-5">{g.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Manufacturing teaser ───────────────── */}
      <section data-section="manufacturing" data-pano="manufacturing-section" className="relative isolate overflow-hidden bg-walnut text-paper">
        <div className="shell grid gap-12 py-28 md:grid-cols-12 md:items-center md:py-40">
          <div className="md:col-span-6">
            <span className="label text-stone-soft">Manufacturing &amp; Joinery</span>
            <h2 data-pano="manufacturing-headline" className="mt-5 max-w-xl text-[clamp(2rem,4.5vw,3.6rem)] text-bone">
              <Reveal mask>We don&apos;t just specify it. We make it.</Reveal>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-paper/70">{manufacturing.intro}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                href="/manufacturing"
                data-pano="manufacturing-link"
                className="group mt-8 inline-flex items-center gap-2 label text-bone"
              >
                <span className="link-underline group-hover:link-underline-on pb-1">
                  Inside the workshops
                </span>
                <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Artwork tone={0} src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=80&auto=format&fit=crop" className="h-full w-full" label="Production · İstanbul" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────── Process strip ───────────────── */}
      <section className="shell py-32 md:py-48">
        <div className="flex items-end justify-between gap-6">
          <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)]">
            <Reveal mask>How we work</Reveal>
          </h2>
          <ArrowLink href="/process" className="hidden md:inline-flex">
            The full process
          </ArrowLink>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-20 md:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.index} delay={(i % 4) * 0.05}>
              <div className="pt-5">
                <span className="label text-clay">{p.index}</span>
                <h3 className="mt-3 text-lg">{p.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────── Global presence ───────────────── */}
      <section className="shell pb-32 md:pb-48">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
              <Reveal mask>Global presence</Reveal>
            </h2>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xs text-stone">{presence.intro}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8">
                <ArrowLink href="/global-presence">Where we work</ArrowLink>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {presence.regions.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.06}>
                <div className="grid grid-cols-12 items-baseline gap-4 border-b border-line py-6">
                  <h3 className="col-span-5 text-xl md:col-span-3">{r.name}</h3>
                  <p className="col-span-7 text-stone md:col-span-9">
                    {r.countries.join(" · ")}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Testimonials ───────────────── */}
      <section className="bg-sand">
        <div className="shell py-28 md:py-40">
          <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
            <Reveal mask>In their words</Reveal>
          </h2>
          <div className="mt-14 grid gap-x-12 gap-y-14 md:mt-20 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={(i % 3) * 0.08}>
                <figure className="flex h-full flex-col pt-7">
                  <blockquote className="text-xl leading-snug md:text-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6">
                    <div className="text-ink">{t.author}</div>
                    <div className="label mt-1 text-stone-soft">{t.company}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-20 border-t border-line pt-10">
            <span className="label text-stone">Selected clients</span>
            <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
              {clients.map((c) => (
                <span key={c} className="text-lg tracking-tight text-stone">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      <CTA />
    </>
  );
}
