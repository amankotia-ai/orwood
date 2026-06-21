"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initPanorama, type PanoramaEngine, type RuleSet } from "@/panorama/runtime";
import { getConsent, subscribeConsent } from "@/lib/consent";
import rules from "@/panorama.rules.json";

/** Read the pa_geo cookie set by middleware.ts and parse it into a geo object. */
function readGeoCookie(): Record<string, string> {
  if (typeof document === "undefined") return {};
  try {
    const match = document.cookie.match(/(?:^|;\s*)pa_geo=([^;]+)/);
    if (!match) return {};
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return {};
  }
}

/**
 * Panorama personalization runtime. Reads panorama.rules.json and serves the
 * matching variant by visitor context (utm / geo / returning) — entirely
 * client-side, no external calls. The Conversion agent authors the rules file;
 * this mounts the engine once in the root layout.
 *
 * Wiring:
 *   - SPA navigation: usePathname() → engine.recordPath() on every route change
 *   - Geo context: reads pa_geo cookie injected by edge middleware
 *   - Consent: reads consent store and bridges updates via engine.setConsent()
 */
export function Panorama() {
  const engineRef = useRef<PanoramaEngine | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const geo = readGeoCookie();
    const consent = getConsent();

    const engine = initPanorama(rules as RuleSet, {
      initialContext: {
        geo,
      },
      hasConsent: () => consent === "granted",
      onEvent: (e) => {
        const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
        w.dataLayer?.push({ event: "panorama", ...e });
      },
    });

    engineRef.current = engine;

    // Expose engine on window so CookieBanner can bridge consent changes
    (window as unknown as { __panorama?: PanoramaEngine }).__panorama = engine;

    // Subscribe to consent changes and forward to engine
    const unsubConsent = subscribeConsent((value) => {
      engine.setConsent(value === "granted");
    });

    return () => {
      engine.stop();
      engineRef.current = null;
      unsubConsent();
      delete (window as unknown as { __panorama?: PanoramaEngine }).__panorama;
    };
  }, []);

  // Record SPA navigations so currentPath triggers re-evaluate
  useEffect(() => {
    if (engineRef.current && pathname) {
      engineRef.current.recordPath(pathname);
    }
  }, [pathname]);

  return null;
}
