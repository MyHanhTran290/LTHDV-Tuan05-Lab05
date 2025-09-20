const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (user) return res.status(400).json({ message: "User exists" });

  user = new User({ username, password });
  await user.save();

  res.json({ message: "Registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Lưu user vào session
  req.session.user = { id: user._id, username: user.username };

  res.json({ message: "Login success", session: req.session });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid"); // xoá cookie session mặc định
    res.json({ message: "Logged out" });
  });
});

// Protected route
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json({ message: "Current user", user: req.session.user });
});

module.exports = router;
