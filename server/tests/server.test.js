import { test, describe } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../server.js";

describe("Server Core & Security Headers API", () => {
  test("GET /api/health returns 200 with healthy status and no leaked secrets", async () => {
    const res = await request(app).get("/api/health");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, "healthy");
    assert.strictEqual(res.body.securityHardened, true);
    assert.strictEqual(res.body.compressionEnabled, true);
    assert.strictEqual(res.body.geminiKeyPreview, undefined, "Secret key preview must not be exposed");
    assert.ok(res.body.timestamp);
    assert.ok(res.body.cacheStats);
  });

  test("Security headers and telemetry are properly attached", async () => {
    const res = await request(app).get("/api/health");
    assert.ok(res.headers["content-security-policy"], "CSP header should be present");
    assert.strictEqual(res.headers["x-content-type-options"], "nosniff");
    assert.ok(res.headers["x-response-time"], "X-Response-Time header should be present");
  });

  test("GET non-existent route returns 404 JSON error", async () => {
    const res = await request(app).get("/api/non-existent-endpoint-1234");
    assert.strictEqual(res.status, 404);
    assert.ok(res.body.error);
  });
});
