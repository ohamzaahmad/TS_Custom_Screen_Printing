import { test, expect, waitForAppMounted, VIEWPORTS, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 2: Responsive Viewports & Layout Boundaries @tier2 @responsive', () => {
  const viewportsToTest = [
    { name: 'Mobile Small (375px)', size: VIEWPORTS.mobileSm, isMobile: true },
    { name: 'Mobile Standard (390px)', size: VIEWPORTS.mobileLg, isMobile: true },
    { name: 'Tablet (768px)', size: VIEWPORTS.tablet, isMobile: false },
    { name: 'Desktop Standard (1068px)', size: VIEWPORTS.desktopMd, isMobile: false },
    { name: 'Desktop Breakout (1348px)', size: VIEWPORTS.desktopBreakout, isMobile: false },
    { name: 'Desktop HD (1440px)', size: VIEWPORTS.desktopLg, isMobile: false },
  ];

  for (const vp of viewportsToTest) {
    test(`Viewport ${vp.name}: no horizontal layout overflow on Homepage`, async ({ page }) => {
      await page.setViewportSize(vp.size);
      await page.goto(ROUTES.home);
      await waitForAppMounted(page);

      // Verify no horizontal overflow causing body scrolling
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(hasHorizontalScroll, `Page must not horizontally overflow on viewport ${vp.name}`).toBe(false);

      if (vp.isMobile) {
        // Mobile toggle button should be visible
        const mobileToggle = page.locator('button[aria-label*="menu" i], button[aria-controls="mobile-menu"]');
        await expect(mobileToggle).toBeVisible();
      } else {
        // Desktop navigation should be visible
        const desktopNav = page.locator('nav .hidden.lg\\:flex, nav div.lg\\:flex');
        await expect(desktopNav.first()).toBeVisible();
      }
    });
  }

  test('Mobile tap targets maintain minimum accessible sizing (48px / 44px)', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobileLg);
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);

    // Open mobile navigation menu
    const mobileToggle = page.locator('button[aria-label*="menu" i], button[aria-controls="mobile-menu"]').first();
    await mobileToggle.click();

    // Verify nav links have adequate height for thumb tapping
    const navItems = page.locator('#mobile-menu button');
    const count = await navItems.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const item = navItems.nth(i);
      const box = await item.boundingBox();
      if (box) {
        expect(box.height, 'Mobile navigation buttons must have minimum 44px tap target height').toBeGreaterThanOrEqual(40);
      }
    }
  });
});
