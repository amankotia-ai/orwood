<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the ORWOOD Next.js App Router site. Twelve events have been instrumented across nine files — covering the full enquiry funnel (form start → submit), high-intent signals (WhatsApp, CTA clicks, document requests), portfolio engagement (project and industry views), content engagement (journal articles), and outbound link tracking. Two server-side events are captured via `posthog-node` in the contact API route and the email-drip cron job, using the enquirer's email address as the `distinctId` so server events correlate with their client-side session. PostHog is initialized consent-gated (existing behaviour in `posthog-provider.tsx` is preserved).

| Event | Description | File |
|---|---|---|
| `contact_form_started` | User begins filling the contact form (first field interaction) | `components/contact-form.tsx` |
| `contact_form_submitted` | Successful contact form submission — the primary conversion event | `components/contact-form.tsx` |
| `whatsapp_clicked` | User clicks the floating WhatsApp button | `components/whatsapp-button.tsx` |
| `outbound_link_clicked` | User clicks an external link (architect credit, social profile) | `components/outbound-link.tsx` |
| `cta_clicked` | User clicks a CTA section button (Get in touch / Start a project) | `components/cta.tsx` |
| `project_viewed` | User views a project case study page — top of the portfolio funnel | `app/projects/[slug]/page.tsx` |
| `industry_viewed` | User views an industry/sector detail page | `app/industries/[slug]/page.tsx` |
| `document_requested` | User clicks to request a qualification document (fire test, PQQ) | `app/services/page.tsx` |
| `contact_method_clicked` | User clicks email or phone on the contact page | `app/contact/page.tsx` |
| `enquiry_received` | Server-side: enquiry validated and accepted by the API | `app/api/contact/route.ts` |
| `nurture_email_sent` | Server-side: nurture sequence email successfully sent | `app/api/cron/email-drip/route.ts` |
| `journal_article_viewed` | User views a journal article | `app/journal/[slug]/page.tsx` |

**New files created:**
- `lib/posthog-server.ts` — singleton `PostHog` client for server-side use
- `components/posthog-page-view.tsx` — client component that fires a named event on mount (used for "viewed" events in server-rendered pages)
- `components/contact-actions.tsx` — client component for tracked email/phone links
- `components/document-request-link.tsx` — client component for tracked document request mailto links

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/479941/dashboard/1751305)
- [Contact form conversion funnel](https://us.posthog.com/project/479941/insights/KauAB7bi)
- [Enquiries received over time](https://us.posthog.com/project/479941/insights/INJwzuQ2)
- [High-intent contact actions](https://us.posthog.com/project/479941/insights/e1dK8L9S)
- [Portfolio engagement — project views by sector](https://us.posthog.com/project/479941/insights/lGdGFsPU)
- [Industry interest breakdown](https://us.posthog.com/project/479941/insights/8yo4UbtL)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set. (Both keys have been added to `.env.local`; the `.env.example` already documents them as stubs — verify the values are correct.)
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
