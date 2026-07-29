import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "../app.js";
import { registerUser } from "./helpers.js";

vi.mock("google-auth-library", () => ({
  OAuth2Client: class {
    async verifyIdToken() {
      return {
        getPayload: () => ({
          email: "googleuser@example.com",
          email_verified: true,
          sub: "google-subject-123",
          name: "Google User",
        }),
      };
    }
  },
}));

const TEST_EMAIL = "authflow@example.com";
const TEST_PASSWORD = "secret123";

describe("auth flow", () => {
  it("registers a user and returns a token + default playlists", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "authflow",
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(TEST_EMAIL);

    const playlistsRes = await request(app)
      .get("/api/v1/playlists")
      .set("Authorization", `Bearer ${res.body.token}`);
    expect(playlistsRes.status).toBe(200);
    expect(playlistsRes.body.playlists).toHaveLength(3);
  });

  it("logs in with correct credentials and the token authenticates requests", async () => {
    await registerUser({ email: TEST_EMAIL });

    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.token).toBeDefined();

    const authedRes = await request(app)
      .get("/api/v1/playlists")
      .set("Authorization", `Bearer ${loginRes.body.token}`);
    expect(authedRes.status).toBe(200);
  });

  it("rejects a wrong password with 401", async () => {
    await registerUser({ email: TEST_EMAIL });

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: TEST_EMAIL, password: "wrong-password" });

    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Invalid Credentials");
  });

  it("rejects a duplicate email with 400", async () => {
    await registerUser({ email: TEST_EMAIL });

    const res = await request(app).post("/api/v1/auth/register").send({
      name: "someoneelse",
      email: TEST_EMAIL,
      password: "anotherpass",
    });

    expect(res.status).toBe(400);
    expect(res.body.msg).toMatch(/email already in use/i);
  });

  it("rejects missing registration fields with 400", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "incomplete@example.com" });

    expect(res.status).toBe(400);
  });

  it("rejects an invalid login payload with 400", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "not-an-email", password: "" });

    expect(res.status).toBe(400);
  });

  it("rejects unauthenticated requests with 401", async () => {
    const res = await request(app).get("/api/v1/playlists");
    expect(res.status).toBe(401);
  });

  it("signs in via Google SSO (verifyIdToken mocked)", async () => {
    const res = await request(app)
      .post("/api/v1/auth/google")
      .send({ credential: "fake-credential" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe("googleuser@example.com");
    expect(res.body.user.password).toBeUndefined();
  });
});
