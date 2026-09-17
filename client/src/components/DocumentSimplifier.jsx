import React, { useState, useEffect } from "react";
import { FileText, AlertOctagon, CheckCircle2, ShieldAlert, Sparkles, Upload, ArrowRight, Bookmark, Download, Copy, RefreshCw } from "lucide-react";
import { api } from "../utils/api.js";

export default function DocumentSimplifier({ onSaveToVault, onAskAdvisor }) {
  const [docText, setDocText] = useState("");
  const [docTitle, setDocTitle] = useState("Lease Agreement Analysis");
  const [presets, setPresets] = useState({});
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [filterRisk, setFilterRisk] = useState("All");

  useEffect(() => {
    // Load presets
    const fetchPresets = async () => {
      const data = await api.getPresets();
      setPresets(data);
      // Preload lease as default
      if (data.lease) {
        setDocText(data.lease.sampleText);
        setDocTitle(data.lease.title);
      }
    };
    fetchPresets();
  }, []);

  const handleSelectPreset = (key) => {
    if (presets[key]) {
      setDocText(presets[key].sampleText);
      setDocTitle(presets[key].title);
      setAnalysis(null);
    }
  };

  const handleSimplify = async () => {
    if (!docText || docText.trim().length === 0) return;
    setLoading(true);
    try {
      const result = await api.simplifyDocument(docText, docTitle);
      setAnalysis(result);
    } catch (err) {
      console.error("Simplifier error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocTitle(file.name.replace(/\.[^/.]+$/, ""));
      const reader = new FileReader();
      reader.onload = (event) => {
        setDocText(event.target.result);
        setAnalysis(null);
      };
      reader.readAsText(file);
    }
  };

  const filteredClauses = analysis?.clauses.filter((c) => {
    if (filterRisk === "All") return true;
    return c.risk.toLowerCase() === filterRisk.toLowerCase();
  });

  return (
    <section aria-labelledby="simplifier-heading" style={{ padding: "var(--space-6) 0" }}>
      {/* Section Header */}
      <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto var(--space-4) auto" }}>
        <div className="badge badge-warning" style={{ marginBottom: "var(--space-2)" }}>
          <Sparkles size={14} /> AI Plain-English Contract Deconstruction
        </div>
        <h1 id="simplifier-heading" style={{ marginBottom: "var(--space-2)" }}>
          Document & Contract <span className="gradient-text">Simplifier</span>
        </h1>
        <p style={{ fontSize: "1.15rem" }}>
          Transform complex legalese into clear, plain English. Uncover hidden liabilities, calculate overall risk scores, and review clause-by-clause negotiation redlines.
        </p>
      </div>

      {/* Input / Preset Section */}
      <div className="glass-card" style={{ maxWidth: "1000px", margin: "0 auto var(--space-4) auto" }}>
        {/* Preset Selector Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "var(--space-2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Sample Contracts:</span>
            {Object.keys(presets).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectPreset(key)}
                className="btn btn-sm btn-secondary"
                style={{ fontSize: "0.8rem", padding: "4px 10px", textTransform: "capitalize" }}
              >
                {key === "nda" ? "Mutual NDA" : key === "lease" ? "Apartment Lease" : key === "employment" ? "Executive Employment" : "Freelance MSA"}
              </button>
            ))}
          </div>

          {/* Upload Document Button */}
          <label className="btn btn-sm btn-secondary" style={{ cursor: "pointer" }}>
            <Upload size={14} />
            <span>Upload Document (.txt, .md)</span>
            <input type="file" accept=".txt,.md,.doc,.json" onChange={handleFileUpload} style={{ display: "none" }} />
          </label>
        </div>

        {/* Document Title & Input Textarea */}
        <div style={{ marginBottom: "var(--space-2)" }}>
          <input
            type="text"
            className="input-field"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            placeholder="Document Title (e.g. Residential Lease Agreement 2026)"
            style={{ marginBottom: "var(--space-1)", fontWeight: 600 }}
          />
          <textarea
            className="textarea-field"
            value={docText}
            onChange={(e) => setDocText(e.target.value)}
            placeholder="Paste contract or agreement text here..."
            style={{ minHeight: "220px", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}
          />
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={handleSimplify}
            disabled={loading || !docText.trim()}
            className="btn btn-primary"
            style={{ padding: "12px 28px", fontSize: "1rem" }}
          >
            {loading ? (
              <span>Analyzing Clauses & Risks...</span>
            ) : (
              <>
                <FileText size={18} />
                <span>Simplify & Analyze Risks</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results View */}
      {analysis && (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          
          {/* Risk Dashboard Overview */}
          <div className="grid grid-cols-3 gap-3" style={{ marginBottom: "var(--space-4)" }}>
            {/* Risk Meter Card */}
            <article className="glass-card" style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
                Document Risk Level
              </div>
              <div style={{ fontSize: "2.8rem", fontWeight: 800, color: analysis.riskScore > 60 ? "var(--danger)" : analysis.riskScore > 35 ? "var(--warning)" : "var(--success)" }}>
                {analysis.riskScore}<span style={{ fontSize: "1.2rem" }}>/100</span>
              </div>
              <div className={`badge badge-${analysis.riskColor}`} style={{ margin: "4px auto 0 auto" }}>
                {analysis.riskLevel}
              </div>
            </article>

            {/* Readability & Clauses */}
            <article className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px" }}>
                Scope & Readability
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                {analysis.totalClauses} Total Clauses
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 600 }}>
                {analysis.readabilityScore}
              </div>
            </article>

            {/* Red Flags Summary */}
            <article className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px" }}>
                Critical Red Flags
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: analysis.redFlags.length > 0 ? "var(--danger)" : "var(--success)" }}>
                {analysis.redFlags.length} Items Detected
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                {analysis.redFlags.length > 0 ? "Requires redlining before signing" : "No major traps found"}
              </div>
            </article>
          </div>

          {/* Executive Summary */}
          <article className="glass-card" style={{ marginBottom: "var(--space-4)", borderLeft: "4px solid var(--accent-primary)" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "var(--space-1)" }}>Executive Plain-English Summary</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>{analysis.executiveSummary}</p>
          </article>

          {/* Critical Red Flags Box */}
          {analysis.redFlags.length > 0 && (
            <article className="glass-card" style={{ marginBottom: "var(--space-4)", borderColor: "rgba(239, 68, 68, 0.4)", background: "rgba(239, 68, 68, 0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "var(--space-2)" }}>
                <ShieldAlert size={22} style={{ color: "var(--danger)" }} />
                <h3 style={{ fontSize: "1.2rem", color: "var(--danger)", margin: 0 }}>High Risk Clause Warnings & Redlines</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {analysis.redFlags.map((flag, idx) => (
                  <div key={idx} style={{ background: "var(--bg-secondary)", padding: "var(--space-2)", borderRadius: "var(--radius-md)" }}>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                      ⚠️ {flag.clauseTitle}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "var(--danger)", marginBottom: "6px" }}>
                      <strong>Risk:</strong> {flag.risk}
                    </div>
                    <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", background: "var(--bg-tertiary)", padding: "8px 12px", borderRadius: "var(--radius-sm)" }}>
                      <strong>💡 Recommended Negotiation Action:</strong> {flag.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Responsibilities & Rights Two-Column Matrix */}
          <div className="grid grid-cols-2 gap-3" style={{ marginBottom: "var(--space-4)" }}>
            {/* Obligations */}
            <article className="glass-card">
              <h4 style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--warning)", marginBottom: "var(--space-2)" }}>
                <AlertOctagon size={18} />
                <span>Your Key Legal Obligations</span>
              </h4>
              <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {analysis.userObligations.map((ob, i) => (
                  <li key={i} style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{ob}</li>
                ))}
              </ul>
            </article>

            {/* Rights */}
            <article className="glass-card">
              <h4 style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--success)", marginBottom: "var(--space-2)" }}>
                <CheckCircle2 size={18} />
                <span>Your Protected Rights</span>
              </h4>
              <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {analysis.userRights.map((rt, i) => (
                  <li key={i} style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{rt}</li>
                ))}
              </ul>
            </article>
          </div>

          {/* Clause-by-Clause Breakdown Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)", flexWrap: "wrap", gap: "10px" }}>
            <h2 style={{ fontSize: "1.4rem" }}>Clause-by-Clause Deconstruction</h2>
            
            {/* Filter buttons */}
            <div style={{ display: "flex", gap: "6px" }}>
              {["All", "High", "Medium", "Low"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFilterRisk(level)}
                  className={`btn btn-sm ${filterRisk === level ? "btn-primary" : "btn-secondary"}`}
                  style={{ fontSize: "0.78rem", padding: "4px 10px" }}
                >
                  {level} Risk
                </button>
              ))}
            </div>
          </div>

          {/* Clause Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {filteredClauses?.map((c) => (
              <article key={c.clauseNumber} className="glass-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-1)", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 800, color: "var(--text-muted)", fontSize: "0.9rem" }}>#{c.clauseNumber}</span>
                    <h3 style={{ fontSize: "1.15rem", margin: 0 }}>{c.title}</h3>
                  </div>
                  <span className={`badge badge-${c.risk === "High" ? "danger" : c.risk === "Medium" ? "warning" : "success"}`}>
                    {c.risk} Risk
                  </span>
                </div>

                {/* Plain English Translation */}
                <div style={{
                  background: "var(--bg-secondary)",
                  padding: "var(--space-2)",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "var(--space-2)",
                  borderLeft: `4px solid ${c.risk === "High" ? "var(--danger)" : "var(--accent-primary)"}`
                }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-primary)", marginBottom: "4px" }}>
                    PLAIN ENGLISH EXPLANATION:
                  </div>
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)" }}>{c.plainEnglish}</p>
                </div>

                {/* Original Clause Text (Collapsible style) */}
                <div style={{ marginBottom: "var(--space-2)" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>
                    Original Contract Verbiage:
                  </div>
                  <pre style={{
                    background: "var(--bg-tertiary)",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.82rem",
                    color: "var(--text-secondary)",
                    whiteSpace: "pre-wrap",
                    maxHeight: "120px",
                    overflowY: "auto"
                  }}>
                    {c.originalText}
                  </pre>
                </div>

                {/* Negotiation / Action Tip */}
                {c.risk !== "Low" && (
                  <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                    💡 <strong>Negotiation Action:</strong> {c.negotiationTip}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Action Bar */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "var(--space-4)" }}>
            <button
              type="button"
              onClick={() => onSaveToVault("Contract Simplification", docTitle, analysis)}
              className="btn btn-secondary"
            >
              <Bookmark size={16} />
              <span>Save Report to Vault</span>
            </button>
            <button
              type="button"
              onClick={() => onAskAdvisor(`I have analyzed this contract "${docTitle}" which has a risk score of ${analysis.riskScore}/100. How should I counter the high risk clauses?`)}
              className="btn btn-primary"
            >
              <span>Consult Advisor Regarding Clauses</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}
    </section>
  );
}
