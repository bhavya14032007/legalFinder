import { AIService } from "../services/aiService.js";
import { CONTRACT_PRESETS } from "../data/legalKnowledgeBase.js";
import { cacheService } from "../services/cacheService.js";

/**
 * Controller for simplifying complex legal documents
 */
export const simplifyDocument = async (req, res) => {
  try {
    const { documentText, title } = req.body;

    if (!documentText || typeof documentText !== "string" || documentText.trim().length === 0) {
      return res.status(400).json({ error: "Document content is required." });
    }

    if (documentText.length > 100000) {
      return res.status(413).json({ error: "Document payload exceeds maximum allowed size (100,000 characters)." });
    }

    // Cache check for duplicate analyses
    const cacheKey = cacheService.generateKey("simplify", { textHash: documentText.substring(0, 300), length: documentText.length });
    const cached = cacheService.get(cacheKey);
    if (cached) {
      res.setHeader("X-Cache-Status", "HIT");
      return res.status(200).json({ ...cached, fromCache: true });
    }

    res.setHeader("X-Cache-Status", "MISS");
    const safeTitle = (title && typeof title === "string") ? title.trim().substring(0, 150) : "Uploaded Legal Document";
    const simplified = await AIService.simplifyDocument(documentText, safeTitle);
    
    // Cache for 30 minutes
    cacheService.set(cacheKey, simplified, 1800);
    return res.status(200).json(simplified);
  } catch (error) {
    console.error("Error in simplifyDocument:", error);
    return res.status(500).json({ error: error.message || "Failed to simplify document." });
  }
};

/**
 * Controller for comparing two contract documents
 */
export const compareDocuments = async (req, res) => {
  try {
    const { docA, docB, titleA, titleB } = req.body;

    if (!docA || !docB || typeof docA !== "string" || typeof docB !== "string") {
      return res.status(400).json({ error: "Both Document A and Document B are required for comparison." });
    }

    const safeTitleA = (titleA && typeof titleA === "string") ? titleA.trim().substring(0, 150) : "Document A";
    const safeTitleB = (titleB && typeof titleB === "string") ? titleB.trim().substring(0, 150) : "Document B";

    const comparison = await AIService.compareDocuments(docA, docB, safeTitleA, safeTitleB);
    return res.status(200).json(comparison);
  } catch (error) {
    console.error("Error in compareDocuments:", error);
    return res.status(500).json({ error: error.message || "Failed to compare documents." });
  }
};

/**
 * Controller for fetching standard legal contract presets
 */
export const getPresets = async (req, res) => {
  try {
    const cacheKey = "presets:all";
    const cached = cacheService.get(cacheKey);
    if (cached) {
      res.setHeader("X-Cache-Status", "HIT");
      return res.status(200).json(cached);
    }

    res.setHeader("X-Cache-Status", "MISS");
    cacheService.set(cacheKey, CONTRACT_PRESETS, 3600);
    return res.status(200).json(CONTRACT_PRESETS);
  } catch (error) {
    console.error("Error in getPresets:", error);
    return res.status(500).json({ error: "Failed to fetch presets." });
  }
};
