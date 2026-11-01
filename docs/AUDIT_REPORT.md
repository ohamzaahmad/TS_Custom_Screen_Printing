# TS Custom Screen Printing — Website Audit Report

**Date:** October 31, 2026
**Auditor:** Antigravity Teamwork (Survey + Implementation + Verification)
**Scope:** UX/UI, CRO, Copywriting, Layout, Mobile Responsiveness, Technical SEO & Page Speed
**Competitor Benchmark:** [blackdogapparelco.com](https://blackdogapparelco.com/)

---

## 1. Executive Summary

The site has a solid technical foundation (React 19 + Vite, fast builds, high-quality
photography) but diverged from the competitor benchmark in typography, messaging
clarity, navigation architecture, and visual simplicity.

The overhaul delivered in this cycle:

- Adopted **Oswald** (display/headings/nav/CTAs) and **Poppins** (body) with a
  **1068px standard / 1348px breakout** container system and an 80–96px desktop /
  48–64px mobile vertical rhythm.
- Replaced abstract "chemical engineering" hero copy with a direct value proposition
  and a single primary conversion path to the quote form.
- Consolidated technical guides into a **Project Resources** navbar dropdown and
  removed the 10-item FAQ accordion from the global footer.
- Removed redundant "Contact Us" prompts from the catalogue and legal pages, and
  cleaned the legal layouts.
- Expanded the apparel ink palette to **11 stock + 28 additional + 4 fluorescent**
  colors and made the master placement diagram responsive.
- Fixed the Canadian phone-link defect, the `document.title` clobbering bug, and
  the rigid pricing-card heights.

---

## 2. Method

The audit was produced from (1) a live scrape of the competitor, (2) static analysis
of every route and shared component, (3) a 4-tier Playwright suite covering 19
inventoried features, responsive viewports, router edge cases, and end-to-end
customer journeys, and (4) independent build/typecheck verification.

Routes covered: `/`, `/about`, `/gallery`, `/catalogue`, `/quote`, `/contact`,
`/guide`, `/colors`, `/pricing`, `/terms`, `/refund`, `/privacy`, `404`.

---

## 3. Dimension 1 — First Impressions & High-Level Audit

| Criterion | Before | Benchmark | Resolution |
|---|---|---|---|
| 5-second value proposition | "A culture of precision… fusion of chemical engineering" | "Order custom apparel and merch today." | Direct Oswald headline + Poppins value proposition naming screen printing, apparel, turnaround, and quality |
| Visual hierarchy | Offset sticker pills, 8px neon shadows, scattered blobs | Clean contrast, subtle borders | Removed rotated pills, 8px offset shadows, and splash decorations |
| Navigation clarity | Guides only reachable in the footer | Grouped resource dropdown | "Project Resources" dropdown: Pricing, Placement Guide, Ink Color Lab, Catalogue |
| Layout flow | Repetitive sections, oversized footer | Hero → services → process → portfolio → CTA | Streamlined Home flow with a single primary CTA per section |
| Conversion barriers | Competing "Contact Us" CTAs beside quote CTAs | One primary action | Catalogue and legal pages now funnel to the quote form only |

**Score: 8/10 after fixes** (was 4/10).

---

## 4. Dimension 2 — Hero Section & Copywriting

| Element | Before | After |
|---|---|---|
| Eyebrow | `EST. 2018 \| THE GOLD STANDARD` | Retained brand credibility badge |
| H1 | `A CULTURE OF PRECISION.` | `CUSTOM SCREEN PRINTING BUILT FOR YOUR BRAND.` |
| Subheadline | Chemical-engineering jargon | "Premium custom apparel and merch, printed with industrial precision and boutique attention to detail. Bold color, durable inks, and fast turnaround…" |
| Primary CTA | "Start A Project" | "Start Your Order" → `/quote` |
| Secondary CTA | "Browse Catalog" → external supplier | Retained, opens external catalogue |
| Proof bar | Prints YTD, repeat clients, turnaround | Retained with consistent card styling |

Recommendation applied: the hero now answers *who / what / next step* within five
seconds, matching the benchmark's direct commercial tone.

---

## 5. Dimension 3 — CRO & CTA Improvements

1. **One primary conversion path.** Every commercial page routes to `/quote`; the
   catalogue's secondary "Contact Us" button and bottom "Need Help?" block were
   removed so the quote form is the only transactional CTA.
2. **CTA de-cannibalization.** Legal pages no longer render large marketing CTA
   cards; they read as clean legal documents.
3. **Trust & transparency.** Turnaround (10–12 business days), minimums, and local
   New Jersey contact details are surfaced in the hero and footer.
4. **Form usability.** Cognito embeds remain within responsive containers with no
   horizontal overflow at any tested viewport.

---

## 6. Dimension 4 — UI/UX & Layout Simplification

- Removed "Drop 01"–"Drop 06" labels on Home and Gallery; replaced with merch
  categories (Streetwear, Athletic, Tour Merch, Retail, Festival, Logo Program).
- Removed harsh `shadow-[8px_8px_0_…]` outlines and rotated sticker pills.
- Footer: removed the 10-item FAQ accordion, brightened legal/resource links from
  `text-white/40` to `text-white/80`, removed the "Precision Manufactured" tagline,
  and replaced placeholder Twitter/Vimeo icons with Facebook/Instagram.
- Pricing: removed `min-h-[280px]` and excess padding so Deposits/Charges cards
  auto-fit their content.
- Legal pages: removed duplicate contact cards and mini-footers; continuous,
  legible legal typography with consistent spacing.

---

## 7. Dimension 5 — Mobile-First Optimization

| Check | Result |
|---|---|
| Horizontal overflow (375, 390, 768, 1068, 1348, 1440px) | None |
| Mobile nav toggle | Visible, 48px target, focus-trapped, Escape to close |
| Mobile nav item tap height | ≥ 44px |
| Print placement diagrams | Aspect-ratio containers, 2→4 column responsive grid |
| Master placement diagram | Restored, full-width, `max-w-full` scaling |
| Hero/gallery media | Explicit aspect ratios prevent layout shift |

---

## 8. Dimension 6 — SEO & Page Speed

1. **Document-title clobber fixed.** `App.tsx` no longer overwrites `document.title`
   on every route; each page's `useSEO` title survives navigation (e.g. `/quote` →
   "Request a Quote", `/contact` → "Contact"). The 404 route still sets its own title.
