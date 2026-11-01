import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 2: Form Boundaries & Embed Resilience @tier2 @forms', () => {
  test('Quote page handles missing or arbitrary URL parameters gracefully without crashing', async ({ page }) => {
    // Test with adversarial special characters and query strings
    await page.goto(`${ROUTES.quote}?product=<script>alert("xss")</script>&qty=-9999&notes=%20%20`);
    await waitForAppMounted(page);

    // Verify page renders cleanly
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Verify 3 guide steps are intact
    await expect(page.locator('text="Step 1"')).toBeVisible();
    await expect(page.locator('text="Step 2"')).toBeVisible();
    await expect(page.locator('text="Step 3"')).toBeVisible();

    // Verify embed container exists
    const embedContainer = page.locator('#cognito-embed');
    await expect(embedContainer).toBeVisible();
  });

  test('Contact page embed container gracefully provides contact fallback information', async ({ page }) => {
    await page.goto(ROUTES.contact);
    await waitForAppMounted(page);

    const contactEmbed = page.locator('#cognito-contact-embed');
    await expect(contactEmbed).toBeVisible();

    // Verify direct contact alternatives are available (phone, email, address)
    const phoneLink = page.locator('main a[href^="tel:"]').first();
    const emailLink = page.locator('main a[href^="mailto:"]').first();

    await expect(phoneLink).toBeVisible();
    await expect(emailLink).toBeVisible();
  });
});
