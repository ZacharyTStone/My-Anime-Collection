import { defineConfig } from "vitest/config";

// Server test suite — kept separate from the Client's vitest config.
export default defineConfig({
  test: {
    include: ["Server/__tests__/**/*.test.ts"],
    setupFiles: ["Server/__tests__/setup.ts"],
    environment: "node",
    // mongodb-memory-server binary download + replica set startup can be slow
    testTimeout: 60_000,
    hookTimeout: 120_000,
    // Each test file gets its own in-memory replica set; run serially to keep
    // memory usage predictable.
    fileParallelism: false,
  },
});
