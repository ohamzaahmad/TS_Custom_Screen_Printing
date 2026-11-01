import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch();
  
  // 1440px Desktop
  const context1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page1440 = await context1440.newPage();
  await page1440.goto('http://localhost:5173');
  await page1440.waitForTimeout(1500);
  await page1440.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1440_hero.png' });
  
  // Scroll to section 2
  await page1440.evaluate(() => window.scrollTo(0, 950));
  await page1440.waitForTimeout(1000);
  await page1440.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1440_section2.png' });

  // Scroll to section 3
  await page1440.evaluate(() => window.scrollTo(0, 1850));
  await page1440.waitForTimeout(1000);
  await page1440.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1440_section3.png' });

  // 1920px Wide Display
  const context1920 = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page1920 = await context1920.newPage();
  await page1920.goto('http://localhost:5173');
  await page1920.waitForTimeout(1500);
  await page1920.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1920_hero.png' });

  // Scroll to section 2
  await page1920.evaluate(() => window.scrollTo(0, 1100));
  await page1920.waitForTimeout(1000);
  await page1920.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1920_section2.png' });

  // Scroll to section 3
  await page1920.evaluate(() => window.scrollTo(0, 2100));
  await page1920.waitForTimeout(1000);
  await page1920.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1920_section3.png' });

  await browser.close();
  console.log('Screenshots captured successfully');
}

capture().catch(console.error);

