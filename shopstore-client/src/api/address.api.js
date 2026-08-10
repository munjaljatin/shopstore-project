import api from "./axios";

// Get all addresses of the logged-in customer
export const getAddresses = async () => {
  const response = await api.get("/address");
  return response.data;
};

// Get a single address
export const getAddressById = async (id) => {
  const response = await api.get(`/address/${id}`);
  return response.data;
};

// Create a new address
export const createAddress = async (addressData) => {
  const response = await api.post("/address", addressData);
  return response.data;
};

// Update an existing address
export const updateAddress = async (id, addressData) => {
  const response = await api.patch(`/address/${id}`, addressData);
  return response.data;
};

// Delete an address
export const deleteAddress = async (id) => {
  const response = await api.delete(`/address/${id}`);
  return response.data;
};

// Set an address as primary
export const setPrimaryAddress = async (id) => {
  const response = await api.patch(`/address/${id}/primary`);
  return response.data;
};
