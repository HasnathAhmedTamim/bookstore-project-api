const db = require("../config/db");

// Daily Sales Report
exports.dailySales = async (date) => {
  // If a date is provided, filter by that date; otherwise return all daily sales
  let sql = `
    SELECT 
        DATE_FORMAT(s.SaleDate, '%Y-%m-%d') AS SaleDate,
        c.CustomerName,
        b.Title AS BookTitle,
        sd.Quantity,
        sd.UnitPrice AS Price,
        (sd.Quantity * sd.UnitPrice) AS TotalAmount
    FROM SaleDetails sd
    JOIN Sale s ON sd.SaleID = s.SaleID
    JOIN Book b ON sd.BookID = b.BookID
    JOIN Customer c ON s.CustomerID = c.CustomerID
  `;

  const params = [];
  if (date) {
    // compare by DATE only so a date string like '2025-01-15' matches datetimes
    sql += ` WHERE DATE(s.SaleDate) = ? `;
    params.push(date);
  }

  sql += ` ORDER BY s.SaleDate, c.CustomerName, b.Title `;

  const [result] = params.length ? await db.query(sql, params) : await db.query(sql);
  return result;
};

// Monthly Sales Report
exports.monthlySales = async () => {
  const sql = `
    SELECT 
        DATE_FORMAT(s.SaleDate, '%Y-%m') AS Month,
        SUM(sd.Quantity) AS TotalBooksSold,
        IFNULL(SUM(sd.Quantity * sd.UnitPrice), 0) AS TotalSales
    FROM Sale s
    JOIN SaleDetails sd ON s.SaleID = sd.SaleID
    GROUP BY Month
    ORDER BY Month
  `;
  const [result] = await db.query(sql);
  return result;
};

// Best Selling Books Report
exports.bestSellingBooks = async () => {
  const sql = `
    SELECT 
        b.Title AS BookTitle,
        a.AuthorName AS Author,
        SUM(sd.Quantity) AS TotalQuantitySold
    FROM SaleDetails sd
    JOIN Book b ON sd.BookID = b.BookID
    JOIN Author a ON b.AuthorID = a.AuthorID
    GROUP BY b.BookID
    ORDER BY TotalQuantitySold DESC
  `;
  const [result] = await db.query(sql);
  return result;
};

// Customer Purchases Report
exports.customerPurchases = async () => {
  const sql = `
    SELECT 
        c.CustomerName,
        c.ContactNumber,
        COUNT(DISTINCT s.SaleID) AS NumberOfPurchases,
        IFNULL(SUM(sd.Quantity * sd.UnitPrice), 0) AS TotalAmountSpent
    FROM Customer c
    LEFT JOIN Sale s ON c.CustomerID = s.CustomerID
    LEFT JOIN SaleDetails sd ON s.SaleID = sd.SaleID
    GROUP BY c.CustomerID
    ORDER BY TotalAmountSpent DESC
  `;
  const [result] = await db.query(sql);
  return result;
};
