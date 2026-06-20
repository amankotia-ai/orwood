"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getConsent, setConsent, subscribeConsent } from "@/lib/consent";

/**
 * Consent banner (GDPR / ePrivacy / PECR).
 *
 * ORWOOD loads Google Analytics, which sets cookies and is third-party
 * tracking, so analytics may only run after explicit opt-in. This banner asks
 * before anything loads: it appears whenever no choice is on record and writes
 * the decision to lib/consent — the analytics loader keys off the same store
 * and stays dormant until "Accept".
 *
 * Decline is honoured (no GA ever) and remembered. Visitors can revisit the
 * choice via "Manage cookies" in the privacy policy, which clears the record
 * and brings this banner back.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Sync to current state, then react to changes (incl. "Manage cookies").
    setVisible(getConsent() === null);
    return subscribeConsent((value) => setVisible(value === null));
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-3 border-t border-line bg-bone/95 px-shell py-4 text-xs text-stone backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:text-sm"
    >
      <p className="max-w-prose">
        We use Google Analytics to understand how this site is used. It sets
        cookies only if you accept. Decline and no analytics or tracking cookies
        will load.{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-2 hover:text-ink"
        >
          Privacy&nbsp;policy
        </Link>
      </p>
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={() => setConsent("denied")}
          className="rounded-sm border border-line px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:bg-sand"
        >
          Decline
        </button>
        <button
          onClick={() => setConsent("granted")}
          className="rounded-sm border border-ink bg-ink px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-bone transition-colors hover:opacity-90"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
