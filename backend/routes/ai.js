const express = require("express");
const router = express.Router();
require("dotenv").config(); // Ensure dotenv is loaded to access process.env.GEMINI_API_KEY

// Correct way to import the Google Generative AI library
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/respond", async (req, res) => {
  const { thought } = req.body;
  const prompt = `You are a kind and empathetic mental health assistant. A user shared: "${thought}". Respond with a short, comforting message.`;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Send the prompt to the model
    const result = await model.generateContent(prompt);
    // The response object contains the actual generated content
    const response = await result.response;
    // Extract the text content from the response
    const generatedText = response.text();
    res.json({ reply: generatedText }); // Send the generated text back as the reply
  } catch (err) {
    console.error("Gemini API error:", err);
    // Provide a more user-friendly error message if desired
    res.status(500).json({ error: "Failed to generate AI response. Please try again later." });
  }
});

module.exports = router;