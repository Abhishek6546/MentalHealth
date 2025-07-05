const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  thought: { type: String, required: true },
  mood: { type: String },
  date: { type: Date, default: Date.now },
  aiReply: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Journal", JournalSchema);
