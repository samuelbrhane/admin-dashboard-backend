const express = require("express");
const router = express.Router();
const { getAdmins } = require("../controllers/management");

router.get("/admins", getAdmins);

module.exports = router;
