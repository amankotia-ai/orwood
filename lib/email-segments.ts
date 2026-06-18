/* ============================================================
   Email segment routing
   Maps enquiry-form project types to nurture-sequence tracks.
   ============================================================ */

export type EmailTrack =
  | "hospitality"
  | "specifier"
  | "residential"
  | "procurement";

/**
 * Resolve the nurture-email track from the contact-form fields.
 *
 * Priority:
 * 1. Budget ≥ $5M with any commercial/hospitality type → procurement fast-track
 *    (large-budget leads need documents on Day 0, not a 21-day arc)
 * 2. Project type "Residential" → residential track
 * 3. Project type is a specifier-adjacent sector (Commercial, Retail, Mixed-use)
 *    → specifier track
 * 4. Everything else (Hospitality, F&B, blank, "Not sure yet") → hospitality
 *    track (the original sequence, with GCC proof added)
 */
export function resolveTrack(fields: {
  projectType?: string;
  budget?: string;
  message?: string;
}): EmailTrack {
  const type = (fields.projectType ?? "").trim().toLowerCase();
  const budget = (fields.budget ?? "").trim();

  // Procurement fast-track: explicit large-budget signals
  if (budget === "$5M+" && type !== "residential") {
    return "procurement";
  }

  // Message-based procurement signal: mentions of PQQ, tender, RFP, ITT
  const msg = (fields.message ?? "").toLowerCase();
  if (/\b(pqq|rfp|itt|tender|pre.?qual)\b/.test(msg)) {
    return "procurement";
  }

  // Residential track
  if (type === "residential") {
    return "residential";
  }

  // Specifier track: design-led commercial sectors
  if (["commercial", "retail", "mixed-use"].includes(type)) {
    return "specifier";
  }

  // Default: hospitality track (also covers Hospitality, F&B, blank, "not sure yet")
  return "hospitality";
}

/** Number of emails in each track's sequence. */
export const TRACK_LENGTH: Record<EmailTrack, number> = {
  hospitality: 5,
  specifier: 5,
  residential: 5,
  procurement: 3,
};

/** Day offsets for each email in a track. */
export const TRACK_SCHEDULE: Record<EmailTrack, number[]> = {
  hospitality: [0, 3, 7, 14, 21],
  specifier: [0, 3, 7, 14, 21],
  residential: [0, 3, 7, 14, 21],
  procurement: [0, 1, 3], // fast-track: documents within 3 days
};
