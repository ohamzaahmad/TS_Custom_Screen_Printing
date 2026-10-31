# Handoff Report — M1 Explorer 3: Headings, Body Base Typography & Brand Alignment

**Agent**: M1 Explorer 3 (`teamwork_explorer_m1_3`)  
**Date**: 2026-10-31T18:15:00Z  
**Recipient**: Orchestrator (`7b770def-7134-483b-b26c-6d3d9f0f08f9`)  
**Scope**: Base typography rules in `index.css:55-75`, heading hierarchy (`h1`-`h6` Oswald uppercase), body copy (`Poppins` defaults), interactive elements (buttons, nav links, badges), competitor typography standards (`blackdogapparelco.com`), and brand metadata alignment in `index.html` (`ST Custom Screen Printing` vs `TS Custom Screen Printing`).

---

## 1. Observation

### 1.1 Base Typography Rules in `index.css:55-75`
- **Global Body Rule (`index.css:60-64`)**:
  ```css
  body {
    font-family: var(--font-family-sans);
    background-color: #fcfcfc;
    color: var(--brand-dark);
  }
  ```
  `--font-family-sans` is mapped exclusively to `'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif` (`index.css:50`).
- **Complete Absence of Heading Base Selectors**:
  - Ripgrep search for `h1` across `index.css` revealed only `.fluid-h1` (`index.css:795`).
  - There are **zero** base styling rules for `h1`, `h2`, `h3`, `h4`, `h5`, `h6` in `index.css`.
  - In all 12 page components (`Home.tsx`, `About.tsx`, `Gallery.tsx`, `Pricing.tsx`, `TermsAndConditions.tsx`, `RefundPolicy.tsx`, `PrivacyPolicy.tsx`, etc.), headings rely on Tailwind utility classes like `font-black uppercase tracking-tight text-slate-900` without setting a font-family class. Consequently, every heading on the site currently inherits `Plus Jakarta Sans`.
- **Button Styling (`index.css:188-233`)**:
  - `.btn-gradient` sets `font-weight: 800; letter-spacing: 0.12em;` but does **not** specify `font-family` or `text-transform: uppercase;`.
  - Buttons across `Navbar.tsx:130,163`, `Home.tsx:268,274`, and `Footer.tsx:177` rely on ad-hoc classes (`font-black uppercase tracking-widest text-sm`) without font-family declaration.
- **Fluid Typography Classes (`index.css:795-815`)**:
  ```css
  .fluid-h1 {
    font-weight: 900;
    line-height: 1.02;
    font-size: clamp(2rem, 4vw + 0.5rem, 4.5rem);
  }
  .fluid-h2 {
    font-weight: 900;
    line-height: 1.05;
    font-size: clamp(1.5rem, 3vw + 0.25rem, 3rem);
  }
  .fluid-h3 {
    font-weight: 800;
    line-height: 1.15;
    font-size: clamp(1.125rem, 2.2vw + 0.1rem, 1.75rem);
  }
  .lead {
    font-size: clamp(1rem, 0.8vw + 0.9rem, 1.125rem);
    color: #6b7280;
    line-height: 1.6;
  }
  ```
  These fluid classes omit `font-family: var(--font-display)` and declare weight `900` (which is not part of the requested Oswald Google Font weights: 600, 700, 800).

### 1.2 Brand Alignment & Inconsistency Forensics
- **Codebase Discrepancy (`ST` vs `TS`)**:
  - `index.html:14`: `<title>ST Custom Screen Printing | Industrial Apparel Solutions</title>`
  - `index.html:24`: `content="ST Custom Screen Printing — high-fidelity apparel solutions..."`
  - `index.html:70`: Schema Organization `"name": "ST Custom Screen Printing"`
  - `useSEO.ts:24`: `document.title = `${title} | ST Custom Screen Printing`;`
  - `App.tsx:109`: `document.title = 'ST Custom Screen Printing'` (title clobber bug)
  - `Footer.tsx:277`: `© {new Date().getFullYear()} ST Custom Screen Printing. All rights reserved.`
  - `pages/About.tsx:75`: `<span ...>About TS Custom</span>` (Verbatim "TS Custom")
  - `pages/About.tsx:338`: `<span ...>Why TS Custom</span>` (Verbatim "TS Custom")
  - `pages/About.tsx:559`: `<p ...>and experience the TS Custom difference.</p>` (Verbatim "TS Custom")
  - Root directory: `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing`
  - `package.json:2`: `"name": "ts-custom-screen-printing"`
  - User Prompt & Scope: "Audit the TS Custom Screen Printing website..."