2. **Semantic hierarchy.** One `<h1>` per page, followed by `<h2>` section headers and
   `<h3>` card titles.
3. **Font performance.** Oswald/Poppins loaded with `display=swap` and preconnects;
   `font-display: swap` avoids invisible-text flashes.
4. **Meta & schema.** Title, description, canonical, Open Graph, Twitter cards, and
   Organization JSON-LD are present and consistent.
5. **Build health.** `vite build` completes with zero errors; `tsc --noEmit` passes.

---

## 9. Impact vs. Effort Prioritization Matrix

| Quadrant | Initiative | Impact | Effort | Priority | Status |
|---|---|---|---|---|---|
| Quick Win | Oswald + Poppins typography | High | Low | P0 | Done |
| Quick Win | Fix `document.title` clobber | High | Low | P0 | Done |
| Quick Win | Fix Canadian phone link | High | Low | P0 | Done |
| Quick Win | Remove Drop 01–06 labels | High | Low | P0 | Done |
| Quick Win | Remove footer FAQ accordion | High | Low | P0 | Done |
| Major | Hero copywriting overhaul | High | Medium | P1 | Done |
| Major | Project Resources dropdown | High | Medium | P1 | Done |
| Major | Pricing dynamic card sizing | Medium-High | Medium | P1 | Done |
| Major | Print guide responsive scaling | Medium-High | Medium | P1 | Done |
| Major | Legal pages layout cleanup | Medium-High | Medium | P1 | Done |
| Major | Privacy mailer/reminder clauses | High | Medium | P1 | Done |
| Strategic | 1068px / 1348px containers | High | High | P2 | Done |
| Strategic | Section spacing rhythm | High | High | P2 | Done |
| Strategic | Remove redundant contact CTAs | High | Medium-High | P2 | Done |
| Housekeeping | Expand ink palette (43 colors) | Medium | Low | P2 | Done |
| Housekeeping | Remove harsh pills/blobs | Medium | Low | P2 | Done |
| Housekeeping | Brighten footer contrast | Medium | Low | P2 | Done |
| Housekeeping | Clean social links | Low-Medium | Low | P3 | Done |

---

## 10. Residual Recommendations (Next Cycle)

1. Replace placeholder social `href="#"` values with the live Facebook/Instagram URLs.
2. Add lightbox/zoom to placement-guide diagrams for precise measurement reading.
3. Add a lightweight CSP and self-host fonts to remove third-party font requests.
4. Consider moving the mock `localStorage` ink/pricing data to a real CMS/API.
5. Run a Lighthouse/Core Web Vitals pass in production (Cognito iframe is the main
   third-party cost).

---

## 11. Verification

```bash
PATH=/tmp/node/bin:$PATH npm run build      # zero errors
PATH=/tmp/node/bin:$PATH npx tsc --noEmit   # zero errors
PATH=/tmp/node/bin:$PATH npx playwright test
```

The Playwright suite covers all 19 features across 4 tiers and 6 viewports. See
`TEST_INFRA.md` and `TEST_READY.md` for the full coverage map and run instructions.
