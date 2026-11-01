const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:5173/catalogue', { waitUntil: 'networkidle' });

  const res = await page.evaluate(() => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Browse our Catalogue'));
    const a = h3.closest('a');
    a.style.backgroundColor = 'rgb(194, 65, 12)';

    const steps = [];
    let curr = h3;
    while (curr && curr !== document.documentElement) {
      const bg = window.getComputedStyle(curr).backgroundColor;
      steps.push({
        tag: curr.tagName,
        className: curr.className,
        bg,
        isA: curr === a
      });
      curr = curr.parentElement;
    }
    return steps;
  });

  console.log(JSON.stringify(res, null, 2));
  await browser.close();
})();
