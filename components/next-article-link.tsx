"use client";

import Link from "next/link";
import posthog from "posthog-js";

export function NextArticleLink({
  fromArticleId,
  toArticleId,
  toTitle,
  toCategory,
}: {
  fromArticleId: string;
  toArticleId: string;
  toTitle: string;
  toCategory: string;
}) {
  return (
    <Link
      href={`/journal/${toArticleId}`}
      className="group block border-t border-line pt-10"
      onClick={() =>
        posthog.capture("journal_next_article_clicked", {
          from_article_id: fromArticleId,
          to_article_id: toArticleId,
        })
      }
    >
      <span className="label text-stone">Next</span>
      <h2 className="mt-3 max-w-3xl text-2xl tracking-[-0.01em] transition-colors group-hover:text-clay md:text-4xl">
        {toTitle}
      </h2>
      <span className="label mt-3 inline-block text-stone-soft">
        {toCategory}
      </span>
    </Link>
  );
}
