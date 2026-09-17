# ⚖️ LegalFinder AI (LexiCounsel)
### *GenAI-Powered Legal Intelligence, Credibility Validation & Document Simplifier*

[![GitHub Repository](https://img.shields.io/badge/GitHub-LegalFinder_AI-blue?logo=github&style=flat-square)](https://github.com/bhavya/legalfinder-ai)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN%20+%20GenAI-6366f1?style=flat-square)](#technology-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

> **Public GitHub Repository Link**: [https://github.com/bhavya/legalfinder-ai](https://github.com/bhavya/legalfinder-ai)

---

## 🏛️ 1. Chosen Vertical
**Vertical: LegalTech & Consumer / Citizen Legal Accessibility**

Legal information is historically dense, filled with archaic legalese, fragmented across disparate gazettes, and costly to access. Citizens, freelancers, tenants, and small business owners routinely sign contracts (residential leases, employment agreements, NDAs, SaaS MSAs) containing high-risk clauses (unlimited indemnity, one-sided termination, overreaching non-competes, hidden penalties) without understanding their liability.

**LegalFinder AI** bridges this gap by democratizing legal comprehension through GenAI. It provides:
1. Multi-source legal search with automated **Credibility Validation Scoring**.
2. Clause-by-clause plain-English deconstruction and risk matrix scoring.
3. Side-by-side contract diff comparison.
4. **LexiCounsel AI Legal Advisor** for interactive procedural guidance and Bluebook-style citation references.
5. Exportable **Lawyer Preparation Kits** to optimize consultations with formal attorneys.

---

## 🧠 2. Approach & Logic

### 1. Multi-Source Legal Document Finder & Credibility Scoring
* **Approach**: Instead of returning generic search results or hallucinated case references, the engine queries verified statutory models (Uniform Residential Landlord and Tenant Act, Uniform Commercial Code, FTC Restrictive Covenant rules, Copyright Act, GDPR/CCPA) and checks binding precedents.
* **Credibility Logic**:
  $$\text{Credibility Score} = \text{Base} (70\%) + \text{Official Statutory Origin} (+15\%) + \text{Formal Codification Schema} (+10\%) + \text{Landmark Precedent Cross-Reference} (+5\%)$$
  Sources are categorized into:
  - **Tier 1 (90-100%)**: Binding Judicial Codes & Official Statutes.
  - **Tier 2 (75-89%)**: Regulatory Bulletins & Bar Publications.
  - **Tier 3 (50-74%)**: Secondary Legal Commentary.

### 2. Document & Clause Simplifier Engine
* **Approach**: Splits contracts into semantic clause paragraphs and passes them through a legal risk heuristic and GenAI synthesizer.
* **Risk Detection Logic**:
  - Detects **Indemnity Traps** (unlimited financial defense duty without reciprocal caps).
  - Detects **Unreasonable Restrictive Covenants** (non-competes exceeding 12 months or broad geographic scopes).
  - Detects **Unilateral Termination & Auto-Renewals** (short notice cancellation for vendor, 90-day locks for client).
  - Computes an **Overall Document Risk Meter (0–100)** and generates an Executive Summary, User Rights list, and Redline Negotiation recommendations.

### 3. Smart Contract Comparator
* **Approach**: Aligns Document A (Baseline/Standard) against Document B (Counterparty Proposed) on a clause-by-clause basis to compute a **Risk Delta**:
  $$\Delta_{\text{Risk}} = \text{RiskScore}(\text{Doc B}) - \text{RiskScore}(\text{Doc A})$$
* Flags added/deleted clauses and changes in liability scope.

### 4. LexiCounsel: AI Legal Advisor & Lawyer Prep Kit
* **Approach**: Simulates professional legal research counsel.
* Generates an actionable **Attorney Briefing Dossier** (Client profile, Chronological timeline, Itemized evidence checklist, Top 10 High-Impact questions for the lawyer, and Statutory citations).
* Fully printable / exportable to PDF.

---

## ⚙️ 3. How the Solution Works (Architecture)

```
                       ┌──────────────────────────────────────────────┐
                       │          React + Vite Frontend Client        │
                       │   - Semantic HTML5, CSS Variables            │
                       │   - 8px Spacing Grid, prefers-reduced-motion │
                       │   - Dark/Light Theme Switching               │
                       └──────────────────────┬───────────────────────┘
                                              │ REST API (JSON)
                                              ▼
                       ┌──────────────────────────────────────────────┐
                       │             Express Node.js Server           │
                       │   - CORS, Body Parsers, Error Handlers       │
                       │   - Separate .env configuration              │
                       └───────┬──────────────┬──────────────┬────────┘
                               │              │              │
             ┌─────────────────┘              │              └──────────────────┐
             ▼                                ▼                                 ▼
┌─────────────────────────┐      ┌─────────────────────────┐       ┌────────────────────────┐
│  Credibility Engine     │      │   AIService Reasoning   │       │ MongoDB / Vault Store  │
│  - Statutory Matching   │      │   - GenAI API / Gemini  │       │ - Saved Dossiers       │
│  - Authority Tiering    │      │   - Clause Deconstruct  │       │ - In-Memory Fallback   │
│  - Precedent Index      │      │   - Risk Scoring Engine │       │                        │
└─────────────────────────┘      └─────────────────────────┘       └────────────────────────┘
```

---

## 🧩 4. Assumptions Made

1. **Informational & Educational Scope**: The application is explicitly designed to empower and prepare users for legal situations, not to replace a licensed attorney. Disclaimers are prominently displayed across the app.
2. **Resilient Offline / Demo Mode**: While the backend accepts `GEMINI_API_KEY` and `OPENAI_API_KEY` in `server/.env`, it includes a comprehensive built-in statutory reasoning engine so all features (Search, Simplification, Comparison, Chat, Prep-Kit) work 100% out-of-the-box even without external API quotas.
3. **Graceful Database Fallback**: If a local MongoDB daemon is not running on port 27017, the server automatically switches to an in-memory resilient session vault without crashing.
4. **Cross-Jurisdictional Baseline**: Statutes are indexed against major model uniform codes (UCC, URLTA, FTC, Copyright Act, GDPR/CCPA) with support for jurisdiction filtering.

---

## 💻 5. Technology Stack

* **Frontend**: React 18, Vite 6, Lucide Icons, Vanilla CSS (CSS Variables, 8px Grid, Responsive Flex/Grid, Glassmorphism, Theme Switching).
* **Backend**: Node.js (ES Modules), Express.js, Cors, Dotenv, Mongoose.
* **Security & Environment**: Separate `.env` file for all sensitive API keys and secrets.

---

## 🚀 6. Installation & Quick Start

### Prerequisites
- Node.js (v18.0 or higher)
- npm (v9.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/bhavya/legalfinder-ai.git
cd legalfinder
```

### 2. Backend Setup
```bash
cd server
npm install
cp ../.env.example .env
# Edit .env to add your GEMINI_API_KEY or OPENAI_API_KEY (optional)
npm start
```
*Backend runs on `http://localhost:5000`*

### 3. Frontend Client Setup
```bash
# In a new terminal window
cd client
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🧪 7. API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check and API configuration status |
| `POST` | `/api/search/legal-docs` | Multi-source legal search with credibility validation |
| `GET` | `/api/statutes` | Retrieve all indexed statutory acts |
| `POST` | `/api/documents/simplify` | Clause-by-clause contract simplification & risk rating |
| `POST` | `/api/documents/compare` | Side-by-side contract diff comparison & risk delta |
| `POST` | `/api/advisor/chat` | Conversational legal advice with citations |
| `POST` | `/api/advisor/generate-prep-kit` | Generate structured Attorney Preparation Dossier |
| `GET` | `/api/vault` | Retrieve saved research vault records |
| `POST` | `/api/vault/save` | Save research or contract to session vault |

---

## 🔒 8. Sensitive Data & Security
All sensitive keys (API credentials, Database connection URIs, Session secrets) are stored exclusively in `server/.env`, which is excluded from version control via `.gitignore`. An `.env.example` file is provided for reference.

---

## 📜 9. License
This project is licensed under the MIT License - see the LICENSE file for details.
