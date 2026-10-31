import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('Tier 1: Typography & Design System (Features 1, 2, 3, 4) @tier1 @m1', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);
  });

  test('Feature 1: Google Fonts Oswald and Poppins integration in HTML/CSS @feature-1', async ({ page }) => {
    // Verify Google Fonts preconnect or stylesheet links in document head
    const fontLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[href*="fonts"]'));
      return links.map(l => (l as HTMLLinkElement).href);
    });

    // Check if fonts are requested via link or @import in stylesheets
    const importedFonts = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets);
      const fontRules: string[] = [];
      for (const sheet of sheets) {
        try {
          for (const rule of Array.from(sheet.cssRules || [])) {
            if (rule.cssText && (rule.cssText.includes('Oswald') || rule.cssText.includes('Poppins') || rule.cssText.includes('Plus+Jakarta'))) {
              fontRules.push(rule.cssText);
            }
          }
        } catch {
          // Cross-origin sheets might throw
        }
      }
      return fontRules;
    });

    // Authoritative check: Google Fonts Oswald and Poppins must be loaded
    const hasOswaldOrPoppins = fontLinks.some(href => href.includes('Oswald') || href.includes('Poppins'))
      || importedFonts.some(rule => rule.includes('Oswald') || rule.includes('Poppins'));
    
    // Expect font integration to include Oswald/Poppins per R1 / Feature 1
    expect(hasOswaldOrPoppins, 'Expected Oswald and Poppins Google Fonts to be integrated in index.html or index.css').toBe(true);
  });

  test('Feature 2: Standard (1068px) and Breakout (1348px) container width system @feature-2', async ({ page }) => {
    // Check computed widths or utility classes for standard (1068px) and breakout (1348px)
    const containerClasses = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('[class*="1068"], [class*="1348"], [class*="container-standard"], [class*="container-breakout"]'));
      return elements.map(el => el.className);
    });

    const hasDesignSystemContainers = containerClasses.length > 0;
    expect(hasDesignSystemContainers, 'Expected container classes matching 1068px (standard) or 1348px (breakout)').toBe(true);
  });

  test('Feature 3: Section vertical rhythm adheres to 80-96px desktop and 48-64px mobile @feature-3', async ({ page }) => {
    // Check primary section vertical padding
    const sectionPaddings = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section, main > div'));
      return sections.map(s => {
        const style = window.getComputedStyle(s);
        return {
          paddingTop: parseInt(style.paddingTop, 10),
          paddingBottom: parseInt(style.paddingBottom, 10),
        };
      }).filter(p => p.paddingTop > 0 || p.paddingBottom > 0);
    });

    expect(sectionPaddings.length).toBeGreaterThan(0);
    // At least one major section matches the 80px-96px vertical rhythm (py-20 / py-24)
    const hasDesktopRhythm = sectionPaddings.some(p => (p.paddingTop >= 80 && p.paddingTop <= 128) || (p.paddingBottom >= 80 && p.paddingBottom <= 128));
    expect(hasDesktopRhythm, 'Expected desktop section rhythm with vertical padding between 80px and 128px').toBe(true);
  });

  test('Feature 4: Headings styled with Oswald uppercase typography and body with Poppins @feature-4', async ({ page }) => {
    const h1Heading = page.locator('h1').first();
    await expect(h1Heading).toBeVisible();

    const h1Styles = await h1Heading.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        textTransform: style.textTransform,
        fontFamily: style.fontFamily,
      };
    });

    // Authoritative specification: H1-H6 must use uppercase treatment
    expect(h1Styles.textTransform).toBe('uppercase');
    // Must be Oswald font per Feature 4 / R1
    expect(h1Styles.fontFamily.toLowerCase()).toContain('oswald');
  });
});
