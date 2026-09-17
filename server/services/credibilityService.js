/**
 * Credibility Evaluation Engine for Legal Documents & Case Laws
 * Evaluates sources based on authority tiers, statutory verification, and citation strength.
 */

export class CredibilityService {
  /**
   * Evaluates the legal reliability & credibility score of a legal text or source
   */
  static evaluateSource(source) {
    let score = 70;
    const checks = [];

    // Check 1: Official government / statutory source
    const isOfficialGov = /official|statute|code|court|usc|cfr|act|gazette|judiciary/i.test(
      source.sourceType || source.authorityLevel || ""
    );
    if (isOfficialGov) {
      score += 15;
      checks.push({
        name: "Official Statutory / Judicial Origin",
        passed: true,
        weight: "+15%",
        details: "Originates from recognized statutory code, official gazette, or court record."
      });
    } else {
      checks.push({
        name: "Official Statutory / Judicial Origin",
        passed: false,
        weight: "0%",
        details: "Secondary commentary or unverified user submission."
      });
    }

    // Check 2: Verifiable Citation Format
    const hasFormalCitation = /§|\d+\s+[A-Za-z\.]+\s+\d+|U\.S\.C\.|C\.F\.R\.|v\.\s+|F\.\s*Supp|Cal\.|N\.Y\.|Act\s+of/i.test(
      source.officialCitation || source.citation || source.statuteAct || ""
    );
    if (hasFormalCitation) {
      score += 10;
      checks.push({
        name: "Formal Citation Indexing",
        passed: true,
        weight: "+10%",
        details: "Follows standard legal Bluebook or statutory codification schema."
      });
    } else {
      checks.push({
        name: "Formal Citation Indexing",
        passed: false,
        weight: "0%",
        details: "No direct Bluebook or section citation found."
      });
    }

    // Check 3: Landmark Judicial Precedent Cross-Reference
    if (source.landmarkCases && source.landmarkCases.length > 0) {
      score += 5;
      checks.push({
        name: "Precedent Corroboration",
        passed: true,
        weight: "+5%",
        details: `Corroborated by ${source.landmarkCases.length} landmark appellate / supreme court rulings.`
      });
    } else {
      checks.push({
        name: "Precedent Corroboration",
        passed: false,
        weight: "0%",
        details: "No direct binding precedent listed in primary registry."
      });
    }

    // Check 4: Verifiable Direct Source Link
    if (source.url && source.url.startsWith("http")) {
      checks.push({
        name: "Primary Source Accessibility",
        passed: true,
        weight: "+0% (Verified)",
        details: `Public archive link available at ${new URL(source.url).hostname}`
      });
    }

    // Normalize final score within 50 to 99 range
    score = Math.min(Math.max(source.credibilityScore || score, 50), 99);

    let tier = "Tier 3: Secondary Analysis / Editorial";
    let badgeColor = "warning";
    let trustLabel = "Moderate Trust";

    if (score >= 90) {
      tier = "Tier 1: Binding Judicial / Statutory Code";
      badgeColor = "success";
      trustLabel = "High Authority Verified";
    } else if (score >= 75) {
      tier = "Tier 2: Regulatory Guidance & Bar Publication";
      badgeColor = "info";
      trustLabel = "Verified Legal Resource";
    }

    return {
      score,
      tier,
      badgeColor,
      trustLabel,
      checks,
      evaluatedAt: new Date().toISOString()
    };
  }
}
