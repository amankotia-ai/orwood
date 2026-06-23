"use client";

import posthog from "posthog-js";

export function DocumentRequestLink({
  href,
  documentId,
  documentTitle,
  children,
  className,
}: {
  href: string;
  documentId: string;
  documentTitle: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={() =>
        posthog.capture("document_requested", {
          document_id: documentId,
          document_title: documentTitle,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
        })
      }
      className={className}
    >
      {children}
    </a>
  );
}
