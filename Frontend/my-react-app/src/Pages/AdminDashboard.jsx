import axios from "axios";
import { getToken, logout } from "../auth";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/expenses`, {
        headers: { authorization: getToken() }
      });
      setData(res.data);
    } catch (err) {
      console.error("Fetch admin data error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportExcel = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/export`, {
        headers: { authorization: getToken() },
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Export error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
            Admin Dashboard
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={exportExcel}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg active:scale-95 transition-all duration-300 font-medium"
            >
              📊 Export Excel
            </button>

            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:from-rose-600 hover:to-rose-700 hover:shadow-lg active:scale-95 transition-all duration-300 font-medium"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-xl font-semibold text-gray-700">
              All User Expenses
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0">
                <tr className="text-gray-600 uppercase text-xs tracking-wider">
                  <th className="px-4 py-4 text-left font-semibold">User</th>
                  <th className="px-4 py-4 text-left font-semibold">Email</th>
                  <th className="px-4 py-4 text-left font-semibold">Expense</th>
                  <th className="px-4 py-4 text-left font-semibold">Category</th>
                  <th className="px-4 py-4 text-left font-semibold">Amount</th>
                  <th className="px-4 py-4 text-left font-semibold">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {data.map((e, i) => (
                  <tr
                    key={e._id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors duration-200 cursor-pointer"
                  >
                    <td className="px-4 py-4 font-medium text-gray-800">
                      {e.userId.name}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {e.userId.email}
                    </td>
                    <td className="px-4 py-4 text-gray-700">
                      {e.name}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                        {e.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-emerald-600 text-lg">
                      ₹{e.amount}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-12 text-gray-400 text-lg"
                    >
                      No expense data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}