# End-to-End Tests with Playwright

This directory contains end-to-end tests for the My Anime Collection application using Playwright.

## Test Structure

- `home.spec.ts`: Tests for the home page functionality
- `auth.spec.ts`: Tests for authentication features
- `anime-collection.spec.ts`: Tests for the anime collection features

## Running Tests

You can run the tests using the following npm scripts:

```bash
# Run all tests
npm run test:e2e

# Run tests with UI mode
npm run test:e2e:ui

# View the last test report
npm run test:e2e:report
```

## Writing New Tests

When writing new tests:

1. Create a new file named `feature-name.spec.ts`
2. Import the necessary Playwright utilities
3. Use descriptive test and describe blocks
4. Follow the pattern of existing tests

Example:

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should do something specific", async ({ page }) => {
    // Test steps
  });
});
```

## CI/CD Integration

The tests are configured to run in CI environments with appropriate retry and parallel execution settings.
