export default function Header() {
  const role = localStorage.getItem("role");
  return (
    <header className="bg-blue-600 text-white p-4 rounded mb-4">
      <h1 className="text-xl font-semibold">Expense Manager ({role})</h1>
    </header>
  );
}
