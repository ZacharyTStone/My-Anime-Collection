# Add Unit Tests

Add focused, high-quality Vitest unit tests for the file: $ARGUMENTS

## Guidelines

- **Less is more.** Write only tests that catch real bugs or protect important behavior. Skip trivial getter/setter tests.
- **Quality over quantity.** Each test should justify its existence — if it wouldn't catch a meaningful regression, don't write it.
- **Test behavior, not implementation.** Focus on what the code *does*, not how it does it internally.
- **One concept per test.** Keep each `it()` focused on a single assertion or closely related group.

## Conventions

- Use `import { describe, it, expect, beforeEach } from "vitest";`
- Place test files in a `__tests__/` directory adjacent to the source file (e.g., `src/utils/__tests__/foo.test.ts`)
- File naming: `{sourceFileName}.test.ts` (or `.test.tsx` for components)
- No mocking unless truly necessary — prefer testing real logic
- Reset shared state in `beforeEach` when testing stores

## Process

1. Read the target file to understand its exports, logic, and edge cases
2. Identify the 3-5 most valuable behaviors to test (boundaries, error paths, state transitions)
3. Write concise tests — aim for ~5-15 tests per file, never pad with filler
4. Run `npm run test -- --project=unit --run` from the `Client/` directory to verify they pass
