# Comprehensive Survey & Audit Handoff Report — Explorer 2

**Workspace**: `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing`  
**Date**: 2026-10-31  
**Author**: Survey Explorer 2 (`teamwork_explorer_survey_2`)  
**Target Recipient**: Parent Orchestrator (`7b770def-7134-483b-b26c-6d3d9f0f08f9`) and Implementation Specialists  

---

## 1. Observation

Direct code observations across all 10 assigned investigation areas:

### 1. Route & Page Mapping (`App.tsx`, `pages/`, `components/`)
* **Router Implementation** (`App.tsx:27-105`):
  * Custom client-side router powered by the browser History API (`window.location.pathname`, `pushState`, `popstate`), with hash-redirect fallback (`#quote` -> `/quote`) and scroll-to-top (`window.scrollTo({ top: 0, behavior: "smooth" })`).
* **Active Routes (`PAGE_TO_PATH`, App.tsx:27-40)**:
  1. `/` -> `pages/Home.tsx` (page: `"home"`, loader: `HomePageLoader`)
  2. `/about` -> `pages/About.tsx` (page: `"about"`, loader: `HomePageLoader`)
  3. `/gallery` -> `pages/Gallery.tsx` (page: `"gallery"`, loader: `GalleryPageLoader`)
  4. `/catalogue` -> `pages/Catalogue.tsx` (page: `"catalogue"`, loader: `CataloguePageLoader`)
  5. `/quote` -> `pages/Quote.tsx` (page: `"quote"`, loader: `FormPageLoader`)
  6. `/contact` -> `pages/Contact.tsx` (page: `"contact"`, loader: `FormPageLoader`)
  7. `/guide` -> `pages/PrintGuide.tsx` (page: `"guide"`, loader: `FormPageLoader`)
  8. `/colors` -> `pages/ColorGuide.tsx` (page: `"colors"`, loader: `ColorGuidePageLoader`)
  9. `/pricing` -> `pages/Pricing.tsx` (page: `"pricing"`, loader: `PricingPageLoader`)
  10. `/terms` -> `pages/TermsAndConditions.tsx` (page: `"terms"`, loader: `AccordionPageLoader`)
  11. `/refund` -> `pages/RefundPolicy.tsx` (page: `"refund"`, loader: `AccordionPageLoader`)
  12. `/privacy` -> `pages/PrivacyPolicy.tsx` (page: `"privacy"`, loader: `AccordionPageLoader`)
  13. Fallback: 404 Page Not Found inline view in `App.tsx:142-171`.
* **Unrouted / Orphan Component**:
  * `pages/Categories.tsx`: Sourcing and category catalog page referencing `services/dataService.ts` (`fetchCategories`, `fetchProducts`). Not imported or routed in `App.tsx`.
* **Title & Branding Anomaly**:
  * `App.tsx:109`: `document.title = "ST Custom Screen Printing"` (User request references "TS Custom Screen Printing").

---

### 2. Homepage Elements (`pages/Home.tsx` and `pages/Gallery.tsx`)
* **"Drop 01", "Drop 02", etc. Numbering Labels**:
  * `pages/Home.tsx:26-57`:
    ```typescript
    const PROJECT_DETAILS = [
      { label: "Drop 01", title: "Oversized Streetwear Set", subtitle: "Soft-hand print with tight registration and consistent opacity." },
      { label: "Drop 02", title: "Athletic Club Series", subtitle: "Durable team graphics engineered for repeat wash cycles." },
      { label: "Drop 03", title: "Tour Merch Capsule", subtitle: "High-impact front and back prints built for launch day." },
      { label: "Drop 04", title: "Retail Essentials Batch", subtitle: "Clean, minimal branding optimized for premium shelf presence." },
      { label: "Drop 05", title: "Festival Graphic Run", subtitle: "Vibrant ink layering tuned for sharp detail under stage light." },
      { label: "Drop 06", title: "Core Logo Program", subtitle: "Reliable brand consistency across multiple garment styles." },
    ];
    ```
  * `pages/Home.tsx:535-537`:
    ```tsx
    <div className="inline-block bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-2 -rotate-2">
      {PROJECT_DETAILS[idx]?.label ?? `Project ${idx + 1}`}
    </div>
    ```
  * `pages/Home.tsx:603-606` (Lightbox modal):
    ```tsx
    <p className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-slate-700 border border-slate-300 rounded-full px-3 py-1 mb-2">
      {PROJECT_DETAILS[activeIndex]?.label ?? `Project ${activeIndex + 1}`}
    </p>
    ```
  * `pages/Gallery.tsx:18-49` & `pages/Gallery.tsx:195-198`:
    * Identical `PROJECT_DETAILS` array with `Drop 01`–`Drop 06` duplicated in `Gallery.tsx` and displayed in badges (`top-4 right-4`).
