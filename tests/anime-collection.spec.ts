import { test, expect } from "@playwright/test";

test.describe("Anime Collection", () => {
  test.beforeEach(async ({ page }) => {
    // Start at home page which should redirect to landing
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("networkidle");

    // Find and click the demo button
    const demoButtons = page.getByRole("link", { name: /demo/i });
    await expect(demoButtons.first()).toBeVisible();
    await demoButtons.first().click();

    // Wait for login and redirect to complete
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(5000); // Wait for demo login to complete
  });

  test("should display main app structure", async ({ page }) => {
    // Check for essential app structure elements
    await expect(page.locator("#root")).toBeVisible();

    // Check for MUI Navbar
    const navbar = page.locator("[data-testid='navbar']");
    await expect(navbar).toBeVisible();

    // Check for main content containers after login
    await expect(
      page.locator("[data-testid='my-animes-container']")
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='search-container']")
    ).toBeVisible();
  });

  test("should have working navigation in MUI Navbar", async ({ page }) => {
    // Get all navigation links in the MUI Navbar
    const navbar = page.locator("[data-testid='navbar']");
    await expect(navbar).toBeVisible();

    // Test navigation menu toggle if it exists (for mobile)
    const menuButton = page.locator("[data-testid='menu-button']");
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForLoadState("networkidle");
    }

    // Verify key navigation elements are present
    const homeLink = page.getByRole("link", { name: /home/i });
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await page.waitForLoadState("networkidle");

    const myAnimesLink = page.getByRole("link", { name: /my animes/i });
    await expect(myAnimesLink).toBeVisible();
    await myAnimesLink.click();
    await page.waitForLoadState("networkidle");
  });

  test("should handle search functionality", async ({ page }) => {
    // Look for search container
    const searchContainer = page.locator("[data-testid='search-container']");
    await expect(searchContainer).toBeVisible();

    // Find and test search input
    const searchInput = page.locator("input[name='search']");
    await expect(searchInput).toBeVisible();

    // Test search interaction
    await searchInput.fill("Naruto");
    await searchInput.press("Enter");

    // Wait for search results
    await page.waitForLoadState("networkidle");

    // Verify fetched animes container is visible
    const resultsContainer = page.locator(
      "[data-testid='fetched-animes-container']"
    );
    await expect(resultsContainer).toBeVisible();

    // Verify anime grid is visible
    const animeGrid = page.locator("[data-testid='anime-grid']");
    await expect(animeGrid).toBeVisible();
  });

  test("should handle pagination", async ({ page }) => {
    // Search for something that will have multiple pages
    const searchInput = page.locator("input[name='search']");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("a");
    await searchInput.press("Enter");
    await page.waitForLoadState("networkidle");

    // Look for pagination container
    const paginationControls = page.locator(
      "[data-testid='pagination-controls']"
    );
    await expect(paginationControls).toBeVisible();

    // Test next page navigation if available
    const nextButton = page.locator("[data-testid='next-page-button']");
    if (await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForLoadState("networkidle");

      // Verify page changed
      const prevButton = page.locator("[data-testid='prev-page-button']");
      await expect(prevButton).toBeEnabled();
    }
  });

  test("should handle errors gracefully", async ({ page }) => {
    // Navigate to non-existent page
    await page.goto("/this-page-does-not-exist");
    await page.waitForLoadState("networkidle");

    // Should show some kind of error message or 404 page
    const errorElement = page.locator("text=/error|not found|404/i");
    await expect(errorElement).toBeVisible();

    // Should have the navbar with home link still visible
    const navbar = page.locator("[data-testid='navbar']");
    await expect(navbar).toBeVisible();

    // Should be able to navigate back home
    const homeLink = page.getByRole("link", { name: /home/i });
    await expect(homeLink).toBeVisible();
    await homeLink.click();

    // Verify we're back home
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/dashboard");
  });

  test("should handle playlist selection", async ({ page }) => {
    // Find and verify playlist selector
    const playlistSelect = page.locator("select[name='playlist']");
    await expect(playlistSelect).toBeVisible();

    // Get current playlist value
    const currentValue = await playlistSelect.inputValue();

    // Change playlist if there are options
    const options = await playlistSelect.locator("option").all();
    if (options.length > 1) {
      // Select a different playlist
      await playlistSelect.selectOption({ index: 1 });
      await page.waitForLoadState("networkidle");

      // Verify value changed
      const newValue = await playlistSelect.inputValue();
      expect(newValue).not.toBe(currentValue);
    }
  });
});
