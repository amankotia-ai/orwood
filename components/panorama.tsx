"use client";

import { useEffect } from "react";
import { initPanorama, type RuleSet } from "@/panorama/runtime";
import rules from "@/panorama.rules.json";

/**
 * Panorama personalization runtime. Reads panorama.rules.json and serves the
 * matching variant by visitor context (utm / geo / returning) — entirely
 * client-side, no external calls. The Conversion agent authors the rules file;
 * this mounts the engine once in the root layout.
 */
export function Panorama() {
  useEffect(() => {
    const engine = initPanorama(rules as RuleSet, {
      // Forward rule outcomes to analytics (GTM dataLayer if present) so lift
      // can flow back to Panorama's outcome graph. No-op when absent.
      onEvent: (e) => {
        const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
        w.dataLayer?.push({ event: "panorama", ...e });
      },
    });
    return () => engine.stop();
  }, []);
  return null;
}
