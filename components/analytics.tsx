"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  GA_MEASUREMENT_ID,
  getConsent,
  subscribeConsent,
  type Consent,
} from "@/lib/consent";

/**
 * Google Analytics (gtag.js), consent-gated.
 *
 * The gtag.js library is injected ONLY once the visitor has accepted — nothing
 * third-party loads before consent. Google Consent Mode v2 is initialised with
 * every storage type defaulted to `denied`, then `analytics_storage` is raised
 * to `granted`, so even after the script loads it behaves exactly as the
 * visitor allowed (no ad cookies — ORWOOD runs no ad tags).
 *
 * Consent lives in lib/consent (shared with the banner). If the visitor later
 * withdraws, we push a `consent: update` to `denied` so collection stops
 * without a reload.
 */
export function Analytics() {
  const [consent, setConsentState] = useState<Consent>(null);

  useEffect(() => {
    setConsentState(getConsent());
    return subscribeConsent(setConsentState);
  }, []);

  // Reflect later changes into a gtag that has already loaded.
  useEffect(() => {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (consent && typeof w.gtag === "function") {
      w.gtag("consent", "update", {
        analytics_storage: consent === "granted" ? "granted" : "denied",
      });
    }
  }, [consent]);

  if (consent !== "granted") return null;

  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
});
gtag('consent', 'update', { analytics_storage: 'granted' });
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
