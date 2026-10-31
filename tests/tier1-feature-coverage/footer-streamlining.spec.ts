import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 1: Global Footer Streamlining (Feature 10) @tier1 @m2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);
  });

  test('Feature 10: Footer removes redundant 10-item FAQ accordion and simplifies layout @feature-10', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // The footer should NOT contain the redundant FAQ accordion section
    const faqHeading = footer.locator('h4:has-text("Frequently Asked Questions"), h3:has-text("Common Questions")');
    const faqCount = await faqHeading.count();
    expect(faqCount, 'Footer must not contain redundant FAQ accordion section').toBe(0);

    // Footer copyright should not contain "Precision Manufactured" or "precision manufacturer"
    const footerText = await footer.innerText();
    const hasPrecisionManufacturer = /precision manufacturer|precision manufactured/i.test(footerText);
    expect(hasPrecisionManufacturer, 'Footer subtitle must remove "precision manufacturer" tag').toBe(false);

    // Verify legal links exist and are accessible (Privacy, Terms, Refund)
    const privacyLink = footer.locator('button:has-text("Privacy Policy"), a[href*="privacy"]');
    const termsLink = footer.locator('button:has-text("Terms"), a[href*="terms"]');
    await expect(privacyLink.first(), 'Footer must include Privacy Policy link').toBeVisible();
    await expect(termsLink.first(), 'Footer must include Terms link').toBeVisible();
  });
});
