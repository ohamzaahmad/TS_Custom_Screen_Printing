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
    const div = h3.parentElement;
    const a = div.parentElement;

    // Check Framer Motion properties or dataset on a
    const keys = Object.keys(a);
    const framerKeys = keys.filter(k => k.startsWith('__react') || k.startsWith('__framer') || k.startsWith('_'));

    // Try a new anchor tag with same classes
    const freshA = document.createElement('a');
    freshA.className = a.className;
    freshA.style.backgroundColor = 'red';
    document.body.appendChild(freshA);
    const freshABg = window.getComputedStyle(freshA).backgroundColor;

    // Try moving a to document.body
    const originalParent = a.parentElement;
    document.body.appendChild(a);
    a.style.backgroundColor = 'red';
    const movedABg = window.getComputedStyle(a).backgroundColor;
    originalParent.appendChild(a);

    return {
      freshABg,
      movedABg,
      framerKeysCount: framerKeys.length
    };
  });

  console.log(res);
  await browser.close();
})();
