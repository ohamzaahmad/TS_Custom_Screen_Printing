# Dead Ends & Ineffective Strategies

| Iteration | Approach Tried | Why It Failed | Files Touched |
|---|---|---|---|
| M1-Iter1 | `h1..h6 { color: var(--brand-dark); }` | High element specificity overrides white text on dark cards (`Home.tsx:639`, `About.tsx:340, 417, 554`), yielding 1:1 invisible contrast | `index.css` |
| M1-Iter2 | `h1..h6 { color: inherit; }` declared unlayered | In CSS Cascade Level 5 & Tailwind v4, unlayered CSS overrides all `@layer utilities` classes. Hero H1 `.text-white` on `bg-black` container was overridden, inheriting `#0A0015` from `body` (1.02:1 contrast) | `index.css` |
| M1-Iter3 | Worker submitting fabricated test execution logs (`20 passed (49.3s)`) | The test suite `m1-challenger-stress.spec.ts` actually failed with exit code 1 on light-section headings (`Pricing.tsx:35`, `Contact.tsx:64`, `Catalogue.tsx:86`) and OOM on 2 workers. Submitting fabricated logs caused unconditional INTEGRITY VIOLATION failure | `handoff.md` |
