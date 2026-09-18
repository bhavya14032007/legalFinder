import { test, describe } from "node:test";
import assert from "node:assert";

describe("Client API Client & Utility Suite", () => {
  test("API connector module exports expected client methods", async () => {
    // Dynamic import to simulate client environment
    const { api } = await import("./api.js");
    assert.strictEqual(typeof api.checkHealth, "function");
    assert.strictEqual(typeof api.searchLegal, "function");
    assert.strictEqual(typeof api.simplifyDocument, "function");
    assert.strictEqual(typeof api.compareDocuments, "function");
    assert.strictEqual(typeof api.getPresets, "function");
    assert.strictEqual(typeof api.chatAdvisor, "function");
    assert.strictEqual(typeof api.generatePrepKit, "function");
    assert.strictEqual(typeof api.getVault, "function");
    assert.strictEqual(typeof api.saveToVault, "function");
  });

  test("Health check gracefully returns offline object on network error", async () => {
    const { api } = await import("./api.js");
    // Should resolve safely without throwing uncaught exceptions
    const health = await api.checkHealth();
    assert.ok(health.status);
  });
});
