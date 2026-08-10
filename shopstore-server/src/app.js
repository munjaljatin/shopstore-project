const express = require("express");
const cors = require("cors");
const authModule = require("./modules/auth");
const productModule = require("./modules/product");
const orderModule = require("./modules/order");
const addressModule = require("./modules/address");
const logger = require("./middlewares/logger.middleware");
const path = require("path");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Static Files
const imagePath = path.join(__dirname, "../public/images");
app.use("/images", express.static(imagePath));

// API Routes
app.use("/api/auth", authModule.routes);
app.use("/api/products", productModule.routes);
app.use("/api/orders", orderModule.routes);
app.use("/api/address", addressModule.routes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-Commerce Monolith API...",
  });
});

module.exports = app;
