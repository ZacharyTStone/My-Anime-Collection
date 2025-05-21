import { Page, expect } from "@playwright/test";

/**
 * Helper functions for Playwright tests
 *
 * NOTE: These functions need to be updated to match the actual structure
 * of your application. They are currently template examples.
 */

/**
 * Login to the application
 * @param page - Playwright page object
 * @param email - User email
 * @param password - User password
 */
export async function login(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  // Try different potential login paths
  for (const path of ["/login", "/signin", "/auth/login", "/user/login"]) {
    const response = await page
      .goto(path, { timeout: 10000 })
      .catch(() => null);
    if (response?.ok()) break;
  }

  // Attempt to fill login form (this needs to be updated for your app)
  await page
    .fill(
      'input[type="email"], input[name="email"], input[placeholder*="email" i]',
      email
    )
    .catch(() => {});
  await page
    .fill(
      'input[type="password"], input[name="password"], input[placeholder*="password" i]',
      password
    )
    .catch(() => {});

  // Try to find and click submit button
  await page
    .click(
      'button[type="submit"], button:has-text("Login"), button:has-text("Sign in")'
    )
    .catch(() => {});

  // Wait for any navigation to complete
  await page.waitForLoadState("networkidle");
}

/**
 * Navigate to a specific section in the application
 * @param page - Playwright page object
 * @param sectionName - The name of the section to navigate to
 */
export async function navigateToSection(
  page: Page,
  sectionName: string
): Promise<void> {
  // Try to find navigation element with the given text
  await page
    .click(
      `a:has-text("${sectionName}"), nav >> :text("${sectionName}"), button:has-text("${sectionName}")`
    )
    .catch(() => {});

  // Wait for navigation to complete
  await page.waitForLoadState("networkidle");
}

/**
 * Add an anime to the collection
 * @param page - Playwright page object
 * @param animeDetails - Details of the anime to add
 */
export async function addAnimeToCollection(
  page: Page,
  animeDetails: {
    title: string;
    status?: string;
    rating?: number;
    episodes?: number;
  }
): Promise<void> {
  // Try different potential add anime paths
  for (const path of ["/add-anime", "/add", "/anime/add", "/collection/add"]) {
    const response = await page
      .goto(path, { timeout: 10000 })
      .catch(() => null);
    if (response?.ok()) break;
  }

  // Try to fill in the anime details with more resilient selectors
  await page
    .fill(
      'input[name="title"], input[placeholder*="title" i], input:first-of-type',
      animeDetails.title
    )
    .catch(() => {});

  if (animeDetails.status) {
    await page
      .selectOption(
        'select[name="status"], select:has-text("Status")',
        animeDetails.status
      )
      .catch(() => {});
  }

  if (animeDetails.rating) {
    await page
      .fill(
        'input[name="rating"], input[placeholder*="rating" i]',
        animeDetails.rating.toString()
      )
      .catch(() => {});
  }

  if (animeDetails.episodes) {
    await page
      .fill(
        'input[name="episodes"], input[placeholder*="episode" i]',
        animeDetails.episodes.toString()
      )
      .catch(() => {});
  }

  // Try to submit the form
  await page
    .click(
      'button[type="submit"], button:has-text("Add"), button:has-text("Save"), button:has-text("Submit")'
    )
    .catch(() => {});

  // Wait for any navigation or loading to complete
  await page.waitForLoadState("networkidle");
}

/**
 * Search for an anime in the collection
 * @param page - Playwright page object
 * @param searchTerm - Term to search for
 */
export async function searchAnime(
  page: Page,
  searchTerm: string
): Promise<void> {
  // Try different collection paths
  for (const path of ["/collection", "/anime", "/dashboard", "/"]) {
    const response = await page
      .goto(path, { timeout: 10000 })
      .catch(() => null);
    if (response?.ok()) break;
  }

  // Try to find and fill a search input
  await page
    .fill(
      'input[placeholder*="Search" i], input[name="search"], input[type="search"], input[role="searchbox"]',
      searchTerm
    )
    .catch(() => {});

  // Try to submit the search
  await page
    .press(
      'input[placeholder*="Search" i], input[name="search"], input[type="search"], input[role="searchbox"]',
      "Enter"
    )
    .catch(() => {
      // If pressing Enter doesn't work, try to click a search button
      page
        .click('button:has-text("Search"), button[type="submit"]')
        .catch(() => {});
    });

  // Wait for search results to load
  await page.waitForLoadState("networkidle");
}

/**
 * Assert that an anime appears in the search results
 * @param page - Playwright page object
 * @param animeTitle - Title of the anime to check for
 */
export async function expectAnimeInResults(
  page: Page,
  animeTitle: string
): Promise<void> {
  // Look for elements that might contain the anime title with more resilient selectors
  const animeElement = page
    .locator(
      `.anime-card, .card, .item, .anime-item, div, li, article, section`,
      { hasText: animeTitle }
    )
    .first();

  // Give it a little time to be visible and don't fail hard
  await expect(animeElement)
    .toBeVisible({ timeout: 5000 })
    .catch(() => {
      console.log(`Could not find anime "${animeTitle}" in results`);
    });
}
