const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:5173/catalogue', { waitUntil: 'networkidle' });

  const res = await page.evaluate(() => {
    function parseRgb(colorStr) {
      const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return [0, 0, 0];
      return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
    }

    function getLuminance(r, g, b) {
      const srgb = [r / 255, g / 255, b / 255].map(v => 
        v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      );
      return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    }

    function getContrast(rgb1, rgb2) {
      const l1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
      const l2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
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

    const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Browse our Catalogue'));
    const a = h3.closest('a');
    a.style.backgroundColor = 'rgb(194, 65, 12)'; // orange-700
    h3.style.fontSize = '20px'; // text-xl

    const style = window.getComputedStyle(h3);
    const textColor = style.color;
    const textRgb = parseRgb(textColor);
    const bgRgb = getEffectiveBg(h3);
    const bgLuminance = getLuminance(bgRgb[0], bgRgb[1], bgRgb[2]);
    const contrast = parseFloat(getContrast(textRgb, bgRgb).toFixed(2));
    const isLight = bgLuminance > 0.4;
    const fontSize = parseFloat(style.fontSize) || 16;
    const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && parseInt(style.fontWeight, 10) >= 700);
    const wcagAAPass = isLargeText ? contrast >= 3.0 : contrast >= 4.5;

    return {
      textColor,
      bgColor: `rgb(${bgRgb.join(', ')})`,
      contrast,
      isLight,
      isLargeText,
      wcagAAPass
    };
  });

  console.log('Catalogue H3 Contrast Check:', res);
  await browser.close();
})();
