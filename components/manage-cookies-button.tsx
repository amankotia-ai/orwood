"use client";

import { resetConsent } from "@/lib/consent";

/**
 * Re-opens the consent banner so a visitor can change or withdraw their choice
 * at any time (GDPR Art. 7(3) — withdrawal must be as easy as giving consent).
 * Clearing the stored choice makes the banner reappear; the analytics loader
 * keys off the same store and stops collecting until consent is granted again.
 */
export function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="underline underline-offset-2 hover:text-ink"
    >
      Manage cookie preferences
    </button>
  );
}