* **Pill Tags, Floating Stickers & Harsh Card Outlines**:
  * `pages/Home.tsx:469-487` ("Recent Production Work" section splash stickers):
    * `absolute top-8 right-[15%] w-40 h-16 bg-orange-500 rounded-[2rem] rotate-[-6deg] opacity-90`
    * `absolute top-6 right-[14%] w-40 h-16 border-2 border-slate-900 rounded-[2rem] rotate-[-6deg]`
    * `absolute bottom-12 left-[8%] w-32 h-14 bg-purple-600 rounded-[2rem] rotate-[4deg] opacity-90`
    * `absolute bottom-10 left-[7%] w-32 h-14 border-2 border-slate-900 rounded-[2rem] rotate-[4deg]`
    * `absolute top-1/2 right-[5%] w-20 h-20 bg-yellow-400 rounded-full opacity-80`
  * `pages/Home.tsx:361-409` (Buttons with offset sticker frames):
    * `absolute inset-0 bg-orange-500 rounded-full translate-x-1 translate-y-1` with `border-2 border-slate-900`
    * `absolute inset-0 bg-purple-600 rounded-full translate-x-1 translate-y-1` with `border-2 border-slate-900`
    * `absolute inset-0 bg-yellow-400 rounded-full translate-x-1 translate-y-1` with `border-2 border-slate-900`
    * `absolute inset-0 bg-cyan-400 rounded-full translate-x-1 translate-y-1` with `border-2 border-slate-900`
  * `pages/Home.tsx:427`:
    * Card shadow: `shadow-[8px_8px_0_#FF6720]` (harsh 8px solid neon orange offset border/shadow) on `rounded-3rem`.
  * `pages/Home.tsx:505-512`:
    * View Gallery button: `absolute inset-0 bg-orange-500 rounded-full translate-x-1 translate-y-1` with `border-2 border-slate-950`.
  * `pages/Home.tsx:568, 580, 588`:
    * Modal controls: `border-2 border-slate-900 rounded-full w-11 h-11 shadow-[3px_3px_0_#0f172a]`.
* **Phone Link Bug**:
  * `pages/Home.tsx:649`: Display text is `(732) 347-0101`, but `href` is `tel:+19053384034` (wrong area code).

---

### 3. Navigation Menu (`components/Navbar.tsx`)
* **Current Navigation Items (`Navbar.tsx:85-91`)**:
  ```typescript
  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Gallery", id: "gallery" },
    { label: "Catalogue", id: "catalogue" },
    { label: "Contact", id: "contact" },
  ];
  ```
* **Status of Project Resources**:
  * "Project Resources" is completely absent from the navbar on both desktop and mobile!
  * Pages `/guide` (Print Guide), `/colors` (Color Guide), and `/pricing` (Pricing) are currently unreachable from the primary navigation bar.
* **Button Outlines**:
  * `Navbar.tsx:165`: `Start Order` desktop button has harsh neo-brutalist shadow: `border-2 border-slate-950 shadow-[4px_4px_0_#fb923c]`.
  * `Navbar.tsx:274`: `Start Order` mobile button has `border-2 border-slate-950 shadow-[6px_6px_0_#fb923c]`.

---

### 4. Contact & FAQ Sections Across All Pages
* **FAQ Placement (`components/Footer.tsx:79-155`)**:
  * The FAQ accordion (10 questions) is hardcoded inside `Footer.tsx`.
  * Because `Footer` is rendered globally in `App.tsx:187`, the entire FAQ section appears on ALL 12 pages indiscriminately.
