import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();  // loads .env by default

// Pick environment to run against: QA1, QA2, QA3
const ENV = process.env.TEST_ENV || 'QA1';  // default to QA1

// Map environment names to URLs from .env variables
const envUrls: Record<string, string | undefined> = {
  QA1: process.env.QA1_URL,
  QA2: process.env.QA2_URL,
  QA3: process.env.QA3_URL,
};

const BASE_URL = envUrls[ENV];

if (!BASE_URL) {
  throw new Error(`No URL found for the provided environment: ${ENV}`);
}

console.log(`Test successfully triggered for the provided environment: ${ENV} (${BASE_URL})`);

export default defineConfig({
  testDir: './tests',
  timeout: 120 * 1000,

  reporter: [
    ['html', {
      outputFolder: 'reports/html-report',
      open: 'never',
    }]
  ],

  use: {
    baseURL: BASE_URL,
    headless: false,
    screenshot: 'only-on-failure',
    video: 'on',
    launchOptions: {
      slowMo: 300,
    },
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 13'],
      },
    },
  ],
});