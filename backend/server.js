const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const journalRoutes = require("./routes/Journal.js");
const authRoutes = require("./routes/auth.js");
const aiRoutes= require("./routes/ai")
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/journal", journalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai",aiRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