* **Redundant Contact Us Sections / Prompts**:
  * `pages/Catalogue.tsx:319-337`: Redundant "Contact Us" button alongside "Fill Quote Form" in Step 3.
  * `pages/Catalogue.tsx:441-514`: Entire redundant "Need Help? Call us / Email us" card at the bottom of the catalogue.
  * `pages/About.tsx:574-585`: Redundant "Contact Us" button with offset shadow alongside "Request Quote".
  * `pages/Gallery.tsx:254-260`: "Get a Quote" button that redundantly navigates to `"contact"`.
  * `pages/PrivacyPolicy.tsx:242-281`: Redundant "Questions About Privacy? Contact Us" section with "Email Us" and "Call Us" buttons.
  * `pages/TermsAndConditions.tsx:471-511`: Redundant "Questions? Contact Us" section with "Email Us" and "Call Us" buttons.
  * `pages/RefundPolicy.tsx:195-234`: Redundant "Have a Question? Contact Us" section with "Email Us" and "Call Us" buttons.

---

### 5. Footer (`components/Footer.tsx`)
* **Subtitle & Copy**:
  * `Footer.tsx:162`: `<Logo className="h-10" subtitleAlwaysVisible />` renders `CUSTOM SCREEN PRINTING` subtitle in all viewports.
  * `Footer.tsx:165-168`:
    `<p className="text-white/40 text-sm leading-relaxed font-medium">High-fidelity apparel solutions for modern brands. We combine architectural precision with industrial-grade screen printing.</p>`
  * `Footer.tsx:276-279`:
    `<p>&copy; {new Date().getFullYear()} ST Custom Screen Printing. Precision Manufactured.</p>`
* **Contrast Deficiencies**:
  * Bottom copyright: `text-white/20 text-[10px]` (`Footer.tsx:275`) — contrast ratio ~1.5:1 against dark background (fails WCAG AA/AAA).
  * Column descriptions & HQ Data: `text-white/40 text-[13px]` (`Footer.tsx:165, 258`) — contrast ~3:1 (fails standard 4.5:1 text requirement).
  * Navigation links: `text-white/60 text-sm` (`Footer.tsx:175, 210`) — marginal contrast; needs brightening to `text-slate-300` / `text-white/85`.
* **Social Media Handles**:
  * `Footer.tsx:281-302`:
    * Instagram: `<a href="#" aria-label="Follow us on Instagram">` (placeholder dead link).
    * Twitter: `<a href="#" aria-label="Follow us on Twitter">` (placeholder dead link).
    * Vimeo: `<a href="#" aria-label="Follow us on Vimeo"><i className="fab fa-vimeo-v">` (irrelevant platform for custom screen printing; placeholder link).
* **Project Resources Links in Footer (`Footer.tsx:207-252`)**:
  * Contains links to: Full Catalogue (`sportswearcollection.com`), Pricing Guide (`/pricing`), Placement Guide (`/guide`), Ink Color Lab (`/colors`).

---

### 6. Sportswear / Catalog Section (`pages/Catalogue.tsx`)
* **Structure**: 3-step workflow educating the user how to pick items from external supplier (S&S Activewear at `https://www.sportswearcollection.com/st-screen-printing`) and return to submit a quote.
* **Extraneous Prompts**:
  * Step 3 has a secondary button: `Contact Us` (`Catalogue.tsx:320-337`).
  * Bottom of page features a full "Need Help?" callout with "Call us" and "Email us" (`Catalogue.tsx:441-514`), distracting from the streamlined browse -> quote conversion funnel.

---

### 7. Privacy Policy & Terms Pages (`PrivacyPolicy.tsx`, `TermsAndConditions.tsx`, `RefundPolicy.tsx`)
* **Missing Mailer / Follow-Up Clauses (`PrivacyPolicy.tsx`)**:
  * Current section (`PrivacyPolicy.tsx:144-158`) only covers general order processing emails and generic opt-in mailing list unsubscribe.
  * Missing required clauses:
    1. Explicit clause for sending Users information of interest (monthly mailers, future business follow-ups).
    2. Explicit clause for periodic emails regarding products, services, and industry news.
    3. Explicit clause for reminder emails (quote follow-ups, pending order reminders, repeat order schedules).
* **Styling & Layout**:
  * Enclosed inside heavy cards (`bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_rgba(15,23,42,0.06)]`) on `bg-slate-50`.
  * Low visual hierarchy: H2 section headers are tiny (`text-base font-black`).
  * Redundant bottom CTA cards ("Contact Us") and duplicate inline footers with copyright and "Back to Home" (`PrivacyPolicy.tsx:284-296`, `TermsAndConditions.tsx:514-526`, `RefundPolicy.tsx:237-249`).

