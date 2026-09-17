import { AIService } from "../services/aiService.js";

// In-memory vault cache for saved research dossiers & prep-kits
const researchVaultStore = [];

export const chatWithAdvisor = async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required." });
    }

    const response = await AIService.advisorChat(message, conversationHistory || []);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in chatWithAdvisor:", error);
    return res.status(500).json({ error: "Legal advisor service error." });
  }
};

export const generatePrepKit = async (req, res) => {
  try {
    const caseData = req.body;
    const prepKit = await AIService.generatePrepKit(caseData);
    
    // Automatically save to research vault
    researchVaultStore.unshift({
      id: prepKit.dossierId,
      type: "Prep-Kit",
      title: `${prepKit.issueType} - Legal Preparation Kit`,
      timestamp: new Date().toISOString(),
      data: prepKit
    });

    return res.status(200).json(prepKit);
  } catch (error) {
    console.error("Error in generatePrepKit:", error);
    return res.status(500).json({ error: "Failed to generate Lawyer Prep Kit." });
  }
};

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

export const saveToVault = async (req, res) => {
  try {
    const { type, title, data } = req.body;
    const newItem = {
      id: `VAULT-${Date.now().toString().slice(-6)}`,
      type: type || "Legal Research",
      title: title || "Saved Legal Record",
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
