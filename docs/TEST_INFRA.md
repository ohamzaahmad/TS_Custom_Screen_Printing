# E2E Test Infrastructure: TS Custom Screen Printing

This document outlines the End-to-End (E2E) testing framework, directory architecture, tier classification, test runners, execution protocols, and verification methods for the TS Custom Screen Printing website audit and overhaul.

---

## 1. Test Architecture & Runner

- **Framework**: Playwright (`@playwright/test` v1.59.1)
- **Engine**: Headless Chromium (Chrome for Testing 147.0.7727.15)
- **Configuration File**: `playwright.config.ts`
- **Application Server**: Integrated Playwright `webServer` automatically building and serving production bundles via `vite preview --port 5173` on `http://localhost:5173` with inherited node prefix `PATH=/tmp/node/bin:$PATH`.
- **Viewports Tested**:
  - Mobile Small: 375px × 667px (`VIEWPORTS.mobileSm`)
  - Mobile Standard: 390px × 844px (`VIEWPORTS.mobileLg` / `Pixel 5`)
  - Tablet: 768px × 1024px (`VIEWPORTS.tablet`)
  - Desktop Standard: 1068px × 800px (`VIEWPORTS.desktopMd`)
  - Desktop Breakout: 1348px × 900px (`VIEWPORTS.desktopBreakout`)
  - Desktop HD: 1440px × 900px (`VIEWPORTS.desktopLg` / `Desktop Chrome`)

---

## 2. Directory Layout

All tests reside under `tests/` and are organized strictly into the 4 test tiers:

```
tests/
├── fixtures/
│   └── test-fixtures.ts                          # Shared custom fixtures, route map, viewport presets, wait helpers
├── tier1-feature-coverage/
│   ├── audit-and-seo.spec.ts                     # Features 17, 18, 19: Audit report, SEO tags, title clobber fix
│   ├── catalog-funnel.spec.ts                    # Feature 11: Sportswear / catalog conversion funnel
│   ├── color-guide.spec.ts                       # Feature 14: Stock, additional, and fluorescent apparel inks
│   ├── footer-streamlining.spec.ts               # Feature 10: FAQ accordion removal & footer simplification
│   ├── homepage-elements.spec.ts                 # Features 5, 6, 7, 8: Hero copy, graphics cleanup, phone link
│   ├── legal-policies.spec.ts                    # Features 12, 13: Clean legal layout & mandatory mailer clauses
│   ├── navigation-dropdown.spec.ts               # Feature 9: Project Resources navbar dropdown
│   ├── pricing-cards.spec.ts                     # Feature 16: Dynamic card sizing and pricing tier tables
│   ├── print-guide.spec.ts                       # Feature 15: Master placement diagram & responsive cards
│   └── typography-design-system.spec.ts          # Features 1, 2, 3, 4: Oswald/Poppins, containers, rhythm, headings
├── tier2-boundary-corners/
│   ├── edge-routes-resilience.spec.ts            # 404 handler, hash redirection (#quote), popstate history traversal
│   ├── quote-form-boundaries.spec.ts             # Adversarial parameters, empty forms, Cognito embed resilience
│   └── viewports-responsive.spec.ts              # 6 viewports responsive verification & mobile 44px tap targets
├── tier3-cross-feature-combinations/
│   ├── catalog-to-quote-flow.spec.ts             # 3-step catalogue guide handoff into Quote form
│   ├── footer-cross-navigation.spec.ts           # Footer legal link traversal across Privacy, Terms, and Refund
│   └── resource-dropdown-routes.spec.ts          # Sequential multi-step resource navigation (Pricing -> Colors -> Guide)
└── tier4-real-world-scenarios/
    ├── color-spec-inspection.spec.ts             # Apparel brand coordinator PMS swatch and contrast audit
    ├── customer-quote-journey.spec.ts            # End-to-end customer discovery -> CTA -> Quote workflow
    └── placement-guide-audit.spec.ts             # Designer print placement evaluation across mobile and desktop
```

---

## 3. 4-Tier Test Methodology & Feature Mapping

| Tier | Focus | Covered Features | Description |
|---|---|---|---|
| **Tier 1** | Feature Coverage | F1–F19 | Exhaustive verification of all 19 inventoried features from `PROJECT.md` |
| **Tier 2** | Boundary & Corner Cases | Responsive & Router | Viewport stress (375px–1440px), 404 recovery, hash routing fallback, parameter sanitization |
| **Tier 3** | Cross-Feature Combinations | Funnels & Traversal | Integration across routes: Catalogue to Quote funnel, Resource dropdowns, Footer policies |
| **Tier 4** | Real-World Scenarios | End-to-End Journeys | Full prospective customer quotation journey, apparel ink PMS code inspection, placement guide audits |