---

### 8. Color Guide (`pages/ColorGuide.tsx` & `services/dataService.ts`)
* **Data Layer (`services/dataService.ts:32-55`)**:
  * Stock Colors (11): Black, White, Red (186 C), Orange (165 C), Golden Yellow (1235 C), Lemon Yellow (108 C), Kelly Green (356 C), Royal Blue (287 C), Navy (281 C), Violet (Violet C), Fuchsia (807 C).
  * Additional Colors (7): Process Blue, Sky Blue (283 C), Teal (320 C), Reflex Blue (2738 C), Lavender (2635 C), Light Purple (265 C), Purple (268 C).
* **Discrepancies**:
  * `ColorGuide.tsx:14-21` checks `isLight` for `"primrose"`, `"flesh"`, `"light gray"`, `"fluorescent yellow"`, none of which exist in `INITIAL_INKS`!
  * Missing core industry standard apparel inks:
    - Forest Green / Dark Green (Pantone 357 C / 343 C)
    - Maroon / Cardinal (Pantone 209 C / 202 C)
    - Athletic Heather Grey / Cool Gray (Pantone Cool Gray 7 C)
    - Charcoal (Pantone 432 C)
    - Brown / Chocolate (Pantone 469 C)
    - Tan / Khaki (Pantone 468 C)
    - Soft Pink / Pastel Pink (Pantone 189 C)
    - Dark Teal / Emerald (Pantone 328 C)

---

### 9. Print / Placement Guide (`pages/PrintGuide.tsx` & `public/size-guide/assets/`)
* **Assets**:
  * 21 PNG files exist in `public/size-guide/assets/`.
  * `public/size-guide/assets/placementguide.png` (765 KB) is a comprehensive master diagram that is currently commented out in `PrintGuide.tsx:135-137`.
* **Sizing and Responsiveness Bottlenecks**:
  * `pages/PrintGuide.tsx:150`: "Popular Placements" uses `h-44` (176px fixed container) with `max-h-full object-contain`.
  * `pages/PrintGuide.tsx:171, 177`: "Print Measurements" puts 14 items into a cramped `lg:grid-cols-6` grid with `h-32` (128px) image height.
  * Result: Text annotations and dimension callouts on garment illustrations are cramped and illegible on desktop and mobile.

---

### 10. Pricing Page (`pages/Pricing.tsx`)
* **Box Sizing & Padding Bottlenecks**:
  * `DEPOSITS` Card (`Pricing.tsx:136`):
    `<div className="border-[3px] border-slate-900 p-10 md:p-14 min-h-[280px] flex flex-col justify-center">`
    Contains only 2 lines of text ("Effective 1/1/2026. A minimum deposit of 100% is required...") enclosed in a massive fixed 280px height box with 40px–56px padding and harsh 3px black borders.
  * `CHARGES` Card (`Pricing.tsx:154`):
    `<div className="border-[3px] border-slate-900 p-10 md:p-14 min-h-[280px]">`
    Contains only 2 bullet points (Screen Charges: $20, Artwork Charges: $30/hr) because Digitizing and Pantone Matching were commented out (`Pricing.tsx:172-177`).
    Fixed `min-h-[280px]` leaves >60% of the box as empty dead space.

---

## 2. Logic Chain

1. **Routing & Navigation Gap (Items 1 & 3)**:
   * *Observation*: `App.tsx` routes `/guide`, `/colors`, and `/pricing`, but `Navbar.tsx` only renders Home, About, Gallery, Catalogue, and Contact.
   * *Inference*: Project resources are inaccessible from top navigation unless a user stumbles upon them in the footer.
   * *Conclusion*: Adding a "Project Resources" dropdown menu to `Navbar.tsx` (containing Print Guide, Color Guide, Pricing, and Catalog) directly satisfies requirement R2.

2. **Visual Consistency & Competitor Alignment (Item 2)**:
   * *Observation*: `Home.tsx` contains `PROJECT_DETAILS` with "Drop 01" through "Drop 06", rotated pill tags, offset sticker buttons, floating decorative blobs (`rounded-[2rem] rotate-[-6deg]`), and harsh solid shadows (`shadow-[8px_8px_0_#FF6720]`). `Gallery.tsx` duplicates the exact same "Drop 01" through "Drop 06" labels.
   * *Inference*: These neo-brutalist / streetwear sticker elements conflict with the refined, high-contrast, clean athletic aesthetic of the benchmark competitor (blackdogapparelco.com).
   * *Conclusion*: Removing the "Drop 0X" numbering and harsh pill/border treatments from both `Home.tsx` and `Gallery.tsx` restores clean, professional apparel typography.

