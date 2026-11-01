# Handoff Report — M1 Iteration 2 Explorer 3: Feature 2 Investigation & Bridge Strategy

**Author**: teamwork_explorer_m1_iter2_3  
**Date**: 2026-10-31T13:52:00Z  
**Recipient**: Parent Orchestrator (`7b770def-7134-483b-b26c-6d3d9f0f08f9`)  
**Target Milestone**: Milestone 1 / Milestone 2 Boundary Alignment  
**Objective**: Investigate Feature 2 Playwright test failure, evaluate top-level wrapper vs. M2 `Home.tsx` adoption, and define the precise bridge strategy.

---

## 1. Observation

### 1.1 Playwright Feature 2 Failure Details
- **Command Executed**: `PATH=/tmp/node/bin:$PATH npx playwright test --grep "@m1"`
- **Result**: 6 passed, 2 failed (Exit code `1`, duration 1.0m)
- **Failing Tests**:
  - `[chromium] › tests/tier1-feature-coverage/typography-design-system.spec.ts:42:3 › Feature 2: Standard (1068px) and Breakout (1348px) container width system @feature-2`
  - `[mobile-chrome] › tests/tier1-feature-coverage/typography-design-system.spec.ts:42:3 › Feature 2: Standard (1068px) and Breakout (1348px) container width system @feature-2`
- **Verbatim Error**:
  ```
  Error: Expected container classes matching 1068px (standard) or 1348px (breakout)
  expect(received).toBe(expected) // Object.is equality
  Expected: true
  Received: false
    48 |
    49 |     const hasDesignSystemContainers = containerClasses.length > 0;
  > 50 |     expect(hasDesignSystemContainers, 'Expected container classes matching 1068px (standard) or 1348px (breakout)').toBe(true);
       |                                                                                                                     ^
    51 |   });
  ```
- **Test Implementation (`tests/tier1-feature-coverage/typography-design-system.spec.ts:42-51`)**:
  ```typescript
  test('Feature 2: Standard (1068px) and Breakout (1348px) container width system @feature-2', async ({ page }) => {
    // Check computed widths or utility classes for standard (1068px) and breakout (1348px)
    const containerClasses = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('[class*="1068"], [class*="1348"], [class*="container-standard"], [class*="container-breakout"]'));
      return elements.map(el => el.className);
    });

    const hasDesignSystemContainers = containerClasses.length > 0;
    expect(hasDesignSystemContainers, 'Expected container classes matching 1068px (standard) or 1348px (breakout)').toBe(true);
  });
  ```

### 1.2 Substring Selector Mechanics in Feature 2 Test
- The CSS selector queried in `page.evaluate()` is:
  `[class*="1068"], [class*="1348"], [class*="container-standard"], [class*="container-breakout"]`
- Verified via node test execution:
  - Class `max-w-standard`: **DOES NOT MATCH** (contains neither "1068", "1348", "container-standard", nor "container-breakout").
  - Class `container-standard`: **MATCHES** (contains substring "container-standard").
  - Class `container-breakout`: **MATCHES** (contains substring "container-breakout").
  - Class `max-w-[1068px]`: **MATCHES** (contains substring "1068").
  - Class `max-w-[1348px]`: **MATCHES** (contains substring "1348").
  - Class `max-w-1068`: **MATCHES** (contains substring "1068").

### 1.3 Existing Container Utility Definitions in M1
- In `index.css`:
  - Lines 50-53: `--container-standard: 1068px;`, `--container-breakout: 1348px;`, `--max-width-standard: 1068px;`, `--max-width-breakout: 1348px;` in `@theme`.
  - Lines 66-69: `--container-standard: 1068px;`, `--container-breakout: 1348px;` in `:root`.
  - Lines 515-539: `.container, .container-standard` defined with `max-width: var(--container-standard, 1068px); margin-left: auto; margin-right: auto;` and responsive gutters (1rem mobile, 1.5rem sm, 2rem lg).
  - Lines 542-563: `.container-breakout` defined with `max-width: var(--container-breakout, 1348px); margin-left: auto; margin-right: auto;` and responsive gutters.
  - Lines 566-578: `.max-w-standard, .max-w-[1068px]` and `.max-w-breakout, .max-w-[1348px]`.
