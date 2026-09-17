/**
 * LegalFinder API Client Connector with Multi-Port Auto-Discovery
 */

let activeBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const candidateUrls = [
  activeBaseUrl,
  "http://localhost:5000/api",
  "http://localhost:5001/api",
  "http://127.0.0.1:5000/api",
  "http://127.0.0.1:5001/api"
];

async function fetchWithFallback(endpoint, options = {}) {
  // Try current active base URL first
  try {
    const res = await fetch(`${activeBaseUrl}${endpoint}`, options);
    if (res.ok) return await res.json();
  } catch (e) {
    // try fallback candidate URLs
  }

  for (const url of candidateUrls) {
    if (url === activeBaseUrl) continue;
    try {
      const res = await fetch(`${url}${endpoint}`, options);
      if (res.ok) {
        activeBaseUrl = url;
        return await res.json();
      }
    } catch (e) {
      // continue to next candidate
    }
  }

  throw new Error(`Failed to reach backend API on ${activeBaseUrl}${endpoint}`);
}

export const api = {
  // Check backend health
  async checkHealth() {
    try {
      return await fetchWithFallback("/health");
    } catch (error) {
      return { status: "offline" };
    }
  },

  // Multi-source legal search & credibility verification
  async searchLegal(query, jurisdiction = "All") {
    return await fetchWithFallback("/search/legal-docs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, jurisdiction })
    });
  },

  // Document Simplifier
  async simplifyDocument(documentText, title) {
    return await fetchWithFallback("/documents/simplify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentText, title })
    });
  },

  // Document Comparator
  async compareDocuments(docA, docB, titleA, titleB) {
    return await fetchWithFallback("/documents/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docA, docB, titleA, titleB })
    });
  },

  // Presets
  async getPresets() {
    try {
      return await fetchWithFallback("/documents/presets");
    } catch (error) {
      console.error("Presets API error:", error);
      return {};
    }
  },

  // Legal Advisor Chat
  async chatAdvisor(message, conversationHistory) {
    return await fetchWithFallback("/advisor/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, conversationHistory })
    });
  },

  // Generate Lawyer Prep Kit
  async generatePrepKit(caseData) {
    return await fetchWithFallback("/advisor/generate-prep-kit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(caseData)
    });
  },

  // Research Vault
  async getVault() {
    try {
      return await fetchWithFallback("/vault");
    } catch (error) {
      return { total: 0, items: [] };
    }
  },

  async saveToVault(type, title, data) {
    try {
      return await fetchWithFallback("/vault/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, title, data })
      });
    } catch (error) {
      console.error("Save to vault error:", error);
      return null;
    }
  }
};
