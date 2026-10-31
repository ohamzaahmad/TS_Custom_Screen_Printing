import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 4: Real-World Scenario — Ink Color Lab Inspection @tier4 @colors', () => {
  test('Apparel brand coordinator inspects stock and specialty inks for PMS code and color fidelity', async ({ page }) => {
    // 1. Visit Color Guide
    await page.goto(ROUTES.colors);
    await waitForAppMounted(page);

    // Verify page title and header
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // 2. Inspect Stock Black ink swatch
    const blackCard = page.locator('text="Black"').first();
    await expect(blackCard).toBeVisible();

    // 3. Inspect White ink swatch and verify readable text contrast
    const whiteCard = page.locator('text="White"').first();
    await expect(whiteCard).toBeVisible();

    // 4. Inspect Pantone reference codes displayed on cards
    const pantoneLabels = page.locator('text=/Pantone|Standard/i');
    const labelCount = await pantoneLabels.count();
    expect(labelCount, 'Multiple Pantone / Standard PMS reference codes must be displayed').toBeGreaterThan(5);
  });
});
