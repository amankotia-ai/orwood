"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import posthog from "posthog-js";

export function JournalArticleLink({
  href,
  articleId,
  position,
  className,
  children,
}: {
  href: string;
  articleId: string;
  position: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        posthog.capture("journal_index_article_clicked", {
          article_id: articleId,
          position,
        })
      }
    >
      {children}
    </Link>
  );
}
