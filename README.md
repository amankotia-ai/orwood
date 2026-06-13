# ORWOOD — Website Redesign

A redesign of [orwood.com](https://orwood.com) — ORWOOD is a global interior
fit-out atelier (design & build, FF&E, contract furniture, joinery, doors and
turnkey interiors).

**Design direction:** minimal, photography-led, near-monochrome — in the spirit
of high-end furniture houses (Poliform / Minotti). A single refined grotesque at
light weights, generous whitespace, full-bleed imagery, and a deep oxblood
(`#732017`) brand accent used sparingly.

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **Framer Motion** (interactions: gallery filter, mobile menu, contact form)
- Type: **Hanken Grotesk** via `next/font`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
app/
  layout.tsx          # fonts, metadata, header + footer
  globals.css         # design tokens (@theme), base styles
  page.tsx            # Home
  services/page.tsx   # Services + process
  projects/page.tsx   # Projects (filterable gallery)
  about/page.tsx      # About, values, group, quality
  contact/page.tsx    # Contact + form
  icon.svg            # favicon
components/
  site-header.tsx     # sticky nav + animated mobile menu
  site-footer.tsx
  artwork.tsx         # tonal IMAGE PLACEHOLDER (swap for real photos)
  reveal.tsx          # scroll reveal (IntersectionObserver)
  project-card.tsx, projects-gallery.tsx, contact-form.tsx
  stat-counter.tsx, page-header.tsx, cta.tsx, grain.tsx, marquee.tsx
  ui/button.tsx
lib/
  content.ts          # ALL copy + data (single source of truth)
  cn.ts
```

## Design tokens

Defined in [`app/globals.css`](app/globals.css) under `@theme`:

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#f4f3ef` | page background (clean off-white) |
| `ink` | `#18120f` | text |
| `walnut` / `espresso` | `#1f1b19` / `#141110` | dark sections / footer |
| `stone` | `#6d6862` | muted text |
| `clay` | `#732017` | **oxblood brand accent** (sparingly) |

Headings use the grotesque at weight 300. Small tracked labels use the `.label`
utility.

## Replacing placeholder content before launch

This is a design build with representative placeholder content. To go live:

1. **Photography** — every image area renders `<Artwork tone={n} />`, a tonal
   placeholder. Replace each with a real photo (e.g. `next/image`); the
   containers already clip + `object-cover`.
2. **Copy & data** — edit [`lib/content.ts`](lib/content.ts): real projects,
   stats, services, addresses, phone, email, social links.
3. **Contact form** — [`components/contact-form.tsx`](components/contact-form.tsx)
   validates client-side then stops at a success state. Wire `onSubmit` to your
   endpoint (e.g. an `/api/contact` route, Resend, or Formspree).
4. **Domain / SEO** — update `metadataBase` and OpenGraph in
   [`app/layout.tsx`](app/layout.tsx).

## Deploy

Optimised for **Vercel**: push the repo and import, or run `vercel`. No env vars
required for the static build.
