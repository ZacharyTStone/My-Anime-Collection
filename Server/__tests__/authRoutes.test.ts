import request from "supertest";
import app from "../server"; // Assuming your Express app is exported from server.ts
import mongoose from "mongoose";
import User from "../models/User";

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect from the test database
  await mongoose.disconnect();
});

describe("Auth Routes", () => {
  let token: string;

  it("should register a new user", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      theme: "light",
      language: "en",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should update the user", async () => {
    const res = await request(app)
      .patch("/api/v1/auth/updateUser")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "updateduser@example.com",
        name: "Updated User",
        theme: "dark",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toHaveProperty("email", "updateduser@example.com");
  });

  it("should delete the user", async () => {
    const res = await request(app)
      .delete("/api/v1/auth/deleteUser")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User deleted");
  });
});
