const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:5173/catalogue', { waitUntil: 'networkidle' });

  const res = await page.evaluate(() => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Browse our Catalogue Now'));
    const card = h3.closest('a');
    card.classList.add('bg-orange-600');
    // or
    card.style.setProperty('background-color', 'rgb(234, 88, 12)', 'important');

    const cardBg = window.getComputedStyle(card).backgroundColor;

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

    return {
      cardBg,
      effectiveBg: getEffectiveBg(h3)
    };
  });

  console.log('Result:', res);
  await browser.close();
})();
