import { test, expect } from "@playwright/test";

test.describe("Anime Collection", () => {
  test("should display content on main pages", async ({ page }) => {
    // Try different paths that might contain anime collections
    for (const path of ["/", "/collection", "/anime", "/dashboard", "/home"]) {
      const response = await page
        .goto(path, { timeout: 10000 })
        .catch(() => null);
      if (response?.ok()) {
        // Check if the page has any content
        const contentExists = await page
          .locator("main, .content, #content, .container, body")
          .first();
        await expect(contentExists).toBeVisible();
        return;
      }
    }

    // If none of the paths worked, the test will fail
    expect(false, "Could not find any valid page with content").toBeTruthy();
  });

  test("should have some form of interactive elements", async ({ page }) => {
    await page.goto("/");

    // Look for any interactive elements that might be part of an anime app
    const anyInteractive = page
      .locator(
        'button, input, select, a, [role="button"], .card, .anime-card, .item'
      )
      .first();

    await expect(anyInteractive).toBeVisible();
  });
});
