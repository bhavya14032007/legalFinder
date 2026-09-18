/**
 * Master Automated Test Runner for LegalFinder AI
 * Executes all integration, security, efficiency, and unit test suites
 */
process.env.NODE_ENV = "test";

import { run } from "node:test";
import { spec as SpecReporter } from "node:test/reporters";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const testFiles = [
  path.join(__dirname, "server.test.js"),
  path.join(__dirname, "search.test.js"),
  path.join(__dirname, "documents.test.js"),
  path.join(__dirname, "advisor.test.js"),
  path.join(__dirname, "security.test.js"),
  path.join(__dirname, "credibility.test.js")
];

console.log("\n=======================================================");
console.log("  Running LegalFinder Automated Test Suites...");
console.log("=======================================================\n");

run({ files: testFiles })
  .compose(new SpecReporter())
  .pipe(process.stdout);
