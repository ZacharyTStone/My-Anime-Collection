import { defineConfig, devices } from "@playwright/test";

// Read from environment or use defaults
const baseURL = process.env.BASE_URL || "http://localhost:3000";
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 3 : 1,
  workers: isCI ? 1 : undefined,
  reporter: [["html"], ["list"]],
  use: {
    baseURL: baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 30000,
    navigationTimeout: 30000,
    javaScriptEnabled: true,
    viewport: { width: 1280, height: 720 },
    headless: isCI,
    launchOptions: {
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm start",
        port: 3000,
        reuseExistingServer: !isCI,
        timeout: 120 * 1000,
        env: {
          NODE_ENV: "test",
          PORT: "3000",
        },
      },
});
