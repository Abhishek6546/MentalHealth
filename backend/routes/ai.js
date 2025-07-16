const express = require("express");
const router = express.Router();
require("dotenv").config(); 

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/respond", async (req, res) => {
  const { thought } = req.body;
  const prompt = `You are a kind and empathetic mental health assistant. A user shared: "${thought}". Respond with a short, comforting message.`;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt, {
      generationConfig: {
        maxOutputTokens: 500,      // ✅ Limit output to 256 tokens
        temperature: 0.7,
        topK: 40,
        topP: 0.95
      }
    });
    const response = await result.response;
    const generatedText = response.text();
    res.json({ reply: generatedText }); 
    
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to generate AI response. Please try again later." });
  }
});

module.exports = router;