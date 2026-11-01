import { test, expect, waitForAppMounted, VIEWPORTS, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 4: Real-World Scenario — Print Placement Responsiveness Across Devices @tier4 @placement', () => {
  test('Artwork creator reviews placement diagrams on Mobile (390px) and Desktop (1280px)', async ({ page }) => {
    // 1. Mobile view check
    await page.setViewportSize(VIEWPORTS.mobileLg);
    await page.goto(ROUTES.guide);
    await waitForAppMounted(page);

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Verify placement cards are stacked and visible without layout breaks
    const diagrams = page.locator('img[src*="size-guide"], img[src*="placement"]');
    const count = await diagrams.count();
    expect(count).toBeGreaterThan(0);

    const firstDiagramMobile = diagrams.first();
    await expect(firstDiagramMobile).toBeVisible();
    const mobileBox = await firstDiagramMobile.boundingBox();
    expect(mobileBox).not.toBeNull();
    if (mobileBox) {
      expect(mobileBox.width).toBeGreaterThan(100);
    }

    // 2. Switch to Desktop view
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto(ROUTES.guide);
    await waitForAppMounted(page);

    const firstDiagramDesktop = diagrams.first();
    await expect(firstDiagramDesktop).toBeVisible();
    const desktopBox = await firstDiagramDesktop.boundingBox();
    expect(desktopBox).not.toBeNull();
    if (desktopBox) {
      expect(desktopBox.width).toBeGreaterThan(100);
    }
  });
});
