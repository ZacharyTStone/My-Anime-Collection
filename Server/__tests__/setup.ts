import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { afterAll, afterEach, beforeAll } from "vitest";

// Transactions require a replica set — a standalone mongod is not enough.
// Started at module top level (before any test file — and therefore any app
// code — is imported) so process.env is populated before config/env.ts runs.
const replSet = await MongoMemoryReplSet.create({
  replSet: { count: 1, storageEngine: "wiredTiger" },
});

process.env.NODE_ENV = "test";
process.env.PORT = "5100";
process.env.MONGO_URL = replSet.getUri();
process.env.JWT_SECRET = "test-secret";
// NODE_ENV=test is neither "development" nor production-with-FRONTEND_URL,
// so the CORS allowlist needs this to be set.
process.env.FRONTEND_URL = "http://localhost:3000";
// Enables the Google SSO route; google-auth-library is mocked in tests.
process.env.GOOGLE_CLIENT_ID = "test-google-client-id";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!);
});

afterEach(async () => {
  const db = mongoose.connection.db;
  if (!db) return;
  const collections = await db.collections();
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  await mongoose.disconnect();
  await replSet.stop();
});
