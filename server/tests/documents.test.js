import { test, describe } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../server.js";

describe("Document Simplifier & Comparator API", () => {
  test("GET /api/documents/presets returns contract templates object", async () => {
    const res = await request(app).get("/api/documents/presets");
    assert.strictEqual(res.status, 200);
    assert.ok(typeof res.body === "object");
    assert.ok(res.body.lease || res.body.residentialLease);
    assert.ok(res.body.employment);
    assert.ok(res.body.freelance);
  });

  test("POST /api/documents/simplify with empty text returns 400 error", async () => {
    const res = await request(app)
      .post("/api/documents/simplify")
      .send({ documentText: "" });

    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.error, "Document content is required.");
  });

  test("POST /api/documents/simplify with valid contract text returns risk metrics and clause analysis", async () => {
    const sampleContract = `
      1. INDEMNIFICATION AND HOLD HARMLESS.
      The Tenant shall indemnify and hold harmless the Landlord from any and all damages, liabilities, and costs whatsoever.

      2. TERMINATION.
      The Landlord may terminate this lease agreement at any time with 24 hours notice without cause.
    `;

    const res = await request(app)
      .post("/api/documents/simplify")
      .send({ documentText: sampleContract, title: "Standard Residential Lease" });

    assert.strictEqual(res.status, 200);
    assert.ok(res.body.riskScore !== undefined);
    assert.ok(Array.isArray(res.body.clauses));
    assert.ok(res.body.clauses.length > 0);
    assert.ok(Array.isArray(res.body.userRights));
  });

  test("POST /api/documents/compare requires both docA and docB", async () => {
    const res = await request(app)
      .post("/api/documents/compare")
      .send({ docA: "Some text" });

    assert.strictEqual(res.status, 400);
    assert.ok(res.body.error);
  });

  test("POST /api/documents/compare with valid docA and docB returns risk delta and differences", async () => {
    const docA = "1. INDEMNITY. Mutual indemnification between parties. 30 days notice for termination.";
    const docB = "1. UNILATERAL INDEMNITY. Tenant indemnifies landlord unconditionally. Landlord may terminate in 24 hours.";

    const res = await request(app)
      .post("/api/documents/compare")
      .send({ docA, docB, titleA: "Version 1", titleB: "Version 2" });

    assert.strictEqual(res.status, 200);
    assert.ok(res.body.documentA);
    assert.ok(res.body.documentB);
    assert.ok(res.body.riskDelta !== undefined);
    assert.ok(res.body.summary);
  });
});
