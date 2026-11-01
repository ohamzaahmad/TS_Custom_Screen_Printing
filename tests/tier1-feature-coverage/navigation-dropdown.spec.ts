import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 1: Project Resources Navbar Dropdown (Feature 9) @tier1 @m2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);
  });

  test('Feature 9: Navbar features Project Resources dropdown with guides and catalog links @feature-9', async ({ page, isMobile }) => {
    if (isMobile) {
      // On mobile viewports, resources are housed in the responsive drawer
      const menuButton = page.locator('button[aria-label="Open menu"], button[aria-controls="mobile-menu"]');
      await menuButton.click();
      await page.waitForTimeout(300);

      const printGuideLink = page.locator('#mobile-menu button:has-text("Placement Guide"), #mobile-menu button:has-text("Print Guide")');
      await expect(printGuideLink.first(), 'Mobile menu must contain link to Print/Placement Guide').toBeVisible();

      await printGuideLink.first().click();
      await expect(page).toHaveURL(/.*guide.*/);
      return;
    }

    // Check if Project Resources menu item exists on desktop
    const resourcesTrigger = page.locator('button:has-text("Project Resources"), button:has-text("Resources"), [aria-label*="Resources"]').first();
    await expect(resourcesTrigger, 'Project Resources dropdown button should be visible in navbar').toBeVisible();

    // Trigger dropdown opening via hover and click
    await resourcesTrigger.hover();
    await resourcesTrigger.click();
    await page.waitForTimeout(200);

    // If click toggled it off because hover already opened it, re-hover to ensure open
    if ((await resourcesTrigger.getAttribute('aria-expanded')) !== 'true') {
      await resourcesTrigger.click();
      await page.waitForTimeout(200);
    }

    // Verify sub-links for Print Guide, Color Guide, and Pricing are accessible in the open menu
    const printGuideLink = page.locator('button:has-text("Placement Guide"), button:has-text("Print Guide")').and(page.locator('[role="menu"] *'));
    const colorGuideLink = page.locator('button:has-text("Color Guide"), button:has-text("Ink Color")').and(page.locator('[role="menu"] *'));
    const pricingLink = page.locator('button:has-text("Pricing Guide"), button:has-text("Pricing")').and(page.locator('[role="menu"] *'));

    await expect(printGuideLink.first(), 'Dropdown must contain link to Print/Placement Guide').toBeVisible();
    await expect(colorGuideLink.first(), 'Dropdown must contain link to Color Guide').toBeVisible();
    await expect(pricingLink.first(), 'Dropdown must contain link to Pricing').toBeVisible();

    // Click Print Guide and ensure router transitions to /guide
    await printGuideLink.first().click();
    await expect(page).toHaveURL(/.*guide.*/);
  });
});
