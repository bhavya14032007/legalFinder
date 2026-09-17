import React, { useState, useEffect } from "react";
import { GitCompare, ArrowRight, ShieldAlert, Sparkles, Check, Bookmark, RefreshCw } from "lucide-react";
import { api } from "../utils/api.js";

export default function DocumentComparator({ onSaveToVault, onAskAdvisor }) {
  const [docA, setDocA] = useState("");
  const [docB, setDocB] = useState("");
  const [titleA, setTitleA] = useState("Standard Mutual NDA");
  const [titleB, setTitleB] = useState("Vendor Proposed NDA (One-Sided)");
  const [loading, setLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);

  useEffect(() => {
    // Load default comparison sample
    setDocA(`1. DEFINITION OF CONFIDENTIAL INFORMATION.
"Confidential Information" means any proprietary data, technical specifications, or business plans disclosed mutually by either party.

2. OBLIGATIONS.
Each party agrees to hold the other's confidential data in confidence and not disclose to third parties for 3 years.

3. INDEMNIFICATION.
Each party shall mutually indemnify the other up to total fees paid under this agreement.`);

    setDocB(`1. DEFINITION OF CONFIDENTIAL INFORMATION.
"Confidential Information" means only disclosures made by Vendor to Client. All feedback and ideas from Client belong to Vendor.

2. OBLIGATIONS.
Client agrees to hold Vendor's data in confidence indefinitely. Vendor has no reciprocal duty of confidentiality.

3. INDEMNIFICATION.
Client agrees to provide unlimited defense and indemnification to Vendor for any claims, with no dollar cap.`);
  }, []);

  const handleCompare = async () => {
    if (!docA.trim() || !docB.trim()) return;
    setLoading(true);
    try {
      const result = await api.compareDocuments(docA, docB, titleA, titleB);
      setComparisonResult(result);
    } catch (err) {
      console.error("Comparison error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="comparator-heading" style={{ padding: "var(--space-6) 0" }}>
      {/* Section Header */}
      <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto var(--space-4) auto" }}>
        <div className="badge badge-info" style={{ marginBottom: "var(--space-2)" }}>
          <Sparkles size={14} /> Side-by-Side Clause & Risk Diff
        </div>
        <h1 id="comparator-heading" style={{ marginBottom: "var(--space-2)" }}>
          Smart Contract <span className="gradient-text">Comparator</span>
        </h1>
        <p style={{ fontSize: "1.15rem" }}>
          Compare two agreements or revisions side-by-side. Instantly detect one-sided modifications, risk escalations, and omitted legal protections.
        </p>
      </div>

      {/* Inputs for Doc A and Doc B */}
      <div className="grid grid-cols-2 gap-3" style={{ maxWidth: "1100px", margin: "0 auto var(--space-3) auto" }}>
        {/* Document A */}
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-1)" }}>
            <span className="badge badge-success">Document A (Baseline / Original)</span>
          </div>
          <input
            type="text"
            className="input-field"
            value={titleA}
            onChange={(e) => setTitleA(e.target.value)}
            style={{ marginBottom: "var(--space-1)", fontWeight: 600 }}
          />
          <textarea
            className="textarea-field"
            value={docA}
            onChange={(e) => setDocA(e.target.value)}
            placeholder="Paste original contract here..."
            style={{ minHeight: "180px", fontFamily: "var(--font-mono)", fontSize: "0.88rem" }}
          />
        </div>

        {/* Document B */}
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-1)" }}>
            <span className="badge badge-warning">Document B (Proposed / Counterparty)</span>
          </div>
          <input
            type="text"
            className="input-field"
            value={titleB}
            onChange={(e) => setTitleB(e.target.value)}
            style={{ marginBottom: "var(--space-1)", fontWeight: 600 }}
          />
          <textarea
            className="textarea-field"
            value={docB}
            onChange={(e) => setDocB(e.target.value)}
            placeholder="Paste proposed or modified contract here..."
            style={{ minHeight: "180px", fontFamily: "var(--font-mono)", fontSize: "0.88rem" }}
          />
        </div>
      </div>

      {/* Compare Action Button */}
      <div style={{ textAlign: "center", marginBottom: "var(--space-4)" }}>
        <button
          type="button"
          onClick={handleCompare}
          disabled={loading || !docA.trim() || !docB.trim()}
          className="btn btn-primary"
          style={{ padding: "12px 36px", fontSize: "1.05rem" }}
        >
          {loading ? (
            <span>Analyzing Variances...</span>
          ) : (
            <>
              <GitCompare size={20} />
              <span>Run Comparison Analysis</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>

      {/* Comparison Results */}
      {comparisonResult && (
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          
          {/* Executive Comparison Metric Banner */}
          <div className="glass-card" style={{ marginBottom: "var(--space-4)", background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.05) 100%)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Comparison Summary</div>
                <h3 style={{ fontSize: "1.25rem", margin: "4px 0" }}>{comparisonResult.summary}</h3>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <div style={{ textAlign: "center", background: "var(--bg-secondary)", padding: "8px 16px", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Doc A Risk</div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--success)" }}>
                    {comparisonResult.documentA.riskScore}/100
                  </div>
                </div>

                <div style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>➔</div>

                <div style={{ textAlign: "center", background: "var(--bg-secondary)", padding: "8px 16px", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Doc B Risk</div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--danger)" }}>
                    {comparisonResult.documentB.riskScore}/100
                  </div>
                </div>

                <div className={`badge badge-${comparisonResult.riskDelta.badge}`} style={{ padding: "8px 14px", fontSize: "0.85rem" }}>
                  {comparisonResult.riskDelta.trend} ({comparisonResult.riskDelta.value > 0 ? `+${comparisonResult.riskDelta.value}` : comparisonResult.riskDelta.value} pts)
                </div>
              </div>
            </div>
          </div>

          {/* Clause Diff Grid */}
          <div style={{ marginBottom: "var(--space-2)" }}>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "var(--space-2)" }}>Clause-by-Clause Difference Breakdown</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {comparisonResult.differences.map((diff, index) => (
              <article key={index} className="glass-card">
                
                {/* Header with Change Tag */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)", flexWrap: "wrap", gap: "8px" }}>
                  <h3 style={{ fontSize: "1.1rem", margin: 0 }}>
                    Clause #{diff.clauseNumber}: {diff.titleA !== "— None —" ? diff.titleA : diff.titleB}
                  </h3>
                  <span className={`badge badge-${diff.changeType.includes("Shift") || diff.changeType.includes("Added") ? "warning" : "info"}`}>
                    {diff.changeType}
                  </span>
                </div>

                {/* Side-by-side comparison boxes */}
                <div className="grid grid-cols-2 gap-2" style={{ marginBottom: "var(--space-2)" }}>
                  {/* Doc A Text */}
                  <div style={{ background: "var(--bg-secondary)", padding: "var(--space-2)", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--success)" }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--success)", fontWeight: 700, marginBottom: "4px" }}>
                      DOCUMENT A ({diff.riskA} Risk)
                    </div>
                    <p style={{ fontSize: "0.88rem", margin: 0, color: "var(--text-primary)" }}>
                      {diff.plainA || diff.textA || "Not present in Document A"}
                    </p>
                  </div>

                  {/* Doc B Text */}
                  <div style={{ background: "var(--bg-secondary)", padding: "var(--space-2)", borderRadius: "var(--radius-md)", borderLeft: `3px solid ${diff.riskB === "High" ? "var(--danger)" : "var(--warning)"}` }}>
                    <div style={{ fontSize: "0.8rem", color: diff.riskB === "High" ? "var(--danger)" : "var(--warning)", fontWeight: 700, marginBottom: "4px" }}>
                      DOCUMENT B ({diff.riskB} Risk)
                    </div>
                    <p style={{ fontSize: "0.88rem", margin: 0, color: "var(--text-primary)" }}>
                      {diff.plainB || diff.textB || "Not present in Document B"}
                    </p>
                  </div>
                </div>

                {/* Analysis Note */}
                <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", background: "var(--bg-tertiary)", padding: "8px 12px", borderRadius: "var(--radius-sm)" }}>
                  🔍 <strong>Impact Analysis:</strong> {diff.comparisonNote}
                </div>

              </article>
            ))}
          </div>

          {/* Action Bar */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "var(--space-4)" }}>
            <button
              type="button"
              onClick={() => onSaveToVault("Contract Comparison", `${titleA} vs ${titleB}`, comparisonResult)}
              className="btn btn-secondary"
            >
              <Bookmark size={16} />
              <span>Save Comparison to Vault</span>
            </button>
            <button
              type="button"
              onClick={() => onAskAdvisor(`I compared "${titleA}" against "${titleB}". Document B increased risk by ${comparisonResult.riskDelta.value} points. How should I counter-propose?`)}
              className="btn btn-primary"
            >
              <span>Consult Advisor on Counter-Terms</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}
    </section>
  );
}
