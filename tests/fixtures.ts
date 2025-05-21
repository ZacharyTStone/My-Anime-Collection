/**
 * Test fixtures for Playwright tests
 */

// Test user credentials
export const testUsers = {
  regularUser: {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  },
  adminUser: {
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
  },
};

// Test anime data
export const testAnimeList = [
  {
    title: "One Piece",
    episodes: 1000,
    status: "Watching",
    rating: 5,
  },
  {
    title: "Naruto",
    episodes: 220,
    status: "Completed",
    rating: 4,
  },
  {
    title: "Attack on Titan",
    episodes: 75,
    status: "Plan to Watch",
    rating: 0,
  },
  {
    title: "Death Note",
    episodes: 37,
    status: "Completed",
    rating: 5,
  },
  {
    title: "My Hero Academia",
    episodes: 113,
    status: "Watching",
    rating: 4,
  },
];

// Status options
export const animeStatuses = [
  "Watching",
  "Completed",
  "On Hold",
  "Dropped",
  "Plan to Watch",
];

// Rating options (1-5)
export const ratingOptions = [1, 2, 3, 4, 5];
