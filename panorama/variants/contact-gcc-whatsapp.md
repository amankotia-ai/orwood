# Variant: GCC Traffic — WhatsApp CTA & Geo Pre-fill

**Page:** `/contact`
**Type:** Geography-segmented variant
**Trigger:** `x-vercel-ip-country` in `[AE, SA, QA, BH, KW, OM]` OR `utm_campaign` contains `gcc`

## Problem

Two gaps compound for GCC visitors:

1. **No WhatsApp CTA.** The SOW (Jun 2026) specifies WhatsApp click-to-chat as a conversion path, yet /contact only offers the form + email + phone. In GCC business culture, WhatsApp is the dominant first-contact channel for high-value services. A hospitality developer in Dubai is more likely to tap a WhatsApp link than fill a 7-field form.

2. **No geo pre-fill.** The Country field is a blank text input. A visitor from the UAE must type their country manually — trivial friction, but friction that signals "this form doesn't know who I am." Geo-IP headers (`x-vercel-ip-country`) can pre-fill this field, reducing effort and signaling awareness.

## What changes

### For GCC-detected visitors:

1. **WhatsApp CTA in sidebar.** Add a "Message us on WhatsApp" button in the sidebar (below the "Direct" section), styled as a secondary action:
   - Quiet, brand-consistent: ink border, clay hover, no green WhatsApp branding
   - `href="https://wa.me/{number}?text=..."` with a pre-filled message: *"Hi — I'm enquiring about a project."*
   - WhatsApp number sourced from `site.whatsapp` in `lib/content.ts` (needs adding)

2. **Country field pre-filled** from `x-vercel-ip-country` header, passed as a prop from the server component. Visitor can override. Display the country name, not the ISO code.

3. **Budget labels contextualised.** Append "(USD)" to budget ranges for clarity in a multi-currency region. (Not a full localisation — just disambiguation.)

### For non-GCC visitors:

No change. WhatsApp CTA does not appear; country field remains blank.

### Data flow

The server component (`app/contact/page.tsx`) reads `headers()` → `x-vercel-ip-country`. If the country is in the GCC set, it passes `geoCountry` and `showWhatsApp` as props to the client form component.

## Rationale

- WhatsApp is already in the SOW as a conversion path — this implements it where it matters most
- GCC is the #1 target geography per delivered-project concentration
- Geo-IP pre-fill is zero-friction personalisation that costs nothing and signals sophistication
- The variant is server-detected (no client JS geo-lookup), so there's no layout shift

## Success metric

- WhatsApp click-through rate for GCC visitors (new event: `whatsapp_click`)
- Form submission rate for GCC visitors vs baseline (does WhatsApp cannibalise or complement?)
- Country field accuracy (pre-filled vs manually entered)
