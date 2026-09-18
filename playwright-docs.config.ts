import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.05,
    },
  },
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  reporter: 'html',
  retries: process.env.CI ? 2 : 0,
  snapshotPathTemplate: 'docs/screenshots/{arg}{ext}',
  testDir: './tests',
  testMatch: '**/docs-screenshots.test.tsx',
  timeout: 10 * 1000,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3101/',
    ctPort: 3101,
    ctViteConfig: {
      build: {
        rollupOptions: {
          external: ['express'],
          output: {
            globals: {
              express: 'express',
            },
          },
        },
      },
      plugins: [],
    },
    screenshot: 'off',
    trace: 'on-first-retry',
    viewport: {
      width: 1280,
      height: 720,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
