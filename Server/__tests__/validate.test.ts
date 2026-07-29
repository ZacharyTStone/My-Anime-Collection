import { describe, it, expect } from "vitest";
import express, { Request, Response } from "express";
import request from "supertest";
import { validate, validateQuery } from "../middleware/validate.js";
import errorHandlerMiddleware from "../middleware/error-handler.js";
import { getAnimesQuerySchema, loginSchema } from "../utils/schemas.js";

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.post("/body", validate(loginSchema), (_req: Request, res: Response) => {
    res.status(200).json({ ok: true });
  });
  app.get("/query", validateQuery(getAnimesQuerySchema), (_req: Request, res: Response) => {
    res.status(200).json(res.locals.query);
  });
  app.use(errorHandlerMiddleware);
  return app;
};

const app = buildApp();

describe("validate middleware", () => {
  it("passes valid body input through to the handler", async () => {
    const res = await request(app)
      .post("/body")
      .send({ email: "valid@example.com", password: "secret123" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("rejects an invalid body with 400 and a readable message", async () => {
    const res = await request(app).post("/body").send({ email: "not-an-email" });

    expect(res.status).toBe(400);
    expect(res.body.msg).toMatch(/email/i);
  });
});

describe("validateQuery middleware", () => {
  it("passes valid input and coerces page/limit defaults", async () => {
    const res = await request(app).get("/query").query({ currentPlaylistID: "0" });

    expect(res.status).toBe(200);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(10);
  });

  it("coerces numeric strings for page and limit", async () => {
    const res = await request(app)
      .get("/query")
      .query({ currentPlaylistID: "0", page: "3", limit: "25" });

    expect(res.status).toBe(200);
    expect(res.body.page).toBe(3);
    expect(res.body.limit).toBe(25);
  });

  it("rejects a sort value outside the enum with 400", async () => {
    const res = await request(app).get("/query").query({ currentPlaylistID: "0", sort: "bogus" });

    expect(res.status).toBe(400);
  });

  it("rejects a missing currentPlaylistID with 400", async () => {
    const res = await request(app).get("/query").query({ page: "1" });

    expect(res.status).toBe(400);
  });

  it("rejects a non-numeric page with 400 (no silent clamping)", async () => {
    const res = await request(app).get("/query").query({ currentPlaylistID: "0", page: "abc" });

    expect(res.status).toBe(400);
  });

  it("rejects a limit over 100 with 400 (no silent clamping)", async () => {
    const res = await request(app).get("/query").query({ currentPlaylistID: "0", limit: "101" });

    expect(res.status).toBe(400);
  });
});
