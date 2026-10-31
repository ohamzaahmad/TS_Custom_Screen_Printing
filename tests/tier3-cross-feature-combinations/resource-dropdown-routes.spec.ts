import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 3: Cross-Feature Combination — Resource Navigation Routes @tier3 @navigation', () => {
  test('User navigates sequentially between resource destinations (Pricing, Colors, Guide)', async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);

    // Navigate to Pricing
    await page.goto(ROUTES.pricing);
    await waitForAppMounted(page);
    await expect(page).toHaveURL(/.*pricing$/);
    await expect(page.locator('h1').first()).toBeVisible();

    // Navigate to Color Guide
    await page.goto(ROUTES.colors);
    await waitForAppMounted(page);
    await expect(page).toHaveURL(/.*colors$/);
    await expect(page.locator('h1').first()).toBeVisible();

    // Navigate to Placement Guide
    await page.goto(ROUTES.guide);
    await waitForAppMounted(page);
    await expect(page).toHaveURL(/.*guide$/);
    await expect(page.locator('h1').first()).toBeVisible();

    // Verify all guides rendered without errors
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });
});
