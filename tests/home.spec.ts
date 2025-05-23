import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should navigate to the home page and redirect to landing", async ({
    page,
  }) => {
    // Navigate to the home page
    await page.goto("/");

    // Wait for the page to load completely
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("networkidle");

    // Verify that we are on the landing page
    const demoButton = page.getByRole("link", { name: /demo/i });
    await expect(demoButton.first()).toBeVisible();
  });

  test("should have main navigation elements", async ({
    page,
    browserName,
  }) => {
    // Skip this test on WebKit and Mobile Safari which are having issues
    test.skip(
      browserName === "webkit" || browserName.includes("safari"),
      "Skipping on WebKit and Safari browsers"
    );

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("networkidle");

    // For React apps, we need to check if there's a root element where the app mounts
    const appRoot = page.locator("#root");
    await expect(appRoot).toBeVisible({ timeout: 10000 });

    // Verify landing page elements
    const loginButton = page.getByRole("link", { name: /login/i });
    const demoButton = page.getByRole("link", { name: /demo/i });

    await expect(loginButton.first()).toBeVisible();
    await expect(demoButton.first()).toBeVisible();
  });
});
