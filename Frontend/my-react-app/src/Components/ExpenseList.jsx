export default function ExpenseList({ expenses }) {
  return (
    <div className="bg-white p-4 rounded shadow w-full md:w-2/3 mb-4">
      <h2 className="text-lg font-semibold mb-2">Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, idx) => (
              <tr key={idx}>
                <td className="border p-2">{e.name}</td>
                <td className="border p-2">{e.category}</td>
                <td className="border p-2">₹{e.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
