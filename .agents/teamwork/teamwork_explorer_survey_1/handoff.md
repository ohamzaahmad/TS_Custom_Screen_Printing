# Handoff Report — Survey Explorer 1: Technical Stack, Build, Styling & Typography

**Agent**: Survey Explorer 1 (`teamwork_explorer_survey_1`)  
**Date**: 2026-10-31T18:05:00Z  
**Recipient**: Orchestrator (`7b770def-7134-483b-b26c-6d3d9f0f08f9`)  
**Scope**: Technical stack, build verification, dependencies, Tailwind CSS v4 styling infrastructure, typography (Oswald/Poppins), and container/spacing system.

---

## 1. Observation

### 1.1 Technical Stack & Dependencies (`package.json`)
- **Package Name**: `"ts-custom-screen-printing"`, private module (`package.json:2-5`).
- **Core Runtime**: React 19.2.3, react-dom 19.2.3 (`package.json:13-14`).
- **Animation**: framer-motion 12.38.0 (`package.json:12`).
- **Build Tooling & Bundler**: Vite 6.2.0 (running 6.4.5 in build output), `@vitejs/plugin-react` 5.0.0 (`package.json:22,27`).
- **CSS Framework**: Tailwind CSS **v4.1.18** with `@tailwindcss/postcss` 4.1.18, `postcss` 8.5.6, `autoprefixer` 10.4.23 (`package.json:18,23-25`).
- **Type Checking**: TypeScript 5.8.2 (`package.json:26`, `tsconfig.json`). Module resolution is `"bundler"`, target `"ES2022"`, path alias `"@/*": ["./*"]` (`tsconfig.json:3,16,22-24`).
- **Testing**: `@playwright/test` 1.59.1 in devDependencies (`package.json:17`).

### 1.2 Build System Execution & Status
- **Executed Command**: `PATH=/tmp/node/bin:$PATH npm run build`
- **Result**: Exit code 0 (success).
- **Execution Time**: 2.90 seconds.
- **Output Artifacts**:
  - `dist/index.html` (3.95 kB, gzip: 1.45 kB)
  - `dist/assets/index-B09Gyjyv.css` (87.39 kB, gzip: 14.08 kB)
  - `dist/assets/index-CdbThdM7.js` (226.13 kB, gzip: 68.77 kB)
  - `dist/assets/use-reduced-motion-BKuX9mQr.js` (124.13 kB, gzip: 40.57 kB)
  - Route chunks for `Home`, `About`, `Catalogue`, `Gallery`, `Pricing`, `PrintGuide`, `ColorGuide`, `Contact`, `Quote`, `PrivacyPolicy`, `TermsAndConditions`, `RefundPolicy`.
- **Environment Warning**:
  - `(node:22896) [DEP0205] DeprecationWarning: module.register() is deprecated. Use module.registerHooks() instead.` (Node 22 runtime deprecation from bundler hooks, non-fatal).
- **TypeScript Typecheck**:
  - `PATH=/tmp/node/bin:$PATH npx tsc --noEmit` exited with code 0 (zero type errors).

### 1.3 HTML & Asset Entry (`index.html`)
- Preconnect tags for Google Fonts exist (`index.html:58-59`):
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ```
- **Missing Font Stylesheets**: There is **no** Google Fonts `<link rel="stylesheet">` tag in `index.html`.
- External Icons: FontAwesome CDN loaded via `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />` (`index.html:60-63`).
- **Redundant Importmap**: `index.html:92-100` defines an esm.sh importmap for `react` and `react-dom` that is not required for a Vite-bundled production app.
- **Brand Title**: `<title>ST Custom Screen Printing | Industrial Apparel Solutions</title>` (`index.html:14`). Note that the site displays "ST Custom Screen Printing", while repo and dispatch name is "TS Custom Screen Printing".

### 1.4 Styling Infrastructure (`index.css` & `tailwind.config.js`)
- Root file: `index.css` (839 lines). Note: no `src/` directory exists; project source is at root.
- Directive: `@import "tailwindcss";` (`index.css:5`).
- Font import: `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');` (`index.css:8`).
- Tailwind v4 `@theme` configuration (`index.css:10-51`):
  - Defines color variables (`--color-brand-purple: #BD00FF;`, `--color-brand-orange: #FF8A00;`, `--color-brand-dark: #0A0015;`, etc.).
  - Defines `--font-family-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;` (`index.css:50`).
