# Variant: UTM & First-Party Signal Capture

**Page:** `/contact`
**Type:** Infrastructure (prerequisite for all other variants)
**Priority:** P0 — nothing downstream works without this

## Problem

The contact form submits seven visible fields to `/api/contact` but zero attribution signals. There is no `useSearchParams()` call, no `document.referrer` read, no device/viewport sniff, and no new-vs-returning cookie. Every enquiry arrives as an orphan — impossible to attribute to a channel, campaign, or referrer page.

Without attribution, the team cannot:
- Measure which channel (organic, paid, referral, social, direct) converts best
- Know which case study or service page drove the enquiry
- Score leads by intent signals (e.g. visited 3+ pages, came from a GCC IP)
- A/B test any variant meaningfully

## What changes

### Client (`contact-form.tsx`)

1. **Read UTM params on mount** via `useSearchParams()`:
   - `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
2. **Read `document.referrer`** on mount (internal referrer = which page they came from).
3. **Detect device class** from `window.innerWidth` (mobile < 768, tablet < 1024, desktop).
4. **Check returning visitor** — set a `orwood_visited` localStorage key on first visit; read it to flag `isReturning: true/false`.
5. **Forward all signals** as hidden fields in the JSON body alongside the visible form fields.

### Server (`/api/contact/route.ts`)

1. **Accept and log** the new attribution fields.
2. **Read `x-forwarded-for` / Vercel geo headers** (`x-vercel-ip-country`, `x-vercel-ip-city`) to capture geo without client-side API calls.
3. **Include attribution** in the email/CRM payload when a provider is wired.

### Payload shape (addition)

```json
{
  "name": "...",
  "email": "...",
  "_attribution": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "gcc-hospitality-q3",
    "utm_term": null,
    "utm_content": null,
    "referrer": "https://orwood.com/projects/hotel-noor",
    "device": "mobile",
    "country": "AE",
    "city": "Dubai",
    "isReturning": false,
    "landedAt": "2026-06-12T14:30:00Z"
  }
}
```

## Why this variant first

Every subsequent variant (GCC WhatsApp, case-study referrer, mobile progressive form) depends on knowing who the visitor is. Ship signal capture as the foundation; gate variant rollout behind it.

## Success metric

100% of form submissions include a populated `_attribution` object within 7 days of deploy.
