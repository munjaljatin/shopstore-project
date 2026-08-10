const {
  createNewAddress,
  getAddressesByUserId,
  getAddressById,
  updateAddress,
  deleteAddress,
  setPrimaryAddress,
} = require("../repositories/address.repository");

// Create New Address
const addAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
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
    } = req.body;

    // Basic validation on Backend
    if (
      !addressType ||
      !fullName ||
      !phone ||
      !addressLine1 ||
      !city ||
      !state ||
      !postalCode
    ) {
      return res.status(400).json({
        message: "Required address fields are missing",
      });
    }

    const address = await createNewAddress({
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
    });
    res.status(201).json({
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    console.error(error);
    // Primary address unique constraint
    if (error.code === "23505") {
      return res.status(409).json({
        message: "User already has a primary address",
      });
    }
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get all the Addresses of logged-in customer
const getAllAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addresses = await getAddressesByUserId(userId);
    res.json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get a single address
const getAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const address = await getAddressById(id, userId);
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }
    res.json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Update address
const editAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

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
    } = req.body;

    if (
      !addressType ||
      !fullName ||
      !phone ||
      !addressLine1 ||
      !city ||
      !state ||
      !postalCode
    ) {
      return res.status(400).json({
        message: "Required address fields are missing",
      });
    }

    const address = await updateAddress(id, userId, {
      addressType,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.json({
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Delete address

const removeAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const address = await deleteAddress(id, userId);
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }
    res.json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Set primary address
const makePrimaryAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const address = await setPrimaryAddress(id, userId);
    res.json({
      message: "Primary address updated successfully",
      address,
    });
  } catch (error) {
    console.error(error);
    if (error.message === "Address not found") {
      return res.status(404).json({
        message: "Address not found",
      });
    }
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addAddress,
  getAllAddresses,
  getAddress,
  editAddress,
  removeAddress,
  makePrimaryAddress,
};
