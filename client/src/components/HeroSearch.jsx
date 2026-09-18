import React, { useState } from "react";
import { Plus, ArrowUp, Sparkles, ShieldCheck, Bookmark, ArrowRight, ExternalLink, Scale, CheckCircle2, ToggleLeft, ToggleRight, FileUp } from "lucide-react";
import { api } from "../utils/api.js";

export default function HeroSearch({ onSaveToVault, onAskAdvisor, onNavigateSimplifier }) {
  const [query, setQuery] = useState("");
  const [deepPlanMode, setDeepPlanMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [savedAlert, setSavedAlert] = useState(false);

  const quickPills = [
    { label: "Tenant Deposit Dispute", query: "Can my landlord deduct paint wear and tear from security deposit?" },
    { label: "Non-Compete Enforceability", query: "Can my employer enforce a 2-year non-compete clause?" },
    { label: "Freelance IP Contract", query: "Freelancer copyright ownership and work made for hire" },
    { label: "SaaS Liability Cap", query: "Unilateral contract termination and unlimited indemnity in SaaS" },
    { label: "Consumer Warranty Claim", query: "Consumer defective product warranty refund under Magnuson-Moss" }
  ];

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery || searchQuery.trim() === "") return;
    setLoading(true);
    setSearchResults(null);
    try {
      const data = await api.searchLegal(searchQuery, "All");
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSaveResult = async (item) => {
    await onSaveToVault("Legal Search Result", item.title, item);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <section aria-labelledby="hero-title" style={{ padding: "var(--space-6) 0 var(--space-8) 0" }}>
      
      {/* Top Announcement Pill */}
      <div style={{ textAlign: "center", marginBottom: "var(--space-3)" }}>
        <div className="announcement-pill">
          <span className="badge-new">NEW</span>
          <span>GenAI Legal Credibility Engine & Document Simplifier</span>
        </div>
      </div>

      {/* Massive Bold Headline & Subtitle */}
      <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto var(--space-4) auto" }}>
        <h1 id="hero-title" style={{ marginBottom: "var(--space-2)" }}>
          Research with LegalFinder
        </h1>
        <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          LegalFinder turns complex legal statutes, contracts, and court cases into plain-English answers, verified citations, and actionable attorney preparation kits.
        </p>
      </div>

      {/* Central Input Prompt Card (Horizon Style) */}
      <div style={{ maxWidth: "780px", margin: "0 auto var(--space-3) auto" }}>
        <div className="hero-prompt-card">
          
          {/* Top Row inside Card: Tag Badge */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
            <span className="prompt-tag-badge">
              <Sparkles size={12} />
              <span>LexiCounsel - Research with AI</span>
            </span>
          </div>

          {/* Textarea Input with Accessible Label */}
          <label htmlFor="legal-search-input" className="sr-only">
            Legal Search Query Input
          </label>
          <textarea
            id="legal-search-input"
            name="legalSearchQuery"
            aria-label="Describe the legal situation, contract clause, or statute you want to analyze"
            className="prompt-textarea"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the legal situation, contract clause, or statute you want to analyze..."
          />

          {/* Bottom Controls Row inside Card */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "var(--space-2)", paddingTop: "8px" }}>
            
            {/* Left Options: Attach & Plan Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Attach / Upload quick button */}
              <button
                type="button"
                onClick={() => onNavigateSimplifier && onNavigateSimplifier()}
                className="btn btn-pill-outline"
                style={{ padding: "6px 12px", fontSize: "0.85rem", gap: "4px" }}
                title="Upload & Simplify Document"
              >
                <Plus size={16} />
                <span>Document</span>
              </button>

              {/* Plan Mode Toggle */}
              <div 
                className="toggle-switch-pill"
                onClick={() => setDeepPlanMode(!deepPlanMode)}
                title="Toggle deep statutory citation verification"
              >
                <span>Plan</span>
                {deepPlanMode ? (
                  <ToggleRight size={22} style={{ color: "var(--accent-orange)" }} />
                ) : (
                  <ToggleLeft size={22} style={{ color: "var(--text-muted)" }} />
                )}
              </div>
            </div>

            {/* Right: Circular Arrow Submit Button */}
            <button
              type="button"
              onClick={() => handleSearch()}
              disabled={loading || !query.trim()}
              className="btn-circle-submit"
              aria-label="Submit Search"
            >
              {loading ? (
                <div style={{ width: "16px", height: "16px", border: "2px solid #ffffff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              ) : (
                <ArrowUp size={20} strokeWidth={2.5} />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Suggestion Pills underneath prompt box */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", maxWidth: "860px", margin: "0 auto var(--space-6) auto" }}>
        {quickPills.map((pill, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => { setQuery(pill.query); handleSearch(pill.query); }}
            className="suggestion-pill"
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Saved Toast Alert */}
      {savedAlert && (
        <div style={{
          maxWidth: "400px",
          margin: "0 auto var(--space-2) auto",
          padding: "10px 16px",
          background: "var(--success-bg)",
          color: "var(--success)",
          borderRadius: "var(--radius-full)",
          textAlign: "center",
          fontWeight: 600,
          fontSize: "0.9rem"
        }}>
          ✓ Saved to your Research Vault!
        </div>
      )}

      {/* Search Results Display */}
      {searchResults && (
        <div role="region" aria-label="Legal Search Results" aria-live="polite" style={{ maxWidth: "860px", margin: "var(--space-4) auto" }}>
          
          {/* Plain English AI Overview Box */}
          <article className="glass-card" style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-strong)",
            marginBottom: "var(--space-4)",
            borderRadius: "var(--radius-xl)"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-2)", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={18} style={{ color: "var(--accent-orange)" }} />
                <h3 style={{ fontSize: "1.2rem", margin: 0 }}>GenAI Plain-English Synthesis</h3>
              </div>
              <span className={`badge badge-${searchResults.overview.riskLevel === "High" ? "danger" : "warning"}`}>
                Legal Sensitivity: {searchResults.overview.riskLevel}
              </span>
            </div>

            <p style={{ fontSize: "1.05rem", color: "var(--text-primary)", lineHeight: 1.7, marginBottom: "var(--space-2)" }}>
              {searchResults.overview.plainEnglishSummary}
            </p>

            <div style={{
              background: "var(--bg-tertiary)",
              padding: "var(--space-2)",
              borderRadius: "var(--radius-md)",
              marginBottom: "var(--space-2)"
            }}>
              <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "4px" }}>
                💡 Key Mandate:
              </strong>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>{searchResults.overview.keyTakeaway}</p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                ⚡ Action Step: <strong>{searchResults.overview.recommendedAction}</strong>
              </div>
              <button
                onClick={() => onAskAdvisor(`I am researching: "${query}". Can you provide customized legal advice based on this?`)}
                className="btn btn-pill-primary"
                style={{ padding: "8px 18px", fontSize: "0.88rem" }}
              >
                <span>Consult LexiCounsel AI</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </article>

          {/* Validated Sources List */}
          <div style={{ marginBottom: "var(--space-2)" }}>
            <h2 style={{ fontSize: "1.35rem", marginBottom: "var(--space-2)" }}>
              Validated Official Sources ({searchResults.results.length})
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {searchResults.results.map((doc) => (
              <article key={doc.id} className="glass-card" style={{ borderRadius: "var(--radius-lg)" }}>
                
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap", marginBottom: "var(--space-2)" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span className="badge badge-info">{doc.category}</span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{doc.jurisdiction}</span>
                    </div>
                    <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>{doc.title}</h3>
                  </div>

                  {/* Credibility Gauge */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "var(--bg-tertiary)",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)"
                  }}>
                    <ShieldCheck size={24} style={{ color: doc.credibility.score >= 90 ? "var(--success)" : "var(--info)" }} />
                    <div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                        {doc.credibility.score}%
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                        {doc.credibility.trustLabel}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statutory Citations */}
                <div style={{
                  display: "flex",
                  gap: "var(--space-2)",
                  flexWrap: "wrap",
                  background: "var(--bg-tertiary)",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "var(--space-2)",
                  fontSize: "0.88rem"
                }}>
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Official Act: </span>
                    <strong style={{ color: "var(--text-primary)" }}>{doc.statuteAct}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Citation: </span>
                    <code style={{ background: "var(--bg-card)", padding: "2px 6px", borderRadius: "4px" }}>
                      {doc.officialCitation}
                    </code>
                  </div>
                </div>

                <p style={{ marginBottom: "var(--space-2)", fontSize: "0.98rem" }}>{doc.summary}</p>

                {/* Precedents */}
                {doc.landmarkCases && doc.landmarkCases.length > 0 && (
                  <div style={{
                    background: "var(--bg-tertiary)",
                    padding: "var(--space-2)",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "var(--space-2)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                      <Scale size={16} style={{ color: "var(--accent-orange)" }} />
                      <strong style={{ fontSize: "0.88rem" }}>Binding Court Precedents:</strong>
                    </div>
                    {doc.landmarkCases.map((c, cIdx) => (
                      <div key={cIdx} style={{ fontSize: "0.88rem", marginBottom: "4px" }}>
                        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{c.caseName}</span>{" "}
                        <code>({c.citation})</code> — <span style={{ color: "var(--text-secondary)" }}>{c.ruling}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Card Actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", borderTop: "1px solid var(--border-subtle)", paddingTop: "var(--space-2)" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-pill-outline"
                      style={{ padding: "6px 14px", fontSize: "0.85rem" }}
                    >
                      <span>Direct Official Source</span>
                      <ExternalLink size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleSaveResult(doc)}
                      className="btn btn-pill-outline"
                      style={{ padding: "6px 14px", fontSize: "0.85rem" }}
                    >
                      <Bookmark size={14} />
                      <span>Save to Vault</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAskAdvisor(`How does ${doc.officialCitation} apply to my dispute?`)}
                    className="btn btn-pill-primary"
                    style={{ padding: "6px 16px", fontSize: "0.85rem" }}
                  >
                    <span>Ask AI Advisor</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </article>
            ))}
          </div>

        </div>
      )}

    </section>
  );
}
