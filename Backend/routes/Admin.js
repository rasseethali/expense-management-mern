const express = require("express");
const Expense = require("../models/Expense");
const User = require("../models/User");
const auth = require("../middleware/auth");
const XLSX = require("xlsx");

const router = express.Router();

// GET ALL EXPENSES (ADMIN ONLY)
router.get("/expenses", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json("Access denied");

  const expenses = await Expense.find();
  res.json(expenses);
});

// EXPORT TO EXCEL (ADMIN ONLY)
router.get("/export", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json("Access denied");

  const expenses = await Expense.find();
  const data = expenses.map(e => ({
    User: e.userName,
    Email: e.userEmail,
    Name: e.name,
    Category: e.category,
    Amount: e.amount,
    Date: e.createdAt.toISOString().split('T')[0]
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Expenses");
  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.send(buffer);
});

module.exports = router;
