import React from "react";
import { Globe, Scale, Sparkles, Moon, Sun, Github } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme, serverStatus }) {
  const navItems = [
    { id: "search", label: "Product" },
    { id: "simplify", label: "Use Cases" },
    { id: "compare", label: "Compare" },
    { id: "advisor", label: "AI Advisor" },
    { id: "prepkit", label: "Prep Kit" },
    { id: "vault", label: "Vault" }
  ];

  return (
    <header className="floating-navbar-container">
      <div className="container">
        <div className="floating-navbar">
          
          {/* Left: Brand Circle Icon */}
          <div 
            onClick={() => setActiveTab("search")}
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          >
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1.5px solid var(--text-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              fontWeight: 800,
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
              background: "var(--bg-secondary)"
            }}>
              L
            </div>
            <span style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.02em" }}>
              LegalFinder
            </span>
          </div>

          {/* Center: Navigation Links */}
          <nav className="nav-links-group" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`nav-link-item ${isActive ? "active" : ""}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Controls & Call to Action */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Theme / Globe Toggle */}
            <button
              onClick={toggleTheme}
              className="btn"
              title="Toggle theme"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "transparent",
                color: "var(--text-secondary)",
                padding: 0
              }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Globe size={18} />}
            </button>

            {/* GitHub Repo Icon */}
            <a
              href="https://github.com/bhavya/legalfinder-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              title="GitHub Repository"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "transparent",
                color: "var(--text-secondary)",
                padding: 0
              }}
            >
              <Github size={18} />
            </a>

            {/* Start Building / Start Consultation Pill Button */}
            <button
              onClick={() => setActiveTab("advisor")}
              className="btn btn-pill-primary"
            >
              <span>Start Research</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
