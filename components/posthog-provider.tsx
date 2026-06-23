"use client";

import posthog from "posthog-js";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getConsent, subscribeConsent } from "@/lib/consent";

/**
 * PostHog analytics - consent-gated, matching the GA pattern in analytics.tsx.
 *
 * Nothing initialises until the visitor explicitly accepts cookies. On accept,
 * posthog.init() fires with autocapture on and pageview capture manual (we
 * fire $pageview ourselves on each route change so SPA navigation is tracked).
 * On decline or withdrawal, opt_out_capturing() stops collection immediately.
 *
 * This site has no auth flow, so identify()/reset() are not wired here.
 * Wire them in the auth callback when a login screen is added.
 */

let posthogReady = false;

function PageviewCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (posthogReady) {
      posthog.capture("$pageview");
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogTracking() {
  useEffect(() => {
    const init = () => {
      if (posthogReady) {
        posthog.opt_in_capturing();
        return;
      }
      const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      if (!key) {
        return;
      }
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: false,
        autocapture: true,
      });
      posthogReady = true;
      posthog.capture("panorama_install_verification", { source: "panorama" });
    };

    if (getConsent() === "granted") init();

    return subscribeConsent((value) => {
      if (value === "granted") init();
      else if (value === "denied" && posthogReady) posthog.opt_out_capturing();
    });
  }, []);

  return (
    <Suspense fallback={null}>
      <PageviewCapture />
    </Suspense>
  );
}
