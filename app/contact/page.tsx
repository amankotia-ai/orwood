import type { Metadata } from "next";
import { headers } from "next/headers";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { ContactMethodLink } from "@/components/contact-actions";
import { OutboundLink } from "@/components/outbound-link";
import { site, projects, sectors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with ORWOOD. Tell us about the space and the date — we'll bring the design, the workshops and the team.",
};

export default async function ContactPage() {
  const headersList = await headers();
  const referer = headersList.get("referer") ?? "";
  const match = referer.match(/\/projects\/([^/?#]+)/);
  const referrerProject = match
    ? projects.find((p) => p.id === match[1]) ?? null
    : null;

  // Map the project's sector to the matching sector title for pre-selecting the dropdown
  const defaultProjectType = referrerProject
    ? sectors.find((s) =>
        s.title.toLowerCase() === referrerProject.sector.toLowerCase()
      )?.title ?? ""
    : "";

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        index={
          referrerProject
            ? `Inspired by ${referrerProject.title}?`
            : "Start a project"
        }
        title={
          <>
            Let&apos;s build
            <br />
            something.
          </>
        }
        intro={
          referrerProject
            ? `Loved the ${referrerProject.sector.toLowerCase()} work? Tell us about yours — we'll bring the same rigour to your project.`
            : "Tell us what you're making. The studio reads every message — expect a reply within two working days."
        }
      />

      <section className="shell pb-28 md:pb-36">
        <div className="grid gap-16 md:grid-cols-12 md:gap-8">
          {/* Form */}
          <div className="md:col-span-7">
            <ContactForm
              defaultProjectType={defaultProjectType}
              referrerProject={referrerProject?.id}
            />
          </div>

          {/* Details */}
          <aside className="md:col-span-4 md:col-start-9">
            <Reveal>
              <div className="border-t border-line pt-6">
                <h2 className="label text-stone">Studio</h2>
                <address className="mt-4 space-y-1 text-lg not-italic">
                  <p>{site.address.line1}</p>
                  <p>{site.address.line2}</p>
                  <p>{site.address.city}</p>
                </address>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 border-t border-line pt-6">
                <h2 className="label text-stone">Direct</h2>
                <div className="mt-4 space-y-2 text-lg">
                  <ContactMethodLink
                    href={`mailto:${site.email}`}
                    method="email"
                    className="group flex items-center justify-between"
                  >
                    <span className="link-underline group-hover:link-underline-on pb-0.5">
                      {site.email}
                    </span>
                  </ContactMethodLink>
                  <ContactMethodLink
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    method="phone"
                    className="group flex items-center justify-between"
                  >
                    <span className="link-underline group-hover:link-underline-on pb-0.5">
                      {site.phone}
                    </span>
                  </ContactMethodLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 border-t border-line pt-6">
                <h2 className="label text-stone">Careers</h2>
                <p className="mt-4 text-stone">
                  Makers, designers and project leads — we&apos;re always glad to
                  meet good people. Send a portfolio to{" "}
                  <a
                    href={`mailto:careers@orwood.com`}
                    className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-clay"
                  >
                    careers@orwood.com
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex gap-5 border-t border-line pt-6">
                {site.social.map((s) => (
                  <OutboundLink
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label text-stone transition-colors hover:text-clay"
                  >
                    {s.label}
                  </OutboundLink>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
