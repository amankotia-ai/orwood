/**
 * Panorama personalization runtime — rule schema.
 * Zero dependencies. The declarative contract the Conversion agent authors
 * and the runtime executes.
 */

// ---------- Operators ----------
export type Operator =
  | "equals" | "notEquals"
  | "contains" | "notContains"
  | "startsWith" | "endsWith"
  | "matches"              // regex (string)
  | "in" | "notIn"         // multiple-value membership
  | "gt" | "gte" | "lt" | "lte"
  | "exists" | "notExists";

export interface Matcher {
  op: Operator;
  /** Comparison value. Arrays are used with in/notIn; numbers with gt/gte/lt/lte. */
  value?: string | number | boolean | Array<string | number>;
  /** Case-insensitive string compares (default true). */
  caseInsensitive?: boolean;
}

export type TimeframeWindow = "session" | "day" | "week" | "month" | "all";
export interface Timeframe { window: TimeframeWindow; }

// ---------- Triggers (the "trigger system") ----------
export type TriggerCondition =
  // boolean composition
  | { type: "all"; conditions: TriggerCondition[] }
  | { type: "any"; conditions: TriggerCondition[] }
  | { type: "not"; condition: TriggerCondition }
  // visitor behavior intelligence
  | { type: "pageViewCount"; match: Matcher; timeframe?: Timeframe; path?: Matcher }
  | { type: "timeOnPage"; seconds: number }            // fires when time-on-page >= seconds
  | { type: "inactivity"; seconds: number }            // fires after idle >= seconds
  | { type: "sessionDuration"; seconds: number }
  | { type: "scrollDepth"; percent: number }           // fires when scroll >= percent (0..100)
  | { type: "elementVisible"; selector: string; once?: boolean }
  | { type: "exitIntent" }
  | { type: "engagementScore"; match: Matcher }
  // user journey
  | { type: "journey"; path: string[]; order: "sequential" | "any"; within?: Timeframe }
  | { type: "funnelStep"; step: string; reached: boolean }
  // traffic source intelligence
  | { type: "utm"; param: "source" | "medium" | "campaign" | "term" | "content"; match: Matcher }
  | { type: "referrer"; match: Matcher }
  // geographic & device intelligence
  | { type: "geo"; field: "country" | "region" | "city" | "timezone" | "isp" | "org" | "ipType"; match: Matcher }
  | { type: "device"; field: "type" | "browser" | "os" | "viewportWidth" | "viewportHeight" | "mobile"; match: Matcher }
  // session & context intelligence
  | { type: "session"; field: "loggedIn" | "isReturning" | "isNew" | "sessionExpired" | "authState"; match: Matcher }
  // current page
  | { type: "currentPath"; match: Matcher };

// ---------- Actions (the "action framework") ----------
export type AnimationStyle = "none" | "fade" | "slide" | "zoom" | "bounce";
export type OverlayType = "popup" | "banner" | "sidebar" | "tooltip" | "fullscreen" | "corner";
export type OverlayPosition =
  | "center" | "top" | "bottom" | "left" | "right"
  | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface FormField {
  name: string;
  label: string;
  inputType: string;          // text, email, tel, select, ...
  required?: boolean;
  options?: string[];         // for select
  placeholder?: string;
}

export type Action =
  // content transformation
  | { type: "textReplace"; selector?: string; find?: string; replace: string; all?: boolean }
  | { type: "setVisibility"; selector: string; visible: boolean; animation?: AnimationStyle; durationMs?: number }
  | { type: "setStyle"; selector: string; styles: Record<string, string> }
  | { type: "addClass"; selector: string; className: string }
  | { type: "removeClass"; selector: string; className: string }
  // navigation & flow
  | { type: "redirect"; url: string; newTab?: boolean }
  | { type: "modifyButton"; selector: string; label?: string; href?: string; clickEvent?: string }
  // advanced UX
  | { type: "overlay"; overlay: OverlayType; position?: OverlayPosition; animation?: AnimationStyle; html: string; autoCloseMs?: number; dismissible?: boolean; id?: string }
  | { type: "injectField"; formSelector: string; field: FormField; position?: "start" | "end" | number }
  | { type: "personalize"; selector: string; source: "behavior" | "location" | "history" | "recommendation"; html?: string; fallback?: string };

