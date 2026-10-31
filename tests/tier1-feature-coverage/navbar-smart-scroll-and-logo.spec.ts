import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Navbar Smart Scroll & Logo Presentation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);
  });

  test('Logo displays prominently with high-contrast text lockup', async ({ page }) => {
    const logoImg = page.locator('img[alt="TS Custom Screen Printing"]');
    await expect(logoImg).toBeVisible();

    // Verify brand typography lockup
    const customScreenText = page.locator('text="CUSTOM SCREEN"');
    const printingText = page.locator('[aria-label="PRINTING"]');
    await expect(customScreenText.first()).toBeVisible();
    await expect(printingText.first()).toBeVisible();
  });

  test('Navbar implements smart scroll: hides on scroll down and reveals smoothly on scroll up', async ({ page }) => {
    const navbar = page.locator('nav.fixed');
    await expect(navbar).toBeVisible();

    // Initial state at top of page
    await expect(navbar).toHaveClass(/translate-y-0/);

    // Scroll down 500px -> navbar hides
    await page.evaluate(() => {
      window.scrollTo(0, 500);
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(400);
    await expect(navbar).toHaveClass(/-translate-y-full/);

    // Scroll up slightly by 120px -> navbar reveals smoothly with white glass styling
    await page.evaluate(() => {
      window.scrollTo(0, 380);
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(400);
    await expect(navbar).toHaveClass(/translate-y-0/);
    await expect(navbar).toHaveClass(/bg-white/);
  });

  test('Route transition to Gallery renders dark high-contrast logo text', async ({ page, isMobile }) => {
    if (isMobile) {
      const menuButton = page.locator('button[aria-label="Open menu"]');
      await menuButton.click();
      await page.waitForTimeout(300);
      await page.click('#mobile-menu button:has-text("Gallery")');
    } else {
      await page.click('button:has-text("Gallery")');
    }

    await page.waitForTimeout(400);
    await expect(page).toHaveURL(/.*gallery.*/);

    const customScreenText = page.locator('text="CUSTOM SCREEN"').first();
    await expect(customScreenText).toBeVisible();
    // On white background, text is dark (text-slate-950)
    await expect(customScreenText).toHaveClass(/text-slate-950/);
  });
});
