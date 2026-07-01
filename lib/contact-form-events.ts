/**
 * Shared signal between the contact form and anything else on /contact that
 * needs to know whether the visitor has already engaged with it (currently
 * the exit-intent proof overlay). Kept in its own module so neither side
 * needs to import the other.
 *
 * `CONTACT_FORM_STARTED_EVENT` fires in the same tick a field is first
 * touched. `CONTACT_FORM_STARTED_KEY` persists that fact in sessionStorage so
 * a visitor who reloads or briefly leaves /contact after starting doesn't get
 * re-interrupted.
 */

export const CONTACT_FORM_STARTED_EVENT = "orwood:contact-form-started";
export const CONTACT_FORM_STARTED_KEY = "orwood_contact_form_started";

export function markContactFormStarted(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CONTACT_FORM_STARTED_KEY, "1");
  } catch {
    // sessionStorage unavailable — the in-tab event still covers this visit.
  }
  window.dispatchEvent(new Event(CONTACT_FORM_STARTED_EVENT));
}

export function hasContactFormStarted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(CONTACT_FORM_STARTED_KEY) === "1";
  } catch {
    return false;
  }
}
