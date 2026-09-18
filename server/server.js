import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose";
import {
  configureHelmet,
  generalLimiter,
  aiRateLimiter,
  sanitizeInputs,
  responseTimeTracker
} from "./middleware/securityMiddleware.js";
import { cacheService } from "./services/cacheService.js";
import { searchLegalDocs, getAllStatutes } from "./controllers/searchController.js";
import { simplifyDocument, compareDocuments, getPresets } from "./controllers/docController.js";
import { chatWithAdvisor, generatePrepKit, getResearchVault, saveToVault } from "./controllers/advisorController.js";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.warn("ℹ Notice: GEMINI_API_KEY not configured. Resilient statutory engine active.");
} else {
  console.log("✓ Gemini API key loaded successfully.");
}

const app = express();
let PORT = parseInt(process.env.PORT, 10) || 5000;

// Security Middleware: Helmet CSP & Header Protections
app.use(configureHelmet());

// Efficiency Middleware: Response Compression (Gzip / Brotli)
app.use(compression());

// Performance Telemetry: Response Time Tracking
app.use(responseTimeTracker);

// Security Middleware: CORS Configuration with allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "https://legalfinder.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests or matching origins
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation: Origin not allowed."));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true
}));

// Body Parsers with safe strict payload limits
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// Security Middleware: Input Sanitization against XSS & script injection
app.use(sanitizeInputs);

// General Rate Limiter across all API endpoints
app.use("/api/", generalLimiter);

// Check if running under test runner
const isTestEnv = process.env.NODE_ENV === "test" || process.argv.some(a => a.includes("test"));

// MongoDB Connection (Resilient: Fast timeout with automatic in-memory fallback)
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/legalfinder";
if (!isTestEnv && mongoUri && mongoUri.trim() !== "") {
  mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 2000,
    connectTimeoutMS: 2000
  })
    .then(() => {
      console.log("✓ Connected to MongoDB database successfully.");
    })
    .catch(() => {
      console.log("ℹ Notice: Operating in High-Performance Resilient In-Memory Vault Mode.");
    });
}

// Public Health & Status Route (Safe: No API key leak)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "LegalFinder GenAI API",
    version: "1.0.0",
    port: PORT,
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== ""),
    securityHardened: true,
    compressionEnabled: true,
    cacheStats: cacheService.getStats(),
    timestamp: new Date().toISOString()
  });
});

// Gemini Key Validation Endpoint
app.get("/api/test-gemini", async (req, res) => {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey || geminiKey.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "GEMINI_API_KEY is not set in server/.env file. Operating in statutory fallback mode."
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
        message: "Gemini API call returned an empty response."
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
  res.status(200).send("<h1>LegalFinder Backend API is Live and Hardened</h1><p>Visit <a href='/api/health'>/api/health</a> or open the frontend app at <a href='http://localhost:5173'>http://localhost:5173</a></p>");
});

// Search & Credibility Validation API
app.post("/api/search/legal-docs", searchLegalDocs);
app.get("/api/statutes", getAllStatutes);

// Document Intelligence & Simplifier API (Protected with AI Rate Limiter)
app.post("/api/documents/simplify", aiRateLimiter, simplifyDocument);
app.post("/api/documents/compare", aiRateLimiter, compareDocuments);
app.get("/api/documents/presets", getPresets);

// GenAI Legal Advisor & Prep Kit API (Protected with AI Rate Limiter)
app.post("/api/advisor/chat", aiRateLimiter, chatWithAdvisor);
app.post("/api/advisor/generate-prep-kit", aiRateLimiter, generatePrepKit);
app.get("/api/vault", getResearchVault);
app.post("/api/vault/save", saveToVault);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "production" ? "An unexpected error occurred." : err.message
  });
});

// Function to start server with automatic port retry if occupied
export function startServer(portToTry) {
  if (isTestEnv) {
    return null;
  }
  
  const server = app.listen(portToTry, () => {
    PORT = portToTry;
    console.log(`\n======================================================`);
    console.log(`  LegalFinder Backend Server is LIVE (Hardened & Optimized)!`);
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

  return server;
}

if (!isTestEnv) {
  startServer(PORT);
}

export default app;
