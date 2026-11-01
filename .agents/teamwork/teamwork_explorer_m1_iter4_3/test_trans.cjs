const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:5173/catalogue', { waitUntil: 'networkidle' });

  const res = await page.evaluate(async () => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Browse our Catalogue'));
    const a = h3.closest('a');
    a.style.transition = 'none';
    a.style.backgroundColor = 'rgb(234, 88, 12)';

    const immediate = window.getComputedStyle(a).backgroundColor;
    await new Promise(r => setTimeout(r, 200));
    const delayed = window.getComputedStyle(a).backgroundColor;

    return { immediate, delayed };
  });

  console.log(res);
  await browser.close();
})();
