import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 4: Real-World Scenario — End-to-End Customer Quote Journey @tier4 @journey', () => {
  test('Complete prospective customer workflow: Homepage discovery -> CTA click -> Quote consultation', async ({ page }) => {
    // 1. Customer visits homepage
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);

    // Verify brand identity and value proposition in hero
    const heroH1 = page.locator('h1').first();
    await expect(heroH1).toBeVisible();

    // 2. Customer clicks primary "Start Order" or "Get a Quote" button in navbar or hero
    const primaryCta = page.locator('button:has-text("Start Order"), button:has-text("Quote")').first();
    await primaryCta.click();

    // 3. Customer lands on Quote request interface
    await expect(page).toHaveURL(/.*quote$/);
    const quoteH1 = page.locator('h1').first();
    await expect(quoteH1).toBeVisible();

    // 4. Customer verifies the 3 steps of preparation
    const step1 = page.locator('text="Step 1"');
    const step2 = page.locator('text="Step 2"');
    const step3 = page.locator('text="Step 3"');
    await expect(step1).toBeVisible();
    await expect(step2).toBeVisible();
    await expect(step3).toBeVisible();

    // 5. Customer verifies the embed form area is active
    const formContainer = page.locator('#cognito-embed');
    await expect(formContainer).toBeVisible();
  });
});
