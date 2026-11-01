import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 1: Print Placement Guide Responsiveness (Feature 15) @tier1 @m2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.guide);
    await waitForAppMounted(page);
  });

  test('Feature 15: Placement guide displays diagrams with responsive scaling and readable containers @feature-15', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Check images in placement guide
    const placementImages = page.locator('img[src*="size-guide"], img[src*="placement"]');
    const imageCount = await placementImages.count();
    expect(imageCount, 'Expected placement guide diagram images to be present').toBeGreaterThan(0);

    // Verify images are rendered with non-zero dimensions
    const firstImg = placementImages.first();
    await expect(firstImg).toBeVisible();
    const box = await firstImg.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThan(50);
      expect(box.height).toBeGreaterThan(50);
    }

    // The standalone "Master Placement Guide" block was removed at the client's
    // request — the page now leads with the individual, responsive placement
    // diagrams. Assert it is not rendered.
    const masterDiagram = page.locator('img[src*="placementguide.png"]');
    const masterCount = await masterDiagram.count();
    expect(masterCount, 'Master placement guide diagram block should be removed').toBe(0);
  });
});
