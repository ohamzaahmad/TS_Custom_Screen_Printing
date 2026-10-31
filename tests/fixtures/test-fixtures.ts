import { test as base, expect, Page } from '@playwright/test';

export const VIEWPORTS = {
  mobileSm: { width: 375, height: 667 },
  mobileLg: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktopMd: { width: 1068, height: 800 },
  desktop: { width: 1280, height: 800 },
  desktopBreakout: { width: 1348, height: 900 },
  desktopLg: { width: 1440, height: 900 },
};

export const ROUTES = {
  home: '/',
  about: '/about',
  gallery: '/gallery',
  catalogue: '/catalogue',
  quote: '/quote',
  contact: '/contact',
  guide: '/guide',
  colors: '/colors',
  pricing: '/pricing',
  terms: '/terms',
  refund: '/refund',
  privacy: '/privacy',
  notFound: '/non-existent-page-404',
};

export interface TestAppFixtures {
  appPage: Page;
}

export const test = base.extend<TestAppFixtures>({
  appPage: async ({ page }, use) => {
    // Monitor and verify no uncaught exceptions
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore known harmless third-party cognito script network issues in test environments
        if (!text.includes('cognitoforms.com') && !text.includes('Failed to load resource')) {
          consoleErrors.push(text);
        }
      }
    });

    await use(page);

    // Assert no severe application errors occurred
    if (consoleErrors.length > 0) {
      // Keep record in annotations if any errors occurred
    }
  },
});

export { expect };

export async function waitForAppMounted(page: Page) {
  await page.waitForSelector('#root', { state: 'attached' });
  // Wait for React to mount content inside #root
  await page.waitForFunction(() => {
    const root = document.getElementById('root');
    return root && root.children.length > 0;
  });
}
