// noinspection JSUnusedGlobalSymbols

import { defineConfig, devices } from '@playwright/test';
import { loadYamlEnv } from './test-utils/config/load-yaml-env';

const env = loadYamlEnv();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [
      "json",
      {
        outputFile: "test-results.json",
      },
    ],
    [
      "html",
      {
        open: "never",
        outputFolder: "playwright-report",
        embedAssets: true,
      },
    ],
  ],
  timeout: 10000,
  expect: {
    timeout: 5000, // 5s for expect() assertions
  },
  /*
  'on-first-retry' - Record a trace only when retrying a test for the first time.
  'on-all-retries' - Record traces for all test retries.
  'off' - Do not record a trace.
  'on' - Record a trace for each test. (not recommended as it's performance heavy)
  'retain-on-failure' - Record a trace for each test, but remove it from successful test runs.
  */
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: !env.webdriverVisible,
        channel: 'chrome', // explicitly use Google Chrome browser
      },
    },
  ],
});