- **Definitive Logo & Monogram Evidence (`brandColors.ts:2-5`)**:
  ```ts
  export const BRAND_COLORS = {
    purple: '#BD00FF', // Magenta/Purple from T
    deepPurple: '#2E005C', // Dark Purple from T base
    orange: '#FF8A00', // Orange from S
    yellow: '#FFC700', // Yellow from S top
    ...
  ```
  The brand logo is composed of the letters **T** (purple) and **S** (orange). The actual brand identity is **TS Custom Screen Printing**.
  The domain `stcsprinting.com` and email `info@stcsprinting.com` are the live hosting endpoints.

### 1.3 Missing Font Integration in `index.html`
- Lines 58-59 contain preconnect tags:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ```
  However, there is **no stylesheet `<link>` tag** for Oswald or Poppins anywhere in `index.html`.

### 1.4 Competitor Standard Benchmarks (`blackdogapparelco.com`)
- Headings, navigation links, and primary CTA buttons use uppercase `Oswald` (weights 600, 700, 800) with bold tracking and tight line-height.
- Subtitles, descriptions, forms, and legal copy use `Poppins` (weights 300, 400, 600) with accessible dark contrast and comfortable line-height (`1.6`–`1.7`).
- Text rendering uses antialiased subpixel smoothing (`-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;`).

---

## 2. Logic Chain

1. **Base Inheritance Strategy vs Per-Element Patching**:
   - Manually adding `font-oswald` to every heading across 12 pages and dozens of subcomponents is fragile, verbose, and error-prone.
   - By defining base CSS element selectors in `index.css`:
     - `h1, h2, h3, h4, h5, h6` → `font-family: var(--font-heading, 'Oswald', sans-serif); text-transform: uppercase;`
     - `button, .btn, .btn-gradient, [role="button"]` → `font-family: var(--font-display, 'Oswald', sans-serif); text-transform: uppercase;`
     - `nav a, nav button, .nav-link` → `font-family: var(--font-display, 'Oswald', sans-serif); text-transform: uppercase;`
     - `.badge, [class*="badge"]` → `font-family: var(--font-display, 'Oswald', sans-serif); text-transform: uppercase;`
     - `body, input, textarea, select, p` → `font-family: var(--font-body, 'Poppins', sans-serif);`
   - Every existing page component automatically inherits the correct typography instantly with zero regression risk.

2. **Font Smoothing & Optical Polish**:
   - Oswald's condensed gothic letterforms can appear excessively dense or jagged on standard-DPI screens without font smoothing.
   - Adding `-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`, and `text-rendering: optimizeLegibility` to `html` and `body` ensures clean, razor-sharp rendering on both macOS/iOS and Windows.

3. **Heading Hierarchy Tracking & Leading Formula**:
   - Condensed display fonts require tighter line-height for large titles and wider tracking for small uppercase text:
     - `h1`: `font-weight: 800; line-height: 1.05; letter-spacing: 0.01em;`
     - `h2`: `font-weight: 700; line-height: 1.10; letter-spacing: 0.015em;`
     - `h3`: `font-weight: 700; line-height: 1.18; letter-spacing: 0.02em;`
     - `h4–h6`: `font-weight: 600; line-height: 1.25–1.35; letter-spacing: 0.025em–0.035em;`
     - Buttons & Nav: `letter-spacing: 0.1em–0.12em;`
     - Badges: `letter-spacing: 0.12em–0.15em;`
     - Body copy: `letter-spacing: normal; line-height: 1.6;`

4. **Brand Name Alignment Resolution**:
   - The user dispatch states: "Check `index.html` metadata, `<title>`, and schema to fix brand alignment (`ST Custom Screen Printing` vs `TS Custom Screen Printing`)."
   - As proven by `brandColors.ts:2-5` ("T" is Purple, "S" is Orange) and `About.tsx:75, 338, 559` ("About TS Custom", "Why TS Custom"), the true company brand is **TS Custom Screen Printing**.
   - In `index.html`:
     - Update `<title>`, `<meta name="description">`, `<meta property="og:title">`, and `<meta name="twitter:title">` to **TS Custom Screen Printing**.
     - In Schema JSON-LD: Set `"name": "TS Custom Screen Printing"`, and add `"alternateName": ["ST Custom Screen Printing", "TS Screen Printing"]`.
     - In `<meta name="keywords">`: Include both `"TS Custom Screen Printing"` and `"ST Custom Screen Printing"`.
     - Retain URL `https://stcsprinting.com/` and email `info@stcsprinting.com` so live DNS, SSL certificates, and mail routing remain 100% operational.