// ---------- Rule envelope ----------
export type RuleStatus = "draft" | "active" | "paused";

export interface Rule {
  id: string;
  name: string;
  description?: string;
  status: RuleStatus;
  /** When to fire. A single condition tree (use all/any/not to compose). */
  audience: TriggerCondition;
  /** What to do when the audience matches. */
  actions: Action[];
  /** Higher wins when rules touch the same element. Default 0. */
  priority?: number;
  /** Fraction (0..1) deterministically held back as a control group. Default 0. */
  holdout?: number;
  /** Cap how often a rule fires per visitor. */
  frequencyCap?: { per: "session" | "day" | "ever"; max: number };
  /** The conversion metric this rule targets (for outcome measurement). */
  metric?: string;
  /** Source segment label (e.g. from utm_segment.py). */
  segment?: string;
  /** Gate execution on visitor consent (geo/IP/identity-touching rules). */
  consentRequired?: boolean;
  /** Optional ISO date window. */
  schedule?: { start?: string; end?: string };
}

export interface RuleSet {
  version: string;
  rules: Rule[];
}

// ---------- Visitor context & live signals (runtime) ----------
export interface VisitorContext {
  url: string;
  path: string;
  referrer: string;
  utm: Partial<Record<"source" | "medium" | "campaign" | "term" | "content", string>>;
  device: {
    type: "mobile" | "tablet" | "desktop";
    browser: string;
    os: string;
    mobile: boolean;
    viewportWidth: number;
    viewportHeight: number;
  };
  /** Populated from edge headers / injected context — empty if unknown. */
  geo: Partial<Record<"country" | "region" | "city" | "timezone" | "isp" | "org" | "ipType", string>>;
  session: {
    isNew: boolean;
    isReturning: boolean;
    loggedIn: boolean;
    sessionExpired: boolean;
    authState: string;
    pageViews: number;
    sessionStart: number;
  };
  engagementScore: number;
  /** Cross-session view counts by window, and per-path view counts. */
  viewCounts: Partial<Record<TimeframeWindow, number>>;
  pathViews: Record<string, number>;
  consent: boolean;
}

/** Live, time-varying signals evaluated against behavioral triggers. */
export interface LiveSignals {
  scrollPercent: number;
  timeOnPageSec: number;
  idleSec: number;
  sessionDurationSec: number;
  exitIntent: boolean;
  visibleSelectors: Set<string>;
  journey: string[];
  funnelSteps: Set<string>;
}

export type PanoramaEvent =
  | { kind: "rule_matched"; ruleId: string; segment?: string; metric?: string }
  | { kind: "rule_applied"; ruleId: string; actions: number }
  | { kind: "rule_held_out"; ruleId: string }
  | { kind: "rule_skipped"; ruleId: string; reason: string }
  | { kind: "action_error"; ruleId: string; error: string }
  | { kind: "interaction"; ruleId: string; detail: string };

export interface PanoramaOptions {
  /** Injected context (e.g. geo from edge headers, auth state from the app). */
  initialContext?: Partial<VisitorContext>;
  /** Outcome instrumentation sink — forward to analytics / log_outcome. */
  onEvent?: (e: PanoramaEvent) => void;
  /** Authoritative login check from the host app. */
  isLoggedIn?: () => boolean;
  /** Consent signal; rules with consentRequired wait for true. */
  hasConsent?: () => boolean;
  /** Hide <html> until first evaluation to prevent flicker (default false). */
  antiFlicker?: boolean;
  /** Max ms to hold the anti-flicker veil (default 1500). */
  antiFlickerTimeoutMs?: number;
  /** Start automatically on init (default true). */
  autoStart?: boolean;
}
