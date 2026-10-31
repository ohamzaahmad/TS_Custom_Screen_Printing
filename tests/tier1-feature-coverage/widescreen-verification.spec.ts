import { test } from '@playwright/test';

test.describe('Widescreen layout and content scaling', () => {
  test.beforeEach(async ({ isMobile }) => {
    test.skip(isMobile, 'Widescreen verification only applies to desktop browsers');
  });
  test('Capture 1440px desktop viewports', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1440_hero.png' });

    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(600);
    await page.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1440_section2.png' });

    await page.evaluate(() => window.scrollTo(0, 1850));
    await page.waitForTimeout(600);
    await page.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1440_section3.png' });
  });

  test('Capture 1920px large monitor viewports', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1920_hero.png' });

    await page.evaluate(() => window.scrollTo(0, 1050));
    await page.waitForTimeout(600);
    await page.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1920_section2.png' });

    await page.evaluate(() => window.scrollTo(0, 2150));
    await page.waitForTimeout(600);
    await page.screenshot({ path: '/home/ohamzaahmad/.gemini/antigravity/brain/8a9a954c-9730-4b66-87c9-ad6c9f15c4b9/widescreen_1920_section3.png' });
  });
});