- Global body font (`index.css:60-64`):
  ```css
  body {
    font-family: var(--font-family-sans);
    background-color: #fcfcfc;
    color: var(--brand-dark);
  }
  ```
- Legacy `tailwind.config.js`:
  - Contains Tailwind v3 style `theme.extend` configuration with `fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] }`.
  - In Tailwind CSS v4, `tailwind.config.js` is not parsed by default unless `@config "./tailwind.config.js";` is added. Consequently, `index.css` contains manual utility class fallbacks (lines 484 to 774).

### 1.5 Competitor Benchmark (`blackdogapparelco.com`)
- Live inspection of `https://blackdogapparelco.com/` confirms:
  - Global font override: `body { font-family: Oswald !important; }` (line 264 of live DOM).
  - Secondary/body font: `Poppins` (`Poppins-SemiBold.ttf`, `Poppins-ExtraLight.ttf` registered via `@font-face` on line 211, 219).
  - Navigation: Uppercase bold text, high-contrast, dropdown for secondary services, pill button for CTA.
  - Layout: Clean structure, no clutter, streamlined footer with legal links.

### 1.6 Container Widths & Rhythm Across Codebase
- Root container rule (`index.css:53-58, 390-397`):
  ```css
  :root { --max-content-width: 1200px; }
  .container { width: 100%; max-width: var(--max-content-width); margin: 0 auto; padding: 0 1rem; }
  ```
- Actual in-use widths across pages:
  - `max-w-7xl` (1280px): `Pricing.tsx:29`, `Home.tsx:342, 489`, `Gallery.tsx:159`, `Contact.tsx:53, 76, 237`, `ColorGuide.tsx:67`, `Catalogue.tsx:54`, `About.tsx:54, 166, 242, 335, 443`, `Footer.tsx:78`.
  - `max-w-6xl` (1152px): `Home.tsx:212`, `Quote.tsx:38`, `PrintGuide.tsx:123`, `Gallery.tsx:141`.
  - `max-w-5xl` (1024px): `Home.tsx:564, 624`, `Gallery.tsx:277`.
  - `max-w-4xl` (896px): `TermsAndConditions.tsx:23, 45`, `RefundPolicy.tsx:21, 43`, `PrivacyPolicy.tsx:21, 43`, `Catalogue.tsx:448`.
- Vertical section paddings across pages:
  - `py-24` (96px), `py-20` (80px), `py-16` (64px), `py-12` (48px), `pt-32 pb-20` (128px/80px), `pt-36 pb-20` (144px/80px).
  - Disparate margins: `mb-12`, `mb-16`, `mb-20`, `mb-24`.
  - No standardized system enforcing 1068px (standard) / 1348px (breakout) or 80-96px (desktop) / 48-64px (mobile) rhythm.

---

## 2. Logic Chain

1. **Build Health**: The build runs cleanly via `PATH=/tmp/node/bin:$PATH npm run build` and `tsc --noEmit` validates with zero errors. This proves the codebase is architecturally stable and changes can be made without inheriting existing compilation blockers.
2. **Tailwind v4 Mechanism**: In Tailwind v4, styles declared in `index.css` via `@theme` are converted directly into CSS variables and utility classes. Because `tailwind.config.js` is not bound by `@config`, setting typography and container rules in `@theme` inside `index.css` (while also maintaining `tailwind.config.js` for consistency) is the most reliable way to enforce styles.
3. **Typography Gap**:
   - Currently, all headings (`h1`, `h2`, `h3`), navigation links, badges, and CTAs lack a display font class and fall back to Plus Jakarta Sans.
   - To match competitor `blackdogapparelco.com` and requirement R1, Google Fonts `Oswald` (weights 600, 700, 800) must be loaded and assigned to all display, heading, navigation, and CTA elements with uppercase styling.
   - `Poppins` (weights 300, 400, 600) must be loaded and assigned to body copy, subheadlines, descriptions, and forms, replacing low-contrast text.
4. **Container & Rhythm Discrepancy**:
   - Existing pages use arbitrary Tailwind max-widths (`max-w-7xl` [1280px], `max-w-6xl` [1152px], `max-w-4xl` [896px]).
   - Standardizing on **1068px** standard container width and **1348px** wide breakout width requires creating dedicated utility classes (`.container-standard` and `.container-breakout` / `max-w-[1068px]` and `max-w-[1348px]`) in `index.css` and replacing disparate classes across all page views.
   - Enforcing 80px–96px desktop rhythm and 48px–64px mobile rhythm requires defining a `.section-rhythm` utility (`py-12 md:py-20 lg:py-24`) across page sections.
