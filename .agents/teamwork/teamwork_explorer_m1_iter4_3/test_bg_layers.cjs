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
    const div = h3.parentElement; // div.relative.z-10
    const a = div.parentElement;  // motion.a

    // What if we set backgroundColor on h3?
    h3.style.backgroundColor = 'blue';
    const h3Bg = window.getComputedStyle(h3).backgroundColor;

    // What if we set backgroundColor on div?
    div.style.backgroundColor = 'green';
    const divBg = window.getComputedStyle(div).backgroundColor;

    // What if we set backgroundColor on a?
    a.style.backgroundColor = 'red';
    const aBg = window.getComputedStyle(a).backgroundColor;

    return {
      h3Bg,
      divBg,
      aBg,
      aStyle: a.getAttribute('style')
    };
  });

  console.log(res);
  await browser.close();
})();
