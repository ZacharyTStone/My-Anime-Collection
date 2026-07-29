import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import User from "../models/User.js";

let counter = 0;

/** Register a fresh user via the API and return the supertest response. */
export const registerUser = async (overrides: Record<string, unknown> = {}) => {
  counter += 1;
  const email = `user${counter}-${Date.now()}@example.com`;
  const res = await request(app)
    .post("/api/v1/auth/register")
    .send({ name: `user${counter}`, email, password: "secret123", ...overrides });
  return res;
};

/** Register a fresh user and return its auth token. */
export const registerAndGetToken = async (): Promise<string> => {
  const res = await registerUser();
  if (res.status !== 201) {
    throw new Error(`Failed to register test user: ${JSON.stringify(res.body)}`);
  }
  return res.body.token as string;
};

/** Register a fresh user and return its auth token + Mongo _id. */
export const registerAndGetAuth = async (): Promise<{
  token: string;
  userId: mongoose.Types.ObjectId;
}> => {
  const res = await registerUser();
  if (res.status !== 201) {
    throw new Error(`Failed to register test user: ${JSON.stringify(res.body)}`);
  }
  const user = await User.findOne({ email: res.body.user.email });
  if (!user) throw new Error("Registered user not found in database");
  return { token: res.body.token as string, userId: user._id as mongoose.Types.ObjectId };
};
