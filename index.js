const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mainRoutes = require("./routes/mainRoutes");
const salesRoutes = require("./routes/salesRoutes");
const managementRoutes = require("./routes/managementRoutes");
const clientRoutes = require("./routes/clientRoutes");

// Configuration
dotenv.config();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Admin Dashboard API.</h1>");
});

app.use("/api/main", mainRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
