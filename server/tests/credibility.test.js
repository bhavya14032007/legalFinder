import { test, describe } from "node:test";
import assert from "node:assert";
import { CredibilityService } from "../services/credibilityService.js";

describe("Credibility & Risk Formula Unit Tests", () => {
  test("Official Supreme Court / Tier 1 statutory sources receive high credibility score >= 90", () => {
    const doc = {
      sourceType: "Official Statutory Code",
      authorityLevel: "High Court",
      officialCitation: "42 U.S.C. § 1983",
      landmarkCases: ["Monell v. Department of Social Services"],
      url: "https://www.law.cornell.edu/uscode/text/42/1983"
    };

    const evaluation = CredibilityService.evaluateSource(doc);
    assert.ok(evaluation.score >= 90, `Score was ${evaluation.score}, expected >= 90`);
    assert.strictEqual(evaluation.badgeColor, "success");
    assert.ok(evaluation.tier.includes("Tier 1"));
  });

  test("Credibility breakdown accurately provides tier and factor checks", () => {
    const evaluation = CredibilityService.evaluateSource({
      sourceType: "Statutory Model Code",
      authorityLevel: "Statute",
      officialCitation: "U.C.C. § 2-302",
      landmarkCases: ["Williams v. Walker-Thomas Furniture Co."],
      url: "https://www.law.cornell.edu/ucc/2/2-302"
    });

    assert.ok(evaluation.score !== undefined);
    assert.ok(evaluation.tier);
    assert.ok(Array.isArray(evaluation.checks));
    assert.ok(evaluation.checks.length >= 3);
  });
});
