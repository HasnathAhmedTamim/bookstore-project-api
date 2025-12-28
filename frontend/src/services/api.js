import axios from "axios";

const BASE_URL = "http://localhost:5000/api/reports";

export const getDailySales = (date) =>
  axios.get(`${BASE_URL}/daily-sales`, { params: date ? { date } : {} });

export const getMonthlySales = () =>
  axios.get(`${BASE_URL}/monthly-sales`);

export const getBestSelling = () =>
  axios.get(`${BASE_URL}/best-selling-books`);

export const getCustomerPurchases = () =>
  axios.get(`${BASE_URL}/customer-purchases`);
