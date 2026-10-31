# Project: TS Custom Screen Printing Website Audit & Production Overhaul

## Architecture
- **Framework**: React 19.2.3, Vite 6.2.0, Framer Motion 12.38.0
- **CSS / Design System**: Tailwind CSS v4.1.18 (@import "tailwindcss"; `@theme` in `index.css`)
- **Type System**: TypeScript 5.8.2 (`tsconfig.json`, target ES2022, path alias `@/*`)
- **Routing**: History API client router in `App.tsx` managing 12 page routes
- **Data & Mock Service**: `services/dataService.ts` providing apparel inks, pricing, categories, and products with localStorage cache
- **Competitor Benchmark**: `https://blackdogapparelco.com/` (Oswald uppercase display/headings/nav/CTAs, Poppins readable body, 1068px standard container, 1348px wide breakout, minimal high-contrast footer, clean legal layout).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Google Fonts Oswald & Poppins Integration | Integrate Oswald (600, 700, 800) and Poppins (300, 400, 600) via `index.html`, `index.css` (@theme), and `tailwind.config.js` | M1 | Survey 1, Survey 3, R1 |
| 2 | Container & Breakout Width System | Implement standard container (1068px) and wide breakout (1348px) with responsive gutters | M1 | Survey 1, Survey 3, R1 |
| 3 | Vertical Spacing Rhythm | Enforce 80px–96px desktop vertical section rhythm and 48px–64px mobile rhythm | M1 | Survey 1, Survey 3, R1 |
| 4 | Base Headings & Display Styling | Set H1–H6 to Oswald uppercase with clean tracking and body/forms to Poppins | M1 | Survey 1, Survey 3, R1 |
| 5 | Homepage Hero & Copywriting Overhaul | Replace abstract chemical engineering copy with high-converting Oswald headline and Poppins value proposition | M2 | Survey 3, R2, R3 |
| 6 | Homepage Graphics & Pill Cleanup | Remove rotated sticker pills, harsh 8px solid orange outlines, and neon decoration blobs | M2 | Survey 2, Survey 3, R2 |
| 7 | Project Numbering Cleanup | Remove "Drop 01"–"Drop 06" labels from `Home.tsx` and `Gallery.tsx`; replace with clean merch category titles | M2 | Survey 2, Survey 3, R2 |
| 8 | Phone Link Correction | Fix `tel:+19053384034` bug in `Home.tsx` to display and link to `(732) 347-0101` (`tel:+17323470101`) | M2 | Survey 2, Survey 3, R2 |
| 9 | Project Resources Navbar Dropdown | Consolidate Print Guide, Color Guide, Pricing, and Catalog into a clean "Project Resources" dropdown menu in `Navbar.tsx` | M2 | Survey 2, Survey 3, R2 |
| 10 | Global Footer Streamlining | Remove 10-item FAQ accordion from `Footer.tsx`; brighten low-contrast text; remove "precision manufacturer" subtitle; clean social links | M2 | Survey 2, Survey 3, R2 |
| 11 | Sportswear / Catalog Funnel Cleanup | Remove secondary "Contact Us" prompt in Step 3 and the bottom "Need Help?" contact block on `Catalogue.tsx` | M2 | Survey 2, Survey 3, R2 |
| 12 | Privacy Policy & Terms Simplification | Match Black Dog clean legal layout; remove redundant contact cards and duplicate mini-footers | M2 | Survey 2, Survey 3, R2 |
| 13 | Privacy Policy Mandatory Clauses | Add explicit clauses for monthly mailers, future business follow-ups, periodic emails, and reminder emails | M2 | Survey 2, Survey 3, R2 |
| 14 | Color Guide Apparel Inks Update | Update `INITIAL_INKS` in `services/dataService.ts` with 11 stock, 28 additional, and 4 fluorescent standard apparel colors | M2 | Survey 2, Survey 3, R2 |
| 15 | Print Placement Guide Responsiveness | Uncomment master `placementguide.png`; expand diagram cards to responsive 1-4 column grid with readable container heights | M2 | Survey 2, Survey 3, R2 |
| 16 | Pricing Page Dynamic Card Sizing | Remove fixed `min-h-[280px]` and excessive padding on `DEPOSITS` and `CHARGES` cards in `Pricing.tsx` for dynamic auto-fit | M2 | Survey 2, Survey 3, R2 |
| 17 | Comprehensive Website Audit Report | Document findings across all 6 audit areas with Impact vs. Effort Prioritization Matrix in `AUDIT_REPORT.md` | M3 | Survey 3, R3 |
| 18 | Technical SEO & Title Clobber Bug Fix | Fix `App.tsx` global effect clobbering `document.title`; ensure semantic H1/H2/H3 nesting and meta tags across all pages | M3 | Survey 3, R3 |
| 19 | Dual Track E2E Quality Assurance | Opaque-box E2E test verification, adversarial review, forensic integrity audit, and build check with 0 errors | M4 | R4 |

