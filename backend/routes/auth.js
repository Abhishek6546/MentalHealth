const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();
// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("backend",name, email, password)
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email } });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/user",authMiddleware,async(req,res)=>{
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) return res.status(400).json({ message: "User not found" });
    res.status(200).json({user});
  } catch (err) {
    res.status(500).json({ error: "profile fetching failed" });
  }
})

module.exports = router;
