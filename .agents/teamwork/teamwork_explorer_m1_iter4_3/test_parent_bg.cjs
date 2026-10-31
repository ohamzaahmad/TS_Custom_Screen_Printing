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
    const a = h3.closest('a');
    
    // Check parent hierarchy: at which parent does appending a break its backgroundColor?
    let curr = a.parentElement;
    const testResults = [];
    while (curr && curr !== document.documentElement) {
      const testEl = document.createElement('div');
      testEl.style.backgroundColor = 'red';
      curr.appendChild(testEl);
      testResults.push({
        tag: curr.tagName,
        className: curr.className,
        testChildBg: window.getComputedStyle(testEl).backgroundColor
      });
      curr.removeChild(testEl);
      curr = curr.parentElement;
    }
    return testResults;
  });

  console.log(JSON.stringify(res, null, 2));
  await browser.close();
})();
