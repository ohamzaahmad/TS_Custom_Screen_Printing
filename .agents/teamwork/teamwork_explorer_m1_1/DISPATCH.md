# DISPATCH — M1 Explorer 1: Fonts & Typography Infrastructure

## Identity & Role
- Archetype: teamwork_explorer
- Working Directory: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_1
- Original Request: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/ORIGINAL_REQUEST.md
- Scope Document: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/PROJECT.md

## Objective
Analyze font integration in `index.html`, `index.css`, and `tailwind.config.js`:
1. Detail the exact changes required in `index.html` to load Google Fonts Oswald (weights 600, 700, 800) and Poppins (weights 300, 400, 600) with preconnect, preloading, and `display=swap`.
2. Detail the exact changes in `index.css`: replacing Plus Jakarta Sans `@import`, configuring `--font-display`, `--font-heading`, `--font-body`, `--font-sans`, and base rules.
3. Detail the exact changes in `tailwind.config.js` to ensure font family utilities (`font-display`, `font-heading`, `font-body`, `font-oswald`, `font-poppins`) resolve consistently across Vite and Tailwind.
4. Recommend concrete line-by-line diffs for the Worker.

## Deliverable
Write your report in `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_1/handoff.md`.
Use send_message to report completion.

## 2026-10-31T13:09:18Z
You are M1 Explorer 1 for the TS Custom Screen Printing audit and overhaul project.
Your assigned working directory is: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_1
Read your instructions in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_1/DISPATCH.md
Read the authoritative user request in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/ORIGINAL_REQUEST.md
Read the project specification in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/PROJECT.md

Investigate font integration in `index.html`, `index.css`, and `tailwind.config.js`. Provide exact line-by-line diff recommendations for loading Oswald (600, 700, 800) and Poppins (300, 400, 600) with `@theme` and tailwind configs.
Write your report to: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_explorer_m1_1/handoff.md
Send a completion message back when finished.
