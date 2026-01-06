import { useState } from "react";

export default function ExpenseForm({ onAdd }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) {
      alert("Enter name and amount");
      return;
    }
    onAdd({ name, category, amount: Number(amount) });
    setName(""); setAmount(""); setCategory("Food");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 w-full md:w-1/2">
      <h2 className="text-lg font-semibold mb-2">Add Expense</h2>
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 w-full rounded mb-2">
        <option>Food</option>
        <option>Medical</option>
        <option>Grocery</option>
        <option>Recharge</option>
        <option>Travel</option>
        <option>Savings</option>
        <option>Clothing</option>
        <option>Fitness</option>
        <option>Others</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add</button>
    </form>
  );
}
