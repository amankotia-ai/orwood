/**
 * Panorama personalization runtime — public API.
 * Zero dependencies. Bake into your repo, import, and initialise with a RuleSet.
 *
 *   import { initPanorama } from "./panorama/runtime/src";
 *   import rules from "./panorama.rules.json";
 *   initPanorama(rules, {
 *     isLoggedIn: () => !!session.user,
 *     hasConsent: () => consent.analytics,
 *     onEvent: (e) => analytics.track("panorama", e),   // forward to log_outcome
 *     antiFlicker: true,
 *   });
 */
export * from "./types";
export { buildContext, parseUtm, classifyDevice } from "./context";
export { applyMatcher, evaluateCondition } from "./triggers";
export { executeAction } from "./actions";
export { PanoramaEngine } from "./engine";

import { RuleSet, PanoramaOptions } from "./types";
import { PanoramaEngine } from "./engine";

export function initPanorama(ruleset: RuleSet, options: PanoramaOptions = {}): PanoramaEngine {
  const engine = new PanoramaEngine(ruleset, options);
  if (options.autoStart !== false) engine.start();
  return engine;
}
