import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing the use of the ORWOOD website, including intellectual property, limitations of liability, and governing law.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="border-t border-line pt-8 pb-12">
        <h2 className="text-2xl tracking-[-0.02em]">{title}</h2>
        <div className="prose-orwood mt-6">{children}</div>
      </section>
    </Reveal>
  );
}

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Terms of
            <br />
            Service
          </>
        }
        intro="The terms that govern your use of the ORWOOD website."
        meta={[{ k: "Last updated", v: "19 June 2025" }]}
      />

      <div className="shell max-w-3xl pb-28 md:pb-40 [&_.prose-orwood]:space-y-4 [&_.prose-orwood]:text-stone [&_.prose-orwood]:leading-relaxed [&_.prose-orwood_a]:text-ink [&_.prose-orwood_a]:underline [&_.prose-orwood_a]:underline-offset-2 [&_.prose-orwood_ul]:list-disc [&_.prose-orwood_ul]:pl-5 [&_.prose-orwood_ul]:space-y-1">
        <Section title="1. Acceptance of terms">
          <p>
            By accessing or using the ORWOOD website
            (&ldquo;orwood.com&rdquo;), you agree to be bound by these Terms
            of Service. If you do not agree, please do not use the site.
          </p>
        </Section>

        <Section title="2. Use of the website">
          <p>
            This website is provided for informational purposes and to
            facilitate business enquiries. You agree to use it lawfully and not
            to:
          </p>
          <ul>
            <li>
              Interfere with the site&apos;s operation or security
            </li>
            <li>
              Use automated tools to scrape or copy content without permission
            </li>
            <li>
              Misrepresent your identity or affiliation when submitting
              enquiries
            </li>
          </ul>
        </Section>

        <Section title="3. Intellectual property">
          <p>
            All content on this site — including text, images, project
            photography, designs, logos, and layout — is the property of ORWOOD
            or its licensors and is protected by copyright and trademark law.
          </p>
          <p>
            You may not reproduce, distribute, or create derivative works from
            any content without prior written consent.
          </p>
        </Section>

        <Section title="4. Project information">
          <p>
            Project descriptions, specifications, and images are provided for
            reference only. Actual materials, finishes, and dimensions may vary.
            Nothing on this site constitutes a contractual offer or guarantee
            of availability.
          </p>
        </Section>

        <Section title="5. Contact form submissions">
          <p>
            Information submitted through the contact form is handled in
            accordance with our{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-ink"
            >
              Privacy Policy
            </Link>
            . Submitting an enquiry does not create a binding agreement or
            client relationship.
          </p>
        </Section>

        <Section title="6. Third-party links">
          <p>
            This site may contain links to third-party websites (e.g., social
            media profiles). We are not responsible for the content, privacy
            practices, or availability of those sites.
          </p>
        </Section>

        <Section title="7. Limitation of liability">
          <p>
            ORWOOD provides this website &ldquo;as is&rdquo; without
            warranties of any kind. To the fullest extent permitted by law, we
            shall not be liable for any indirect, incidental, or consequential
            damages arising from your use of the site.
          </p>
        </Section>

        <Section title="8. Governing law">
          <p>
            These terms are governed by the laws of the Republic of Türkiye.
            Any disputes shall be submitted to the exclusive jurisdiction of the
            courts of İstanbul.
          </p>
        </Section>

        <Section title="9. Changes to these terms">
          <p>
            We may revise these terms at any time. The &ldquo;Last
            updated&rdquo; date at the top of this page reflects the most
            recent revision. Continued use of the site after changes
            constitutes acceptance.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            For questions about these terms, contact us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </Section>

        <Reveal>
          <p className="mt-8 text-sm text-stone">
            See also our{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-ink"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </>
  );
}
