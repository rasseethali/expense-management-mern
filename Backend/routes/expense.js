const express = require("express");
const Expense = require("../models/Expense");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// ADD EXPENSE (USER)
router.post("/", auth, async (req, res) => {
  try {
    const { name, category, amount } = req.body;
    if (!name || !category || !amount) {
      return res.status(400).json("All fields are required");
    }
    const expense = new Expense({
      userId: req.user.id,
      name,
      category,
      amount
    });
    await expense.save();
    res.json(expense);
  } catch (error) {
    console.error("Add expense error:", error);
    res.status(500).json("Server error");
  }
});

// GET MY EXPENSES
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const user = await User.findById(req.user.id);
    const monthlyBudget = user.monthlyBudget || 0;
    const remaining = monthlyBudget - totalSpent;
    res.json({ expenses, totalSpent, remaining, monthlyBudget });
  } catch (error) {
    console.error("Get expenses error:", error);
    res.status(500).json("Server error");
  }
});

// UPDATE BUDGET
router.put("/budget", auth, async (req, res) => {
  try {
    const { monthlyBudget } = req.body;
    if (monthlyBudget === undefined) {
      return res.status(400).json("Monthly budget is required");
    }
    await User.findByIdAndUpdate(req.user.id, { monthlyBudget });
    res.json("Budget updated");
  } catch (error) {
    console.error("Update budget error:", error);
    res.status(500).json("Server error");
  }
});

module.exports = router;
