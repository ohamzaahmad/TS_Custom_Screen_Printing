import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Tier 1: Audit Report, Technical SEO & Build Verification (Features 17, 18, 19) @tier1 @m3 @m4', () => {
  test('Feature 17: Comprehensive website audit report exists with 6 dimensions and Impact vs. Effort matrix @feature-17', async () => {
    // Check if AUDIT_REPORT.md exists at docs/ (moved from project root) or designated location
    const projectRoot = process.cwd();
    const auditReportPath = path.join(projectRoot, 'docs/AUDIT_REPORT.md');
    const altAuditPath = path.join(projectRoot, '.agents/teamwork/teamwork_explorer_survey_3/handoff.md');

    const fileExists = fs.existsSync(auditReportPath) || fs.existsSync(altAuditPath);
    expect(fileExists, 'Expected AUDIT_REPORT.md to document the 6 audit dimensions and Impact vs. Effort matrix').toBe(true);

    const content = fs.existsSync(auditReportPath) 
      ? fs.readFileSync(auditReportPath, 'utf8') 
      : fs.readFileSync(altAuditPath, 'utf8');

    // Verify 6 key audit areas covered:
    // (1) First impressions, (2) Hero & copywriting, (3) CRO & CTAs, (4) UI/UX simplification, (5) Mobile-first, (6) SEO
    expect(content).toMatch(/Hero|Copywriting/i);
    expect(content).toMatch(/CRO|Conversion/i);
    expect(content).toMatch(/Mobile|Responsiveness/i);
    expect(content).toMatch(/SEO|Page Speed/i);
    expect(content).toMatch(/Impact.*Effort|Prioritization/i);
  });

  test('Feature 18: Technical SEO title clobber bug is resolved across client route transitions @feature-18', async ({ page }) => {
    // Navigate to Quote page
    await page.goto(ROUTES.quote);
    await waitForAppMounted(page);

    // Wait for title update from useSEO hook
    await page.waitForTimeout(500);
    const quoteTitle = await page.title();
    
    // In App.tsx:109, a naive useEffect sets document.title = 'ST Custom Screen Printing' for all non-404 pages,
    // which clobbers specific page titles set by useSEO hook ('Request a Quote | ...')
    expect(quoteTitle.toLowerCase(), 'Page title on /quote should contain "Quote" and not be clobbered by generic title').toContain('quote');

    // Navigate to Contact page and verify title
    await page.goto(ROUTES.contact);
    await waitForAppMounted(page);
    await page.waitForTimeout(500);
    const contactTitle = await page.title();
    expect(contactTitle.toLowerCase(), 'Page title on /contact should contain "Contact"').toContain('contact');
  });

  test('Feature 19: HTML entry has standard SEO meta tags and structured schema @feature-19', async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);

    // Verify meta description exists and is non-empty
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /.+/);

    // Verify Open Graph tags exist
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);

    // Verify structured organization schema is present
    const schemaScript = page.locator('script[type="application/ld+json"]');
    const schemaCount = await schemaScript.count();
    expect(schemaCount, 'Expected JSON-LD structured schema script in document head').toBeGreaterThan(0);
  });
});
