import { AIService } from "../services/aiService.js";
import { LEGAL_KNOWLEDGE_BASE } from "../data/legalKnowledgeBase.js";

export const searchLegalDocs = async (req, res) => {
  try {
    const { query, jurisdiction } = req.body;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query is required." });
    }

    const searchResults = await AIService.searchLegalDocs(query, jurisdiction);
    return res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error in searchLegalDocs:", error);
    return res.status(500).json({ error: "Failed to execute legal search. Please try again." });
  }
};

export const getAllStatutes = async (req, res) => {
  try {
    return res.status(200).json({
      total: LEGAL_KNOWLEDGE_BASE.length,
      statutes: LEGAL_KNOWLEDGE_BASE
    });
  } catch (error) {
    console.error("Error in getAllStatutes:", error);
    return res.status(500).json({ error: "Failed to retrieve statutory database." });
  }
};
