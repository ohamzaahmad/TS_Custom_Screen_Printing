Audit the TS Custom Screen Printing website across UX/UI, CRO, copywriting, layout, mobile responsiveness, and SEO/performance, and implement the high-priority recommendations directly into the production codebase, aligning typography, font sizing, line height, spacing, and page elements with competitor standard (https://blackdogapparelco.com/) and specific user requirements.

Working directory: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing
Integrity mode: development

## Requirements

### R1. Competitor Typography & Design System Alignment (blackdogapparelco.com)
- Primary Display & Headings Font: Oswald (Google Fonts; weights 600, 700, 800) for H1, H2, H3, badges, navigation links, and primary CTA buttons with uppercase treatment.
- Body & Subtitle Font: Poppins (Google Fonts; weights 300, 400, 600) for subheadlines, body copy, descriptions, and forms, replacing low-contrast text with accessible, readable typography.
- Container & Spacing System: Align standard container width (1068px) and wide breakout width (1348px), with consistent 80px–96px desktop vertical section rhythm and 48px–64px mobile spacing.

### R2. Page-Specific Enhancements & Simplification
- **Homepage Elements Cleanup:** Remove odd pill tags and harsh outlines from graphic cards. Remove "Drop 01", "Drop 02", "Drop 03" numbering labels from projects/carousel and replace with clean project/merch titles.
- **Navigation Menu:** Consolidate Project Resources into a clean dropdown or dedicated menu item in the navbar.
- **Contact & FAQ Cleanup:** Remove "Contact Us" and FAQ sections from pages where they cause redundant clutter; keep them exclusively on their dedicated, relevant pages.
- **Footer Refinement:** Brighten low-contrast links for visibility. Remove "custom screen printing precision manufacturer" subtitle in the footer and match the clean, simple legal layout of blackdogapparelco. Ensure social media handles are cleanly integrated.
- **Sportswear / Catalog Section:** Remove "Contact Us" from sportswear / catalog pages to match competitor flow.
- **Privacy Policy & Terms Pages:** Match simple, clear layout of blackdogapparelco. Fix spacing and font prominence. In Privacy Policy, include explicit clauses for: sending Users information of interest (monthly mailers, future business follow-ups), periodic emails, and reminder emails.
- **Color Guide:** Reupdate the color list to align with updated apparel standards.
- **Print / Placement Guide:** Ensure placement guide images are fully responsive, scaled appropriately, and large enough for clear viewing on both mobile and desktop.
- **Pricing Page:** Readjust charges and services box sizing so cards dynamically fit content cleanly without excessive empty space when data is minimal.

### R3. Comprehensive Website Audit Report
Conduct a comprehensive audit across all 6 specified areas: (1) First impressions & high-level audit (clear value proposition within 5 seconds, navigation clarity, layout flow, conversion barriers, visual hierarchy); (2) Hero section & copywriting (headline, subheadline, CTA copy, value proposition clarity); (3) CRO & CTA improvements (conversion paths, CTA visibility, trust signals); (4) UI/UX & layout simplification (clean navigation, logical section sequencing, modern whitespace and card layouts); (5) Mobile-first optimization (thumb-friendly navigation, 48px tap targets, readable font sizing, eliminating layout shifts); (6) SEO & page speed (optimal H1/H2/H3 structure, meta title, meta description, Core Web Vitals). Document findings and categorized recommendations (Impact vs. Effort).

### R4. Quality Assurance and Build Verification
Verify that `PATH=/tmp/node/bin:$PATH npm run build` passes with zero errors, TypeScript compiles cleanly, all navigation, quote forms, and responsive views remain functional, and layouts render flawlessly across mobile and desktop.

## Acceptance Criteria

### Typography & Layout Alignment
- [ ] Google Fonts Oswald and Poppins are integrated in `index.html`, `tailwind.config.js`, and `index.css`.
- [ ] Hero section features high-converting copy in Oswald (H1) and Poppins (subheadline) with clear value proposition and prominent CTAs.
- [ ] Navigation bar and CTA buttons use Oswald uppercase typography with proper tap target sizing.
- [ ] Container widths (1068px / 1348px) and section spacing rhythm are standardized.

### Page-Specific Refinements
- [ ] "Drop 01/02/03" numbering and harsh pill outlines in homepage graphics are removed.
- [ ] Project Resources is integrated as a clean navigation menu item.
- [ ] Redundant Contact Us and FAQ sections are removed from non-essential pages and retained only on dedicated pages.
- [ ] Footer links are high-contrast/bright, footer subtitle is simplified to match blackdogapparelco style, keeping legal links.
- [ ] Sportswear/catalog page removes extraneous contact prompts.
- [ ] Privacy Policy & Terms pages are simplified to match blackdogapparelco style with prominent fonts, proper spacing, and the specified email/mailer clauses.
- [ ] Color guide list is reupdated.
- [ ] Placement guide diagrams/images are responsive and comfortably legible across screen sizes.
- [ ] Pricing page service/charges cards are sized proportionally to their content.

### Audit Deliverables & SEO
- [ ] Written audit report document is generated covering all 6 audit dimensions with Impact/Effort classification.
- [ ] Technical SEO metadata (title, description, semantic H1/H2/H3 nesting) is applied.

### Verification & Stability
- [ ] Build command succeeds with 0 errors and zero regressions.
