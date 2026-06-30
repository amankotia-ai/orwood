import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { CTA } from "@/components/cta";
import { Arrow } from "@/components/ui/button";
import { JournalArticleLink } from "@/components/journal-article-link";
import { journal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights / Journal",
  description:
    "Notes on hospitality design, FF&E, materials, joinery and value engineering from the ORWOOD studio and workshops.",
};

export default function JournalPage() {
  const [lead, ...rest] = journal;

  return (
    <>
      <PageHeader
        eyebrow="Insights / Journal"
        index="Notes from the studio"
        title={
          <>
            Notes from the
            <br />
            studio &amp; workshops.
          </>
        }
        intro="What we're learning about designing, making and delivering interiors that last — written for the people who commission them."
      />

      <div className="shell pb-24 md:pb-32">
        {/* Lead article */}
        <Reveal>
          <JournalArticleLink
            href={`/journal/${lead.id}`}
            articleId={lead.id}
            position={0}
            className="group block"
          >
            <div className="relative h-[48vh] min-h-[340px] w-full overflow-hidden md:h-[64vh]">
              <Artwork
                tone={lead.tone}
                className="h-full w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                label={lead.category}
              />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-12">
              <div className="md:col-span-2">
                <span className="label text-clay">{lead.category}</span>
              </div>
              <div className="md:col-span-10">
                <h2 className="max-w-3xl text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15]">
                  {lead.title}
                </h2>
                <p className="mt-3 max-w-2xl text-stone">{lead.excerpt}</p>
                <span className="label mt-4 inline-block text-stone-soft">
                  {lead.date} &middot; {lead.readingTime}
                </span>
              </div>
            </div>
          </JournalArticleLink>
        </Reveal>

        {/* Rest */}
        <div className="mt-20 grid gap-x-12 gap-y-14 md:mt-28 md:grid-cols-2">
          {rest.map((a, i) => (
            <Reveal key={a.id} delay={(i % 2) * 0.06}>
              <JournalArticleLink
                href={`/journal/${a.id}`}
                articleId={a.id}
                position={i + 1}
                className="group flex flex-col gap-5 border-t border-line pt-7"
              >
                <div className="flex items-center justify-between">
                  <span className="label text-clay">{a.category}</span>
                  <span className="label text-stone-soft">{a.date}</span>
                </div>
                <h3 className="text-2xl leading-snug transition-colors group-hover:text-clay md:text-3xl">
                  {a.title}
                </h3>
                <p className="text-stone">{a.excerpt}</p>
                <span className="label inline-flex items-center gap-2 text-stone group-hover:text-ink">
                  Read
                  <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </JournalArticleLink>
            </Reveal>
          ))}
        </div>
      </div>

      <CTA
        eyebrow="Insights"
        title="Have a project in mind?"
        body="If something here resonates, tell us what you're building — we'll bring the team to deliver it."
        cta="Start a project"
      />
    </>
  );
}
