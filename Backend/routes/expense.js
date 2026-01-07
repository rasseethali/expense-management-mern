const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

// ADD EXPENSE (USER)
router.post("/", auth, async (req, res) => {
  const expense = new Expense({
    userId: req.user.id,
    name: req.body.name,
    category: req.body.category,
    amount: req.body.amount
  });
  await expense.save();
  res.json(expense);
});

// GET MY EXPENSES
router.get("/", auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
});

module.exports = router;
