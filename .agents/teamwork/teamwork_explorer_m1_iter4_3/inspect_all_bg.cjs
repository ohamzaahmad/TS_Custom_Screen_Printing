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
    card.setAttribute('style', 'background-color: #ff0000 !important;');
    const cs = window.getComputedStyle(card);
    const props = {};
    for (let i = 0; i < cs.length; i++) {
      const p = cs[i];
      if (p.includes('background') || p.includes('color') || p.includes('opacity') || p.includes('visibility') || p.includes('display')) {
        props[p] = cs.getPropertyValue(p);
      }
    }
    return {
      styleAttr: card.getAttribute('style'),
      props
    };
  });

  console.log(JSON.stringify(res, null, 2));
  await browser.close();
})();
