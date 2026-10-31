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
    return {
      matchedRules: window.getMatchedCSSRules ? window.getMatchedCSSRules(card) : null,
      display: window.getComputedStyle(card).display,
      classList: Array.from(card.classList),
      cardStyleAttr: card.style.cssText
    };
  });

  console.log(res);
  await browser.close();
})();
