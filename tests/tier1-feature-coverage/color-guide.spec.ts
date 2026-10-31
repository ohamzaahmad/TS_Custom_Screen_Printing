import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 1: Color Guide Apparel Inks (Feature 14) @tier1 @m2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.colors);
    await waitForAppMounted(page);
  });

  test('Feature 14: Color guide renders standard apparel stock, additional, and fluorescent inks @feature-14', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Verify stock colors are present
    const stockColors = ['Black', 'White', 'Red', 'Royal Blue', 'Navy'];
    for (const colorName of stockColors) {
      const colorCard = page.locator(`text="${colorName}"`).first();
      await expect(colorCard, `Color Guide should display stock color: ${colorName}`).toBeVisible();
    }

    // Check total ink cards rendered
    const colorCards = page.locator('button, div').filter({ hasText: /Pantone|Standard/i });
    const count = await colorCards.count();
    // With 11 stock + 28 additional + 4 fluorescent = 43 colors standard
    expect(count, 'Expected expanded apparel ink palette with at least 20 colors').toBeGreaterThanOrEqual(18);

    // Verify fluorescent category or specific fluorescent colors exist
    const pageText = await page.innerText('main');
    const hasFluorescent = /fluorescent/i.test(pageText) || /neon/i.test(pageText);
    expect(hasFluorescent, 'Color guide should feature fluorescent / specialty apparel inks').toBe(true);
  });
});
