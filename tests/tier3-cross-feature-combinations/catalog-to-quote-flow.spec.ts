import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 3: Cross-Feature Combination — Catalogue to Quote Funnel @tier3 @funnel', () => {
  test('User seamlessly navigates through Catalogue 3-step workflow into Quote submission', async ({ page }) => {
    // 1. Land on Catalogue page
    await page.goto(ROUTES.catalogue);
    await waitForAppMounted(page);

    // Verify 3-step explanation exists (01, 02, 03)
    await expect(page.locator('text=/01|Step 1/').first()).toBeVisible();
    await expect(page.locator('text=/02|Step 2/').first()).toBeVisible();
    await expect(page.locator('text=/03|Step 3/').first()).toBeVisible();

    // Verify external catalogue link to Sportswear Collection
    const externalLink = page.locator('a[href*="sportswearcollection.com"]');
    const hasExternal = await externalLink.count();
    expect(hasExternal, 'Catalogue should provide link to external apparel supplier').toBeGreaterThan(0);

    // 2. Click primary conversion action "Fill Quote Form" or Start Order
    const quoteCta = page.locator('button:has-text("Fill Quote Form"), button:has-text("Start Order"), a[href*="quote"]').first();
    await quoteCta.click();

    // 3. User lands on Quote page
    await expect(page).toHaveURL(/.*quote$/);
    const quoteH1 = page.locator('h1').first();
    await expect(quoteH1).toBeVisible();

    // Verify quote embed area is present
    await expect(page.locator('#cognito-embed')).toBeVisible();
  });
});
