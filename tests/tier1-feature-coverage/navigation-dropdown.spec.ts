import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 1: Project Resources Navbar Dropdown (Feature 9) @tier1 @m2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);
  });

  test('Feature 9: Navbar features Project Resources dropdown with guides and catalog links @feature-9', async ({ page }) => {
    // Check if Project Resources menu item exists on desktop
    const resourcesTrigger = page.locator('button:has-text("Project Resources"), button:has-text("Resources"), [aria-label*="Resources"]').first();
    await expect(resourcesTrigger, 'Project Resources dropdown button should be visible in navbar').toBeVisible();

    // Click trigger to open dropdown if closed
    await resourcesTrigger.click();

    // Verify sub-links for Print Guide, Color Guide, and Pricing are accessible
    const printGuideLink = page.locator('button:has-text("Print Guide"), button:has-text("Placement Guide"), a[href*="guide"]');
    const colorGuideLink = page.locator('button:has-text("Color Guide"), button:has-text("Ink Color"), a[href*="colors"]');
    const pricingLink = page.locator('button:has-text("Pricing"), a[href*="pricing"]');

    await expect(printGuideLink.first(), 'Dropdown must contain link to Print/Placement Guide').toBeVisible();
    await expect(colorGuideLink.first(), 'Dropdown must contain link to Color Guide').toBeVisible();
    await expect(pricingLink.first(), 'Dropdown must contain link to Pricing').toBeVisible();

    // Click Print Guide and ensure router transitions to /guide
    await printGuideLink.first().click();
    await expect(page).toHaveURL(/.*guide.*/);
  });
});
