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
    card.style.backgroundColor = 'rgb(234, 88, 12)';

    const classes = Array.from(card.classList);
    const log = [];

    // Check with all classes
    log.push({ removed: 'none', bg: window.getComputedStyle(card).backgroundColor });

    // Remove classes one by one
    for (const c of classes) {
      card.classList.remove(c);
      log.push({ removed: c, bg: window.getComputedStyle(card).backgroundColor });
    }

    return log;
  });

  console.log(JSON.stringify(res, null, 2));
  await browser.close();
})();
