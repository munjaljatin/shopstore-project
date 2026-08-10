const pool = require("../../../config/db");

const createProduct = async ({
  vendorId,
  name,
  description,
  price,
  stock,
  image_url,
}) => {
  const result = await pool.query(
    `
        INSERT INTO products
        (
            vendor_id,
            name,
            description,
            price,
            stock,
            image_url
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
    [vendorId, name, description, price, stock, image_url],
  );

  return result.rows[0];
};

const getProductsByVendor = async (vendorId) => {
  const result = await pool.query(
    `
        SELECT *
        FROM products
        WHERE vendor_id = $1
        ORDER BY created_at DESCf
        `,
    [vendorId],
  );

  return result.rows;
};

const getProductById = async (id) => {
  const result = await pool.query(
    `
        SELECT *
        FROM products
        WHERE id = $1
        `,
    [id],
  );

  return result.rows[0];
};

const updateProduct = async (id, name, description, price) => {
  const result = await pool.query(
    `
        UPDATE products
        SET
            name = $1,
            description = $2,
            price = $3,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *
        `,
    [name, description, price, id],
  );

  return result.rows[0];
};

const updateStock = async (id, stock) => {
  const result = await pool.query(
    `
        UPDATE products
        SET
            stock = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
        `,
    [stock, id],
  );

  return result.rows[0];
};

const deleteProduct = async (id) => {
  await pool.query(
    `
        DELETE FROM products
        WHERE id = $1
        `,
    [id],
  );
};

// Customer Store Models
// GET All Products
const getAllProducts = async (limit, category, maxPrice, sortBy) => {
  let query = `
    SELECT
      id,
      name,
      description,
      price,
      stock,
      image_url,
      created_at
    FROM products
  `;

  const values = [];
  const conditions = [];

  // Category Filter
  if (category && category !== "All") {
    conditions.push(`category = $${values.length + 1}`);
    values.push(category);
  }

  // Price Filter
  if (maxPrice) {
    conditions.push(`price <= $${values.length + 1}`);
    values.push(Number(maxPrice));
  }

  // WHERE
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  // ORDER BY
  switch (sortBy) {
    case "priceAsc":
      query += " ORDER BY price ASC";
      break;

    case "priceDesc":
      query += " ORDER BY price DESC";
      break;

    case "nameAsc":
      query += " ORDER BY name ASC";
      break;

    case "nameDesc":
      query += " ORDER BY name DESC";
      break;

    default:
      query += " ORDER BY created_at DESC";
  }

  // LIMIT
  if (limit) {
    query += ` LIMIT $${values.length + 1}`;
    values.push(Number(limit));
  }

  console.log(query);
  console.log(values);

  const result = await pool.query(query, values);

  return result.rows;
};

// User can serach a product by providing a keyword
const searchProducts = async (keyword) => {
  const query = `SELECT
            id,
            name,
            description,
            price,
            stock,
            image_url
        FROM products
        WHERE LOWER(name)
        LIKE LOWER($1)`;
  const result = await pool.query(query, [`%${keyword}%`]);
  return result.rows;
};

// Get the details of a specifice product
const getProductDetails = async (id) => {
  const query = `
        SELECT
            id,
            name,
            description,
            price,
            stock,
            image_url,
            created_at
        FROM products
        WHERE id = $1
        `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createProduct,
  getProductsByVendor,
  getProductById,
  updateProduct,
  updateStock,
  deleteProduct,
  getAllProducts,
  searchProducts,
  getProductDetails,
};
