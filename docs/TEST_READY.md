# TEST READY — TS Custom Screen Printing E2E Test Suite

**Status**: READY  
**Test Framework**: Playwright v1.59.1 with Headless Chromium  
**Date**: 2026-10-31  
**Author**: E2E Test Writer (`teamwork_test_writer_e2e`)  
**Scope**: 4-Tier E2E Test Suite covering all 19 inventoried features (`PROJECT.md`)  

---

## 1. Test Suite Summary

- **Total Test Cases**: 74 tests across 19 test files (37 Desktop Chromium + 37 Mobile Chrome)
- **Tiers Covered**:
  - **Tier 1 (Feature Coverage)**: Features 1 through 19 comprehensively covered with explicit expected values derived from `ORIGINAL_REQUEST.md` and `PROJECT.md`.
  - **Tier 2 (Boundary & Corner Cases)**: 6 responsive viewports (375px, 390px, 768px, 1068px, 1348px, 1440px), mobile 44px tap targets, 404 page recovery, hash navigation redirection, and adversarial parameter handling.
  - **Tier 3 (Cross-Feature Combinations)**: 3-step catalogue guide conversion funnel into quote, multi-step resource dropdown navigation, and footer legal policy traversal.
  - **Tier 4 (Real-World Scenarios)**: End-to-end prospective customer quotation flow, merchandise coordinator apparel ink PMS swatch audit, and artwork placement diagram cross-device audit.

---

## 2. Test Execution Command

Run the entire test suite with:

```bash
PATH=/tmp/node/bin:$PATH npx playwright test
# Or:
PATH=/tmp/node/bin:$PATH npm test
```

### Targeted Milestone Runs
```bash
# Milestone 1: Typography & Design System (Features 1-4)
PATH=/tmp/node/bin:$PATH npx playwright test --grep "@m1"

# Milestone 2: Page-Specific Refinements (Features 5-16)
PATH=/tmp/node/bin:$PATH npx playwright test --grep "@m2"

# Milestone 3 & 4: Audit Report, SEO & QA Verification (Features 17-19)
PATH=/tmp/node/bin:$PATH npx playwright test --grep "@m3|@m4"
```

---

## 3. Initial Baseline Run Results (Pre-Overhaul Codebase)

A full execution against the current application was conducted:
- **Passed**: 27 tests (including router resilience, 404 recovery, hash redirections, viewport widths, SEO schema, audit report existence, catalog-to-quote conversion flow, and M1 typography integration).
- **Failed**: 10 tests. All 10 failures represent **genuine, non-facade implementation defects** in the codebase that the implementation milestones are assigned to resolve:
  1. `Feature 6` (`homepage-elements.spec.ts`): Rotated sticker pills and harsh 8px solid orange outline (`shadow-[8px_8px_0_#FF6720]`) present on Homepage cards.
  2. `Feature 7` (`homepage-elements.spec.ts`): `"Drop 01"` through `"Drop 06"` numbering labels present on Homepage and Gallery.
  3. `Feature 8` (`homepage-elements.spec.ts`): `Home.tsx:649` phone link targets `tel:+19053384034` instead of `tel:+17323470101`.
  4. `Feature 9` (`navigation-dropdown.spec.ts`): Navbar lacks "Project Resources" dropdown menu.
  5. `Feature 10` (`footer-streamlining.spec.ts`): Footer contains 10-item FAQ accordion and "Precision Manufactured" subtitle.
  6. `Feature 13` (`legal-policies.spec.ts`): Privacy Policy lacks mandatory clauses for monthly mailers, periodic emails, and reminder emails.
  7. `Feature 14` (`color-guide.spec.ts`): Color Guide palette has only 18 colors instead of the 43 standard apparel colors (11 stock, 28 additional, 4 fluorescent).
  8. `Feature 15` (`print-guide.spec.ts`): Master diagram `placementguide.png` is commented out.
  9. `Feature 2` (`typography-design-system.spec.ts`): Pages use `max-w-7xl` instead of standard `1068px` / breakout `1348px` container system classes.
  10. `Tier 2 Responsive` (`viewports-responsive.spec.ts`): Tablet (768px) viewport experiences horizontal overflow scroll due to unconstrained sticker elements.

---

## 4. Verification Gate Criteria for Milestones

For each subsequent milestone implementation:
- Milestone M1: `npx playwright test --grep "@m1"` must pass 100%.
- Milestone M2: `npx playwright test --grep "@m2"` must pass 100%.
- Milestone M3: `npx playwright test --grep "@m3"` must pass 100%.
- Final M4 Gate: `npx playwright test` must pass all 74 tests with exit code 0.
