const pool = require("../../../config/db");

const createOrder = async (
  client,
  { customerId, productId, quantity, price, totalAmount },
) => {
  const result = await client.query(
    `
        INSERT INTO orders
        (
            customer_id,
            product_id,
            quantity,
            price,
            total_amount
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
    [customerId, productId, quantity, price, totalAmount],
  );

  return result.rows[0];
};
const reduceStock = async (client, productId, quantity) => {
  await client.query(
    `
        UPDATE products
        SET
            stock = stock - $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        `,
    [quantity, productId],
  );
};

module.exports = { createOrder, reduceStock };
