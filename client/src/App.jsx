import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroSearch from "./components/HeroSearch.jsx";
import DocumentSimplifier from "./components/DocumentSimplifier.jsx";
import DocumentComparator from "./components/DocumentComparator.jsx";
import LegalAdvisorChat from "./components/LegalAdvisorChat.jsx";
import LawyerPrepKit from "./components/LawyerPrepKit.jsx";
import ResearchVault from "./components/ResearchVault.jsx";
import Footer from "./components/Footer.jsx";
import { api } from "./utils/api.js";

export default function App() {
  const [activeTab, setActiveTab] = useState("search");
  const [theme, setTheme] = useState("light");
  const [serverStatus, setServerStatus] = useState("checking");
  const [vaultItems, setVaultItems] = useState([]);
  const [advisorPrompt, setAdvisorPrompt] = useState("");

  // Initialize Theme and Health Check
  useEffect(() => {
    const savedTheme = localStorage.getItem("legalfinder_theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Check backend health
    api.checkHealth().then((res) => {
      setServerStatus(res.status === "healthy" ? "healthy" : "offline");
    });

    // Load initial vault
    api.getVault().then((data) => {
      if (data.items) setVaultItems(data.items);
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("legalfinder_theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleSaveToVault = async (type, title, data) => {
    const saved = await api.saveToVault(type, title, data);
    if (saved) {
      setVaultItems((prev) => [saved, ...prev]);
    }
  };

  const handleAskAdvisor = (prompt) => {
    setAdvisorPrompt(prompt);
    setActiveTab("advisor");
  };

  const handleNavigatePrepKit = () => {
    setActiveTab("prepkit");
  };

  const handleNavigateSimplifier = () => {
    setActiveTab("simplify");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* a11y Skip Link for Screen Readers and Keyboard Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Semantic Header / Floating Navbar */}
      <header role="banner">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          toggleTheme={toggleTheme}
          serverStatus={serverStatus}
        />
      </header>

      {/* Semantic Main Content Area */}
      <main id="main-content" className="container" role="main" tabIndex="-1" style={{ flex: 1 }}>
        {activeTab === "search" && (
          <HeroSearch
            onSaveToVault={handleSaveToVault}
            onAskAdvisor={handleAskAdvisor}
            onNavigateSimplifier={handleNavigateSimplifier}
          />
        )}

        {activeTab === "simplify" && (
          <DocumentSimplifier
            onSaveToVault={handleSaveToVault}
            onAskAdvisor={handleAskAdvisor}
          />
        )}

        {activeTab === "compare" && (
          <DocumentComparator
            onSaveToVault={handleSaveToVault}
            onAskAdvisor={handleAskAdvisor}
          />
        )}

        {activeTab === "advisor" && (
          <LegalAdvisorChat
            initialPrompt={advisorPrompt}
            onNavigatePrepKit={handleNavigatePrepKit}
          />
        )}

        {activeTab === "prepkit" && (
          <LawyerPrepKit
            onSaveToVault={handleSaveToVault}
          />
        )}

        {activeTab === "vault" && (
          <ResearchVault
            vaultItems={vaultItems}
            onSelectVaultItem={(item) => console.log(item)}
          />
        )}
      </main>

      {/* Semantic Footer */}
      <footer role="contentinfo">
        <Footer setActiveTab={setActiveTab} />
      </footer>
    </div>
  );
}