---

## 3. Caveats

1. **Read-Only Investigation**: As an Explorer agent, no application code was altered. The concrete diffs provided below are prepared for immediate execution by the designated Worker.
2. **Title Management in SPA**: `App.tsx:107-113` contains a `useEffect` that clobbers `document.title` on page transitions. While `index.html` sets the initial HTML document title, the SPA runtime fix in `App.tsx` and `useSEO.ts` is scoped under Milestone M3.
3. **Live Domain Preservation**: The company's domain name is `stcsprinting.com`. Changing the brand display title to "TS Custom Screen Printing" does **not** change the domain URL or email endpoints (`info@stcsprinting.com`), which must remain unchanged.

---

## 4. Conclusion & Actionable Blueprint for the Worker

### 4.1 Changes in `index.html`

```html
<!-- Line 14: Align Title -->
- <title>ST Custom Screen Printing | Industrial Apparel Solutions</title>
+ <title>TS Custom Screen Printing | Industrial Apparel Solutions</title>

<!-- Lines 21-30: Align Meta Description & Keywords -->
- <meta
-   name="description"
-   content="ST Custom Screen Printing — high-fidelity apparel solutions for modern brands. Industrial precision, boutique quality; request a quote for your next print run."
- />
- <meta
-   name="keywords"
-   content="screen printing, custom apparel, custom t-shirts, garment printing, ST Custom Screen Printing"
- />
+ <meta
+   name="description"
+   content="TS Custom Screen Printing — high-fidelity apparel solutions for modern brands. Industrial precision, boutique quality; request a quote for your next print run."
+ />
+ <meta
+   name="keywords"
+   content="screen printing, custom apparel, custom t-shirts, garment printing, TS Custom Screen Printing, ST Custom Screen Printing"
+ />

<!-- Lines 35-37 & 48-50: Align Open Graph and Twitter Titles -->
- <meta property="og:title" content="ST Custom Screen Printing — Precision Screen Printing for Brands" />
+ <meta property="og:title" content="TS Custom Screen Printing — Precision Screen Printing for Brands" />

- <meta name="twitter:title" content="ST Custom Screen Printing — Precision Screen Printing for Brands" />
+ <meta name="twitter:title" content="TS Custom Screen Printing — Precision Screen Printing for Brands" />

<!-- Lines 57-61: Add Google Fonts Oswald & Poppins Stylesheet Link -->
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
+ <link
+   rel="stylesheet"
+   href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700;800&family=Poppins:ital,wght@0,300;0,400;0,600;1,400&display=swap"
+ />

<!-- Lines 66-91: Update Schema JSON-LD with Primary and Alternate Brand Names -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
-     "name": "ST Custom Screen Printing",
+     "name": "TS Custom Screen Printing",
+     "alternateName": ["ST Custom Screen Printing", "TS Screen Printing"],
      "url": "https://stcsprinting.com/",
      "logo": "https://stcsprinting.com/logo.png",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-732-347-0101",
          "email": "info@stcsprinting.com",
          "contactType": "customer service",
          "areaServed": "US"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1 Bradshaw Drive",
        "addressLocality": "Manahawkin",
        "addressRegion": "NJ",
        "postalCode": "08050",
        "addressCountry": "US"
      }
    }
  </script>
```

### 4.2 Changes in `index.css`

#### Step 1: Replace Google Fonts import at `index.css:8`
```css
- @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
+ @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600;700;800&family=Poppins:ital,wght@0,300;0,400;0,600;1,400&display=swap');
```

#### Step 2: Configure `@theme` Font Tokens at `index.css:49-51`
```css
  /* Font family */
- --font-family-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
+ --font-sans: 'Poppins', ui-sans-serif, system-ui, sans-serif;
+ --font-display: 'Oswald', ui-sans-serif, sans-serif;
+ --font-heading: 'Oswald', ui-sans-serif, sans-serif;
+ --font-body: 'Poppins', ui-sans-serif, sans-serif;
+ --font-oswald: 'Oswald', sans-serif;
+ --font-poppins: 'Poppins', sans-serif;
+ --font-family-sans: 'Poppins', ui-sans-serif, system-ui, sans-serif;
```