### Feature Inventory Coverage Map

- **Feature 1 (Google Fonts Oswald & Poppins)**: Tested in `typography-design-system.spec.ts` (`@feature-1`)
- **Feature 2 (Container 1068px / Breakout 1348px)**: Tested in `typography-design-system.spec.ts` (`@feature-2`)
- **Feature 3 (Vertical Spacing Rhythm)**: Tested in `typography-design-system.spec.ts` (`@feature-3`)
- **Feature 4 (Headings Oswald / Body Poppins)**: Tested in `typography-design-system.spec.ts` (`@feature-4`)
- **Feature 5 (Hero Copywriting & Value Proposition)**: Tested in `homepage-elements.spec.ts` (`@feature-5`)
- **Feature 6 (Removal of Rotated Stickers & 8px Neon Shadows)**: Tested in `homepage-elements.spec.ts` (`@feature-6`)
- **Feature 7 (Project Numbering Cleanup Drop 01–06)**: Tested in `homepage-elements.spec.ts` (`@feature-7`)
- **Feature 8 (Phone Link Correction to (732) 347-0101)**: Tested in `homepage-elements.spec.ts` (`@feature-8`)
- **Feature 9 (Project Resources Navbar Dropdown)**: Tested in `navigation-dropdown.spec.ts` (`@feature-9`)
- **Feature 10 (Footer Streamlining & FAQ Removal)**: Tested in `footer-streamlining.spec.ts` (`@feature-10`)
- **Feature 11 (Sportswear / Catalogue Funnel Cleanup)**: Tested in `catalog-funnel.spec.ts` (`@feature-11`)
- **Feature 12 (Legal Pages Layout Simplification)**: Tested in `legal-policies.spec.ts` (`@feature-12`)
- **Feature 13 (Privacy Policy Mandatory Mailer Clauses)**: Tested in `legal-policies.spec.ts` (`@feature-13`)
- **Feature 14 (Color Guide Apparel Inks Expansion)**: Tested in `color-guide.spec.ts` (`@feature-14`)
- **Feature 15 (Placement Guide Diagram Responsiveness)**: Tested in `print-guide.spec.ts` (`@feature-15`)
- **Feature 16 (Pricing Dynamic Card Sizing)**: Tested in `pricing-cards.spec.ts` (`@feature-16`)
- **Feature 17 (Comprehensive Audit Report Verification)**: Tested in `audit-and-seo.spec.ts` (`@feature-17`)
- **Feature 18 (SEO Title Clobber Bug Resolution)**: Tested in `audit-and-seo.spec.ts` (`@feature-18`)
- **Feature 19 (Zero Build Errors & E2E Test Suite Readiness)**: Tested in `audit-and-seo.spec.ts` (`@feature-19`)

---

## 4. How to Run the Tests

### Node Binary Prefix Requirement
Commands must be executed with `PATH=/tmp/node/bin:$PATH`.

### Full Test Suite Execution
```bash
PATH=/tmp/node/bin:$PATH npx playwright test
# Or using npm:
PATH=/tmp/node/bin:$PATH npm test
```

### Desktop Chromium Only (37 Tests)
```bash
PATH=/tmp/node/bin:$PATH npx playwright test --project=chromium
```

### Mobile Chrome Only (37 Tests)
```bash
PATH=/tmp/node/bin:$PATH npx playwright test --project=mobile-chrome
```

### Run by Tier
```bash
PATH=/tmp/node/bin:$PATH npx playwright test --grep "@tier1"
PATH=/tmp/node/bin:$PATH npx playwright test --grep "@tier2"
PATH=/tmp/node/bin:$PATH npx playwright test --grep "@tier3"
PATH=/tmp/node/bin:$PATH npx playwright test --grep "@tier4"
```

### Run by Milestone
```bash
PATH=/tmp/node/bin:$PATH npx playwright test --grep "@m1"
PATH=/tmp/node/bin:$PATH npx playwright test --grep "@m2"
PATH=/tmp/node/bin:$PATH npx playwright test --grep "@m3"
```

### Run Specific Feature Test
```bash
PATH=/tmp/node/bin:$PATH npx playwright test --grep "@feature-8"
```

---

## 5. Artifacts and Reporting

- **HTML Report**: Generated in `playwright-report/index.html` (view via `npx playwright show-report`)
- **JSON Results**: Written to `test-results/results.json`
- **Traces & Screenshots**: Stored in `test-results/` on failure
