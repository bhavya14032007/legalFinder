import React, { useState } from "react";
import { Briefcase, Printer, Download, Sparkles, CheckSquare, Calendar, FileText, HelpCircle, ArrowRight, Bookmark } from "lucide-react";
import { api } from "../utils/api.js";

export default function LawyerPrepKit({ onSaveToVault }) {
  const [formData, setFormData] = useState({
    clientName: "Alex Morgan",
    issueType: "Residential Tenancy & Security Deposit Dispute",
    urgency: "High",
    targetOutcome: "Full deposit recovery of $2,400 + waiver of fraudulent damage claims",
    description: "Landlord failed to return the $2,400 security deposit after 45 days following lease termination. Landlord provided no itemized deduction list and claims normal wall painting wear as damages."
  });

  const [loading, setLoading] = useState(false);
  const [prepKit, setPrepKit] = useState(null);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const result = await api.generatePrepKit(formData);
      setPrepKit(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = async () => {
    if (!prepKit) return;
    await onSaveToVault("Lawyer Prep Kit", `${prepKit.issueType} - ${prepKit.clientName}`, prepKit);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <section aria-labelledby="prepkit-heading" style={{ padding: "var(--space-6) 0" }}>
      {/* Section Header */}
      <div className="no-print" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto var(--space-4) auto" }}>
        <div className="badge badge-success" style={{ marginBottom: "var(--space-2)" }}>
          <Sparkles size={14} /> Professional Attorney Briefing Engine
        </div>
        <h1 id="prepkit-heading" style={{ marginBottom: "var(--space-2)" }}>
          Lawyer Preparation <span className="gradient-text">Kit</span>
        </h1>
        <p style={{ fontSize: "1.15rem" }}>
          Never enter a legal consultation unprepared. Generate a structured case dossier with evidence checklists, timelines, and strategic questions for your attorney.
        </p>
      </div>

      {/* Input Form */}
      <div className="glass-card no-print" style={{ maxWidth: "860px", margin: "0 auto var(--space-4) auto" }}>
        <form onSubmit={handleGenerate}>
          <div className="grid grid-cols-2 gap-2" style={{ marginBottom: "var(--space-2)" }}>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                Client / Party Name
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                Legal Issue Category
              </label>
              <select
                className="select-field"
                value={formData.issueType}
                onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
              >
                <option value="Residential Tenancy & Security Deposit Dispute">Housing & Tenant Rights</option>
                <option value="Employment Non-Compete & Severance Review">Employment & Labor Law</option>
                <option value="Commercial Contract & Breach of Payment">Commercial & Breach of Contract</option>
                <option value="Intellectual Property & Freelance Ownership">IP & Work for Hire</option>
                <option value="Consumer Warranty & Defective Product Refund">Consumer Protection</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "var(--space-2)" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
              Target Outcome or Desired Remedy
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.targetOutcome}
              onChange={(e) => setFormData({ ...formData, targetOutcome: e.target.value })}
              placeholder="e.g. Deposit refund, severance negotiation, contract redline"
              required
            />
          </div>

          <div style={{ marginBottom: "var(--space-2)" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
              Brief Narrative & Situation Details
            </label>
            <textarea
              className="textarea-field"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what happened, what notices were exchanged, and any dollar amounts involved..."
              style={{ minHeight: "100px" }}
              required
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ padding: "12px 32px", fontSize: "1rem" }}
            >
              {loading ? (
                <span>Generating Legal Brief...</span>
              ) : (
                <>
                  <Briefcase size={18} />
                  <span>Generate Attorney Preparation Dossier</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Generated Dossier View */}
      {prepKit && (
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          {/* Action Bar (Print & Save) */}
          <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Dossier Generated: <strong>{prepKit.dossierId}</strong>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={handlePrint}
                className="btn btn-secondary"
              >
                <Printer size={16} />
                <span>Print / Save as PDF</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="btn btn-primary"
              >
                <Bookmark size={16} />
                <span>Save Dossier to Vault</span>
              </button>
            </div>
          </div>

          {savedAlert && (
            <div className="no-print" style={{
              padding: "10px 16px",
              background: "var(--success-bg)",
              color: "var(--success)",
              borderRadius: "var(--radius-md)",
              marginBottom: "var(--space-2)",
              textAlign: "center",
              fontWeight: 600
            }}>
              ✓ Dossier saved to your Research Vault!
            </div>
          )}

          {/* Dossier Document (Printable) */}
          <article className="glass-card" style={{ padding: "var(--space-4)", border: "1px solid var(--border-strong)" }}>
            
            {/* Dossier Header */}
            <div style={{ borderBottom: "2px solid var(--accent-primary)", paddingBottom: "var(--space-2)", marginBottom: "var(--space-3)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-primary)", fontWeight: 700 }}>
                  CONFIDENTIAL LEGAL PREPARATION DOSSIER
                </div>
                <h2 style={{ fontSize: "1.6rem", margin: "4px 0" }}>{prepKit.issueType}</h2>
                <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  Client: <strong>{prepKit.clientName}</strong> | Date: <strong>{prepKit.generatedAt}</strong>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span className="badge badge-info">{prepKit.dossierId}</span>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  Urgency: <strong>{prepKit.urgency}</strong>
                </div>
              </div>
            </div>

            {/* Case Overview & Target Outcome */}
            <div style={{ marginBottom: "var(--space-3)" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>1. Executive Case Summary</h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "var(--space-1)" }}>{prepKit.caseSummary}</p>
              
              <div style={{ background: "var(--bg-secondary)", padding: "10px 14px", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--success)" }}>
                <strong style={{ fontSize: "0.88rem", color: "var(--success)" }}>🎯 Client's Desired Outcome: </strong>
                <span style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>{prepKit.targetOutcome}</span>
              </div>
            </div>

            {/* Timeline of Events */}
            <div style={{ marginBottom: "var(--space-3)" }}>
              <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "6px", marginBottom: "var(--space-1)" }}>
                <Calendar size={18} style={{ color: "var(--accent-primary)" }} />
                <span>2. Chronological Timeline of Events</span>
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {prepKit.timelineOfEvents.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "var(--bg-secondary)", padding: "8px 12px", borderRadius: "var(--radius-sm)" }}>
                    <span style={{ fontWeight: 700, color: "var(--accent-primary)", minWidth: "70px", fontSize: "0.85rem" }}>{t.date}</span>
                    <span style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>{t.event}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Checklist */}
            <div style={{ marginBottom: "var(--space-3)" }}>
              <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "6px", marginBottom: "var(--space-1)" }}>
                <CheckSquare size={18} style={{ color: "var(--success)" }} />
                <span>3. Recommended Evidence & Document Checklist</span>
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {prepKit.evidenceChecklist.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    <input type="checkbox" defaultChecked={i === 0} style={{ accentColor: "var(--accent-primary)", width: "16px", height: "16px" }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions to Ask Attorney */}
            <div style={{ marginBottom: "var(--space-3)" }}>
              <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "6px", marginBottom: "var(--space-1)" }}>
                <HelpCircle size={18} style={{ color: "var(--warning)" }} />
                <span>4. Top Strategic Questions for Your Attorney Consultation</span>
              </h3>
              <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {prepKit.questionsForAttorney.map((q, i) => (
                  <li key={i} style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 500 }}>{q}</li>
                ))}
              </ol>
            </div>

            {/* Applicable Statutory References */}
            <div style={{ background: "var(--bg-tertiary)", padding: "var(--space-2)", borderRadius: "var(--radius-md)", marginBottom: "var(--space-2)" }}>
              <h4 style={{ fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "4px" }}>5. Relevant Statutory & Procedural Authorities:</h4>
              <ul style={{ paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {prepKit.statutoryReferences.map((ref, i) => (
                  <li key={i}>{ref}</li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic", borderTop: "1px solid var(--border-subtle)", paddingTop: "8px" }}>
              Note: This dossier was prepared using LegalFinder AI for informational briefing purposes and does not create an attorney-client relationship. Present this document to your licensed attorney during your consultation.
            </div>

          </article>

        </div>
      )}
    </section>
  );
}
