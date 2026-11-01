import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 2: Edge Routes Resilience & Router Boundaries @tier2 @router', () => {
  test('404 Page Not Found renders cleanly on invalid routes with recovery CTAs', async ({ page }) => {
    await page.goto(ROUTES.notFound);
    await waitForAppMounted(page);

    // Verify 404 text and title
    const heading = page.locator('h1:has-text("Page Not Found")');
    await expect(heading).toBeVisible();

    const title = await page.title();
    expect(title.toLowerCase()).toContain('not found');

    // Recovery action: click "Back Home"
    const backHomeBtn = page.locator('button:has-text("Back Home")');
    await expect(backHomeBtn).toBeVisible();
    await backHomeBtn.click();

    // Should return to homepage
    await expect(page).toHaveURL(/.*\/$/);
  });

  test('Hash navigation fallbacks (#quote, #pricing) automatically map to clean routes', async ({ page }) => {
    // Navigate using hash
    await page.goto('/#pricing');
    await waitForAppMounted(page);

    // Should transition to /pricing without hash
    await expect(page).toHaveURL(/.*pricing$/);
  });

  test('Browser history popstate navigation handles rapid back and forward traversing', async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);

    await page.goto(ROUTES.gallery);
    await waitForAppMounted(page);

    await page.goto(ROUTES.pricing);
    await waitForAppMounted(page);

    // Go back to gallery
    await page.goBack();
    await expect(page).toHaveURL(/.*gallery$/);

    // Go back to home
    await page.goBack();
    await expect(page).toHaveURL(/.*\/$/);

    // Go forward to gallery
    await page.goForward();
    await expect(page).toHaveURL(/.*gallery$/);
  });
});