3. **FAQ & Contact Redundancy (Items 4, 5, 6)**:
   * *Observation*: `Footer.tsx` embeds the FAQ accordion globally. `Catalogue.tsx`, `PrivacyPolicy.tsx`, `TermsAndConditions.tsx`, and `RefundPolicy.tsx` all repeat identical "Contact Us" prompt cards.
   * *Inference*: The user experiences repetitive contact prompts on pages where the primary goal is either reading policies or browsing products.
   * *Conclusion*: Extracting FAQ out of `Footer.tsx` into a dedicated FAQ section/page and stripping redundant "Contact Us" cards from catalog and legal pages will declutter user journeys and match competitor flow.

4. **Footer Contrast & Legal Simplicity (Item 5)**:
   * *Observation*: Footer uses `text-white/20` and `text-white/40`, placeholder `#` social links with an unneeded Vimeo icon, and redundant subtitle text.
   * *Inference*: The footer fails accessibility contrast requirements and looks unmaintained due to dead `#` social links.
   * *Conclusion*: Brightening all links to `text-slate-300`/`text-white`, cleaning up social handles to active platforms (Instagram, Facebook), and stripping the redundant precision manufacturer subtitle will bring the footer into compliance.

5. **Legal Compliance & Spacing (Item 7)**:
   * *Observation*: `PrivacyPolicy.tsx` lacks explicit clauses for monthly mailers, periodic updates, and reminder emails, and wraps legal copy in heavy card containers with tiny headings.
   * *Inference*: The privacy policy does not meet explicit client business requirements for marketing communications and follow-ups.
   * *Conclusion*: Adding the three required clauses and adopting an open, high-readability layout with prominent Oswald H2 headings and Poppins body text directly satisfies R2.

6. **Information Clarity & Dynamic Fitting (Items 8, 9, 10)**:
   * *Observation*: `ColorGuide.tsx` has outdated ink names; `PrintGuide.tsx` shrinks diagrams into cramped 6-column grids with 128px height; `Pricing.tsx` forces minimal data into fixed `min-h-[280px]` boxes with `border-[3px]`.
   * *Inference*: Visitors looking for technical details (print sizes, ink options, pricing) encounter either incomplete data, illegible diagrams, or awkward empty space.
   * *Conclusion*: Updating `INITIAL_INKS` with standard apparel colors, expanding diagram containers in `PrintGuide.tsx`, and removing fixed `min-h-[280px]` on `Pricing.tsx` will deliver dynamic, proportional layout fitting.

---

## 3. Caveats

1. **Third-Party Form Integrations**: Both `Quote.tsx` and `Contact.tsx` load Cognito Forms asynchronously via external script (`https://www.cognitoforms.com/f/seamless.js`). Changes to form layout or containers must preserve `#cognito-embed` and `#cognito-contact-embed` IDs so the script can mount properly.
2. **Local Storage Persistence in `dataService.ts`**: `fetchInks` and `fetchPricing` prioritize `localStorage.getItem('ts_customs_inks')` if previously set in the browser. When testing ink or pricing updates in development, browser `localStorage` should be cleared to see new defaults.
3. **Tailwind v4 vs v3 Architecture**: The project uses Tailwind CSS v4 (`@import "tailwindcss";` and `@theme` in `index.css`), alongside a `tailwind.config.js`. Font additions (Oswald, Poppins) and container width tokens should be added to both `index.css` (`@theme`) and `tailwind.config.js` for consistency.

---

## 4. Conclusion & Actionable Recommendations

### Action Plan by File & Component:

