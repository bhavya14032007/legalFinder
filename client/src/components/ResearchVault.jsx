import React, { useState, useEffect } from "react";
import { Bookmark, FileText, Search, Briefcase, Trash2, ExternalLink, Download, Sparkles } from "lucide-react";
import { api } from "../utils/api.js";

export default function ResearchVault({ vaultItems = [], onSelectVaultItem }) {
  const [items, setItems] = useState(vaultItems);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // If local state doesn't have it, fetch from server vault
    if (vaultItems.length > 0) {
      setItems(vaultItems);
    } else {
      api.getVault().then((data) => {
        if (data.items) setItems(data.items);
      });
    }
  }, [vaultItems]);

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  return (
    <section aria-labelledby="vault-heading" style={{ padding: "var(--space-6) 0" }}>
      {/* Section Header */}
      <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto var(--space-4) auto" }}>
        <div className="badge badge-info" style={{ marginBottom: "var(--space-2)" }}>
          <Sparkles size={14} /> Encrypted Session Storage
        </div>
        <h1 id="vault-heading" style={{ marginBottom: "var(--space-2)" }}>
          Legal Research <span className="gradient-text">Vault</span>
        </h1>
        <p style={{ fontSize: "1.15rem" }}>
          Access your saved statutory lookups, simplified contract analyses, risk comparisons, and Lawyer Preparation Kits.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="glass-card" style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", padding: "var(--space-6)" }}>
          <Bookmark size={48} style={{ color: "var(--text-muted)", marginBottom: "var(--space-2)" }} />
          <h3 style={{ marginBottom: "8px" }}>Your Vault is Empty</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-3)" }}>
            Perform a legal search, simplify a contract, or generate a Lawyer Prep Kit to save records to your vault.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {items.map((item) => (
            <article key={item.id} className="glass-card glass-card-interactive" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-1)" }}>
                  <span className={`badge badge-${item.type?.includes("Prep") ? "success" : item.type?.includes("Search") ? "info" : "warning"}`}>
                    {item.type}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-sm btn-secondary"
                    style={{ padding: "4px 8px", color: "var(--danger)" }}
                    title="Delete from Vault"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <h3 style={{ fontSize: "1.15rem", marginBottom: "8px", color: "var(--text-primary)" }}>{item.title}</h3>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "var(--space-2)" }}>
                  Saved on: {new Date(item.timestamp).toLocaleDateString()}
                </div>

                {item.data?.riskScore !== undefined && (
                  <div style={{ fontSize: "0.88rem", marginBottom: "8px" }}>
                    Risk Rating: <strong style={{ color: item.data.riskScore > 60 ? "var(--danger)" : "var(--success)" }}>{item.data.riskScore}/100</strong>
                  </div>
                )}

                {item.data?.credibility && (
                  <div style={{ fontSize: "0.88rem", marginBottom: "8px" }}>
                    Credibility Score: <strong style={{ color: "var(--success)" }}>{item.data.credibility.score}%</strong>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "var(--space-2)", borderTop: "1px solid var(--border-subtle)", paddingTop: "var(--space-1)" }}>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="btn btn-sm btn-outline"
                  style={{ width: "100%" }}
                >
                  <span>View Details</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Item Inspection Modal */}
      {selectedItem && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "var(--space-3)"
        }}>
          <div className="glass-card" style={{ maxWidth: "800px", width: "100%", maxHeight: "85vh", overflowY: "auto", background: "var(--bg-secondary)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "var(--space-1)" }}>
              <div>
                <span className="badge badge-info">{selectedItem.type}</span>
                <h3 style={{ fontSize: "1.3rem", marginTop: "4px" }}>{selectedItem.title}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="btn btn-sm btn-secondary"
              >
                ✕ Close
              </button>
            </div>

            <pre style={{
              background: "var(--bg-tertiary)",
              padding: "var(--space-2)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              whiteSpace: "pre-wrap",
              overflowX: "auto"
            }}>
              {JSON.stringify(selectedItem.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}
