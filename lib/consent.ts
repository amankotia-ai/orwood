/**
 * Cookie-consent store — the single source of truth for analytics consent.
 *
 * The site loads Google Analytics (gtag.js) ONLY after the visitor explicitly
 * accepts, satisfying GDPR/ePrivacy/PECR for the UK & EU traffic ORWOOD serves.
 * Both the consent banner and the analytics loader read and write through here
 * so there is never a split-brain between the UI and what actually loads.
 *
 * Consent is persisted in localStorage. A change dispatches a window event so
 * every mounted component (banner, analytics) reacts in the same tick, and a
 * native `storage` event keeps other tabs in sync.
 */

export const GA_MEASUREMENT_ID = "G-6QXNY09NTC";

const CONSENT_KEY = "orwood-consent";
const CHANGE_EVENT = "orwood-consent-change";

/** `null` = undecided (banner should show); otherwise the visitor's choice. */
export type Consent = "granted" | "denied" | null;

export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Exclude<Consent, null>): void {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // localStorage unavailable — still notify listeners for this session.
  }
  dispatch(value);
}

/** Clear the stored choice so the banner reappears (used by "Manage cookies"). */
export function resetConsent(): void {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // ignore
  }
  dispatch(null);
}

function dispatch(value: Consent): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<Consent>(CHANGE_EVENT, { detail: value }));
}

/** Subscribe to consent changes (this tab + other tabs). Returns an unsubscribe. */
export function subscribeConsent(cb: (value: Consent) => void): () => void {
  const onCustom = (e: Event) => cb((e as CustomEvent<Consent>).detail);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY) cb(getConsent());
  };
  window.addEventListener(CHANGE_EVENT, onCustom);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}
