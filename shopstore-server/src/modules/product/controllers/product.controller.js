const {
  createProduct,
  getProductsByVendor,
  getProductById,
  deleteProduct,
  updateProduct,
  updateStock,
  getAllProducts,
  searchProducts,
  getProductDetails,
} = require("../repositories/product.repository");

// Vendor Side Requirements
const checkOwnership = async (productId, vendorId) => {
  const product = await getProductById(productId);
  if (!product) {
    return {
      error: {
        status: 404,
        message: "Product not found",
      },
    };
  }
  if (product.vendor_id !== vendorId) {
    return {
      error: {
        status: 403,
        message: "You do not own this product",
      },
    };
  }
  return { product };
};

const addProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { name, description, price, stock } = req.body;

    if (!name || price == null || stock == null) {
      return res.status(400).json({
        message: "Name, price and stock are required",
      });
    }

    const image_url = req.file ? `/images/${req.file.filename}` : null;

    const product = await createProduct({
      vendorId: req.user.userId,
      name,
      description,
      price,
      stock,
      image_url,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const myProducts = async (req, res) => {
  try {
    const products = await getProductsByVendor(req.user.userId);

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, price } = req.body;

    const result = await checkOwnership(id, req.user.userId);

    if (result.error) {
      return res
        .status(result.error.status)
        .json({ message: result.error.message });
    }

    const product = await updateProduct(id, name, description, price);

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const editStock = async (req, res) => {
  try {
    const { id } = req.params;

    const { stock } = req.body;

    const result = await checkOwnership(id, req.user.userId);

    if (result.error) {
      return res
        .status(result.error.status)
        .json({ message: result.error.message });
    }

    const product = await updateStock(id, stock);

    res.json({
      message: "Stock updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await checkOwnership(id, req.user.userId);

    if (result.error) {
      return res
        .status(result.error.status)
        .json({ message: result.error.message });
    }

    await deleteProduct(id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Customer Store Controllers
const viewAllProducts = async (req, res) => {
  try {
    const { limit, category, maxPrice, sortBy } = req.query;
    const products = await getAllProducts(limit, category, maxPrice, sortBy);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        message: "Search keyword is required",
      });
    }

    const products = await searchProducts(keyword);

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const viewProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductDetails(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addProduct,
  myProducts,
  editProduct,
  editStock,
  removeProduct,
  viewAllProducts,
  searchProduct,
  viewProductDetails,
};