| Component / File | Current Defect | Required Remediation |
|---|---|---|
| `components/Navbar.tsx` | Missing Project Resources; harsh offset shadows on "Start Order" button. | Add a "Project Resources" dropdown containing Print Guide (`/guide`), Color Guide (`/colors`), Pricing (`/pricing`), and Full Catalogue (`/catalogue`); remove neo-brutalist button shadow. |
| `pages/Home.tsx` | "Drop 01"–"Drop 06" labels; rotated pill tags; floating decorative sticker blobs (`rounded-[2rem] rotate-[-6deg]`); harsh 8px solid orange shadow (`shadow-[8px_8px_0_#FF6720]`); phone link bug (`tel:+19053384034`). | Remove "Drop 0X" labels; replace with clean merch category titles; remove decorative rotated sticker shapes; soften card borders and shadows; fix phone `href` to `tel:+17323470101`. |
| `pages/Gallery.tsx` | Duplicated "Drop 01"–"Drop 06" badges (`Gallery.tsx:195-198`); "Get a Quote" button routes to `contact`. | Remove "Drop 0X" badges; align button labels and destinations (`quote`). |
| `components/Footer.tsx` | FAQ accordion embedded globally; extremely low contrast (`text-white/20`, `text-white/40`); redundant subtitle; dead `#` social links with Vimeo. | Extract FAQ section out of `Footer.tsx` into dedicated component/page; brighten text and links to accessible white/slate-300; remove subtitle; cleanly integrate real Instagram/Facebook links. |
| `pages/Catalogue.tsx` | Step 3 has redundant "Contact Us" button; bottom has redundant "Need Help? Call/Email us" section. | Remove secondary "Contact Us" button in Step 3; remove the bottom "Need Help?" contact block to streamline quote conversion. |
| `pages/PrivacyPolicy.tsx` | Missing explicit clauses for monthly mailers, periodic emails, reminder emails; heavy card container; redundant bottom Contact CTA and mini-footer. | Add the 3 explicit communication clauses; convert card layout into clean, open, blackdogapparelco-style document layout with prominent H2 headings; remove redundant Contact card and duplicate footer. |
| `pages/TermsAndConditions.tsx` & `RefundPolicy.tsx` | Heavy card container; redundant bottom Contact CTA and duplicate footer. | Convert into clean, open document layout; remove redundant bottom Contact card and duplicate mini-footer. |
| `services/dataService.ts` & `pages/ColorGuide.tsx` | Missing standard apparel inks (Forest Green, Maroon, Athletic Grey, Charcoal, Chocolate, Tan, Soft Pink); dead color checks in `ColorGuide.tsx`. | Reupdate `INITIAL_INKS` with standard apparel plastisol colors; align `ColorGuide.tsx` light/dark text contrast checks. |
| `pages/PrintGuide.tsx` | Cramped 6-column grid; `h-32` and `h-44` containers render diagram text illegible; commented-out master `placementguide.png`. | Uncomment and showcase `placementguide.png` responsively; expand diagram cards to 2–4 columns with taller containers (`h-56`–`h-64`) so measurements are legible. |
| `pages/Pricing.tsx` | Fixed `min-h-[280px]` and huge `p-10 md:p-14` padding with `border-[3px]` create massive empty space. | Remove fixed `min-h-[280px]`; adjust padding to `p-6 md:p-8`; soften borders to `border border-slate-200 rounded-2xl` for dynamic content fitting. |
| `index.html` & `index.css` | Google Fonts Oswald (600, 700, 800) and Poppins (300, 400, 600) not imported; container widths (1068px / 1348px) not defined. | Import Oswald & Poppins via Google Fonts; declare `--font-family-display: 'Oswald'` and `--font-family-sans: 'Poppins'` in `@theme`; set up standard container utilities. |

---

## 5. Verification Method

1. **Build & Typecheck Command**:
   ```bash
   PATH=/tmp/node/bin:$PATH npm run build
   ```
   *Expected outcome*: Exit code 0, 0 TypeScript errors, bundle output generated cleanly in `dist/`.
2. **File Inspection**:
   * Inspect `pages/Home.tsx` and `pages/Gallery.tsx` to verify zero instances of `Drop 0` string matching.
   * Inspect `components/Navbar.tsx` to verify "Project Resources" dropdown structure.
   * Inspect `components/Footer.tsx` to verify absence of FAQ accordion and verified contrast classes.
   * Inspect `pages/PrivacyPolicy.tsx` to verify mailer, periodic, and reminder clauses.
   * Inspect `pages/Pricing.tsx` to verify dynamic card fitting without fixed `min-h-[280px]`.
3. **Invalidation Conditions**:
   * Any TypeScript compile failure.
   * Cognito form embeds failing to load due to missing container IDs.
   * Any page missing primary header or footer.
