import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Configuration for TS Custom Screen Printing
 * Covers 4 Tiers:
 * - Tier 1: Feature Coverage (Features 1-19)
 * - Tier 2: Boundary & Corner Cases (Viewports, Missing Params, Empty Forms)
 * - Tier 3: Cross-Feature Combinations (Navigations, Funnels)
 * - Tier 4: Real-World Scenarios (Full User Journeys, End-to-End Quotation)
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 390, height: 844 },
      },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 5173',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
    env: {
      PATH: `/tmp/node/bin:${process.env.PATH || ''}`,
    },
  },
});
