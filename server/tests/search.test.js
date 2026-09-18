import { test, describe } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../server.js";

describe("Search & Credibility API", () => {
  test("GET /api/statutes returns 200 and verified legal statutes array", async () => {
    const res = await request(app).get("/api/statutes");
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.total > 0);
    assert.ok(Array.isArray(res.body.statutes));
    assert.ok(res.body.statutes[0].title);
    assert.ok(res.body.statutes[0].credibilityScore >= 50);
  });

  test("POST /api/search/legal-docs with valid query returns structured search results with credibility breakdown", async () => {
    const res = await request(app)
      .post("/api/search/legal-docs")
      .send({ query: "residential tenant security deposit refund", jurisdiction: "California" });

    assert.strictEqual(res.status, 200);
    assert.ok(res.body.overview);
    assert.ok(Array.isArray(res.body.results));
    assert.ok(res.body.results.length > 0);
    assert.ok(res.body.results[0].credibility !== undefined);
  });

  test("POST /api/search/legal-docs with empty query returns 400 error", async () => {
    const res = await request(app)
      .post("/api/search/legal-docs")
      .send({ query: "" });

    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.error, "Search query is required.");
  });

  test("Repeated search query hits cache with X-Cache-Status: HIT", async () => {
    await request(app)
      .post("/api/search/legal-docs")
      .send({ query: "employment non compete restrictive covenant", jurisdiction: "General" });

    const secondRes = await request(app)
      .post("/api/search/legal-docs")
      .send({ query: "employment non compete restrictive covenant", jurisdiction: "General" });

    assert.strictEqual(secondRes.status, 200);
    assert.strictEqual(secondRes.headers["x-cache-status"], "HIT");
  });
});