- In `tailwind.config.js`:
  - Lines 30-35: `maxWidth: { 'standard': '1068px', 'breakout': '1348px', '1068': '1068px', '1348': '1348px' }`.
- In `tests/tier2-boundary-corners/m1-challenger-stress.spec.ts:134-164`:
  - Verified dynamically created test elements with `.container-standard` and `.container-breakout` resolve to `1068px` and `1348px` computed `maxWidth` in the browser. This test **PASSED**.

### 1.4 Live DOM Status on `ROUTES.home` (`/`)
- In `App.tsx:180-189`:
  ```tsx
  <div className="flex flex-col min-h-screen bg-[#fcfcfc] selection:bg-purple-600 selection:text-white">
    {showNav && <Navbar currentPage={currentPage} onNavigate={navigate} />}
    <main key={currentPage} className="grow">
      <Suspense fallback={React.createElement(getPageLoader(currentPage))}>
        {renderPage()}
      </Suspense>
    </main>
    {showNav && <Footer onNavigate={navigate} />}
  </div>
  ```
- In `pages/Home.tsx`:
  - Line 210-212 (Hero): `<section className="... bg-[#0A0015] ...">` wrapping `<div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 w-full pt-8 md:pt-16">`.
  - Line 340-342 (Curated Projects): `<section className="py-24 bg-white relative">` wrapping `<div className="relative max-w-7xl mx-auto px-6">`.
  - Line 487-489 (Capabilities): `<section className="py-24 bg-slate-50 relative border-t border-slate-100">` wrapping `<div className="relative max-w-7xl mx-auto px-6">`.
  - Line 622-624 (CTA Banner): `<section className="py-20 bg-white relative">` wrapping `<div className="max-w-5xl mx-auto px-6">`.
- Neither `index.html`, `App.tsx`, nor `Home.tsx` contains any of the matching class substrings (`1068`, `1348`, `container-standard`, `container-breakout`).

---

## 2. Logic Chain

1. **Why Feature 2 Fails in M1**:
   - `Feature 2` in `tests/tier1-feature-coverage/typography-design-system.spec.ts` was bundled inside the `@m1` test group.
   - However, the assertion checks for live DOM elements on `ROUTES.home` (`/`).
   - M1 Worker was strictly restricted by exclusive write ownership to `index.html`, `index.css`, and `tailwind.config.js`.
   - `Home.tsx` is officially scheduled for Milestone 2 (Features 5, 6, 7, 8).
   - Because `Home.tsx` has not yet been edited, the legacy container classes (`max-w-6xl`, `max-w-7xl`, `max-w-5xl`) remain in place, causing the test's `querySelectorAll` to return 0 elements.

2. **Evaluation of Adding a Container Class to a Top-Level Wrapper**:
   - **Scenario A: Adding `.container-standard` to `body` or `#root` in `index.html`**:
     - `.container-standard` applies `max-width: 1068px; margin: 0 auto;`.
     - Placing this on `body` or `#root` squashes the entire viewport to 1068px.
     - Sticky `Navbar` (`fixed top-0 left-0 right-0`), full-bleed dark Hero (`bg-[#0A0015]`), full-bleed dark Footer (`bg-slate-950`), and alternating section backgrounds (`bg-white`, `bg-slate-50`) would lose their full-bleed appearance and become centered boxes with massive empty gutters on 1440px+ displays.
     - Furthermore, child sections requiring wide breakout width (`1348px`, per R1) cannot expand beyond the 1068px parent without causing severe horizontal overflow.
   - **Scenario B: Adding a hidden/dummy container div to `index.html`**:
     - Injecting `<div className="container-standard hidden"></div>` into `index.html` satisfies the test query, but is an **artificial test facade**. This violates core Teamwork and Antigravity integrity principles.
   - **Scenario C: Adding `.container-standard` to `<main>` in `App.tsx`**:
     - `App.tsx` is outside M1 file scope (scheduled for M3, Feature 18).
     - Furthermore, placing 1068px max-width on `<main>` destroys full-bleed section backgrounds for every page on the site and prevents 1348px breakout containers from rendering properly.
   - **Deduction**: Adding a container class to any top-level wrapper is **architecturally and visually destructive**, and using a hidden element is an **integrity violation**.

