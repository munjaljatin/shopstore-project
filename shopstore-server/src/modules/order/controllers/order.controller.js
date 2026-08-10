const pool = require("../../../config/db");
const {
  createOrder,
  reduceStock,
} = require("../repositories/order.repository");

const buyProduct = async (req, res) => {
  const client = await pool.connect();

  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        message: "Valid productId and quantity are required",
      });
    }

    const productResult = await client.query(
      `
            SELECT *
            FROM products
            WHERE id = $1
            `,
      [productId],
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const product = productResult.rows[0];

    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    const totalAmount = Number(product.price) * quantity;

    await client.query("BEGIN");

    const order = await createOrder(client, {
      customerId: req.user.userId,
      productId,
      quantity,
      price: product.price,
      totalAmount,
    });

    await reduceStock(client, productId, quantity);

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  } finally {
    client.release();
  }
};

module.exports = { buyProduct };
