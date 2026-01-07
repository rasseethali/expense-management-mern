const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// SIGNUP
router.post("/register", async (req, res) => {
  try {
    console.log("Signup request:", req.body);
    const { name, email, password, monthlyBudget } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    const exist = await User.findOne({ email });
    if (exist) {
      console.log("User already exists:", email);
      return res.status(400).json("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const role = email.includes('admin') ? 'admin' : 'user';

    const user = new User({ name, email, password: hashed, role, monthlyBudget: monthlyBudget || 0 });
    await user.save();

    console.log("Signup successful for:", email);
    res.status(201).json("Signup successful");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json("Server error");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("Login request:", req.body.email);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json("Invalid credentials");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Wrong password for:", email);
      return res.status(401).json("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    console.log("Login successful for:", email);
    res.json({ token, role: user.role, name: user.name });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json("Server error");
  }
});

module.exports = router;
