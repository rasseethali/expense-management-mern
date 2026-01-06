import axios from "axios";
import { getToken, logout } from "../auth";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [data, setData] = useState({ expenses: [], totalSpent: 0, remaining: 0, monthlyBudget: 0 });
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/expense/my", {
      headers: { authorization: getToken() }
    });
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addExpense = async () => {
    await axios.post("http://localhost:5000/expense/add", {
      name,
      category,
      amount: Number(amount)
    }, {
      headers: { authorization: getToken() }
    });
    setName("");
    setAmount("");
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">User Dashboard</h2>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Monthly Budget</h3>
            <p className="text-2xl">₹{data.monthlyBudget}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Spent</h3>
            <p className="text-2xl">₹{data.totalSpent}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Remaining</h3>
            <p className="text-2xl">₹{data.remaining}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Add Expense</h3>
          <input
            className="w-full p-2 mb-2 border rounded"
            placeholder="Expense Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <select
            className="w-full p-2 mb-2 border rounded"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
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
            className="w-full p-2 mb-2 border rounded"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={addExpense}
          >
            Add Expense
          </button>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Expense List</h3>
          <ul>
            {data.expenses.map(e => (
              <li key={e._id} className="flex justify-between py-2 border-b">
                <span>{e.name} ({e.category})</span>
                <span>₹{e.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
