import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../app.js";

/**
 * The CSP is the one piece of config that fails silently: a missing origin
 * does not throw, it just makes the browser refuse the resource. That is how
 * cover art, webfonts and the trailer player each broke in production without
 * a single server error.
 *
 * Every origin the client is known to need is asserted here, with the feature
 * it belongs to, so dropping one fails the build instead of the page.
 */
const REQUIRED = [
  ["script-src", "https://www.youtube.com", "react-player injects youtube.com/iframe_api"],
  ["script-src", "https://accounts.google.com", "Google Identity Services"],
  ["frame-src", "https://www.youtube.com", "trailer embed on card hover"],
  ["frame-src", "https://accounts.google.com", "Google Sign-In button"],
  ["img-src", "https://media.kitsu.app", "anime cover art"],
  ["img-src", "https://raw.githubusercontent.com", "PokeAPI sprites on the profile page"],
  ["style-src", "https://fonts.googleapis.com", "Outfit / Noto Sans JP stylesheet"],
  ["font-src", "https://fonts.gstatic.com", "the webfont files themselves"],
  ["connect-src", "https://kitsu.io", "anime metadata API"],
  ["connect-src", "https://pokeapi.co", "random Pokémon on the profile page"],
] as const;

let header = "";

beforeAll(async () => {
  // /health is registered ahead of the security middleware, so ask for a path
  // that goes through helmet. The response body does not matter — the client
  // build it would serve is not present when the server tests run.
  const res = await request(app).get("/");
  header = (res.headers["content-security-policy"] as string) ?? "";
});

/** Pull one directive's source list out of the header. */
const directive = (name: string): string => {
  const found = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part === name || part.startsWith(`${name} `));
  return found ?? "";
};

describe("content security policy", () => {
  it("is set on responses that pass through the security middleware", () => {
    expect(header).not.toBe("");
    expect(directive("default-src")).toContain("'self'");
  });

  it.each(REQUIRED)("allows %s %s — %s", (name, origin) => {
    expect(directive(name)).toContain(origin);
  });

  it("no longer allows media.kitsu.io, which Kitsu retired", () => {
    expect(directive("img-src")).not.toContain("https://media.kitsu.io");
  });
});
