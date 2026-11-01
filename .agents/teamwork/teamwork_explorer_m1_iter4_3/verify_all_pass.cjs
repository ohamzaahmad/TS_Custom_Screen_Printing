const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const ROUTES = [
    { name: 'Home', url: 'http://localhost:5173/' },
    { name: 'About', url: 'http://localhost:5173/about' },
    { name: 'Pricing', url: 'http://localhost:5173/pricing' },
    { name: 'Print Guide', url: 'http://localhost:5173/guide' },
    { name: 'Color Guide', url: 'http://localhost:5173/colors' },
    { name: 'Catalogue', url: 'http://localhost:5173/catalogue' },
    { name: 'Gallery', url: 'http://localhost:5173/gallery' },
    { name: 'Quote', url: 'http://localhost:5173/quote' },
    { name: 'Contact', url: 'http://localhost:5173/contact' },
    { name: 'Terms', url: 'http://localhost:5173/terms' },
    { name: 'Refund', url: 'http://localhost:5173/refund' },
    { name: 'Privacy Policy', url: 'http://localhost:5173/privacy' },
  ];

  const failures = [];
  let totalAudited = 0;

  for (const r of ROUTES) {
    await page.goto(r.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Apply the 3 proposed fixes in DOM
    await page.evaluate((routeName) => {
      if (routeName === 'Pricing') {
        const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('PLASTISOL BASED INKS'));
        if (h2) {
          h2.style.color = 'rgb(71, 85, 105)'; // slate-600
        }
      }
      if (routeName === 'Contact') {
        const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Send A Message'));
        if (h3) {
          h3.style.color = 'rgb(71, 85, 105)'; // slate-600
        }
      }
      if (routeName === 'Catalogue') {
        const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Browse our Catalogue Now'));
        if (h3) {
          const card = h3.closest('a');
          if (card) {
            card.style.transition = 'none';
            card.style.backgroundColor = 'rgb(15, 23, 42)'; // bg-slate-900
          }
        }
      }
    }, r.name);

    const headings = await page.evaluate((routeName) => {
      function parseRgbInternal(colorStr) {
        const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return [0, 0, 0];
        return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
      }

      function getLuminanceInternal(r, g, b) {
        const srgb = [r / 255, g / 255, b / 255].map(v => 
          v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
        );
        return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
      }

      function getContrastInternal(rgb1, rgb2) {
        const l1 = getLuminanceInternal(rgb1[0], rgb1[1], rgb1[2]);
        const l2 = getLuminanceInternal(rgb2[0], rgb2[1], rgb2[2]);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        return (lighter + 0.05) / (darker + 0.05);
      }

      function getEffectiveBg(element) {
        let curr = element;
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

      const hs = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      return hs.map(h => {
        const style = window.getComputedStyle(h);
        const textColor = style.color;
        const textRgb = parseRgbInternal(textColor);
        const bgRgb = getEffectiveBg(h);
        const bgLuminance = getLuminanceInternal(bgRgb[0], bgRgb[1], bgRgb[2]);
        const contrast = parseFloat(getContrastInternal(textRgb, bgRgb).toFixed(2));
        const isLight = bgLuminance > 0.4;
        const fontSize = parseFloat(style.fontSize) || 16;
        const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && parseInt(style.fontWeight, 10) >= 700);
        const wcagAAPass = isLargeText ? contrast >= 3.0 : contrast >= 4.5;

        return {
          route: routeName,
          heading: (h.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50),
          tag: h.tagName.toLowerCase(),
          textColor,
          bgColor: `rgb(${bgRgb.join(', ')})`,
          contrast,
          isLightSection: isLight,
          isLargeText,
          fontSize,
          wcagAAPass,
        };
      });
    }, r.name);

    for (const h of headings) {
      totalAudited++;
      if (!h.wcagAAPass) {
        failures.push(h);
      }
    }
  }

  console.log(`TOTAL HEADINGS AUDITED: ${totalAudited}`);
  console.log(`TOTAL FAILURES: ${failures.length}`);
  if (failures.length > 0) {
    console.log(JSON.stringify(failures, null, 2));
  } else {
    console.log("SUCCESS! ALL HEADINGS ACROSS ALL 12 ROUTES PASS WCAG AA (0 FAILURES)!");
  }

  await browser.close();
})();