5. **Brand Name Alignment**:
   - The user dispatch refers to "TS Custom Screen Printing", but the production application uses "ST Custom Screen Printing" throughout headers, copyright, metadata, schema, and legal text. Both refer to the same brand (T and S brand colors: `#BD00FF` purple and `#FF8A00` orange). Changes should preserve existing domain/contact links (`stcsprinting.com`, `info@stcsprinting.com`).

---

## 3. Caveats

- **No Root `src/` Directory**: All source files (`App.tsx`, `index.tsx`, `index.css`, `pages/`, `components/`) reside at the repository root. Any path referencing `src/index.css` in external notes actually refers to `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/index.css`.
- **Tailwind v4 vs v3 Plugin Support**: Tailwind v4 does not use standard Tailwind v3 plugins (`plugins: []` in `tailwind.config.js`). Any custom utilities should be added via `@utility` or standard CSS rules in `index.css`.
- **Read-Only Inspection**: As Survey Explorer 1, no modifications to application code were made during this survey. Proposals are detailed below for implementation by designated implementers.

---

## 4. Conclusion & Actionable Blueprint

### 4.1 Typography Configuration Implementation Plan

#### Step 1: Update `index.html` Font Preconnect & Link
Add the Google Fonts stylesheet link in `index.html` right after preconnect tags:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700;800&family=Poppins:ital,wght@0,300;0,400;0,600;1,400&display=swap"
  rel="stylesheet"
/>
```

#### Step 2: Configure `@theme` and Base Typography in `index.css`
Replace Plus Jakarta Sans `@import` on line 8 with the Oswald & Poppins import:
```css
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600;700;800&family=Poppins:ital,wght@0,300;0,400;0,600;1,400&display=swap');
```
Inside `@theme` (`index.css:10-51`):
```css
@theme {
  /* Font families */
  --font-sans: 'Poppins', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Oswald', ui-sans-serif, sans-serif;
  --font-heading: 'Oswald', ui-sans-serif, sans-serif;
  --font-body: 'Poppins', ui-sans-serif, sans-serif;
  --font-oswald: 'Oswald', sans-serif;
  --font-poppins: 'Poppins', sans-serif;
}
```
In Base styles (`index.css:60`):
```css
body {
  font-family: var(--font-body, 'Poppins', sans-serif);
  background-color: #fcfcfc;
  color: var(--brand-dark);
  font-weight: 400;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  text-transform: uppercase;
  letter-spacing: -0.01em;
}
```

#### Step 3: Align `tailwind.config.js`
Ensure `tailwind.config.js` defines:
```javascript
fontFamily: {
  sans: ['Poppins', 'sans-serif'],
  display: ['Oswald', 'sans-serif'],
  heading: ['Oswald', 'sans-serif'],
  body: ['Poppins', 'sans-serif'],
  oswald: ['Oswald', 'sans-serif'],
  poppins: ['Poppins', 'sans-serif'],
},
```

---

### 4.2 Container & Spacing System Blueprint

#### Container Classes in `index.css`:
```css
:root {
  --container-standard: 1068px;
  --container-breakout: 1348px;
}

