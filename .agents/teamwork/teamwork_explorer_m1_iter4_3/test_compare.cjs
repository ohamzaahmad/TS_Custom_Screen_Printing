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

    // Let's create a test div and a test a
    const testDiv = document.createElement('div');
    testDiv.style.backgroundColor = 'rgb(234, 88, 12)';
    document.body.appendChild(testDiv);

    const testA = document.createElement('a');
    testA.style.backgroundColor = 'rgb(234, 88, 12)';
    document.body.appendChild(testA);

    const r = {
      testDivBg: window.getComputedStyle(testDiv).backgroundColor,
      testABg: window.getComputedStyle(testA).backgroundColor,
      cardBg: window.getComputedStyle(card).backgroundColor,
      cardCssText: card.style.cssText
    };

    document.body.removeChild(testDiv);
    document.body.removeChild(testA);
    return r;
  });

  console.log(res);
  await browser.close();
})();
