const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:5173/catalogue', { waitUntil: 'networkidle' });

  const res = await page.evaluate(() => {
    const hs = Array.from(document.querySelectorAll('h3')).filter(el => el.textContent.includes('Browse our Catalogue'));
    return hs.map((h, index) => {
      const a = h.closest('a');
      return {
        index,
        text: h.textContent,
        tag: h.tagName,
        hasAnchor: !!a,
        aClass: a ? a.className : null,
        aBg: a ? window.getComputedStyle(a).backgroundColor : null
      };
    });
  });

  console.log(JSON.stringify(res, null, 2));
  await browser.close();
})();
