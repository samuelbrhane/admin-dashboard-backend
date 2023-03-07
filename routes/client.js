const express = require("express");
const router = express.Router();
const { getProducts, getCustomers } = require("../controllers/client");

// get all products
router.get("/products", getProducts);

// get all customers
router.get("/customers", getCustomers);

module.exports = router;
