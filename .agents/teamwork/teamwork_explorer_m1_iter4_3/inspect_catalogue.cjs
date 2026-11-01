const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:5173/catalogue', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Browse our Catalogue Now'));
    if (!h3) return { found: false };

    const parents = [];
    let curr = h3;
    while (curr && curr !== document.documentElement) {
      parents.push({
        tag: curr.tagName,
        className: curr.className,
        bg: window.getComputedStyle(curr).backgroundColor
      });
      curr = curr.parentElement;
    }
    return {
      found: true,
      h3Text: h3.textContent,
      h3Class: h3.className,
      parents
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
