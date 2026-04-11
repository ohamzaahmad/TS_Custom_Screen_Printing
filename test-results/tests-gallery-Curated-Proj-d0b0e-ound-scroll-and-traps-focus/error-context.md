# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\gallery.spec.ts >> Curated Projects lightbox >> locks background scroll and traps focus
- Location: tests\gallery.spec.ts:4:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 880
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e6]:
      - generic [ref=e8] [cursor=pointer]:
        - img [ref=e10]
        - generic [ref=e11]:
          - generic [ref=e12]: CUSTOM SCREEN
          - generic [ref=e13]: PRINTING
      - generic [ref=e14]:
        - button [ref=e15]: Home
        - button [ref=e17]: catalog
        - button [ref=e18]: Contact
        - button [ref=e20]: Start Order
  - main [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e23]:
        - generic [ref=e28]:
          - generic [ref=e29]: EST. 2018 | THE GOLD STANDARD
          - heading [level=1] [ref=e31]: A CULTURE OF PRECISION.
          - paragraph [ref=e32]: We don't just print garments. We manufacture physical brand identity through a meticulous fusion of chemical engineering and technical artistry.
          - generic [ref=e33]:
            - button [ref=e34]: Start A Project
            - button [ref=e35]: Browse Catalog
          - generic [ref=e36]:
            - generic [ref=e37]:
              - paragraph [ref=e38]: 500K+
              - paragraph [ref=e39]: Prints YTD
            - generic [ref=e40]:
              - paragraph [ref=e41]: 99.8%
              - paragraph [ref=e42]: Repeat Clients
            - generic [ref=e43]:
              - paragraph [ref=e44]: 10-12
              - paragraph [ref=e45]: Business Days
        - generic [ref=e46]:
          - generic [ref=e47]: Industrial Scale
          - generic [ref=e49]: Boutique Quality
      - generic [ref=e52]:
        - generic [ref=e53]:
          - generic [ref=e54]: Studio Standard
          - heading [level=2] [ref=e55]: Minimal process. Maximum consistency.
          - paragraph [ref=e56]: Every order follows a focused production system designed to reduce errors, protect detail, and keep delivery predictable.
          - generic [ref=e57]:
            - button [ref=e58]: Start Your Order
            - button [ref=e59]: Print Guide
        - generic [ref=e60]:
          - article [ref=e61]:
            - generic [ref=e62]:
              - generic [ref=e63]:
                - heading [level=3] [ref=e64]: Pre-Press Accuracy
                - paragraph [ref=e65]: Artwork and separations are validated before production starts.
              - generic [ref=e66]: Color Locked
          - article [ref=e67]:
            - generic [ref=e68]:
              - generic [ref=e69]:
                - heading [level=3] [ref=e70]: Controlled Print Run
                - paragraph [ref=e71]: Registration and cure are monitored from first pull to final pack.
              - generic [ref=e72]: QC Checks
          - article [ref=e73]:
            - generic [ref=e74]:
              - generic [ref=e75]:
                - heading [level=3] [ref=e76]: Reliable Turnaround
                - paragraph [ref=e77]: Clear timelines built for launches, drops, and repeat orders.
              - generic [ref=e78]: 10-12 Days
      - generic [ref=e80]:
        - generic [ref=e81]:
          - generic [ref=e82]:
            - generic [ref=e83]: Curated Projects
            - heading [level=3] [ref=e84]: Recent Production Work
          - button [ref=e85]: View Gallery
        - generic [ref=e86]:
          - button [ref=e87]:
            - img [ref=e88]
            - generic [ref=e90]:
              - paragraph [ref=e91]: Project 1
              - paragraph [ref=e92]: Premium Screen Print
          - button [ref=e93]:
            - img [ref=e94]
            - generic [ref=e96]:
              - paragraph [ref=e97]: Project 2
              - paragraph [ref=e98]: Premium Screen Print
          - button [ref=e99]:
            - img [ref=e100]
            - generic [ref=e102]:
              - paragraph [ref=e103]: Project 3
              - paragraph [ref=e104]: Premium Screen Print
          - button [ref=e105]:
            - img [ref=e106]
            - generic [ref=e108]:
              - paragraph [ref=e109]: Project 4
              - paragraph [ref=e110]: Premium Screen Print
      - dialog [ref=e111]:
        - generic [ref=e112]:
          - button [active] [ref=e113]: ✕
          - button [ref=e114]: ‹
          - button [ref=e115]: ›
          - img [ref=e117]
          - generic [ref=e118]:
            - heading [level=5] [ref=e119]: "Screen Print Project #1"
            - paragraph [ref=e120]: A recent screen print run showcasing pigment and texture on blanks.
      - generic [ref=e126]:
        - generic [ref=e127]: Ready To Move
        - heading [level=3] [ref=e128]: Let's build your next print run.
        - paragraph [ref=e129]: Share your requirements and we'll respond with the cleanest path to quality, speed, and consistency.
        - generic [ref=e130]:
          - link [ref=e131] [cursor=pointer]:
            - /url: tel:+19053384034
            - text: (905) 338-4034
          - link [ref=e132] [cursor=pointer]:
            - /url: mailto:hello@tscustoms.com
            - text: hello@tscustoms.com
        - button [ref=e133]: Request A Quote
  - contentinfo [ref=e134]:
    - generic [ref=e135]:
      - generic [ref=e136]:
        - generic [ref=e137]:
          - generic [ref=e140]:
            - img [ref=e142]
            - generic [ref=e143]:
              - generic [ref=e144]: CUSTOM SCREEN
              - generic [ref=e145]: PRINTING
          - paragraph [ref=e146]: High-fidelity apparel solutions for modern brands. We combine architectural precision with industrial-grade screen printing.
        - generic [ref=e147]:
          - heading [level=4] [ref=e148]: Service Suite
          - list [ref=e149]:
            - listitem [ref=e150]: Industrial Printing
            - listitem [ref=e152]:
              - generic [ref=e153]: Embroidery
              - generic [ref=e154]: Q3 2025
            - listitem [ref=e155]:
              - generic [ref=e156]: DTG Solutions
              - generic [ref=e157]: Q4 2025
        - generic [ref=e158]:
          - heading [level=4] [ref=e159]: Project Resources
          - list [ref=e160]:
            - listitem [ref=e161]:
              - button [ref=e162]:
                - generic [ref=e163]: 
                - text: Full Catalogue
            - listitem [ref=e164]:
              - button [ref=e165]:
                - generic [ref=e166]: 
                - text: Pricing Guide
            - listitem [ref=e167]:
              - button [ref=e168]:
                - generic [ref=e169]: 
                - text: Placement Guide
            - listitem [ref=e170]:
              - button [ref=e171]:
                - generic [ref=e172]: 
                - text: Ink Color Lab
        - generic [ref=e173]:
          - heading [level=4] [ref=e174]: HQ Data
          - list [ref=e175]:
            - listitem [ref=e176]:
              - generic [ref=e177]: 
              - text: 1 Bradshaw Drive, Manahawkin NJ 08050
            - listitem [ref=e178]:
              - generic [ref=e179]: 
              - text: (905) 338-4034
            - listitem [ref=e180]:
              - generic [ref=e181]: 
              - text: hello@tscustoms.com
      - generic [ref=e182]:
        - paragraph [ref=e183]: © 2026 TS Custom Screen Printing. Precision Manufactured.
        - generic [ref=e184]:
          - link [ref=e185] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e186]: 
          - link [ref=e187] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e188]: 
          - link [ref=e189] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e190]: 
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Curated Projects lightbox', () => {
  4  |   test('locks background scroll and traps focus', async ({ page }) => {
  5  |     await page.goto('http://localhost:3001/');
  6  | 
  7  |     const before = await page.evaluate(() => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
  8  | 
  9  |     // Open the gallery lightbox
  10 |     await page.click('text=View Gallery');
  11 | 
  12 |     // Wait for the gallery dialog to appear (use specific aria-label to avoid matching mobile nav)
  13 |     await page.waitForSelector('[aria-label="Project image lightbox"]', { state: 'visible' });
  14 | 
  15 |     // Ensure scroll position did not change
  16 |     const afterOpen = await page.evaluate(() => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
> 17 |     expect(afterOpen).toBe(before);
     |                       ^ Error: expect(received).toBe(expected) // Object.is equality
  18 | 
  19 |     // Attempt to scroll using the wheel
  20 |     await page.mouse.wheel(0, 500);
  21 |     const afterWheel = await page.evaluate(() => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
  22 |     expect(afterWheel).toBe(before);
  23 | 
  24 |     // Ensure focus is within the dialog (close button should be focused)
  25 |     const focusInside = await page.evaluate(() => {
  26 |       const active = document.activeElement;
  27 |       return !!active && !!active.closest && !!active.closest('[role="dialog"]');
  28 |     });
  29 |     expect(focusInside).toBeTruthy();
  30 | 
  31 |     // Close the dialog
  32 |     await page.click('[aria-label="Close lightbox"]');
  33 |     await page.waitForSelector('[role="dialog"]', { state: 'detached' });
  34 | 
  35 |     const afterClose = await page.evaluate(() => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
  36 |     expect(afterClose).toBe(before);
  37 |   });
  38 | });
  39 | 
```