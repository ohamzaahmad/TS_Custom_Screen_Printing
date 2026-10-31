import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 1: Sportswear / Catalog Funnel Cleanup (Feature 11) @tier1 @m2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.catalogue);
    await waitForAppMounted(page);
  });

  test('Feature 11: Catalogue page removes extraneous contact prompts and streamlines funnel to quote @feature-11', async ({ page }) => {
    // Verify Catalogue page heading is visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Verify Step 3 has a primary CTA pointing to Quote
    const quoteCta = page.locator('button:has-text("Fill Quote Form"), button:has-text("Quote"), a[href*="quote"]');
    await expect(quoteCta.first(), 'Catalogue Step 3 must have a Quote CTA').toBeVisible();

    // Verify extraneous Contact Us button in Step 3 is removed
    const step3ContactBtn = page.locator('div:has-text("Step 3") >> button:has-text("Contact Us")');
    const step3ContactCount = await step3ContactBtn.count();
    expect(step3ContactCount, 'Catalogue Step 3 should not have a secondary Contact Us button').toBe(0);

    // Verify bottom "Need Help?" contact callout is removed
    const needHelpBlock = page.locator('text="Need Help? Contact Our Team", text="Need Help? Call us"');
    const needHelpCount = await needHelpBlock.count();
    expect(needHelpCount, 'Catalogue page should not have redundant bottom contact block').toBe(0);
  });
});
