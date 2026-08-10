const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});

// vendor only
router.get(
  "/vendor-dashboard",
  authenticate,
  authorize("vendor"),
  (req, res) => {
    res.json({
      message: "Welcome Vendor",
      user: req.user,
    });
  },
);

// customer dashboard
router.get(
  "/customer-dashboard",
  authenticate,
  authorize("customer"),
  (req, res) => {
    res.json({
      message: "Welcome User",
      user: req.user,
    });
  },
);

module.exports = router;