#### Step 3: Base Typography, Heading Hierarchy, Smoothing & Component Defaults (`index.css:53-75`)
```css
:root {
  --max-content-width: 1068px;
  --container-standard: 1068px;
  --container-breakout: 1348px;
  --brand-purple: #BD00FF;
  --brand-orange: #FF8A00;
  --brand-dark: #0A0015;
  --font-display: 'Oswald', ui-sans-serif, sans-serif;
  --font-heading: 'Oswald', ui-sans-serif, sans-serif;
  --font-body: 'Poppins', ui-sans-serif, system-ui, sans-serif;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-body, 'Poppins', sans-serif);
  background-color: #fcfcfc;
  color: var(--brand-dark);
  font-weight: 400;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ==========================================================================
   Base Headings Hierarchy: Oswald Uppercase (Competitor Standard)
   ========================================================================== */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  text-transform: uppercase;
  font-weight: 700;
  color: var(--brand-dark);
  letter-spacing: 0.015em;
}

h1 {
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: 0.01em;
}

h2 {
  font-weight: 700;
  line-height: 1.10;
  letter-spacing: 0.015em;
}

h3 {
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: 0.02em;
}

h4 {
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0.025em;
}

h5 {
  font-weight: 600;
  line-height: 1.30;
  letter-spacing: 0.03em;
}

h6 {
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.035em;
}

/* ==========================================================================
   Interactive Elements: Buttons, Navigation Links & Badges
   ========================================================================== */
button,
.btn,
.btn-gradient,
[role="button"] {
  font-family: var(--font-display, 'Oswald', sans-serif);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

nav a,
nav button,
.nav-link {
  font-family: var(--font-display, 'Oswald', sans-serif);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.badge,
.tag-badge,
[class*="badge"] {
  font-family: var(--font-display, 'Oswald', sans-serif);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* Form inputs retain readable Poppins */
input,
textarea,
select {
  font-family: var(--font-body, 'Poppins', sans-serif);
  letter-spacing: normal;
}
```

#### Step 4: Fluid Typography Classes Alignment (`index.css:795-815`)
```css
/* Fluid typography utilities aligned to Oswald display */
.fluid-h1 {
  font-family: var(--font-display, 'Oswald', sans-serif);
  text-transform: uppercase;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: 0.01em;
  font-size: clamp(2.25rem, 4.5vw + 0.5rem, 4.75rem);
}
.fluid-h2 {
  font-family: var(--font-display, 'Oswald', sans-serif);
  text-transform: uppercase;
  font-weight: 700;
  line-height: 1.10;
  letter-spacing: 0.015em;
  font-size: clamp(1.75rem, 3vw + 0.25rem, 3rem);
}
.fluid-h3 {
  font-family: var(--font-display, 'Oswald', sans-serif);
  text-transform: uppercase;
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: 0.02em;
  font-size: clamp(1.25rem, 2vw + 0.1rem, 1.85rem);
}
.lead {
  font-family: var(--font-body, 'Poppins', sans-serif);
  font-weight: 400;
  font-size: clamp(1rem, 0.8vw + 0.9rem, 1.2rem);
  color: #64748b;
  line-height: 1.65;
}
```

### 4.3 Changes in `tailwind.config.js`

```javascript
// Lines 22-24
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

## 5. Verification Method

1. **Compilation & Build Command**:
   ```bash
   PATH=/tmp/node/bin:$PATH npm run build
   ```
   *Expected Result*: Exit code 0, clean Vite build generating `dist/index.html` and bundled assets with 0 errors.

2. **TypeScript Typecheck**:
   ```bash
   PATH=/tmp/node/bin:$PATH npx tsc --noEmit
   ```
   *Expected Result*: Exit code 0, zero compilation errors.

3. **DOM & Computed Style Verification**:
   - Inspect any `<h1>` through `<h6>` element in browser DevTools: computed `font-family` resolves to `'Oswald'`, and `text-transform` computes to `uppercase`.
   - Inspect `<body>`, `<p>`, and `<input>` elements: computed `font-family` resolves to `'Poppins'`.
   - Inspect `<button>` and `nav` elements: computed `font-family` resolves to `'Oswald'` with uppercase transform.
   - Inspect `document.title` on first load: evaluates to `"TS Custom Screen Printing | Industrial Apparel Solutions"`.
   - Inspect `<script type="application/ld+json">`: contains `"name": "TS Custom Screen Printing"` and `"alternateName": ["ST Custom Screen Printing", "TS Screen Printing"]`.

4. **Invalidation Conditions**:
   - If any `h1`-`h6` renders in Plus Jakarta Sans or lowercase without an explicit lowercase override class.
   - If `npm run build` fails or throws font resolution warnings.
   - If Schema validation fails at `https://validator.schema.org/`.
