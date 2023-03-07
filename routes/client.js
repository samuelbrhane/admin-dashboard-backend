const express = require("express");
const router = express.Router();
const {
  getProducts,
  getCustomers,
  getTransactions,
} = require("../controllers/client");

// get all products
router.get("/products", getProducts);

// get all customers
router.get("/customers", getCustomers);

// get transactions
router.get("/transactions", getTransactions);

module.exports = router;
