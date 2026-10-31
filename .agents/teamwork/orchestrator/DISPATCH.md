## 2026-10-31T12:56:09Z

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
- **Privacy Policy & Terms Pages:** Match simple, clean layout of blackdogapparelco. Fix spacing and font prominence. In Privacy Policy, include explicit clauses for: sending Users information of interest (monthly mailers, future business follow-ups), periodic emails, and reminder emails.
- **Color Guide:** Reupdate the color list to align with updated apparel standards.
- **Print / Placement Guide:** Ensure placement guide images are fully responsive, scaled appropriately, and large enough for clear viewing on both mobile and desktop.
- **Pricing Page:** Readjust charges and services box sizing so cards dynamically fit content cleanly without excessive empty space when data is minimal.

### R3. Comprehensive Website Audit Report
Conduct a comprehensive audit across all 6 specified areas: (1) First impressions & high-level audit (clear value proposition within 5 seconds, navigation clarity, layout flow, conversion barriers, visual hierarchy); (2) Hero section & copywriting (headline, subheadline, CTA copy, value proposition clarity); (3) CRO & CTA improvements (conversion paths, CTA visibility, trust signals); (4) UI/UX & layout simplification (clean navigation, logical section sequencing, modern whitespace and card layouts); (5) Mobile-first optimization (thumb-friendly navigation, 48px tap targets, readable font sizing, eliminating layout shifts); (6) SEO & page speed (optimal H1/H2/H3 structure, meta title, meta description, Core Web Vitals). Document findings and categorized recommendations (Impact vs. Effort).

### R4. Quality Assurance and Build Verification
Verify that `PATH=/tmp/node/bin:$PATH npm run build` passes with zero errors, TypeScript compiles cleanly, all navigation, quote forms, and responsive views remain functional, and layouts render flawlessly across mobile and desktop.
