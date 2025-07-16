const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");
const authMiddleware = require("../middleware/authMiddleware");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", authMiddleware, async (req, res) => {
  const { thought, mood } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You are a kind and empathetic mental health assistant. A user shared: "${thought}". Reply with a short, comforting and positive message.`;
    const result = await model.generateContent(prompt);
    const aiReply = result.response.text();

    const entry = new Journal({
      thought,
      mood,
      aiReply,
      userId: req.user.id,
    });

    await entry.save();
    res.status(201).json({ message: "Saved with AI feedback", aiReply });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to save journal" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
   
    const entries = await Journal.find({ userId: req.user.id }).sort({ date: -1 });
    
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});



router.get("/moods/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const entries = await Journal.find({ userId }).sort({ date: 1 });

    // const moodData = entries.map((entry) => ({
    //   date: entry.date.toISOString().split("T")[0],
    //   mood: entry.mood,
    //   thought: entry.thought,
    //   aiReply: entry.aiReply,
    // }));
  //  console.log("moodData",moodData);

    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch moods" });
  }
});

router.get("/streak", authMiddleware, async (req, res) => {
  const entries = await Journal.find({ userId: req.user.id }).sort({ date: -1 });

  const datesSet = new Set(
    entries.map((entry) =>
      new Date(entry.date).toISOString().split("T")[0] // only YYYY-MM-DD
    )
  );
  
  const today = new Date();
  let streak = 0;
  let totalDays = datesSet.size;

  for (let i = 0; i < 1000; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const key = day.toISOString().split("T")[0];

    if (datesSet.has(key)) {
      streak++;
    } else {
      break;
    }
  }

  res.json({ totalDays, streak });
});


module.exports = router;