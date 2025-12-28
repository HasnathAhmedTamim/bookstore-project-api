const model = require("../models/reportModel");

exports.dailySales = async (req, res) => {
  try {
    const result = await model.dailySales(req.query.date);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.monthlySales = async (req, res) => {
  try {
    const result = await model.monthlySales();
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.bestSellingBooks = async (req, res) => {
  try {
    const result = await model.bestSellingBooks();
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.customerPurchases = async (req, res) => {
  try {
    const result = await model.customerPurchases();
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
