const express = require("express");
const Expense = require("../models/Expense");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// ADD EXPENSE (USER)
router.post("/add", auth, async (req, res) => {
  const { name, category, amount } = req.body;

  // Fetch user details from database
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json("User not found");

  const expense = new Expense({
    userId: req.user.id,
    userName: user.name,
    userEmail: user.email,
    name,
    category,
    amount
  });

  await expense.save();
  res.json("Expense added");
});

// USER DATA
router.get("/my", auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const user = await User.findById(req.user.id);
  const remaining = user.monthlyBudget - totalSpent;
  res.json({ expenses, totalSpent, remaining, monthlyBudget: user.monthlyBudget });
});

module.exports = router;
