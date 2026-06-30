import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { CTA } from "@/components/cta";
import { ArticleCTA } from "@/components/article-cta";
import { NextArticleLink } from "@/components/next-article-link";
import { PostHogPageView } from "@/components/posthog-page-view";
import { journal } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journal.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = journal.find((a) => a.id === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.id}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://orwood.com/journal/${article.id}`,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = journal.find((a) => a.id === slug);
  if (!article) notFound();

  const idx = journal.findIndex((a) => a.id === article.id);
  const next = journal[(idx + 1) % journal.length];

  return (
    <>
      <PostHogPageView
        event="journal_article_viewed"
        properties={{
          article_id: article.id,
          article_title: article.title,
          category: article.category,
          reading_time: article.readingTime,
        }}
      />
      <article>
        <header className="shell pt-40 md:pt-52">
          <Reveal>
            <Link
              href="/journal"
              className="label inline-flex items-center gap-3 text-stone transition-colors hover:text-ink"
            >
              <span className="h-px w-8 bg-stone/50" />
              Journal
            </Link>
          </Reveal>
          <div className="mt-10 max-w-4xl">
            <span className="label text-clay">{article.category}</span>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] leading-[1.08]">
              <Reveal mask delay={0.05}>
                {article.title}
              </Reveal>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-stone">
              {article.excerpt}
            </p>
            <span className="label mt-6 inline-block text-stone-soft">
              {article.date} &middot; {article.readingTime}
            </span>
          </div>
        </header>

        <Reveal delay={0.15} className="mt-12 md:mt-16">
          <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden md:h-[64vh]">
            <Artwork
              tone={article.tone}
              className="h-full w-full"
              label={article.category}
            />
          </div>
        </Reveal>

        <div className="shell py-20 md:py-28">
          <div className="mx-auto max-w-2xl space-y-7 text-lg leading-[1.7] text-ink/90">
            {article.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          {article.cta && (
            <ArticleCTA
              articleId={article.id}
              label={article.cta.label}
              href={article.cta.href}
              description={article.cta.description}
            />
          )}
        </div>
      </article>

      {/* Next article */}
      <section className="shell pb-24 md:pb-32">
        <NextArticleLink
          fromArticleId={article.id}
          toArticleId={next.id}
          toTitle={next.title}
          toCategory={next.category}
        />
      </section>

      <CTA
        eyebrow="Start a project"
        title="Ready to work with ORWOOD?"
        body="When you're ready to move forward, tell us what you're building — we'll bring the design, the workshop, and the team."
        cta="Get in touch"
      />
    </>
  );
}
