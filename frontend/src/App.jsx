

import './App.css'
import DailySales from "./components/DailySales"
import MonthlySales from "./components/MonthlySales"
import BestSelling from "./components/BestSelling"
import CustomerPurchase from "./components/CustomerPurchase"

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Bookstore Sales Reports</h1>
      <div className="max-w-6xl mx-auto space-y-6">
        <DailySales />
        <MonthlySales />
        <BestSelling />
        <CustomerPurchase />
      </div>
    </div>
  )
}

export default App