## Code Layout
- `index.html`: Entry HTML, Google Fonts preconnect & Oswald/Poppins links, meta tags, schema
- `index.css`: Global styles, Tailwind v4 `@theme` tokens, container width classes, typography rules
- `tailwind.config.js`: Tailwind typography and color definitions
- `App.tsx`: Routing, layout wrapper, title management fix
- `components/Navbar.tsx`: Header navigation, desktop & mobile menus, Project Resources dropdown
- `components/Footer.tsx`: Streamlined footer, high-contrast links, legal links, social links
- `pages/Home.tsx`: Hero section, value propositions, curated projects (no Drop labels/harsh pills), phone link
- `pages/Gallery.tsx`: Gallery grid, removal of Drop badges, alignment of quote CTAs
- `pages/Catalogue.tsx`: Sportswear catalog funnel, removal of extraneous contact prompts
- `pages/Pricing.tsx`: Dynamic sizing for Deposits and Charges cards, clean borders
- `pages/PrintGuide.tsx`: Responsive placement guide diagrams, master diagram integration
- `pages/ColorGuide.tsx`: Apparel ink color display, light/dark contrast handling
- `pages/PrivacyPolicy.tsx`: Clean legal layout, mandatory mailer/reminder clauses
- `pages/TermsAndConditions.tsx`: Clean legal layout without redundant CTA cards
- `pages/RefundPolicy.tsx`: Clean legal layout without redundant CTA cards
- `services/dataService.ts`: Ink color palette expansion, pricing data
- `hooks/useSEO.ts`: Per-page SEO title and meta tag management
- `AUDIT_REPORT.md`: Comprehensive 6-dimension audit report with Impact vs. Effort matrix

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Typography & Design System Alignment | Features 1, 2, 3, 4 (`index.html`, `index.css`, `tailwind.config.js`) | Survey complete | IN_PROGRESS |
| M2 | Page-Specific Refinements & Content Simplification | Features 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 | M1 | PLANNED |
| M3 | Comprehensive Website Audit Report & Technical SEO | Features 17, 18 (`AUDIT_REPORT.md`, `App.tsx`, `useSEO.ts`) | M1, M2 | PLANNED |
| M4 | E2E Testing & Quality Assurance Verification | Feature 19 (Full test verification, zero build errors, gate approval) | M1, M2, M3 | PLANNED |

## Interface Contracts
### Design System ↔ Pages
- `index.css` exports `@theme` tokens:
  - `--font-display: 'Oswald', ui-sans-serif, sans-serif;`
  - `--font-sans: 'Poppins', ui-sans-serif, sans-serif;`
- Container utility classes:
  - `.container-standard` / `max-w-[1068px]`
  - `.container-breakout` / `max-w-[1348px]`
  - `.section-rhythm` (`py-12 md:py-20 lg:py-24`)

### App Router ↔ Pages
- Page loaders communicate active page to `Navbar` and `Footer`.
- Route change must preserve page-specific document title set by `useSEO` without being overwritten by `App.tsx`.
