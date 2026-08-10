const pool = require("../../../config/db");

// Create a new address
const createNewAddress = async ({
  userId,
  addressType,
  fullName,
  phone,
  addressLine1,
  addressLine2,
  city,
  state,
  postalCode,
  country,
  isPrimary = false,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // If the new address should be primary, // remove primary status from the user's existing address.
    if (isPrimary) {
      await client.query(
        `
        UPDATE addresses
        SET
          is_primary = FALSE,
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1 AND is_primary = TRUE;
        `,
        [userId],
      );
    }

    // Create the new address
    const result = await client.query(
      `
        INSERT INTO addresses ( user_id, address_type, full_name, phone, address_line1, address_line2, city, state, postal_code, country, is_primary )
        VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 )
        RETURNING *;
        `,
      [
        userId,
        addressType,
        fullName,
        phone,
        addressLine1,
        addressLine2 || null,
        city,
        state,
        postalCode,
        country || "India",
        isPrimary,
      ],
    );

    await client.query("COMMIT");

    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// Get all addresses belonging to a user
const getAddressesByUserId = async (userId) => {
  const query = `
        SELECT
            id,
            user_id,
            address_type,
            full_name,
            phone,
            address_line1,
            address_line2,
            city,
            state,
            postal_code,
            country,
            is_primary,
            created_at,
            updated_at
        FROM addresses
        WHERE user_id = $1
        ORDER BY is_primary DESC, created_at DESC;
        `;

  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Get one address belonging to a specific user
const getAddressById = async (addressId, userId) => {
  const query = ` SELECT id, user_id, address_type, full_name, phone, address_line1, address_line2, city, state, postal_code, country, is_primary, created_at, updated_at FROM addresses WHERE id = $1 AND user_id = $2; `;
  const result = await pool.query(query, [addressId, userId]);
  return result.rows[0];
};

// Update an address
const updateAddress = async (addressId, userId, addressData) => {
  const {
    addressType,
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isPrimary,
  } = addressData;

  const query = `
    UPDATE addresses
    SET
      address_type = COALESCE($3, address_type),
      full_name = COALESCE($4, full_name),
      phone = COALESCE($5, phone),
      address_line1 = COALESCE($6, address_line1),
      address_line2 = COALESCE($7, address_line2),
      city = COALESCE($8, city),
      state = COALESCE($9, state),
      postal_code = COALESCE($10, postal_code),
      country = COALESCE($11, country),
      is_primary = COALESCE($12, is_primary)
    WHERE id = $1
      AND user_id = $2
    RETURNING *;
  `;

  const values = [
    addressId,
    userId,
    addressType,
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isPrimary,
  ];

  const result = await pool.query(query, values);

  return result.rows[0] || null;
};

// Delete an address

const deleteAddress = async (addressId, userId) => {
  const query = ` DELETE FROM addresses WHERE id = $1 AND user_id = $2 RETURNING *; `;
  const result = await pool.query(query, [addressId, userId]);
  return result.rows[0];
};

// Set an Address as a Primary Address
const setPrimaryAddress = async (addressId, userId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Remove primary status from the user's current primary address
    await client.query(
      `
        UPDATE addresses
        SET
          is_primary = FALSE,
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1 AND is_primary = TRUE;
        `,
      [userId],
    );
    // Make the selected address primary
    const result = await client.query(
      `
        UPDATE addresses
        SET
          is_primary = TRUE,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1 AND user_id = $2 RETURNING *;
        `,
      [addressId, userId],
    );
    // Address doesn't belong to this user if (result.rows.length === 0) { throw new Error("Address not found"); }
    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createNewAddress,
  getAddressesByUserId,
  setPrimaryAddress,
  getAddressById,
  deleteAddress,
  updateAddress,
};
