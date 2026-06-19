export const ATTRIBUTION_STORAGE_KEY = "orwood_attribution";

export type UtmParams = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
};

export type AttributionSignals = UtmParams & {
  referrer?: string | null;
  device?: "mobile" | "tablet" | "desktop";
  isReturning?: boolean;
  landedAt?: string;
  referrerProject?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/** Read a campaign value from standard or compact query param names. */
export function getCampaignFromSearch(
  params: URLSearchParams | Record<string, string | string[] | undefined>
): string | null {
  const read = (key: string): string | null => {
    if (params instanceof URLSearchParams) {
      return params.get(key);
    }
    const raw = params[key];
    if (Array.isArray(raw)) return raw[0] ?? null;
    return raw ?? null;
  };

  return read("utm_campaign") ?? read("utmcampaign");
}

export function parseUtmFromSearch(
  params: URLSearchParams | Record<string, string | string[] | undefined>
): UtmParams {
  const read = (key: string): string | null => {
    if (params instanceof URLSearchParams) {
      return params.get(key);
    }
    const raw = params[key];
    if (Array.isArray(raw)) return raw[0] ?? null;
    return raw ?? null;
  };

  return {
    utm_source: read("utm_source"),
    utm_medium: read("utm_medium"),
    utm_campaign: getCampaignFromSearch(params),
    utm_term: read("utm_term"),
    utm_content: read("utm_content"),
  };
}

export function isHospitalityCampaign(campaign: string | null | undefined): boolean {
  if (!campaign) return false;
  return campaign.toLowerCase().includes("hospitality");
}

export function hasAnyUtm(utm: UtmParams): boolean {
  return UTM_KEYS.some((key) => utm[key] != null && utm[key] !== "");
}

export function readStoredAttribution(): Partial<AttributionSignals> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<AttributionSignals>;
  } catch {
    return null;
  }
}

export function persistAttribution(
  next: Partial<AttributionSignals>
): Partial<AttributionSignals> {
  if (typeof window === "undefined") return next;

  const existing = readStoredAttribution() ?? {};
  const merged = { ...existing, ...next };

  try {
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // sessionStorage unavailable
  }

  return merged;
}

export function captureAttributionFromLocation(): Partial<AttributionSignals> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utm = parseUtmFromSearch(params);
  const hasUtm = hasAnyUtm(utm);

  let isReturning = false;
  try {
    isReturning = localStorage.getItem("orwood_visited") === "1";
    if (!isReturning) localStorage.setItem("orwood_visited", "1");
  } catch {
    // ignore
  }

  const width = window.innerWidth;
  const device =
    width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";

  const payload: Partial<AttributionSignals> = {
    ...(hasUtm ? utm : {}),
    referrer: document.referrer || null,
    device,
    isReturning,
    landedAt: new Date().toISOString(),
  };

  return hasUtm || !readStoredAttribution()
    ? persistAttribution(payload)
    : readStoredAttribution() ?? payload;
}

export const HOSPITALITY_CONTACT = {
  index: "Hospitality fit-out",
  intro:
    "Hotels, resorts, restaurants and spas — we've delivered 60+ across the Gulf and beyond. Tell us about yours.",
  projectType: "Hospitality",
} as const;