3. **Evaluation of M2 Adopting Container Classes on `Home.tsx`**:
   - In Milestone 2, Worker M2 refactors `Home.tsx` for Features 5, 6, 7, and 8.
   - Each section in `Home.tsx` already uses the standard pattern: a full-bleed `<section>` outer container with an inner max-width content wrapper.
   - Replacing the legacy inner container classes with the M1 tokens on `Home.tsx`:
     - Line 212 (Hero): `max-w-6xl` -> `container-standard` (or `max-w-[1068px]`)
     - Line 342 (Curated Projects): `max-w-7xl` -> `container-breakout` (or `max-w-[1348px]`)
     - Line 489 (Capabilities): `max-w-7xl` -> `container-standard`
     - Line 624 (CTA Banner): `max-w-5xl` -> `container-standard`
   - This preserves full-bleed backgrounds, activates both standard (1068px) and breakout (1348px) systems genuinely, involves zero facades, and immediately turns Feature 2 **GREEN**.

4. **Selector Sensitivity Warning for M2**:
   - The test specifically queries `[class*="1068"], [class*="1348"], [class*="container-standard"], [class*="container-breakout"]`.
   - Tailwind utility `max-w-standard` does NOT match `[class*="container-standard"]` because "max-w-standard" does not contain the substring "container-standard".
   - Therefore, M2 workers MUST use either the turnkey class `.container-standard` (which already bundles responsive gutters and 1068px max-width) or classes containing `1068` (such as `max-w-[1068px]`).

---

## 3. Caveats

1. **Alternative Considered — Authorizing Worker M1 to Edit `Home.tsx:212`**:
   - If the Orchestrator strictly requires that `npx playwright test --grep "@m1"` produces exit code 0 before M1 can be closed, the Orchestrator could grant Worker M1 a 1-line exception to update `Home.tsx:212` to include `container-standard`.
   - However, our assessment strongly advises **against** premature page edits in M1 because M2 will be substantially refactoring `Home.tsx` anyway.
2. **Component Font-Weights in Legacy Markup**:
   - Legacy JSX in `Navbar.tsx` and `Home.tsx` uses `font-black` (weight 900) and `tracking-[0.5em]`. This should be normalized in M2 to use Oswald 700/800 with standard heading tracking (`-0.01em` to `0.05em`).

---

## 4. Conclusion

### Direct Determination on DISPATCH Questions:
1. **Top-Level Wrapper**: M1 Worker **must NOT** add standard container classes to a top-level wrapper (`index.html`, `body`, `#root`, or `App.tsx`). Doing so either destroys responsive full-bleed section layouts and prevents 1348px breakouts, or introduces an artificial test facade.
2. **M2 Adoption**: M2 **must adopt** `.container-standard` / `max-w-[1068px]` and `.container-breakout` / `max-w-[1348px]` directly on the inner section containers of `pages/Home.tsx` immediately upon M2 dispatch.
3. **Selector Compatibility**: M2 workers must be instructed to use `.container-standard` (or `max-w-[1068px]`), NOT just `max-w-standard`, so that the Playwright class query matches.

### Concrete Bridge Strategy:

