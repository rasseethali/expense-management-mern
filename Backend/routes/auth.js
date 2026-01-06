const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// SIGNUP
router.post("/register", async (req, res) => {
  const { name, email, password, monthlyBudget } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const role = email.includes('admin') ? 'admin' : 'user';

  const user = new User({ name, email, password: hashed, role, monthlyBudget: monthlyBudget || 0 });
  await user.save();

  res.json("Signup successful");
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json("Wrong password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token, role: user.role });
});

module.exports = router;
