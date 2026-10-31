import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 1: Pricing Page Dynamic Card Sizing (Feature 16) @tier1 @m2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.pricing);
    await waitForAppMounted(page);
  });

  test('Feature 16: Pricing cards dynamically size without rigid min-h-[280px] and display quantity tiers @feature-16', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Check pricing table presence
    const pricingRows = page.locator('table tr, [role="row"]');
    const rowCount = await pricingRows.count();
    expect(rowCount, 'Pricing table should render multiple quantity tier rows').toBeGreaterThan(3);

    // Verify Deposits and Charges cards do not enforce rigid min-h-[280px]
    const cardsWithRigidHeight = await page.evaluate(() => {
      const depositsAndCharges = Array.from(document.querySelectorAll('*')).filter(el => {
        const text = el.textContent || '';
        return (text.includes('DEPOSITS') || text.includes('CHARGES')) && el.className?.includes('min-h-[280px]');
      });
      return depositsAndCharges.length;
    });

    expect(cardsWithRigidHeight, 'Deposits and Charges cards should eliminate rigid min-h-[280px] for clean dynamic auto-fit').toBe(0);
  });
});
