import { defineConfig, devices } from '@playwright/experimental-ct-react'

export default defineConfig({
  expect: {
    timeout: 5000,
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.05,
    }, 
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
    },
  },
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  reporter: 'html',
  retries: process.env.CI ? 2 : 0,
  testDir: './tests',
  testIgnore: 'ui/**',
  testMatch: '**/*.visual.test.tsx',
  timeout: 10 * 1000,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3100',
    ctPort: 3100,
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
    screenshot: 'on',
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
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    // TODO: Enable this once we have a way to run tests on Safari and Mobile Safari
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
  ],
});
