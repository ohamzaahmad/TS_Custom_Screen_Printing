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
      cardNamespace: card.namespaceURI,
      cardConstructor: card.constructor.name,
      h3Namespace: h3.namespaceURI,
      h3Constructor: h3.constructor.name
    };
  });

  console.log(res);
  await browser.close();
})();
