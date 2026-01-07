const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  category: String,
  amount: Number,
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
