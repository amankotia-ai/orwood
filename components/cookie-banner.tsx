"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "orwood-cookie-notice-dismissed";

/**
 * Informational cookie/privacy banner.
 *
 * The site sets no cookies and self-hosts fonts via next/font (downloaded at
 * build time — no runtime requests to Google). This banner is therefore
 * informational only, satisfying GDPR/ePrivacy transparency requirements
 * without needing a full CMP or consent toggle.
 *
 * If cookies or third-party resources are added later, this component should
 * be upgraded to a consent-gated CMP.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // localStorage unavailable — fall through to show
    }

    // Defer render so the hero content paints as the LCP element instead of
    // the banner's <p>. requestIdleCallback fires after the main thread is
    // idle; the 3 500 ms timeout is a fallback for Safari (no rIC support)
    // and guarantees the banner still appears even under sustained load.
    const show = () => setVisible(true);
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(show, { timeout: 3_500 });
      return () => cancelIdleCallback(id);
    }
    const timer = setTimeout(show, 3_500);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-4 border-t border-line bg-bone/95 px-shell py-3 text-xs text-stone backdrop-blur-sm sm:text-sm"
    >
      <p className="max-w-prose">
        This site does not use cookies or third-party tracking. Fonts are
        self-hosted and no personal data is collected.{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
          Privacy&nbsp;policy
        </a>
      </p>
      <button
        onClick={dismiss}
        className="shrink-0 rounded-sm border border-line px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:bg-sand"
      >
        OK
      </button>
    </div>
  );
}
