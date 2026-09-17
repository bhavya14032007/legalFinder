import { AIService } from "../services/aiService.js";
import { CONTRACT_PRESETS } from "../data/legalKnowledgeBase.js";

export const simplifyDocument = async (req, res) => {
  try {
    const { documentText, title } = req.body;

    if (!documentText || documentText.trim().length === 0) {
      return res.status(400).json({ error: "Document content is required." });
    }

    const simplified = await AIService.simplifyDocument(documentText, title || "Uploaded Legal Document");
    return res.status(200).json(simplified);
  } catch (error) {
    console.error("Error in simplifyDocument:", error);
    return res.status(500).json({ error: error.message || "Failed to simplify document." });
  }
};

export const compareDocuments = async (req, res) => {
  try {
    const { docA, docB, titleA, titleB } = req.body;

    if (!docA || !docB) {
      return res.status(400).json({ error: "Both Document A and Document B are required for comparison." });
    }

    const comparison = await AIService.compareDocuments(docA, docB, titleA, titleB);
    return res.status(200).json(comparison);
  } catch (error) {
    console.error("Error in compareDocuments:", error);
    return res.status(500).json({ error: error.message || "Failed to compare documents." });
  }
};

export const getPresets = async (req, res) => {
  try {
    return res.status(200).json(CONTRACT_PRESETS);
  } catch (error) {
    console.error("Error in getPresets:", error);
    return res.status(500).json({ error: "Failed to fetch presets." });
  }
};
