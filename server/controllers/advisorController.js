import { AIService } from "../services/aiService.js";

// In-memory vault cache for saved research dossiers & prep-kits
const researchVaultStore = [];

/**
 * Controller for AI Legal Advisor interactive chat
 */
export const chatWithAdvisor = async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ error: "Message is required." });
    }

    const cleanMessage = message.trim().substring(0, 2000);
    const safeHistory = Array.isArray(conversationHistory) ? conversationHistory.slice(-10) : [];

    const response = await AIService.advisorChat(cleanMessage, safeHistory);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in chatWithAdvisor:", error);
    return res.status(500).json({ error: "Legal advisor service error." });
  }
};

/**
 * Controller for generating comprehensive Lawyer Prep Kit
 */
export const generatePrepKit = async (req, res) => {
  try {
    const caseData = req.body;
    if (!caseData || typeof caseData !== "object") {
      return res.status(400).json({ error: "Valid case data object is required." });
    }

    const prepKit = await AIService.generatePrepKit(caseData);
    
    // Automatically save to research vault
    const vaultItem = {
      id: prepKit.dossierId || `DOSSIER-${Date.now().toString().slice(-6)}`,
      type: "Prep-Kit",
      title: `${prepKit.issueType || "Legal Case"} - Legal Preparation Kit`,
      timestamp: new Date().toISOString(),
      data: prepKit
    };
    researchVaultStore.unshift(vaultItem);

    return res.status(200).json(prepKit);
  } catch (error) {
    console.error("Error in generatePrepKit:", error);
    return res.status(500).json({ error: "Failed to generate Lawyer Prep Kit." });
  }
};

/**
 * Controller for retrieving saved research vault
 */
export const getResearchVault = async (req, res) => {
  try {
    return res.status(200).json({
      total: researchVaultStore.length,
      items: researchVaultStore
    });
  } catch (error) {
    console.error("Error in getResearchVault:", error);
    return res.status(500).json({ error: "Failed to load research vault." });
  }
};

/**
 * Controller for saving items to research vault
 */
export const saveToVault = async (req, res) => {
  try {
    const { type, title, data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "Data payload is required to save to vault." });
    }

    const newItem = {
      id: `VAULT-${Date.now().toString().slice(-6)}`,
      type: (type && typeof type === "string") ? type.substring(0, 50) : "Legal Research",
      title: (title && typeof title === "string") ? title.substring(0, 150) : "Saved Legal Record",
      timestamp: new Date().toISOString(),
      data
    };
    researchVaultStore.unshift(newItem);
    return res.status(201).json(newItem);
  } catch (error) {
    console.error("Error in saveToVault:", error);
    return res.status(500).json({ error: "Failed to save item to vault." });
  }
};
