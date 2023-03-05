const express = require("express");
const Route = express.Router();

Route.get("/", (req, res) => {
  res.send("Welcome");
});

module.exports = Route;
