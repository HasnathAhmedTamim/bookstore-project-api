import { useEffect, useState } from "react";
import { getMonthlySales } from "../services/api";

export default function MonthlySales() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getMonthlySales();
        if (!mounted) return;
        setData(res.data);
      } catch (err) {
        if (!mounted) return;
        setError(err?.message || (err && JSON.stringify(err)) || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Monthly Sales Summary</h2>
      {loading ? (
        <div className="text-center py-6">Loading...</div>
      ) : error ? (
        <div className="text-red-600 py-4">Error: {error}</div>
      ) : (
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Month</th>
            <th className="border p-2">Books Sold</th>
            <th className="border p-2">Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row,i) => (
            <tr key={i} className="text-center">
              <td className="border p-2">{row.Month}</td>
              <td className="border p-2">{row.TotalBooksSold}</td>
              <td className="border p-2 font-semibold">{row.TotalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}
