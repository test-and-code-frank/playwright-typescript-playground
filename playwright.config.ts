import { defineConfig, devices } from '@playwright/test';
import { loadYAMLEnv } from './src/utils/loadYAMLEnv';

const env = loadYAMLEnv();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 10000,
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: !env.webdriver_visible,
        channel: 'chrome', // explicitly use Google Chrome browser
      },
    },
  ],
});
