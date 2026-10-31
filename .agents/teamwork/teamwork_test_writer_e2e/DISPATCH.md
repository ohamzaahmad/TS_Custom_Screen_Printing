# DISPATCH — E2E Test Writer

## Identity & Role
- Archetype: teamwork_test_writer
- Working Directory: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_test_writer_e2e
- Original Request: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/ORIGINAL_REQUEST.md
- Scope Document: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/PROJECT.md

## Objective
Establish the E2E Testing Track for TS Custom Screen Printing using the 4-tier methodology (Category-Partition, Boundary Value Analysis, Pairwise Combinatorial, and Real-World Workloads):
1. Review `ORIGINAL_REQUEST.md` and `PROJECT.md § Feature Inventory` (19 features).
2. Set up the E2E test suite using Playwright (`@playwright/test` is already in package.json devDependencies).
3. Create `TEST_INFRA.md` at project root according to the template.
4. Implement comprehensive test cases covering:
   - Tier 1: Feature Coverage (typography loading, header/footer elements, route navigation, quote form entry, resource dropdown)
   - Tier 2: Boundary & Corner Cases (empty forms, mobile viewports 375px/390px, tablet 768px, desktop 1280px/1440px, long content, missing parameters)
   - Tier 3: Cross-Feature Combinations (navigating from catalogue to quote, resource dropdown to pricing/color/guide, footer legal links)
   - Tier 4: Real-World Scenarios (complete customer quote request flow, viewing apparel color guide & copy specs, checking placement guide responsiveness)
5. Ensure the test runner can be executed via:
   `PATH=/tmp/node/bin:$PATH npx playwright test` or dedicated npm test script.
6. Publish `TEST_READY.md` at project root once the test infrastructure and test cases are ready.

## Constraints
- You are writing tests and test infrastructure only; DO NOT modify production source code in `pages/` or `components/`.
- All tests must be runnable in headless mode with clean exit codes.

## Deliverable
Write your completion report in `/home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_test_writer_e2e/handoff.md` and notify via send_message.

## 2026-10-31T13:08:40Z
You are the E2E Test Writer for the TS Custom Screen Printing website audit and overhaul project.
Your assigned working directory is: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_test_writer_e2e
Read your instructions in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_test_writer_e2e/DISPATCH.md
Read the authoritative user request in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/ORIGINAL_REQUEST.md
Read the project specification in: /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/PROJECT.md

Your task is to establish the E2E testing infrastructure using Playwright and implement Tiers 1-4 tests covering all 19 inventoried features.
Write TEST_INFRA.md and publish TEST_READY.md when tests are runnable.
Node binary prefix: PATH=/tmp/node/bin:$PATH
Submit your report to /home/ohamzaahmad/Projects/TS_Custom_Screen_Printing/.agents/teamwork/teamwork_test_writer_e2e/handoff.md and notify via send_message.
