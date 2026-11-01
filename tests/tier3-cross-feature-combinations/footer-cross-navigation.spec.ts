import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 3: Cross-Feature Combination — Footer Legal Traversal @tier3 @legal', () => {
  test('User clicks through footer legal links and traverses Privacy, Terms, and Refund policies', async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);

    // Scroll to footer
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();

    // 1. Click Terms & Conditions in footer
    const termsLink = footer.locator('button:has-text("Terms"), a[href*="terms"]').first();
    await termsLink.click();
    await expect(page).toHaveURL(/.*terms$/);
    await expect(page.locator('h1').first()).toBeVisible();

    // 2. Click Refund Policy in footer
    const refundLink = footer.locator('button:has-text("Refund"), a[href*="refund"]').first();
    await refundLink.click();
    await expect(page).toHaveURL(/.*refund$/);
    await expect(page.locator('h1').first()).toBeVisible();

    // 3. Click Privacy Policy in footer
    const privacyLink = footer.locator('button:has-text("Privacy"), a[href*="privacy"]').first();
    await privacyLink.click();
    await expect(page).toHaveURL(/.*privacy$/);
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
