# End-to-End Testing with Playwright

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

## Setup

The e2e testing setup includes:

- Playwright configuration in `playwright.config.ts`
- Test files in the `tests/` directory
- Helper functions in `tests/helpers.js`
- Test fixtures in `tests/fixtures.js`
- GitHub workflow in `.github/workflows/playwright.yml`

## Test Approach

Our tests are designed to be resilient and work with both local development and production environments. The tests:

1. Focus on basic functionality that should be present in any environment
2. Use resilient selectors that can adapt to minor UI changes
3. Have error handling to prevent test failures due to timing or network issues
4. Skip example tests that require detailed knowledge of application structure

As you continue to develop the application, you should gradually enable and refine the skipped tests to match your actual application structure.

## Running Tests

You can run the tests using the following npm scripts:

```bash
# Run all tests against local development server
npm run test:e2e

# Run tests with UI mode (great for debugging)
npm run test:e2e:ui

# View the last test report
npm run test:e2e:report

# Test against production deployment
npm run test:e2e:prod

# Test against production with UI mode
npm run test:e2e:prod:ui
```

## Testing Production Deployments

To test against your production deployment at [My Anime Collection](https://www.my-anime-collection.com):

1. Run one of the production testing scripts:

   ```bash
   # Run tests against production
   npm run test:e2e:prod

   # Run tests against production with UI mode
   npm run test:e2e:prod:ui
   ```

You can also manually trigger the "Test Production Deployment" workflow in GitHub Actions to run tests against the production deployment.

## Test Files

- `home.spec.ts`: Basic tests for the home page
- `auth.spec.ts`: Basic tests for authentication elements
- `anime-collection.spec.ts`: Basic tests for content and interactive elements
- `example.spec.ts`: Example test templates (mostly skipped)
- `example-with-helpers.spec.ts`: Advanced examples using helpers (skipped)

## Helper Functions

The helper functions in `tests/helpers.js` provide reusable test utilities. These are placeholder implementations that:

1. Try multiple possible paths for features
2. Use resilient selectors to find elements
3. Have error handling to prevent test failures
4. Need to be updated as you develop your application

## Extending Tests

As you develop your application, you should:

1. Update the helper functions to match your actual application structure
2. Enable the skipped tests once you have the corresponding features implemented
3. Add new tests for specific features as they are developed

## CI/CD Integration

Tests automatically run on:

- Pull requests to main/master
- Pushes to main/master
- Can be configured to run after successful deployment to production

Artifacts (test reports) are saved for later inspection.

## Debugging Tests

- Use `test:e2e:ui` to run tests with the Playwright UI
- Check the test report for detailed logs and screenshots
- For flaky tests, add `test.retry(n)` to retry a specific test n times
