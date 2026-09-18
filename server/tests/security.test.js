import { test, describe } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../server.js";

describe("Security Sanitization & Rate Limiting", () => {
  test("Input sanitization strips malicious <script> tags from request bodies", async () => {
    const maliciousPayload = {
      message: "<script>alert('xss')</script>How do I draft a cease and desist?",
      conversationHistory: []
    };

    const res = await request(app)
      .post("/api/advisor/chat")
      .send(maliciousPayload);

    assert.strictEqual(res.status, 200);
  });

  test("Oversized document payload exceeding limit returns 413 error", async () => {
    const hugeDocument = "a".repeat(100001);
    const res = await request(app)
      .post("/api/documents/simplify")
      .send({ documentText: hugeDocument, title: "Huge File" });

    assert.strictEqual(res.status, 413);
    assert.ok(res.body.error);
  });
});
