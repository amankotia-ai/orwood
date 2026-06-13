# Variant: Mobile Progressive Disclosure Form

**Page:** `/contact`
**Type:** Device-responsive variant
**Trigger:** Viewport < 768px (mobile)

## Problem

The current form renders all 7 fields (name, email, company, country, project type, budget, message) identically on mobile and desktop. On a 375px screen, the visitor sees a long scroll of underline-styled inputs before reaching the submit button. High-consideration B2B visitors on mobile — checking the site from a meeting, a site visit, or a taxi — face unnecessary friction.

Only 3 fields are required (name, email, message). The 4 optional fields (company, country, project type, budget) add qualification value but are not worth losing the submission entirely.

## What changes

On viewports < 768px:

1. **Phase 1 (visible):** Show only the 3 required fields — Name, Email, Message — plus the submit button.
2. **"Add project details" toggle:** A subtle link below the message field: *"Add company, location & budget details"*. Tapping it reveals the 4 optional fields with a smooth expand animation (Framer Motion `AnimatePresence`).
3. **Submit button always visible:** On mobile, the CTA stays in the initial viewport without requiring the user to scroll past optional fields.
4. **Desktop unchanged:** Viewport >= 768px renders the full 7-field form as-is.

### Implementation sketch

```tsx
const isMobile = useMediaQuery("(max-width: 767px)");
const [showOptional, setShowOptional] = useState(false);

// Required fields always render
// Optional fields render if !isMobile || showOptional
```

## Rationale

- Reduces perceived form length by ~60% on mobile (3 fields vs 7)
- Maintains full qualification when the visitor chooses to expand
- Aligns with the brand's "quiet, no-clutter" design principle
- Does not change the API contract — optional fields simply arrive empty if not expanded

## Success metric

Mobile form completion rate (submit / form-impression) should increase vs baseline. Track via the `_attribution.device` field from the signal-capture variant.
