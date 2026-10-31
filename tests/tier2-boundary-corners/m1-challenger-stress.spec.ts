import { test, expect, waitForAppMounted, ROUTES } from '../fixtures/test-fixtures';

test.describe('M1 Challenger: Empirical Stress Harness across Viewports & Typography', () => {
  test.describe.configure({ mode: 'serial' });

  const VIEWPORTS = [
    { name: '320px Mobile Small (Adversarial Edge)', width: 320, height: 568 },
    { name: '375px Mobile Standard', width: 375, height: 667 },
    { name: '768px Tablet (Breakpoint Boundary)', width: 768, height: 1024 },
    { name: '1068px Desktop Standard (Target Width)', width: 1068, height: 800 },
    { name: '1348px Desktop Breakout (Target Width)', width: 1348, height: 900 },
    { name: '1920px Widescreen (Ultrawide)', width: 1920, height: 1080 },
  ];

  const PAGES_TO_TEST = [
    { name: 'Home', route: ROUTES.home },
    { name: 'Pricing', route: ROUTES.pricing },
    { name: 'Print Guide', route: ROUTES.guide },
    { name: 'Color Guide', route: ROUTES.colors },
    { name: 'Catalogue', route: ROUTES.catalogue },
    { name: 'Gallery', route: ROUTES.gallery },
    { name: 'Privacy Policy', route: ROUTES.privacy },
  ];

  for (const vp of VIEWPORTS) {
    test(`Viewport ${vp.name}: No horizontal overflow across all major routes`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      for (const routeInfo of PAGES_TO_TEST) {
        await page.goto(routeInfo.route);
        await waitForAppMounted(page);

        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
          const innerWidth = window.innerWidth;
          
          let culprit: string | null = null;
          if (scrollWidth > innerWidth) {
            document.querySelectorAll('*').forEach((el) => {
              const r = el.getBoundingClientRect();
              if (r.right > innerWidth + 2) {
                culprit = `${el.tagName}.${el.className} (right=${r.right}, innerWidth=${innerWidth})`;
              }
            });
          }

          return {
            hasOverflow: scrollWidth > innerWidth,
            scrollWidth,
            innerWidth,
            culprit,
          };
        });

        expect(
          overflow.hasOverflow,
          `Route ${routeInfo.name} at viewport ${vp.name} must not horizontally overflow (scrollWidth=${overflow.scrollWidth}, innerWidth=${overflow.innerWidth}). Culprit: ${overflow.culprit}`
        ).toBe(false);
      }
    });
  }

  test('Typography: Oswald font and uppercase treatment applied to headings, nav, and buttons', async ({ page }) => {
    await page.setViewportSize({ width: 1068, height: 800 });
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);

    const typography = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
      const buttons = Array.from(document.querySelectorAll('button, .btn, [role="button"]'));
      const navLinks = Array.from(document.querySelectorAll('nav a, nav button'));
      const body = document.body;
      const inputs = Array.from(document.querySelectorAll('input, textarea, select'));

      const getDetails = (el: Element) => {
        const style = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          fontFamily: style.fontFamily.toLowerCase(),
          textTransform: style.textTransform,
        };
      };

      return {
        bodyFont: window.getComputedStyle(body).fontFamily.toLowerCase(),
        headings: headings.slice(0, 5).map(getDetails),
        buttons: buttons.slice(0, 5).map(getDetails),
        navLinks: navLinks.slice(0, 5).map(getDetails),
        inputs: inputs.slice(0, 3).map(getDetails),
      };
    });

    // Body must use Poppins
    expect(typography.bodyFont).toContain('poppins');

    // Headings must use Oswald uppercase
    for (const h of typography.headings) {
      expect(h.fontFamily, `Heading ${h.tag} should use Oswald`).toContain('oswald');
      expect(h.textTransform, `Heading ${h.tag} should be uppercase`).toBe('uppercase');
    }

    // Buttons must use Oswald uppercase
    for (const b of typography.buttons) {
      expect(b.fontFamily, 'Button should use Oswald').toContain('oswald');
      expect(b.textTransform, 'Button should be uppercase').toBe('uppercase');
    }

    // Nav links must use Oswald uppercase
    for (const n of typography.navLinks) {
      expect(n.fontFamily, 'Nav element should use Oswald').toContain('oswald');
      expect(n.textTransform, 'Nav element should be uppercase').toBe('uppercase');
    }
  });

  test('Font Loading: Browser document.fonts loads Oswald and Poppins families', async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);

    // Wait for fonts ready
    await page.evaluate(() => document.fonts.ready);

    const fontStatus = await page.evaluate(() => {
      return {
        hasOswald: document.fonts.check('16px Oswald'),
        hasPoppins: document.fonts.check('16px Poppins'),
        totalLoaded: document.fonts.size,
      };
    });

    expect(fontStatus.hasOswald, 'document.fonts should report Oswald as available').toBe(true);
    expect(fontStatus.hasPoppins, 'document.fonts should report Poppins as available').toBe(true);
  });

  test('Design System Tokens: CSS rules for 1068px and 1348px containers exist in stylesheets', async ({ page }) => {
    await page.goto(ROUTES.home);
    await waitForAppMounted(page);

    const containerRules = await page.evaluate(() => {
      // Create test elements to verify container class computed styles
      const standardDiv = document.createElement('div');
      standardDiv.className = 'container-standard';
      document.body.appendChild(standardDiv);

      const breakoutDiv = document.createElement('div');
      breakoutDiv.className = 'container-breakout';
      document.body.appendChild(breakoutDiv);

      const standardStyle = window.getComputedStyle(standardDiv);
      const breakoutStyle = window.getComputedStyle(breakoutDiv);

      const res = {
        standardMaxWidth: standardStyle.maxWidth,
        breakoutMaxWidth: breakoutStyle.maxWidth,
      };

      document.body.removeChild(standardDiv);
      document.body.removeChild(breakoutDiv);

      return res;
    });

    expect(containerRules.standardMaxWidth, '.container-standard should resolve to 1068px').toBe('1068px');
    expect(containerRules.breakoutMaxWidth, '.container-breakout should resolve to 1348px').toBe('1348px');
  });

  test('Heading Color & Contrast: Verify computed colors and WCAG AA/AAA ratios across light and dark sections on all routes', async ({ page }) => {
    const ALL_ROUTES = [
      { name: 'Home', route: ROUTES.home },
      { name: 'About', route: ROUTES.about },
      { name: 'Pricing', route: ROUTES.pricing },
      { name: 'Print Guide', route: ROUTES.guide },
      { name: 'Color Guide', route: ROUTES.colors },
      { name: 'Catalogue', route: ROUTES.catalogue },
      { name: 'Gallery', route: ROUTES.gallery },
      { name: 'Quote', route: ROUTES.quote },
      { name: 'Contact', route: ROUTES.contact },
      { name: 'Terms', route: ROUTES.terms },
      { name: 'Refund', route: ROUTES.refund },
      { name: 'Privacy Policy', route: ROUTES.privacy },
    ];

    const auditResults: Array<{
      route: string;
      heading: string;
      tag: string;
      textColor: string;
      bgColor: string;
      contrast: number;
      isLightSection: boolean;
      wcagAAPass: boolean;
      wcagAAAPass: boolean;
    }> = [];

    for (const r of ALL_ROUTES) {
      await page.goto(r.route);
      await waitForAppMounted(page);

      const pageHeadings = await page.evaluate((routeName) => {
        function parseRgb(colorStr: string) {
          const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (!match) return [0, 0, 0];
          return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
        }

        function getLuminance(r: number, g: number, b: number) {
          const srgb = [r / 255, g / 255, b / 255].map(v => 
            v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
          );
          return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
        }

        function getContrast(rgb1: number[], rgb2: number[]) {
          const l1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
          const l2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
          const lighter = Math.max(l1, l2);
          const darker = Math.min(l1, l2);
          return (lighter + 0.05) / (darker + 0.05);
        }

        function getEffectiveBg(element: Element): number[] {
          let curr: Element | null = element;
          while (curr && curr !== document.documentElement) {
            const bg = window.getComputedStyle(curr).backgroundColor;
            const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (match) {
              const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
              if (alpha > 0.05) {
                return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
              }
            }
            curr = curr.parentElement;
          }
          return [252, 252, 252];
        }

        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        return headings.map((h) => {
          const style = window.getComputedStyle(h);
          const textColor = style.color;
          const textRgb = parseRgb(textColor);
          const bgRgb = getEffectiveBg(h);
          const bgLuminance = getLuminance(bgRgb[0], bgRgb[1], bgRgb[2]);
          const contrast = parseFloat(getContrast(textRgb, bgRgb).toFixed(2));
          const isLight = bgLuminance > 0.4;
          const fontSize = parseFloat(style.fontSize) || 16;

          // WCAG 2.1: Large text is >= 18pt (24px) or >= 14pt (18.66px) bold
          const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && parseInt(style.fontWeight, 10) >= 700);

          return {
            route: routeName,
            heading: (h.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40),
            tag: h.tagName.toLowerCase(),
            textColor,
            bgColor: `rgb(${bgRgb.join(', ')})`,
            contrast,
            isLightSection: isLight,
            wcagAAPass: isLargeText ? contrast >= 3.0 : contrast >= 4.5,
            wcagAAAPass: isLargeText ? contrast >= 4.5 : contrast >= 7.0,
          };
        });
      }, r.name);

      auditResults.push(...pageHeadings);
    }

    expect(auditResults.length, 'At least some headings should be detected').toBeGreaterThan(0);

    const darkSectionHeadings = auditResults.filter(h => !h.isLightSection);
    const lightSectionHeadings = auditResults.filter(h => h.isLightSection);

    console.log(`Audited ${auditResults.length} headings across 12 routes: ${lightSectionHeadings.length} light section, ${darkSectionHeadings.length} dark section.`);

    // Verify dark section headings have high contrast (WCAG AA)
    for (const h of darkSectionHeadings) {
      expect(
        h.wcagAAPass,
        `Dark section heading "${h.heading}" (${h.tag}) on ${h.route} must pass WCAG AA. Got contrast ${h.contrast}:1 (text: ${h.textColor}, bg: ${h.bgColor})`
      ).toBe(true);
    }

    // Verify light section headings have high contrast (WCAG AA)
    for (const h of lightSectionHeadings) {
      expect(
        h.wcagAAPass,
        `Light section heading "${h.heading}" (${h.tag}) on ${h.route} must pass WCAG AA. Got contrast ${h.contrast}:1 (text: ${h.textColor}, bg: ${h.bgColor})`
      ).toBe(true);
    }
  });
});
