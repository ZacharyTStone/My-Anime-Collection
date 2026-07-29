import { describe, it, expect } from "vitest";
import express, { Request, Response } from "express";
import request from "supertest";
import errorHandlerMiddleware from "../middleware/error-handler.js";
import { NotFoundError } from "../errors/index.js";

// A minimal app exercising the real error handler with controlled failures.
const buildApp = () => {
  const app = express();
  app.get("/boom", () => {
    throw new Error("something exploded");
  });
  app.get("/missing", () => {
    throw new NotFoundError("resource does not exist");
  });
  app.get("/ok", (_req: Request, res: Response) => {
    res.status(200).json({ ok: true });
  });
  app.use(errorHandlerMiddleware);
  return app;
};

const app = buildApp();

describe("error-handler middleware", () => {
  it("maps an unknown thrown error to the 500 shape", async () => {
    const res = await request(app).get("/boom");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ msg: "something exploded" });
    // No stack trace leaks to the client
    expect(res.body.stack).toBeUndefined();
  });

  it("maps NotFoundError to 404", async () => {
    const res = await request(app).get("/missing");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ msg: "resource does not exist" });
  });

  it("leaves successful requests alone", async () => {
    const res = await request(app).get("/ok");
    expect(res.status).toBe(200);
  });
});
