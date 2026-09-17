import React from "react";
import { Scale, Github, Shield, Heart, ExternalLink } from "lucide-react";

export default function Footer({ setActiveTab }) {
  return (
    <footer style={{
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--bg-card-glass)",
      backdropFilter: "blur(12px)",
      padding: "var(--space-6) 0 var(--space-4) 0",
      marginTop: "var(--space-8)"
    }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
          
          {/* Column 1: Brand */}
          <div style={{ maxWidth: "380px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "var(--space-1)" }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "1.5px solid var(--text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.9rem"
              }}>
                L
              </div>
              <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                LegalFinder AI
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Democratizing legal intelligence through GenAI. Simplifying contracts, validating credibility, and generating attorney preparation dossiers.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "var(--space-2)" }}>Platform Modules</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
              <li>
                <button onClick={() => setActiveTab("search")} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}>
                  🔍 Credibility Legal Search
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("simplify")} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}>
                  📑 Document Simplifier & Risk Score
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("compare")} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}>
                  ⚖️ Contract Diff Comparator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("advisor")} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}>
                  🧑‍⚖️ LexiCounsel AI Advisor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("prepkit")} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}>
                  💼 Lawyer Preparation Kit
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Open Source & GitHub */}
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "var(--space-2)" }}>Open Source</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href="https://github.com/bhavya/legalfinder-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-pill-outline"
                style={{ width: "fit-content", padding: "6px 14px", fontSize: "0.85rem" }}
              >
                <Github size={16} />
                <span>GitHub Public Repository</span>
                <ExternalLink size={14} />
              </a>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Built with Native MERN Stack & GenAI
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div style={{
          background: "var(--bg-tertiary)",
          padding: "12px 18px",
          borderRadius: "var(--radius-md)",
          fontSize: "0.78rem",
          color: "var(--text-muted)",
          lineHeight: 1.5,
          marginBottom: "var(--space-3)"
        }}>
          <strong>Legal Disclaimer:</strong> LegalFinder AI provides statutory lookup, document deconstruction, and research simulation for educational and preparatory purposes only. It is not a law firm and does not provide formal legal advice or create an attorney-client relationship.
        </div>

        {/* Bottom copyright */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", color: "var(--text-muted)", flexWrap: "wrap", gap: "8px" }}>
          <div>© 2026 LegalFinder AI. All rights reserved.</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>Empowering legal accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
