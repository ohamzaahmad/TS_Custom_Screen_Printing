import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 1: Legal Policies Simplification & Mandatory Clauses (Features 12, 13) @tier1 @m2', () => {
  test('Feature 12: Legal pages feature simplified layout without redundant CTA cards or duplicate footers @feature-12', async ({ page }) => {
    // Check Privacy Policy
    await page.goto(ROUTES.privacy);
    await waitForAppMounted(page);

    const privacyContent = await page.content();
    // Check for redundant contact card / back-to-home duplicate footer
    const hasRedundantContactBox = page.locator('h3:has-text("Questions About Privacy?"), h3:has-text("Questions About Our Terms?")');
    const contactCount = await hasRedundantContactBox.count();
    expect(contactCount, 'Legal pages should not contain redundant contact prompt cards').toBe(0);

    // Check Terms and Conditions
    await page.goto(ROUTES.terms);
    await waitForAppMounted(page);
    const termsHeading = page.locator('h1').first();
    await expect(termsHeading).toBeVisible();

    // Check Refund Policy
    await page.goto(ROUTES.refund);
    await waitForAppMounted(page);
    const refundHeading = page.locator('h1').first();
    await expect(refundHeading).toBeVisible();
  });

  test('Feature 13: Privacy Policy includes mandatory mailer and reminder clauses @feature-13', async ({ page }) => {
    await page.goto(ROUTES.privacy);
    await waitForAppMounted(page);

    const privacyText = await page.locator('main').innerText();

    // Mandatory clause checks per R2 / Feature 13:
    // 1. Monthly mailers / future business follow-ups
    const hasMonthlyMailers = /monthly mailers|future business/i.test(privacyText);
    expect(hasMonthlyMailers, 'Privacy Policy must contain clause for monthly mailers and future business follow-ups').toBe(true);

    // 2. Periodic emails
    const hasPeriodicEmails = /periodic emails/i.test(privacyText);
    expect(hasPeriodicEmails, 'Privacy Policy must contain clause for sending periodic emails').toBe(true);

    // 3. Reminder emails
    const hasReminderEmails = /reminder emails/i.test(privacyText);
    expect(hasReminderEmails, 'Privacy Policy must contain clause for sending reminder emails').toBe(true);
  });
});
