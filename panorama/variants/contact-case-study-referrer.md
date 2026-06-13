# Variant: Case Study Referrer — Contextual Header & Pre-select

**Page:** `/contact`
**Type:** Referrer-segmented variant
**Trigger:** Internal referrer path matches `/projects/[slug]`

## Problem

A visitor who just spent time on a case study page (e.g. `/projects/hotel-noor`) has strong intent and a specific context. They've seen the work, they know the sector, they may be imagining a similar project. But when they click "Start a project" and land on /contact, they get a generic header:

> *"Let's build something."*
> *"Tell us what you're making."*

The narrative thread snaps. The page doesn't acknowledge what they just saw, doesn't pre-select the relevant sector, and doesn't reduce friction by inferring their interest.

## What changes

### When referrer matches `/projects/[slug]`:

1. **Contextual header copy.** Replace the generic intro with a variant that references the project:
   - Eyebrow: "Contact" (unchanged)
   - Index: "Inspired by {project.title}?" (e.g. "Inspired by Hotel Noor?")
   - Title: "Let's build something." (unchanged — still works)
   - Intro: "Loved the {project.sector} work? Tell us about yours — we'll bring the same rigour to your project."

2. **Pre-select project type.** Map the case study's sector to the Project Type dropdown and pre-select it. Visitor can override.

3. **Pass referrer context to API.** Include `_attribution.referrerProject: "hotel-noor"` in the submission payload, enabling lead scoring (visitors who came via a case study are warmer leads).

### Implementation

The server component reads the `referer` header (note: HTTP spelling). If it matches the pattern `/projects/(.+)`, it looks up the project slug in the content data to get the title and sector. These are passed as props to the client component.

```tsx
// app/contact/page.tsx (server component)
const referer = headers().get("referer") ?? "";
const match = referer.match(/\/projects\/([^/?#]+)/);
const referrerProject = match ? projects.find(p => p.slug === match[1]) : null;
```

### Fallback

If the slug doesn't match a known project (e.g. URL changed, project unpublished), fall back to the generic header. No error, no broken state.

## Rationale

- Case study pages are the #1 conversion asset (SOW-confirmed); continuing their narrative into the form is the highest-leverage referrer adaptation
- Pre-selecting the sector removes one decision from the visitor and signals "we know what you're looking for"
- The referrer project tag in the submission helps the sales team personalise their reply

## Success metric

- Form submission rate for case-study-referred visitors vs direct/other-referred visitors
- Correlation between referrer project and selected project type (does the pre-select hold?)
