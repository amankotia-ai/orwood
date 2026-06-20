import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";
import { ManageCookiesButton } from "@/components/manage-cookies-button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ORWOOD collects, uses, and protects your personal data — including your rights under GDPR, CCPA, and KVKK.",
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

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Privacy
            <br />
            Policy
          </>
        }
        intro="How we collect, use, and protect your personal data."
        meta={[{ k: "Last updated", v: "20 June 2026" }]}
      />

      <div className="shell max-w-3xl pb-28 md:pb-40 [&_.prose-orwood]:space-y-4 [&_.prose-orwood]:text-stone [&_.prose-orwood]:leading-relaxed [&_.prose-orwood_a]:text-ink [&_.prose-orwood_a]:underline [&_.prose-orwood_a]:underline-offset-2 [&_.prose-orwood_ul]:list-disc [&_.prose-orwood_ul]:pl-5 [&_.prose-orwood_ul]:space-y-1">
        <Section title="1. Data controller">
          <p>
            ORWOOD (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is the data controller
            for information collected through this website.
          </p>
          <p>
            <strong>Registered office:</strong> {site.address.line2},{" "}
            {site.address.city}
            <br />
            <strong>Contact:</strong>{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </Section>

        <Section title="2. What data we collect">
          <p>
            When you submit the contact form on this site, we collect the
            following information:
          </p>
          <ul>
            <li>
              <strong>Name</strong> (required)
            </li>
            <li>
              <strong>Email address</strong> (required)
            </li>
            <li>
              <strong>Company name</strong> (optional)
            </li>
            <li>
              <strong>Country / project location</strong> (optional)
            </li>
            <li>
              <strong>Project type</strong> (optional)
            </li>
            <li>
              <strong>Budget range</strong> (optional)
            </li>
            <li>
              <strong>Message</strong> (required)
            </li>
          </ul>
          <p>
            With your consent, we use{" "}
            <strong>Google Analytics</strong> to understand how visitors use
            this site. Analytics cookies (e.g.&nbsp;<code>_ga</code>,{" "}
            <code>_gid</code>) and the Google Analytics script load{" "}
            <strong>only after you accept</strong> via the cookie banner; if you
            decline, no analytics or tracking cookies are set. Google processes
            this data as our processor; see{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&rsquo;s privacy policy
            </a>
            . Fonts are self-hosted, so no font requests are made to Google.
          </p>
          <p>
            You can change or withdraw your choice at any time:{" "}
            <ManageCookiesButton />
          </p>
        </Section>

        <Section title="3. Purpose of processing">
          <p>We process your personal data to:</p>
          <ul>
            <li>Respond to your enquiry and provide project information</li>
            <li>
              Assess project fit (sector, location, budget) before follow-up
            </li>
            <li>
              Send marketing communications, only if you opt in or where
              permitted by law (legitimate interest)
            </li>
          </ul>
          <p>
            <strong>Legal basis (GDPR Art.&nbsp;6):</strong> Consent (form
            submission) and legitimate interest (responding to business
            enquiries).
          </p>
        </Section>

        <Section title="4. Data retention">
          <p>
            Contact form submissions are retained for 24&nbsp;months from the
            date of submission. After this period, data is permanently deleted
            unless an active project or business relationship requires
            continued retention.
          </p>
        </Section>

        <Section title="5. Third-party sharing">
          <p>
            We do not sell your personal data. We may share it with the
            following categories of processor, under written data-processing
            agreements:
          </p>
          <ul>
            <li>Email delivery services (to send replies and marketing)</li>
            <li>CRM / project management tools (to track enquiries)</li>
            <li>Cloud hosting provider (to store form submissions)</li>
          </ul>
          <p>
            All processors are bound by contractual obligations to protect your
            data and use it only for the purposes described above.
          </p>
        </Section>

        <Section title="6. International transfers">
          <p>
            ORWOOD operates from Türkiye and serves clients internationally.
            Your data may be processed in Türkiye, the UK, and the GCC
            region. Where data is transferred outside the EEA, we rely on
            adequacy decisions or standard contractual clauses.
          </p>
        </Section>

        <Section title="7. Your rights">
          <p>
            Under GDPR, CCPA, KVKK, and equivalent legislation, you have the
            right to:
          </p>
          <ul>
            <li>
              <strong>Access</strong> — request a copy of your personal data
            </li>
            <li>
              <strong>Rectification</strong> — correct inaccurate data
            </li>
            <li>
              <strong>Erasure</strong> — request deletion of your data
            </li>
            <li>
              <strong>Restriction</strong> — limit how we process your data
            </li>
            <li>
              <strong>Portability</strong> — receive your data in a structured
              format
            </li>
            <li>
              <strong>Objection</strong> — object to processing based on
              legitimate interest
            </li>
            <li>
              <strong>Withdraw consent</strong> — at any time, without
              affecting the lawfulness of prior processing
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. We will respond
            within 30&nbsp;days.
          </p>
        </Section>

        <Section title="8. Changes to this policy">
          <p>
            We may update this policy from time to time. The &ldquo;Last
            updated&rdquo; date at the top of this page reflects the most
            recent revision.
          </p>
        </Section>

        <Reveal>
          <p className="mt-8 text-sm text-stone">
            See also our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-2 hover:text-ink"
            >
              Terms of Service
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </>
  );
}
