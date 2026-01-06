const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['Food', 'Medical', 'Grocery', 'Recharge', 'Travel', 'Savings', 'Clothing', 'Fitness', 'Others'], default: 'Others' },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", expenseSchema);
