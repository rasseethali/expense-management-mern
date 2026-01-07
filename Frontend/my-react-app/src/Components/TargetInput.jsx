export default function TargetInput({ target, setTarget, locked, setLocked, totalSpent, balance, onSet }) {
  const handleSet = () => {
    if (target <= 0) {
      alert("Enter valid target amount");
      return;
    }
    onSet(target);
    setLocked(true);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 w-full md:w-1/2">
      <h2 className="text-lg font-semibold mb-2">Monthly Target: ₹{target}</h2>
      <p>Total Spent: ₹{totalSpent}</p>
      <p>Balance: ₹{balance}</p>

      <input
        type="number"
        placeholder="Enter target amount"
        value={target}
        disabled={locked}
        onChange={(e) => setTarget(Number(e.target.value))}
        className="border p-2 w-full rounded mb-2"
      />

      {!locked && (
        <button onClick={handleSet} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Set Target
        </button>
      )}

      {locked && (
        <p className="text-green-600 text-sm text-center mt-2">
          Target locked for this session
        </p>
      )}
    </div>
  );
}
