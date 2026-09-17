import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { searchLegalDocs, getAllStatutes } from "./controllers/searchController.js";
import { simplifyDocument, compareDocuments, getPresets } from "./controllers/docController.js";
import { chatWithAdvisor, generatePrepKit, getResearchVault, saveToVault } from "./controllers/advisorController.js";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.warn("❌ Warning: GEMINI_API_KEY not found in .env file!");
}
else{
console.log("✓ Gemini API key loaded successfully.");
}
const app = express();
let PORT = parseInt(process.env.PORT, 10) || 5000;

console.log("Gemini:", process.env.GEMINI_API_KEY ? "LOADED" : "NOT LOADED");
console.log("OpenAI:", process.env.OPENAI_API_KEY ? "LOADED" : "NOT LOADED");
// Middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// MongoDB Connection (Resilient: Fast timeout so it doesn't hang if local Mongo isn't running)
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/legalfinder";
if (mongoUri && mongoUri.trim() !== "") {
  mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 2000,
    connectTimeoutMS: 2000
  })
    .then(() => {
      console.log("✓ Connected to MongoDB database successfully.");
    })
    .catch((err) => {
      console.log("ℹ Notice: Local MongoDB not detected. Operating in High-Performance Resilient In-Memory Vault Mode.");
    });
}

// Health & Status Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "LegalFinder GenAI API",
    version: "1.0.0",
    port: PORT,
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== ""),
    geminiKeyPreview: process.env.GEMINI_API_KEY ? `${process.env.GEMINI_API_KEY.substring(0, 6)}...` : "Not Set",
    timestamp: new Date().toISOString()
  });
});

// Gemini Key Test Route
app.get("/api/test-gemini", async (req, res) => {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey || geminiKey.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "GEMINI_API_KEY is not set in server/.env file. Please paste your Google AI Studio API key into server/.env."
    });
  }
  try {
    const { AIService } = await import("./services/aiService.js");
    const testReply = await AIService.callLLM("Say 'Gemini API is successfully connected!' in 5 words.");
    if (testReply) {
      return res.status(200).json({
        success: true,
        message: "Gemini API connected and working perfectly!",
        response: testReply
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Gemini API call returned an empty response. Check if key has Gemini API enabled."
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Gemini API test failed: " + err.message
    });
  }
});

// Root friendly check
app.get("/", (req, res) => {
  res.status(200).send("<h1>LegalFinder Backend API is Live and Running</h1><p>Visit <a href='/api/health'>/api/health</a> or open the frontend app at <a href='http://localhost:5173'>http://localhost:5173</a></p>");
});

// Search & Credibility Validation API
app.post("/api/search/legal-docs", searchLegalDocs);
app.get("/api/statutes", getAllStatutes);

// Document Intelligence & Simplifier API
app.post("/api/documents/simplify", simplifyDocument);
app.post("/api/documents/compare", compareDocuments);
app.get("/api/documents/presets", getPresets);

// GenAI Legal Advisor & Prep Kit API
app.post("/api/advisor/chat", chatWithAdvisor);
app.post("/api/advisor/generate-prep-kit", generatePrepKit);
app.get("/api/vault", getResearchVault);
app.post("/api/vault/save", saveToVault);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// Function to start server with automatic port retry if occupied
function startServer(portToTry) {
  const server = app.listen(portToTry, () => {
    PORT = portToTry;
    console.log(`\n======================================================`);
    console.log(`  LegalFinder Backend Server is LIVE!`);
    console.log(`  URL: http://localhost:${PORT}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`======================================================\n`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${portToTry} is already in use. Retrying automatically on port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer(PORT);
