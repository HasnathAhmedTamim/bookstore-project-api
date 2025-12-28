const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Validate that all required env variables exist
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new Error("Missing required database environment variables");
}

pool.getConnection().then(() => {
  console.log("MySQL Pool Connected!");
}).catch(err => {
  console.error("Database connection failed:", err.message);
});

module.exports = pool;
