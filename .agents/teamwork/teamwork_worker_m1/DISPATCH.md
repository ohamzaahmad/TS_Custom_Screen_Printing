# DISPATCH — M1 Worker: Typography & Design System Implementation

## Identity & Role
- Archetype: teamwork_worker
- Working Directory: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_worker_m1
- Original Request: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/ORIGINAL_REQUEST.md
- Scope Document: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/PROJECT.md
- Input Explorer Reports:
  - `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_1/handoff.md`
  - `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_2/handoff.md`
  - `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_3/handoff.md`

## Exclusive Write Ownership
You have exclusive write ownership of:
1. `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/index.html`
2. `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/index.css`
3. `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/tailwind.config.js`
Do NOT modify files outside this list.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective
Implement Milestone 1: Competitor Typography & Design System Alignment (blackdogapparelco.com):
1. **In `index.html`**:
   - Add Google Fonts stylesheet link for `Oswald` (weights 600, 700, 800) and `Poppins` (weights 300, 400, 600) with `display=swap`:
     `<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700;800&family=Poppins:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet" />`
   - Align `<title>`, meta description, OG tags, and Schema.org metadata to "TS Custom Screen Printing".
2. **In `index.css`**:
   - Replace the Plus Jakarta Sans `@import` with the Oswald & Poppins Google Fonts import.
   - Configure `@theme` with:
     `--font-display: 'Oswald', ui-sans-serif, sans-serif;`
     `--font-heading: 'Oswald', ui-sans-serif, sans-serif;`
     `--font-body: 'Poppins', ui-sans-serif, sans-serif;`
     `--font-sans: 'Poppins', ui-sans-serif, system-ui, sans-serif;`
     `--container-standard: 1068px;`
     `--container-breakout: 1348px;`
   - In `:root`, define `--container-standard: 1068px`, `--container-breakout: 1348px`, `--max-content-width: 1068px`, and section rhythm variables.
   - Add base typography rules:
     - `body`: font-family `var(--font-body, 'Poppins', sans-serif)`, line-height 1.6, font smoothing.
     - `h1, h2, h3, h4, h5, h6`: font-family `var(--font-heading, 'Oswald', sans-serif)`, text-transform `uppercase`, tracking `-0.01em` / `tight`.
     - `button, .btn, .btn-gradient`: font-family `var(--font-heading, 'Oswald', sans-serif)`, text-transform `uppercase`, tracking `0.05em`.
     - `nav a, nav button`: font-family `var(--font-heading, 'Oswald', sans-serif)`, text-transform `uppercase`.
   - Add container and vertical section rhythm utility classes:
     - `.container, .container-standard`: max-width `1068px` with responsive padding (1rem mobile, 1.5rem sm, 2rem lg).
     - `.container-breakout`: max-width `1348px` with responsive padding.
     - `.max-w-standard, .max-w-[1068px]`: max-width `1068px`.
     - `.max-w-breakout, .max-w-[1348px]`: max-width `1348px`.
     - `.section-rhythm`: 48px mobile (`3rem`), 64px tablet (`4rem`), 80px desktop (`5rem`), 96px large desktop (`6rem`).
     - `.hero-rhythm`: 96px/48px mobile, 120px/80px tablet, 136px/96px desktop.
3. **In `tailwind.config.js`**:
   - Update `theme.extend.fontFamily` to map `display`, `heading`, `body`, `sans`, `oswald`, and `poppins`.
   - Update `theme.extend.maxWidth` to include `standard: '1068px'`, `breakout: '1348px'`, `'1068': '1068px'`, `'1348': '1348px'`.
4. **Verification**:
   - Run `PATH=/tmp/node/bin:$PATH npm run build` and `PATH=/tmp/node/bin:$PATH npx tsc --noEmit`.
   - Ensure build exits with 0 errors.

## Deliverable
Write your implementation report to `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_worker_m1/handoff.md` and notify via send_message.


## 2026-10-31T13:16:41Z
Received dispatch message:
You are the M1 Worker for the TS Custom Screen Printing audit and overhaul project.
Your assigned working directory is: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_worker_m1
Read your instructions in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_worker_m1/DISPATCH.md
Read the authoritative user request in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/ORIGINAL_REQUEST.md
Read the project specification in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/PROJECT.md
Read the Explorer reports in:
- /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_1/handoff.md
- /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_2/handoff.md
- /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_3/handoff.md

Your exclusive write ownership is:
- index.html
- index.css
- tailwind.config.js

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Implement Google Fonts Oswald (600, 700, 800) and Poppins (300, 400, 600), container widths (1068px standard, 1348px breakout), vertical section rhythm, base typography rules, and brand metadata alignment.
Verify with `PATH=/tmp/node/bin:$PATH npm run build` and `PATH=/tmp/node/bin:$PATH npx tsc --noEmit`.
Write your report in /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_worker_m1/handoff.md and notify via send_message.
