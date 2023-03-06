const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/client");

router.get("/products", getProducts);

module.exports = router;
