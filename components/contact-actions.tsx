"use client";

import posthog from "posthog-js";

export function ContactMethodLink({
  href,
  method,
  children,
  className,
}: {
  href: string;
  method: "email" | "phone";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={() =>
        posthog.capture("contact_method_clicked", {
          method,
          href,
          page: "/contact",
        })
      }
      className={className}
    >
      {children}
    </a>
  );
}
