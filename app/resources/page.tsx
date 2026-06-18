import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import { resources, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources & Downloads",
  description:
    "Certifications, fire test reports, acoustic data, and qualification documents — everything procurement teams need to pre-qualify ORWOOD.",
};

const categories = ["Certification", "Technical", "Corporate", "Qualification"] as const;

const categoryDescriptions: Record<string, string> = {
  Certification:
    "ISO management system certificates covering quality, environmental, and operational standards.",
  Technical:
    "Fire test reports, acoustic performance data, and product datasheets for ORWOOD door sets and joinery systems.",
  Corporate:
    "Company profile, capability statements, and sustainability documentation.",
  Qualification:
    "Pre-qualification packs and tender-supporting documents for procurement teams.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        index="Downloads"
        title={
          <>
            Certifications, data
            <br />
            &amp; qualification docs.
          </>
        }
        intro="Everything procurement teams, specifiers, and project managers need to pre-qualify ORWOOD and include us in your tender process."
      />

      <section className="shell pb-24 md:pb-32">
        {categories.map((cat) => {
          const items = resources.filter((r) => r.category === cat);
          if (items.length === 0) return null;
          return (
            <div
              key={cat}
              className="grid gap-10 border-t border-line pt-12 md:grid-cols-12 md:pt-16 [&:not(:first-child)]:mt-16"
            >
              <div className="md:col-span-3">
                <h2 className="text-3xl md:text-4xl">
                  <Reveal mask>{cat}</Reveal>
                </h2>
                <Reveal delay={0.05}>
                  <p className="mt-4 text-pretty text-stone">
                    {categoryDescriptions[cat]}
                  </p>
                </Reveal>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <ul>
                  {items.map((r, i) => (
                    <Reveal key={r.id} delay={i * 0.04}>
                      <li className="flex items-start justify-between gap-6 border-b border-line py-6 first:border-t">
                        <div>
                          <h3 className="text-lg">{r.title}</h3>
                          <p className="mt-1 max-w-xl text-stone">
                            {r.description}
                          </p>
                        </div>
                        <a
                          href={`mailto:${site.email}?subject=Document request — ${r.title}`}
                          className="label shrink-0 self-center text-accent transition-colors hover:text-accent/70"
                        >
                          Request {r.format}
                        </a>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* Direct contact note */}
        <div className="mt-20 grid gap-8 border-t border-line pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl md:text-4xl">
              <Reveal mask>Need something else?</Reveal>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <p className="text-lg text-stone">
                If you need a specific test report, project reference, or
                documentation not listed here, get in touch and we will
                prepare it for your review.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <Link
                  href="/contact"
                  className="label text-ink underline-offset-4 transition-colors hover:text-clay hover:underline"
                >
                  Contact us
                </Link>
                <span className="text-sm text-stone">
                  Named project references available on request
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Procurement"
        title="Ready to pre-qualify?"
        body="Request the full PQQ pack or speak to our team about your tender requirements."
        cta="Start a project"
      />
    </>
  );
}
