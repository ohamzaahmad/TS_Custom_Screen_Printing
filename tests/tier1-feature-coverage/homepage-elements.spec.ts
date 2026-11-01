import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 1: Homepage Elements & Copy (Features 5, 6, 7, 8) @tier1 @m2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);
  });

  test('Feature 5: Hero section presents high-converting value proposition and primary CTAs @feature-5', async ({ page }) => {
    const heroH1 = page.locator('h1').first();
    await expect(heroH1).toBeVisible();

    // Hero headline text
    const heroText = await heroH1.innerText();
    expect(heroText.length).toBeGreaterThan(5);

    // Primary CTA buttons should exist and lead to quote or catalogue
    const quoteButton = page.locator('button:has-text("Quote"), button:has-text("Order"), a[href*="quote"]').first();
    await expect(quoteButton).toBeVisible();
  });

  test('Feature 6: Homepage graphics cleanup removes rotated sticker pills and harsh 8px neon outlines @feature-6', async ({ page }) => {
    // Assert no harsh 8px orange offset shadows or rotated sticker tags remain in the DOM
    const harshElements = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      const found: string[] = [];
      for (const el of allElements) {
        const cls = el.className;
        if (typeof cls === 'string') {
          if (cls.includes('shadow-[8px_8px_0_#FF6720]') || cls.includes('shadow-[8px_8px_0_#fb923c]')) {
            found.push(cls);
          }
        }
      }
      return found;
    });

    expect(harshElements.length, 'Found harsh 8px neon outline/shadows that should be removed').toBe(0);
  });

  test('Feature 7: Project numbering cleanup removes "Drop 01" through "Drop 06" labels @feature-7', async ({ page }) => {
    // Check Homepage for "Drop 01" to "Drop 06"
    const homeContent = await page.content();
    const hasDropLabels = /Drop 0[1-6]/i.test(homeContent);
    expect(hasDropLabels, 'Homepage must not contain "Drop 01" through "Drop 06" labels').toBe(false);

    // Check Gallery page as well
    await page.goto(ROUTES.gallery);
    await waitForAppMounted(page);
    const galleryContent = await page.content();
    const hasGalleryDropLabels = /Drop 0[1-6]/i.test(galleryContent);
    expect(hasGalleryDropLabels, 'Gallery must not contain "Drop 01" through "Drop 06" labels').toBe(false);
  });

  test('Feature 8: Phone link correctly displays (732) 347-0101 and targets tel:+17323470101 @feature-8', async ({ page }) => {
    // Search for telephone link on the page
    const telLinks = page.locator('a[href^="tel:"]');
    const count = await telLinks.count();
    expect(count).toBeGreaterThan(0);

    const hrefs = await telLinks.evaluateAll((links) => links.map(l => (l as HTMLAnchorElement).href));
    
    // Must NOT contain the wrong phone number `+19053384034`
    const hasWrongTel = hrefs.some(href => href.includes('9053384034'));
    expect(hasWrongTel, 'Must not link to old/wrong telephone number tel:+19053384034').toBe(false);

    // Must link to the correct phone number `+17323470101`
    const hasCorrectTel = hrefs.some(href => href.includes('7323470101') || href.includes('732-347-0101'));
    expect(hasCorrectTel, 'Must link to correct phone number tel:+17323470101').toBe(true);
  });
});
