"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

function trackOutboundClick(url: string) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", "outbound_click", {
      link_url: url,
      page: window.location.pathname,
    });
  }
}

export function OutboundLink({
  href,
  onClick,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (href) trackOutboundClick(href);
    onClick?.(e);
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
