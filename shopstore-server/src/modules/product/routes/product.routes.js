const express = require("express");
const upload = require("../../../middlewares/upload.middleware");

const router = express.Router();

const { authenticate, authorize } = require("../../auth");

const {
  addProduct,
  myProducts,
  editProduct,
  editStock,
  removeProduct,
  viewAllProducts,
  searchProduct,
  viewProductDetails,
} = require("../controllers/product.controller");

router.post(
  "/",
  authenticate,
  authorize("vendor"),
  upload.single("image"),
  addProduct,
);

router.get("/my-products", authenticate, authorize("vendor"), myProducts);
router.patch("/:id", authenticate, authorize("vendor"), editProduct);
router.patch("/:id/stock", authenticate, authorize("vendor"), editStock);
router.delete("/:id", authenticate, authorize("vendor"), removeProduct);

// Customer Store routes
router.get("/", viewAllProducts);
router.get("/search", searchProduct);
router.get("/:id", viewProductDetails);

module.exports = router;
