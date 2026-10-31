# DISPATCH — M1 Iteration 2 Worker: Heading Contrast & Syntax Fix

## Identity & Role
- Archetype: teamwork_worker
- Working Directory: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_worker_m1_iter2
- Original Request: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/ORIGINAL_REQUEST.md
- Scope Document: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/PROJECT.md
- Input Explorer Reports:
  - `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_iter2_1/handoff.md`
  - `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_iter2_2/handoff.md`
  - `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_iter2_3/handoff.md`

## Exclusive Write Ownership
You have exclusive write ownership of:
1. `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/index.css`
Do NOT modify files outside this list.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective
Apply the exact remediations identified by Reviewer 2 and confirmed by Iteration 2 Explorers in `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/index.css`:
1. **Line 109 Heading Contrast Fix**:
   In `index.css:108-114`:
   ```css
   h1, h2, h3, h4, h5, h6 {
     font-family: var(--font-heading, 'Oswald', sans-serif);
     text-transform: uppercase;
     letter-spacing: -0.01em;
     color: inherit;
   }
   ```
   Replace `color: var(--brand-dark);` with `color: inherit;` so that headings inside dark cards (`Home.tsx:639`, `About.tsx:340, 417, 554`) inherit `text-white` / parent text color properly with WCAG AAA contrast, while headings in light sections naturally inherit `var(--brand-dark)`.
2. **Line 673 Syntax Typo Fix**:
   Remove the trailing `n` after `*/` in `/* Responsive typography scale */n html { font-size: 16px; }` so that it parses cleanly as `/* Responsive typography scale */\nhtml { font-size: 16px; }`.
3. **Verification**:
   Run `PATH=/tmp/node/bin:$PATH npm run build && PATH=/tmp/node/bin:$PATH npx tsc --noEmit`.
   Verify that compiled CSS has zero warnings, exits 0, and that `n html` is eliminated.

## Deliverable
Write your implementation report to `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_worker_m1_iter2/handoff.md` and notify via send_message.

## 2026-10-31T13:53:18Z
You are M1 Iteration 2 Worker for the TS Custom Screen Printing audit and overhaul project.
Your assigned working directory is: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_worker_m1_iter2
Read instructions in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_worker_m1_iter2/DISPATCH.md
Read the authoritative user request in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/ORIGINAL_REQUEST.md
Read the project specification in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/PROJECT.md
Read the Explorer reports in:
- /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_iter2_1/handoff.md
- /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_iter2_2/handoff.md

Your exclusive write ownership is:
- index.css

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Apply the heading contrast fix (`color: inherit;` on line 109) and remove the trailing `n` at line 673.
Verify with `PATH=/tmp/node/bin:$PATH npm run build` and `PATH=/tmp/node/bin:$PATH npx tsc --noEmit`.
Write your report in /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_worker_m1_iter2/handoff.md and notify via send_message.
