const express = require("express");
const router = express.Router();
const controller = require("../controllers/reportController");

// Report Routes
router.get("/daily-sales", controller.dailySales);          
router.get("/monthly-sales", controller.monthlySales);  
router.get("/best-selling-books", controller.bestSellingBooks); 
router.get("/customer-purchases", controller.customerPurchases); 

module.exports = router;
