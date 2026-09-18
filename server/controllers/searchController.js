import { AIService } from "../services/aiService.js";
import { LEGAL_KNOWLEDGE_BASE } from "../data/legalKnowledgeBase.js";
import { cacheService } from "../services/cacheService.js";

/**
 * Controller for searching legal documents with credibility validation
 */
export const searchLegalDocs = async (req, res) => {
  try {
    const { query, jurisdiction } = req.body;

    if (!query || typeof query !== "string" || query.trim() === "") {
      return res.status(400).json({ error: "Search query is required." });
    }

    const trimmedQuery = query.trim().substring(0, 500); // Prevent overflow
    const cacheKey = cacheService.generateKey("search", { q: trimmedQuery, j: jurisdiction || "all" });
    const cachedResult = cacheService.get(cacheKey);

    if (cachedResult) {
      res.setHeader("X-Cache-Status", "HIT");
      return res.status(200).json({ ...cachedResult, fromCache: true });
    }

    res.setHeader("X-Cache-Status", "MISS");
    const searchResults = await AIService.searchLegalDocs(trimmedQuery, jurisdiction);
    
    // Store in cache for 10 minutes
    cacheService.set(cacheKey, searchResults, 600);

    return res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error in searchLegalDocs:", error);
    return res.status(500).json({ error: "Failed to execute legal search. Please try again." });
  }
};

/**
 * Controller for retrieving verified statutory database
 */
export const getAllStatutes = async (req, res) => {
  try {
    const cacheKey = "statutes:all";
    const cached = cacheService.get(cacheKey);
    if (cached) {
      res.setHeader("X-Cache-Status", "HIT");
      return res.status(200).json(cached);
    }

    res.setHeader("X-Cache-Status", "MISS");
    const payload = {
      total: LEGAL_KNOWLEDGE_BASE.length,
      statutes: LEGAL_KNOWLEDGE_BASE
    };
    cacheService.set(cacheKey, payload, 3600); // 1 hour cache
    return res.status(200).json(payload);
  } catch (error) {
    console.error("Error in getAllStatutes:", error);
    return res.status(500).json({ error: "Failed to retrieve statutory database." });
  }
};
