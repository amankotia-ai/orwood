import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import { process } from "@/lib/content";

export const metadata: Metadata = {
  title: "Process",
  description:
    "From discovery to handover — the seven stages ORWOOD runs to take an interior from brief to a finished, commissioned space.",
};

/** Inline cross-links for steps that make capability claims worth evidencing. */
const richBody: Record<string, React.ReactNode> = {
  "03": (
    <>
      We engineer every element for manufacture and compliance — shop drawings,
      tolerances, and{" "}
      <Link href="/manufacturing" className="underline underline-offset-2">
        acoustic and fire performance
      </Link>
      .
    </>
  ),
  "04": (
    <>
      <Link href="/manufacturing" className="underline underline-offset-2">
        Furniture, joinery and doors
      </Link>{" "}
      are made in our own workshops, prototyped and quality-checked before
      anything ships.
    </>
  ),
  "05": (
    <>
      <Link href="/services" className="underline underline-offset-2">
        FF&E
      </Link>{" "}
      is specified, sourced and consolidated — logistics, lead times and
      warehousing managed against the programme.
    </>
  ),
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        index="07 stages"
        title={
          <>
            From brief to
            <br />
            handover.
          </>
        }
        intro="Design, manufacture and delivery run through three owned workshops — one accountable thread, not a chain of handovers."
        meta={[
          { k: "Stages", v: "07" },
          { k: "Workshops", v: "03" },
          { k: "Accountability", v: "One team" },
          { k: "Since", v: "2004" },
        ]}
      />

      <div className="shell pb-24 md:pb-36">
        {process.map((p) => (
          <Reveal key={p.index}>
            <div className="grid grid-cols-12 items-baseline gap-4 border-t border-line py-10 last:border-b md:gap-8 md:py-14">
              <span className="label col-span-12 text-clay md:col-span-2">
                {p.index}
              </span>
              <h2 className="col-span-12 text-[clamp(1.8rem,3.5vw,2.8rem)] md:col-span-4">
                {p.title}
              </h2>
              <p className="col-span-12 max-w-xl text-lg text-stone md:col-span-6">
                {richBody[p.index] ?? p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <CTA
        eyebrow="Process"
        title="Ready to start at stage one?"
        body="Bring us the brief and the date. We'll take it from discovery all the way to handover."
        cta="Start a project"
      />
    </>
  );
}
