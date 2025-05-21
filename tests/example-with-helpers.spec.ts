import { test, expect } from "@playwright/test";
import {
  login,
  navigateToSection,
  addAnimeToCollection,
  searchAnime,
  expectAnimeInResults,
} from "./helpers.js";
import { testUsers, testAnimeList } from "./fixtures.js";

// Skip these tests that depend on specific application structure
// These are meant to be examples and will need to be updated with real app paths
test.describe.skip("Example using helpers and fixtures", () => {
  // This demonstrates how to use the login helper
  test("should login and navigate to dashboard", async ({ page }) => {
    const user = testUsers.regularUser;
    await login(page, user.email, user.password);

    // Verify we're on the dashboard
    await expect(page).toHaveURL(/.*dashboard/);

    // Verify the user name is displayed somewhere on the page
    const welcomeMessage = page.locator("text=" + user.name);
    await expect(welcomeMessage).toBeVisible();
  });

  // This demonstrates how to use the navigation and anime collection helpers
  test("should add an anime to collection and verify it appears in search", async ({
    page,
  }) => {
    // Login first
    const user = testUsers.regularUser;
    await login(page, user.email, user.password);

    // Add an anime to the collection
    const animeToAdd = testAnimeList[0]; // Using One Piece from the fixtures
    await addAnimeToCollection(page, animeToAdd);

    // Navigate to the collection page
    await navigateToSection(page, "Collection");

    // Search for the anime
    await searchAnime(page, animeToAdd.title);

    // Verify the anime appears in the results
    await expectAnimeInResults(page, animeToAdd.title);
  });

  // This demonstrates using multiple test fixtures
  test("should display different anime in different states", async ({
    page,
  }) => {
    // Login first
    const user = testUsers.regularUser;
    await login(page, user.email, user.password);

    // Add multiple anime with different statuses
    for (const anime of testAnimeList) {
      await addAnimeToCollection(page, anime);
    }

    // Navigate to collection and filter by 'Completed' status
    await navigateToSection(page, "Collection");
    await page.selectOption('select[name="status-filter"]', "Completed");

    // Verify the completed anime are visible
    const completedAnime = testAnimeList.filter(
      (anime) => anime.status === "Completed"
    );
    for (const anime of completedAnime) {
      await expectAnimeInResults(page, anime.title);
    }
  });
});
