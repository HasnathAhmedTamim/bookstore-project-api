import { useEffect, useState } from "react";
import { getDailySales } from "../services/api";

export default function DailySales() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async (qDate) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDailySales(qDate);
      setData(res.data || []);
    } catch (err) {
      setError(err?.message || (err && JSON.stringify(err)) || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await fetchData();
    })();
    return () => (mounted = false);
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Daily Sales Report</h2>
      {/* fetches all sales on mount; no date filter */}

      {loading ? (
        <div className="text-center py-6">Loading...</div>
      ) : error ? (
        <div className="text-red-600 py-4">Error: {error}</div>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Book</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="border p-4 text-center text-sm text-gray-600">
                  No records
                </td>
              </tr>
            ) : (
              data.map((row, i) => {
                const key = `${row.SaleDate}-${row.CustomerName}-${row.BookTitle}-${i}`;
                const price = row.Price != null ? Number(row.Price).toFixed(2) : "-";
                const total = row.TotalAmount != null ? Number(row.TotalAmount).toFixed(2) : "-";
                return (
                  <tr key={key} className="text-center">
                    <td className="border p-2">{row.SaleDate}</td>
                    <td className="border p-2">{row.CustomerName}</td>
                    <td className="border p-2">{row.BookTitle}</td>
                    <td className="border p-2">{row.Quantity}</td>
                    <td className="border p-2">{price}</td>
                    <td className="border p-2 font-semibold">{total}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
