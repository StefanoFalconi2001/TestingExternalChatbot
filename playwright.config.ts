import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';

const isCI = process.env["CI"]

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: 'html',
  timeout: 60000,
  use: {
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});