#### Step 1: For Milestone 1 Gate Approval (Iteration 2)
1. Worker M1 resolves the 2 CSS bugs identified by Reviewer 2 in `index.css`:
   - `index.css:109`: Remove `color: var(--brand-dark);` from `h1-h6` base selector (replace with `color: inherit;`).
   - `index.css:673`: Remove stray `n` after comment before `html`.
2. Worker M1 does **not** touch `index.html` wrappers or `Home.tsx`.
3. Orchestrator and Reviewers evaluate M1 with:
   - `PATH=/tmp/node/bin:$PATH npm run build` (0 errors)
   - `PATH=/tmp/node/bin:$PATH npx tsc --noEmit` (0 errors)
   - `PATH=/tmp/node/bin:$PATH npx playwright test tests/tier1-feature-coverage/typography-design-system.spec.ts -g "@feature-1|@feature-3|@feature-4"` (PASS)
   - `PATH=/tmp/node/bin:$PATH npx playwright test tests/tier2-boundary-corners/m1-challenger-stress.spec.ts` (PASS, verifying 1068px and 1348px computed resolution)
   - Asset inspection confirming `1068px`, `1348px`, `.container-standard`, `.container-breakout`, `max-w-standard` compiled in `dist/assets/*.css`.
4. Orchestrator records Feature 2 DOM presence as an inter-milestone dependency to be verified in M2.

#### Step 2: For Milestone 2 Dispatch (Unlocking M2)
Include the following mandatory pre-condition in the M2 Worker dispatch:
> **M2 Step 1 — Container Adoption on `pages/Home.tsx`**:
> Replace legacy container classes with M1 turnkey container classes:
> - Hero section (`Home.tsx:212`): replace `max-w-6xl` with `container-standard` (or `container-standard max-w-standard mx-auto`).
> - Curated Projects (`Home.tsx:342`): replace `max-w-7xl` with `container-breakout` (or `container-breakout max-w-breakout mx-auto`).
> - Capabilities (`Home.tsx:489`): replace `max-w-7xl` with `container-standard`.
> - Dark CTA Card (`Home.tsx:624`): replace `max-w-5xl` with `container-standard`.
> *Note*: Always include `container-standard` / `container-breakout` or `1068` / `1348` in the class string so that Playwright Feature 2 test passes cleanly.

---

## 5. Verification Method

To independently verify the observations and conclusions:

```bash
# 1. Run Playwright M1 test suite to reproduce the Feature 2 failure:
PATH=/tmp/node/bin:$PATH npx playwright test tests/tier1-feature-coverage/typography-design-system.spec.ts

# 2. Verify design system token resolution in Challenger stress test:
PATH=/tmp/node/bin:$PATH npx playwright test tests/tier2-boundary-corners/m1-challenger-stress.spec.ts

# 3. Test substring selector behavior for max-w-standard vs container-standard:
node -e '
const s1 = "relative z-10 max-w-standard mx-auto";
const s2 = "relative z-10 container-standard mx-auto";
const s3 = "relative z-10 max-w-[1068px] mx-auto";
function matches(cls) {
  return cls.includes("1068") || cls.includes("1348") || cls.includes("container-standard") || cls.includes("container-breakout");
}
console.log("max-w-standard matches:", matches(s1));       // false
console.log("container-standard matches:", matches(s2));   // true
console.log("max-w-[1068px] matches:", matches(s3));       // true
'

# 4. Verify M1 features 1, 3, and 4 pass cleanly:
PATH=/tmp/node/bin:$PATH npx playwright test tests/tier1-feature-coverage/typography-design-system.spec.ts -g "@feature-1|@feature-3|@feature-4"
```

### Invalidation Conditions:
- If a top-level wrapper can be applied to `<body>` or `<div id="root">` without constraining full-bleed background colors, sticky nav, or 1348px breakout widths, this conclusion would be invalidated.
- If the test selector in `typography-design-system.spec.ts:45` is changed to include `max-w-standard`, the substring restriction would no longer apply.
