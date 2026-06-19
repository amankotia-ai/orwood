"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initPanorama, type PanoramaEngine, type RuleSet } from "@/panorama/runtime";
import rules from "@/panorama.rules.json";

/** Read geo context injected by the edge middleware cookie. */
function readGeoCookie(): Record<string, string> {
  if (typeof document === "undefined") return {};
  const match = document.cookie.match(/(?:^|;\s*)pa_geo=([^;]*)/);
  if (!match) return {};
  try { return JSON.parse(decodeURIComponent(match[1])); } catch { return {}; }
}

/** Read consent state from localStorage (set by CookieBanner). */
function hasAnalyticsConsent(): boolean {
  try {
    const v = typeof localStorage !== "undefined" ? localStorage.getItem("orwood-analytics-consent") : null;
    // Default true — the site sets no cookies, so consent is informational.
    // Only returns false if the user has explicitly opted out.
    return v !== "denied";
  } catch { return true; }
}

/**
 * Panorama personalization runtime. Reads panorama.rules.json and serves the
 * matching variant by visitor context (utm / geo / returning) — entirely
 * client-side, no external calls. The Conversion agent authors the rules file;
 * this mounts the engine once in the root layout.
 *
 * Wiring:
 *  - SPA navigation: usePathname() → engine.recordPath() on every route change
 *  - Geo triggers: reads pa_geo cookie set by middleware.ts (Vercel edge headers)
 *  - Consent: reads orwood-analytics-consent from localStorage; defaults true
 */
export function Panorama() {
  const engineRef = useRef<PanoramaEngine | null>(null);
  const pathname = usePathname();

  // Initialise on mount, tear down on unmount.
  useEffect(() => {
    const geo = readGeoCookie();

    const engine = initPanorama(rules as RuleSet, {
      initialContext: {
        geo,
      },
      hasConsent: hasAnalyticsConsent,
      onEvent: (e) => {
        const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
        w.dataLayer?.push({ event: "panorama", ...e });
      },
    });

    engineRef.current = engine;

    // Expose on window so the CookieBanner (or devtools) can call setConsent.
    (window as unknown as Record<string, unknown>).__panorama = engine;

    return () => {
      engine.stop();
      engineRef.current = null;
      delete (window as unknown as Record<string, unknown>).__panorama;
    };
  }, []);

  // Track SPA navigation — re-evaluate rules when the path changes.
  useEffect(() => {
    if (engineRef.current && pathname) {
      engineRef.current.recordPath(pathname);
    }
  }, [pathname]);

  return null;
}
