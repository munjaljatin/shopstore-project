const express = require("express");
const {
  addAddress,
  getAllAddresses,
  getAddress,
  editAddress,
  removeAddress,
  makePrimaryAddress,
} = require("../controllers/address.controller");
const { authenticate, authorize } = require("../../auth");
const router = express.Router();

// All address routes require:
// 1. Authentication
// 2. Customer role
router.use(authenticate);
router.use(authorize("customer"));

// Get all addresses of logged-in customer
router.get("/", getAllAddresses);

// Get a single address
router.get("/:id", getAddress);

// Create a new address
router.post("/", addAddress);

// Update an address
router.patch("/:id", editAddress);

// Delete an address
router.delete("/:id", removeAddress);

// Set an address as primary
router.patch("/:id/primary", makePrimaryAddress);

module.exports = router;
