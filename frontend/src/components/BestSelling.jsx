import { useEffect, useState } from "react";
import { getBestSelling } from "../services/api";

export default function BestSelling() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await getBestSelling();
        if (!mounted) return;
        setData(res.data);
      } catch (err) {
        // swallow - components can be enhanced to show errors
        console.error('BestSelling load error', err);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Best-Selling Books</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Book</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Quantity Sold</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row,i) => (
            <tr key={i} className="text-center hover:bg-gray-50">
              <td className="border p-2">{row.BookTitle ?? row.Title}</td>
              <td className="border p-2">{row.Author ?? row.AuthorName}</td>
              <td className="border p-2 font-semibold">{row.TotalQuantitySold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
