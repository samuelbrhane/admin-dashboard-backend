const express = require("express");
const router = express.Router();
const { getAllStats } = require("../controllers/sales");

router.get("/totalStat", getAllStats);

module.exports = router;
