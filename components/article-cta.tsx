"use client";

import posthog from "posthog-js";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function ArticleCTA({
  articleId,
  label,
  href,
  description,
}: {
  articleId: string;
  label: string;
  href: string;
  description: string;
}) {
  return (
    <Reveal delay={0.1}>
      <div className="mx-auto mt-16 max-w-2xl border-t border-b border-line py-12">
        <span className="label text-clay">Next step</span>
        <h3 className="mt-4 text-2xl tracking-[-0.01em] md:text-3xl">
          {label}
        </h3>
        <p className="mt-3 max-w-lg text-stone">{description}</p>
        <div
          className="mt-8"
          onClick={() =>
            posthog.capture("journal_article_cta_clicked", {
              article_id: articleId,
              cta_label: label,
              cta_href: href,
            })
          }
        >
          <Button href={href}>{label}</Button>
        </div>
      </div>
    </Reveal>
  );
}
