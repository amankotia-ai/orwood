/** Visitor-context builder. SSR-safe (guards all browser globals). */
import { PanoramaOptions, VisitorContext } from "./types";

const ls = (k: string): string | null => { try { return typeof localStorage !== "undefined" ? localStorage.getItem(k) : null; } catch { return null; } };
const lsSet = (k: string, v: string): void => { try { if (typeof localStorage !== "undefined") localStorage.setItem(k, v); } catch { /* ignore */ } };
const ss = (k: string): string | null => { try { return typeof sessionStorage !== "undefined" ? sessionStorage.getItem(k) : null; } catch { return null; } };
const ssSet = (k: string, v: string): void => { try { if (typeof sessionStorage !== "undefined") sessionStorage.setItem(k, v); } catch { /* ignore */ } };

/** Pure: parse UTM params from a query string. */
export function parseUtm(search: string): Record<string, string> {
  const out: Record<string, string> = {};
  const q = new URLSearchParams(search || "");
  for (const k of ["source", "medium", "campaign", "term", "content"]) {
    const v = q.get("utm_" + k);
    if (v) out[k] = v;
  }
  return out;
}

/** Pure: classify device from user-agent + viewport. */
export function classifyDevice(ua: string, width: number, height = 0): VisitorContext["device"] {
  const u = (ua || "").toLowerCase();
  const isMobileUa = /mobi|iphone|android.*mobile|ipod/.test(u);
  const isTabletUa = /ipad|tablet|android(?!.*mobile)/.test(u);
  let type: "mobile" | "tablet" | "desktop";
  if (isMobileUa) type = "mobile";
  else if (isTabletUa) type = "tablet";
  else if (width > 0 && width < 768) type = "mobile";
  else if (width > 0 && width < 1024) type = "tablet";
  else type = "desktop";
  const browser = /edg\//.test(u) ? "edge" : /chrome|crios/.test(u) ? "chrome" : /firefox|fxios/.test(u) ? "firefox" : /safari/.test(u) ? "safari" : "other";
  const os = /windows/.test(u) ? "windows" : /mac os|macintosh/.test(u) ? "macos" : /android/.test(u) ? "android" : /iphone|ipad|ios/.test(u) ? "ios" : /linux/.test(u) ? "linux" : "other";
  return { type, browser, os, mobile: isMobileUa || type === "mobile", viewportWidth: width, viewportHeight: height };
}

export function buildContext(opts: PanoramaOptions = {}): VisitorContext {
  const w: any = typeof window !== "undefined" ? window : undefined;
  const loc = (w && w.location) || { href: "", search: "", pathname: "/" };
  const nav: any = typeof navigator !== "undefined" ? navigator : { userAgent: "" };
  const width = (w && w.innerWidth) || 0;
  const height = (w && w.innerHeight) || 0;
  const device = classifyDevice(nav.userAgent, width, height);

  const now = Date.now();
  let sessionStart = parseInt(ss("pa_session_start") || "0", 10);
  if (!sessionStart) { sessionStart = now; ssSet("pa_session_start", String(now)); }

  const everSeen = ls("pa_seen") === "1";
  lsSet("pa_seen", "1");

  const sessViews = (parseInt(ss("pa_pv") || "0", 10) || 0) + 1; ssSet("pa_pv", String(sessViews));
  const allViews = (parseInt(ls("pa_pv_all") || "0", 10) || 0) + 1; lsSet("pa_pv_all", String(allViews));

  const path = loc.pathname || "/";
  let pathViews: Record<string, number> = {};
  try { pathViews = JSON.parse(ls("pa_pv_path") || "{}"); } catch { pathViews = {}; }
  pathViews[path] = (pathViews[path] || 0) + 1; lsSet("pa_pv_path", JSON.stringify(pathViews));

  const base: VisitorContext = {
    url: loc.href || "",
    path,
    referrer: (typeof document !== "undefined" ? document.referrer : "") || "",
    utm: parseUtm(loc.search || ""),
    device,
    geo: {},
    session: {
      isNew: !everSeen,
      isReturning: everSeen,
      loggedIn: opts.isLoggedIn ? !!opts.isLoggedIn() : false,
      sessionExpired: false,
      authState: "",
      pageViews: sessViews,
      sessionStart,
    },
    engagementScore: 0,
    viewCounts: { session: sessViews, all: allViews },
    pathViews,
    consent: opts.hasConsent ? !!opts.hasConsent() : true,
  };

  const inj = opts.initialContext || {};
  return {
    ...base,
    ...inj,
    device: { ...base.device, ...(inj.device || {}) },
    geo: { ...base.geo, ...(inj.geo || {}) },
    session: { ...base.session, ...(inj.session || {}) },
    utm: { ...base.utm, ...(inj.utm || {}) },
    viewCounts: { ...base.viewCounts, ...(inj.viewCounts || {}) },
    pathViews: { ...base.pathViews, ...(inj.pathViews || {}) },
  };
}
