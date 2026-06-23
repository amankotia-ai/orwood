import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { CTA } from "@/components/cta";
import { OutboundLink } from "@/components/outbound-link";
import { PostHogPageView } from "@/components/posthog-page-view";
import { projects } from "@/lib/content";
import { cn } from "@/lib/cn";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  const title = `${project.title} — ${project.sector}, ${project.location}`;
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      url: `https://orwood.com/projects/${project.id}`,
    },
    alternates: { canonical: `/projects/${project.id}` },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.id === project.id);
  const next = projects[(idx + 1) % projects.length];

  const facts = [
    { k: "Location", v: project.location },
    { k: "Size", v: project.size },
    { k: "Industry", v: project.sector },
    { k: "Completed", v: project.year },
    ...(project.architect
      ? [{ k: "Design team", v: project.architect, href: project.architectUrl }]
      : []),
  ];

  /* ── Split location into city + country for structured data ── */
  const [city, countryCode] = project.location.split(", ");
  const countryMap: Record<string, string> = {
    QA: "Qatar",
    AE: "United Arab Emirates",
    SA: "Saudi Arabia",
    TR: "Turkey",
    UK: "United Kingdom",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    headline: `${project.title} — ${project.sector} Interior Fit-Out by ORWOOD`,
    description: project.summary,
    about: project.services,
    url: `https://orwood.com/projects/${project.id}`,
    dateCreated: project.year,
    locationCreated: {
      "@type": "Place",
      name: `${city}, ${countryMap[countryCode] ?? countryCode}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressCountry: countryCode,
      },
    },
    creator: {
      "@type": "Organization",
      name: "ORWOOD",
      url: "https://orwood.com",
      description:
        "Interior fit-out contractor specialising in hospitality, commercial and residential projects across the GCC, Turkey and Europe — with own manufacturing workshops in İstanbul.",
      foundingDate: "2004",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Qatar" },
        { "@type": "Country", name: "Saudi Arabia" },
      ],
    },
    ...(project.architect
      ? {
          contributor: {
            "@type": "Organization",
            name: project.architect,
            ...(project.architectUrl ? { url: project.architectUrl } : {}),
          },
        }
      : {}),
    keywords: [
      `${project.sector.toLowerCase()} interior fit-out`,
      `hotel fit-out ${city}`,
      `interior fit-out ${countryMap[countryCode] ?? countryCode}`,
      "FF&E procurement",
      "turnkey interiors",
      "ORWOOD",
    ],
  };

  return (
    <>
      <PostHogPageView
        event="project_viewed"
        properties={{
          project_id: project.id,
          project_title: project.title,
          sector: project.sector,
          location: project.location,
          year: project.year,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ───────────────────────── Intro ───────────────────────── */}
      <section className="shell pt-40 md:pt-52">
        <Reveal>
          <Link
            href="/projects"
            className="label inline-flex items-center gap-3 text-stone transition-colors hover:text-ink"
          >
            <span className="h-px w-8 bg-stone/50" />
            All projects
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <span className="label text-clay">
              {project.sector} &middot; {project.location}
            </span>
            <h1 className="mt-6 text-[clamp(2.6rem,7vw,6rem)] leading-[1.0]">
              <Reveal mask delay={0.05}>
                {project.title}
              </Reveal>
            </h1>
          </div>
          <div className="self-end md:col-span-4">
            <Reveal delay={0.15}>
              <p className="text-pretty text-lg text-stone">
                {project.summary}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────── Full-bleed hero ───────────────────── */}
      <Reveal delay={0.15} className="mt-14 md:mt-20">
        <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden md:h-[82vh]">
          <Artwork
            tone={project.tone}
            className="h-full w-full"
            label={`${project.title} — ${project.location}`}
          />
        </div>
      </Reveal>

      {/* ───────────────────────── Facts ───────────────────────── */}
      <section className="shell border-b border-line py-12 md:py-16">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-5">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="label text-stone">{f.k}</dt>
              <dd className="mt-3 text-lg tracking-[-0.01em]">
                {"href" in f && f.href ? (
                  <OutboundLink
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-stone/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/40"
                  >
                    {f.v}
                  </OutboundLink>
                ) : (
                  f.v
                )}
              </dd>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <dt className="label text-stone">Services delivered</dt>
            <dd className="mt-3 flex flex-col gap-1 text-lg tracking-[-0.01em]">
              {project.services.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      {/* ──────────────────────── Overview ──────────────────────── */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="label text-stone">Overview</span>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <p className="max-w-4xl text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.3] tracking-[-0.01em]">
                {project.overview}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────── Challenge + Solution ──────────────── */}
      <section className="shell pb-8 md:pb-16">
        <div className="grid gap-12 border-t border-line pt-12 md:grid-cols-2 md:gap-16 md:pt-16">
          <Reveal>
            <span className="label text-stone">The challenge</span>
            <p className="mt-6 text-pretty text-lg text-stone">
              {project.challenge}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="label text-clay">The solution</span>
            <p className="mt-6 text-pretty text-lg text-ink">
              {project.solution}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────── Gallery ──────────────────────── */}
      <section className="shell py-16 md:py-24">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {project.gallery.map((tone, i) => (
            <Reveal
              key={`${tone}-${i}`}
              delay={(i % 2) * 0.06}
              className={cn(i % 3 === 0 && "md:col-span-2")}
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden",
                  i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                )}
              >
                <Artwork tone={tone} className="h-full w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ────────────────────── Deliverables ────────────────────── */}
      <section className="shell py-16 md:py-24">
        <div className="grid gap-10 border-t border-line pt-12 md:grid-cols-12 md:pt-16">
          <div className="md:col-span-3">
            <h2 className="text-3xl md:text-4xl">
              <Reveal mask>Deliverables</Reveal>
            </h2>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <ul>
              {project.deliverables.map((d, i) => (
                <Reveal key={d} delay={i * 0.04}>
                  <li className="flex items-baseline gap-5 border-b border-line py-5 text-lg first:border-t">
                    <span className="label text-stone-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{d}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ────────────────── Certifications & Technical ────────────────── */}
      {project.certifications && project.certifications.length > 0 && (
        <section className="shell py-16 md:py-24">
          <div className="grid gap-10 border-t border-line pt-12 md:grid-cols-12 md:pt-16">
            <div className="md:col-span-3">
              <h2 className="text-3xl md:text-4xl">
                <Reveal mask>Technical</Reveal>
              </h2>
              <Reveal delay={0.05}>
                <p className="mt-4 text-pretty text-stone">
                  Certifications, test standards, and qualification data for
                  this project.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              {/* Fire & acoustic ratings */}
              {(project.fireRating || project.acousticRating) && (
                <Reveal>
                  <div className="mb-10 grid gap-8 sm:grid-cols-2">
                    {project.fireRating && (
                      <div className="border-l-2 border-accent/30 pl-5">
                        <span className="label text-stone">Fire rating</span>
                        <p className="mt-2 text-lg">{project.fireRating}</p>
                      </div>
                    )}
                    {project.acousticRating && (
                      <div className="border-l-2 border-accent/30 pl-5">
                        <span className="label text-stone">
                          Acoustic rating
                        </span>
                        <p className="mt-2 text-lg">
                          {project.acousticRating}
                        </p>
                      </div>
                    )}
                  </div>
                </Reveal>
              )}

              {/* Certifications list */}
              <ul>
                {project.certifications.map((cert, i) => (
                  <Reveal key={cert.label} delay={i * 0.04}>
                    <li className="flex items-baseline justify-between gap-5 border-b border-line py-5 first:border-t">
                      <span className="text-lg">{cert.label}</span>
                      {cert.standard && (
                        <span className="text-sm text-stone">
                          {cert.standard}
                        </span>
                      )}
                    </li>
                  </Reveal>
                ))}
              </ul>

              {/* Reference + resources link */}
              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  {project.referenceAvailable && (
                    <span className="inline-flex items-center gap-2 text-sm text-stone">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      Named reference available on request
                    </span>
                  )}
                  <Link
                    href="/resources"
                    className="label text-accent transition-colors hover:text-accent/70"
                  >
                    View all certifications &amp; downloads &rarr;
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────── Next project ─────────────────────── */}
      <section className="shell pb-24 md:pb-32">
        <Link
          href={`/projects/${next.id}`}
          className="group block border-t border-line pt-10"
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              <span className="label text-stone">Next project</span>
              <h2 className="mt-3 text-3xl tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 md:text-5xl">
                {next.title}
              </h2>
              <p className="mt-2 text-stone">
                {next.sector} &middot; {next.location}
              </p>
            </div>
            <div className="relative hidden aspect-[4/3] w-40 shrink-0 overflow-hidden md:block lg:w-56">
              <Artwork
                tone={next.tone}
                className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
            </div>
          </div>
        </Link>
      </section>

      <CTA
        eyebrow="Start a project"
        title="Your project could be next."
        body="Bring us the brief — we'll bring the studio, the workshops and the team to deliver it."
        cta="Start a project"
      />
    </>
  );
}
