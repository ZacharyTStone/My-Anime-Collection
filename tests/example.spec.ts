import { test, expect } from "@playwright/test";

/**
 * This is an example test file that serves as a template for creating
 * new tests. It demonstrates various Playwright testing techniques.
 */

// Use test.describe to group related tests
test.describe("Example Test Suite", () => {
  // You can use test.beforeEach to set up common test conditions
  test.beforeEach(async ({ page }) => {
    // Navigate to the starting URL for all tests in this describe block
    await page.goto("/");
  });

  // Basic test example
  test("should have correct page title", async ({ page }) => {
    // Check the page title
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  // Skip the interaction examples that might fail
  test.skip("should demonstrate basic interactions", async ({ page }) => {
    // Click on elements
    // await page.click('button#example-button');

    // Fill in form fields
    // await page.fill('input[name="search"]', 'Naruto');

    // Use locators for better readability
    const searchInput = page.getByPlaceholder("Search");
    // await searchInput.fill('One Piece');

    // Use expect with locators
    // await expect(searchInput).toHaveValue('One Piece');
  });

  // Skip the navigation examples that might fail
  test.skip("should demonstrate navigation", async ({ page }) => {
    // Click on a navigation item
    // await page.click('nav >> text=About');
    // Check URL after navigation
    // await expect(page).toHaveURL(/.*about/);
    // Check for elements that should be present after navigation
    // const heading = page.locator('h1');
    // await expect(heading).toHaveText('About');
  });

  // Skip the visual testing examples that might fail
  test.skip("should demonstrate visual testing", async ({ page }) => {
    // Check if an element is visible
    // const banner = page.locator('.welcome-banner');
    // await expect(banner).toBeVisible();
    // Take a screenshot (useful for visual regression testing)
    // await page.screenshot({ path: `screenshots/homepage-${Date.now()}.png` });
  });

  // Skip the test data examples that might fail
  test.skip("should demonstrate using test data", async ({ page }) => {
    // Example test data
    const testAnime = {
      title: "My Test Anime",
      episodes: 12,
      status: "Completed",
    };

    // Use the test data (this is just a placeholder)
    // await page.fill('input[name="title"]', testAnime.title);
    // await page.fill('input[name="episodes"]', testAnime.episodes.toString());
    // await page.selectOption('select[name="status"]', testAnime.status);
  });
});

// Example of a test that needs to be skipped (e.g., work in progress)
test.skip("work in progress test", async ({ page }) => {
  // This test will be skipped when running the test suite
});

// Example of a test that should only run in specific environments
test("environment specific test", async ({ page }) => {
  test.skip(process.env.CI === "true", "This test only runs in development");

  // Test code here will not run in CI
});
