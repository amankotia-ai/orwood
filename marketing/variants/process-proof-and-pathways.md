# Variant: /process — Proof & Pathways

**Page:** /process
**Source segment:** All (structural improvement; no source-specific targeting)
**Agent:** conversion
**Run:** run-10095621-8c8e-4e5e-bad9-9d46d0de7bb8
**Status:** Draft — propose-and-approve via PR

---

## Diagnosis

The /process page explains ORWOOD's 7-step delivery methodology clearly and on-brand — but it operates as a sealed corridor: visitors enter, read, and hit a bottom-funnel CTA with no proof, no cross-links, and no named assets along the way. For a high-consideration sale where buyers check 3–5 pages before enquiring, this breaks the evaluation chain.

Three specific mismatches, mapped to ICP segments:

| Visitor | Intent on /process | What the page gives them | Mismatch |
|---|---|---|---|
| **Procurement team** | Qualify vendor: owned capability, certifications, references | "Our own workshops" — unnamed, unlinked | Claim without proof; they leave to verify elsewhere |
| **Specifier (architect / ID)** | Check execution tolerance, fire/acoustic compliance | "Shop drawings, tolerances, acoustic and fire performance" — no link to certifications or /manufacturing | Dead-end text; can't reach the evidence |
| **Hospitality principal** | Confirm delivery certainty, see completed projects | 7 steps described in abstract; no reference to 200+ delivered projects | Process without track record |

---

## Variant changes

### 1. Name the moat in step 04 (Manufacturing)

**Current:** "Furniture, joinery and doors are made in our own workshops, prototyped and quality-checked before anything ships."

**Proposed:** "Furniture is made at Hi Mobilya, surfaces developed by SILADU, and doors engineered through ORWOOD Doors — prototyped and quality-checked in our own workshops before anything ships."

*Rationale:* Three named brands are verifiable; "our own workshops" is not. Procurement teams search brand names; specifiers check manufacturer credentials. This is the moat — surface it where the story demands it.

### 2. Add inline cross-links to 3 key steps

- **Step 03 (Engineering):** Link "acoustic and fire performance" to /manufacturing
- **Step 04 (Manufacturing):** Link brand names to /manufacturing
- **Step 05 (Procurement):** Link "FF&E" to /services (FF&E Procurement block)

*Rationale:* The process page becomes a hub, not a dead end. Each link sends the visitor deeper into proof without disrupting the reading flow.

### 3. Reframe the CTA for mid-funnel intent

**Current:**
- Title: "Ready to start at stage one?"
- Body: "Bring us the brief and the date. We'll take it from discovery all the way to handover."
- Button: "Start a project" to /contact

**Proposed:**
- Title: "See the process in a delivered project."
- Body: "Every stage runs the same way — from a five-star lobby in the Gulf to a private residence in London. See how."
- Primary button: "View projects" to /projects
- Secondary (text link): "Or start a conversation" to /contact

*Rationale:* /process visitors are evaluating, not buying. The natural next step is evidence (case studies), not the enquiry form. The secondary link keeps the conversion path available without forcing it.

---

## Brand-voice check

- Tone: confident, spare, concrete. No superlatives, no exclamation marks, no hype.
- Vocabulary: "prototyped", "quality-checked", "specified, sourced and consolidated" — all existing ORWOOD register.
- Naming the brands is factual, not promotional — it's how Poliform/Minotti pages reference their own lines.
- CTA reframe uses the same understated, show-don-claim tone.

## Claim safety

- Hi Mobilya, SILADU, ORWOOD Doors: confirmed in Context Graph product data and group structure.
- "200+ projects": confirmed in product highlights; used only in rationale, not in variant copy.
- No unverifiable superlatives. No comparative claims.

## Accessibility

- Cross-links are standard Link elements — keyboard navigable, screen-reader accessible.
- No layout changes; grid structure unchanged.
- Secondary CTA as text link maintains single-primary-action clarity.

---

## Rubric self-score (baseline vs variant)

| Criterion | Baseline | Variant | Delta |
|---|---|---|---|
| Message-match to source intent | 1 | 2 | +1 |
| Clarity | 2 | 3 | +1 |
| Single clear action | 2 | 3 | +1 |
| Proof strength | 0 | 2 | +2 |
| Brand fit | 3 | 3 | 0 |
| Claim safety | 3 | 3 | 0 |
| Change accessibility | 2 | 3 | +1 |
| **Total** | **13** | **19** | **+6** |

Baseline does not meet shippable bar (proof strength = 0). Variant clears it (19/21, no zeros).

---

## Implementation notes

- Content change only — edit lib/content.ts process array (step 04 body).
- Cross-links require changing the process step rendering in app/process/page.tsx to support inline links (ReactNode body instead of string, or markdown parsing).
- CTA change: update the CTA props in app/process/page.tsx and add a secondary link.
- No new components needed. No JavaScript. No personalization runtime.
- Ship via PR (ships-changes) for user approval.