/* Standard Container (1068px) */
.container-standard,
.max-w-standard {
  width: 100%;
  max-width: 1068px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* Wide Breakout Container (1348px) */
.container-breakout,
.max-w-breakout {
  width: 100%;
  max-width: 1348px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* Vertical Rhythm: 80-96px desktop, 48-64px mobile */
.section-rhythm {
  padding-top: 3rem;     /* 48px mobile */
  padding-bottom: 3rem;
}
@media (min-width: 768px) {
  .section-rhythm {
    padding-top: 5rem;   /* 80px tablet */
    padding-bottom: 5rem;
  }
}
@media (min-width: 1024px) {
  .section-rhythm {
    padding-top: 6rem;   /* 96px desktop */
    padding-bottom: 6rem;
  }
}
```

#### Mapping Across Main Pages:
| Page / Section | Current Width | Target Container | Target Rhythm |
|---|---|---|---|
| **Hero (Home)** | `max-w-6xl` (1152px) | `max-w-[1348px]` (`container-breakout`) | `pt-32 pb-20` (navbar offset preserved) |
| **Order Custom Apparel (Home)** | `max-w-7xl` (1280px) | `max-w-[1068px]` (`container-standard`) | `section-rhythm` (80px–96px / 48px–64px) |
| **Curated Projects (Home)** | `max-w-7xl` (1280px) | `max-w-[1348px]` (`container-breakout`) | `section-rhythm` |
| **About Sections** | `max-w-7xl` (1280px) | `max-w-[1068px]` (`container-standard`) | `section-rhythm` |
| **Quote Page** | `max-w-6xl` (1152px) | `max-w-[1068px]` (`container-standard`) | `section-rhythm` |
| **Pricing Table & Cards** | `max-w-7xl` (1280px) | `max-w-[1068px]` (`container-standard`) | `section-rhythm` |
| **Print Placement Guide** | `max-w-6xl` (1152px) | `max-w-[1068px]` (`container-standard`) | `section-rhythm` |
| **Color Guide** | `max-w-7xl` (1280px) | `max-w-[1348px]` (`container-breakout`) | `section-rhythm` |
| **Legal Pages (Privacy, Terms, Refund)** | `max-w-4xl` (896px) | `max-w-[1068px]` (`container-standard`) | `section-rhythm` |
| **Footer** | `max-w-7xl` (1280px) | `max-w-[1068px]` (`container-standard`) | `pt-16 pb-12` |

---

### 4.3 Key High-Priority Technical & UX Issues for Downstream Tasks
1. **Redundant FAQs in Footer**: `Footer.tsx:79-155` places a 10-item FAQ accordion into the global footer. It renders on every single route, causing page clutter. Recommendation: Keep FAQs exclusively on dedicated or relevant info pages (or a streamlined modal/link).
2. **Low-Contrast Footer Links**: `text-white/40` and `text-white/20` on `#0A0015` dark background fail accessibility contrast ratios. Should be brightened to `text-white/80` and `text-white/90`.
3. **Redundant "Contact Us" Blocks**: `PrivacyPolicy.tsx:241-281`, `TermsAndConditions.tsx:471-511`, `RefundPolicy.tsx:195-235`, and `Catalogue.tsx:441-519` each have hardcoded duplicate "Contact Us / Need Help?" sections and duplicate mini-footers. These should be removed in accordance with R2.
4. **Pill Tags and Drop Labels on Home**: Remove floating splash pill graphics (`Home.tsx:468-487`) and replace "Drop 01", "Drop 02" numbering (`Home.tsx:28-56, 535-537`) with clean merch titles.
5. **Navbar Menu Item**: "Project Resources" is absent from `Navbar.tsx` (only in footer). Needs a clean navigation item or dropdown linking to Catalogue, Pricing Guide, Placement Guide, and Ink Color Lab.
6. **Pricing Cards Dynamic Sizing**: Remove hardcoded `min-h-[280px]` and excessive padding in `Pricing.tsx:136, 154` so service charges and deposits cards dynamically fit actual content without large empty space.
7. **Placement Guide Imagery**: `placementguide.png` is commented out (`PrintGuide.tsx:135-137`) and grid images are constrained to small fixed heights (`h-44`, `h-32`). They must be scaled up and responsive for readability.
8. **Color Guide Inks**: Update `INITIAL_INKS` in `services/dataService.ts:32-55` with modern standard apparel ink colors and Pantone codes.

---

## 5. Verification Method

To independently verify the technical findings of this survey:

1. **Verify Build**:
   ```bash
   PATH=/tmp/node/bin:$PATH npm run build
   ```
   *Expected result*: Build succeeds with exit code 0, generating production bundles in `dist/`.

2. **Verify TypeScript Compilation**:
   ```bash
   PATH=/tmp/node/bin:$PATH npx tsc --noEmit
   ```
   *Expected result*: 0 type errors.

3. **Verify File Layout**:
   Inspect `index.html`, `index.css`, and `tailwind.config.js` to verify current font and theme declarations:
   ```bash
   grep -n "Plus Jakarta" index.css tailwind.config.js
   grep -n "font" index.html
   ```

4. **Verify Container Rules**:
   Inspect `index.css:54` and `index.css:390-397` to confirm `--max-content-width: 1200px` and lack of 1068px / 1348px definitions.

5. **Invalidation Conditions**:
   - If `npm run build` fails or throws syntax errors.
   - If Tailwind v4 is unable to load Google Fonts or compile `@theme` tokens.
