import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import { roles, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join ORWOOD — design, manufacture and delivery of premium interiors, from the İstanbul studio and workshops to sites across the world.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        index="Join the studio"
        title={
          <>
            Build the interiors
            <br />
            other people photograph.
          </>
        }
        intro="We design, manufacture and deliver from our own workshops — so the people who draw a detail walk the same floors as the people who make it."
      />

      <div className="shell pb-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl md:text-4xl">
              <Reveal mask>Open roles</Reveal>
            </h2>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <ul>
              {roles.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.05}>
                  <li className="grid grid-cols-12 items-baseline gap-x-3 gap-y-1 border-b border-line py-7 first:border-t">
                    <h3 className="col-span-12 text-xl md:col-span-5 md:text-2xl">
                      {r.title}
                    </h3>
                    <span className="label col-span-6 self-center text-stone md:col-span-3">
                      {r.location}
                    </span>
                    <span className="label col-span-6 self-center text-stone-soft md:col-span-2">
                      {r.type}
                    </span>
                    <div className="col-span-12 md:col-span-2 md:text-right">
                      <a
                        href={`mailto:${site.email}?subject=Application — ${r.title}`}
                        className="label text-clay underline-offset-4 hover:underline"
                      >
                        Apply
                      </a>
                    </div>
                    <p className="col-span-12 mt-2 max-w-2xl text-stone md:col-span-10">
                      {r.blurb}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="shell py-20 md:py-28">
        <div className="grid gap-8 border-t border-line pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl md:text-4xl">
              <Reveal mask>Speculative?</Reveal>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <p className="text-lg text-stone">
                We're always glad to hear from designers, project managers and
                makers. Send a portfolio or CV and tell us what you'd want to
                build.
              </p>
              <a
                href={`mailto:${site.email}?subject=Speculative application`}
                className="label mt-6 inline-block text-ink underline-offset-4 transition-colors hover:text-clay hover:underline"
              >
                {site.email}
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Careers"
        title="Rather start a project than a job?"
        body="If you're here to build something with us as a client, we'd love to hear about it."
        cta="Start a project"
      />
    </>
  );
}
