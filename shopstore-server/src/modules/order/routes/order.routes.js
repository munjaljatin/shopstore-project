const express = require("express");
const { buyProduct } = require("../controllers/order.controller");
const { authenticate, authorize } = require("../../auth");
const router = express.Router();

router.post("/", authenticate, authorize("customer"), buyProduct);

module.exports = router;
