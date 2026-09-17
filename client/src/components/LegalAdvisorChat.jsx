import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Scale, BookOpen, ShieldAlert, Sparkles, User, Bot, ArrowRight, Briefcase, RefreshCw } from "lucide-react";
import { api } from "../utils/api.js";

export default function LegalAdvisorChat({ initialPrompt, onNavigatePrepKit }) {
  const [messages, setMessages] = useState([
    {
      id: "init-1",
      sender: "bot",
      text: "Hello, I am LexiCounsel, your GenAI Legal Intelligence & Research Assistant. How can I assist you today? I can help decode statutory codes, review contractual risks, outline tenant/labor rights, or prepare a strategic dossier for your attorney.",
      citations: {
        statute: "Uniform Legal Research Standard & Model Codes",
        citation: "Model Civil Standards § 101"
      },
      nextSteps: [
        "State your specific dispute or upload contract terms",
        "Clarify your jurisdiction if state-specific rules apply"
      ],
      questions: [
        "What specific contract clause is causing concern?",
        "Have formal notices or demand letters been served?"
      ]
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (userText = input) => {
    if (!userText || userText.trim() === "") return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: userText
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await api.chatAdvisor(userText, messages);
      
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.reply,
        citations: {
          statute: response.citedStatute,
          citation: response.officialCitation,
          precedent: response.relevantPrecedent
        },
        nextSteps: response.suggestedNextSteps,
        questions: response.questionsForAttorney,
        disclaimer: response.disclaimer
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: "bot",
          text: "I experienced a momentary connection issue. Please check that the server is active or try resending."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestionPrompts = [
    "My landlord is withholding my deposit for normal wear and tear.",
    "Can my employer enforce a 2-year worldwide non-compete clause?",
    "A client signed a freelance contract but refused to pay Net-60.",
    "What clauses should I look for in an NDA before signing?"
  ];

  return (
    <section aria-labelledby="advisor-heading" style={{ padding: "var(--space-6) 0" }}>
      {/* Section Header */}
      <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto var(--space-4) auto" }}>
        <div className="badge badge-info" style={{ marginBottom: "var(--space-2)" }}>
          <Sparkles size={14} /> AI Legal Counsel & Procedural Guidance
        </div>
        <h1 id="advisor-heading" style={{ marginBottom: "var(--space-2)" }}>
          LexiCounsel <span className="gradient-text">Legal Advisor</span>
        </h1>
        <p style={{ fontSize: "1.15rem" }}>
          Ask complex legal questions, examine statutory remedies, and review binding precedents to prepare with attorney-level insight.
        </p>
      </div>

      {/* Main Chat Interface Box */}
      <div className="glass-card" style={{ maxWidth: "960px", margin: "0 auto", padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", height: "700px" }}>
        
        {/* Chat Top Banner */}
        <div style={{
          padding: "var(--space-2) var(--space-3)",
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-secondary)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--accent-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff"
            }}>
              <Scale size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1rem" }}>LexiCounsel AI Counsel</div>
              <div style={{ fontSize: "0.75rem", color: "var(--success)" }}>● Judicial Knowledge Base Active</div>
            </div>
          </div>

          {/* Quick Action: Prepare Lawyer Dossier */}
          <button
            onClick={() => onNavigatePrepKit && onNavigatePrepKit()}
            className="btn btn-sm btn-outline"
          >
            <Briefcase size={14} />
            <span>Generate Lawyer Prep Kit</span>
          </button>
        </div>

        {/* Chat Message Scrollable Feed */}
        <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-3)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                gap: "12px",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: msg.sender === "user" ? "80%" : "90%"
              }}
            >
              {msg.sender === "bot" && (
                <div style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "var(--bg-tertiary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-primary)",
                  flexShrink: 0
                }}>
                  <Bot size={20} />
                </div>
              )}

              <div style={{
                background: msg.sender === "user" ? "var(--accent-gradient)" : "var(--bg-secondary)",
                color: msg.sender === "user" ? "#ffffff" : "var(--text-primary)",
                padding: "var(--space-2)",
                borderRadius: "var(--radius-lg)",
                border: msg.sender === "user" ? "none" : "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-sm)"
              }}>
                {/* Message Text */}
                <p style={{ margin: 0, fontSize: "0.98rem", lineHeight: 1.65, color: msg.sender === "user" ? "#ffffff" : "var(--text-primary)" }}>
                  {msg.text}
                </p>

                {/* Citations Box (For Bot Responses) */}
                {msg.citations && msg.citations.statute && (
                  <div style={{
                    marginTop: "var(--space-2)",
                    background: "var(--bg-tertiary)",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    borderLeft: "3px solid var(--accent-primary)",
                    fontSize: "0.85rem"
                  }}>
                    <div style={{ fontWeight: 700, color: "var(--accent-primary)", marginBottom: "4px" }}>
                      ⚖️ Statutory Authority & Citation:
                    </div>
                    <div>{msg.citations.statute} — <code>{msg.citations.citation}</code></div>
                    {msg.citations.precedent && (
                      <div style={{ marginTop: "4px", color: "var(--text-secondary)" }}>
                        <strong>Precedent:</strong> {msg.citations.precedent.caseName} ({msg.citations.precedent.citation})
                      </div>
                    )}
                  </div>
                )}

                {/* Next Steps Checklist */}
                {msg.nextSteps && msg.nextSteps.length > 0 && (
                  <div style={{ marginTop: "var(--space-2)" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                      ⚡ Recommended Action Steps:
                    </div>
                    <ul style={{ paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "4px" }}>
                      {msg.nextSteps.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Questions for Lawyer */}
                {msg.questions && msg.questions.length > 0 && (
                  <div style={{ marginTop: "var(--space-2)", background: "rgba(99, 102, 241, 0.08)", padding: "10px 14px", borderRadius: "var(--radius-md)" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-primary)", marginBottom: "4px" }}>
                      💼 Questions to Ask Your Attorney:
                    </div>
                    <ul style={{ paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "4px" }}>
                      {msg.questions.map((q, qIdx) => (
                        <li key={qIdx}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Disclaimer */}
                {msg.disclaimer && (
                  <div style={{ marginTop: "8px", fontSize: "0.72rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                    {msg.disclaimer}
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <div style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "var(--accent-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  flexShrink: 0
                }}>
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-primary)" }}>
                <Bot size={20} />
              </div>
              <div className="glass-card" style={{ padding: "12px 18px", borderRadius: "var(--radius-lg)" }}>
                <span className="pulse-glow" style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  Analyzing statutory databases and precedents...
                </span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Prompts Bar */}
        <div style={{ padding: "8px var(--space-3)", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "8px", overflowX: "auto", whiteSpace: "nowrap" }}>
          {suggestionPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(p)}
              className="badge"
              style={{
                background: "var(--bg-tertiary)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-subtle)",
                cursor: "pointer",
                padding: "4px 10px",
                textTransform: "none"
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ padding: "var(--space-2) var(--space-3)", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{ display: "flex", gap: "10px" }}
          >
            <input
              type="text"
              className="input-field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a legal question, describe your situation, or cite a clause..."
              style={{ height: "48px" }}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn btn-primary"
              style={{ height: "48px", width: "48px", padding: 0 }}
              aria-label="Send Message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
