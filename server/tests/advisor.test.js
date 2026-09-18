import { test, describe } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../server.js";

describe("AI Legal Advisor & Lawyer Prep-Kit API", () => {
  test("POST /api/advisor/chat returns structured guidance and legal suggestions", async () => {
    const res = await request(app)
      .post("/api/advisor/chat")
      .send({
        message: "Can my landlord enter my apartment without prior 24-hour notice?",
        conversationHistory: []
      });

    assert.strictEqual(res.status, 200);
    assert.ok(res.body.reply);
    assert.ok(Array.isArray(res.body.suggestedNextSteps));
    assert.ok(Array.isArray(res.body.questionsForAttorney));
    assert.ok(res.body.citedStatute);
  });

  test("POST /api/advisor/chat with empty message returns 400 error", async () => {
    const res = await request(app)
      .post("/api/advisor/chat")
      .send({ message: "" });

    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.error, "Message is required.");
  });

  test("POST /api/advisor/generate-prep-kit creates actionable legal briefing dossier", async () => {
    const caseData = {
      clientName: "Jane Doe",
      issueType: "Tenant Rights & Unlawful Eviction",
      description: "Landlord changed locks without court order after withholding security deposit.",
      urgency: "High"
    };

    const res = await request(app)
      .post("/api/advisor/generate-prep-kit")
      .send(caseData);

    assert.strictEqual(res.status, 200);
    assert.ok(res.body.dossierId);
    assert.ok(res.body.caseSummary);
    assert.ok(Array.isArray(res.body.questionsForAttorney));
    assert.ok(Array.isArray(res.body.evidenceChecklist));
    assert.ok(Array.isArray(res.body.timelineOfEvents));
  });

  test("GET /api/vault and POST /api/vault/save persist items correctly", async () => {
    const saveRes = await request(app)
      .post("/api/vault/save")
      .send({
        type: "Test Record",
        title: "Test Dossier Record",
        data: { test: true }
      });

    assert.strictEqual(saveRes.status, 201);
    assert.strictEqual(saveRes.body.title, "Test Dossier Record");

    const vaultRes = await request(app).get("/api/vault");
    assert.strictEqual(vaultRes.status, 200);
    assert.ok(vaultRes.body.total >= 1);
    assert.ok(vaultRes.body.items.some(i => i.title === "Test Dossier Record"));
  });
});
