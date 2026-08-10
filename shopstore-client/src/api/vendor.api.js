import api from "./axios";

export const getMyProducts = async () => {
  const response = await api.get("/products/my-products");
  return response.data;
};

export const createProduct = async (formData) => {
  console.log("API RECEIVED:", formData);
  console.log("IS FORMDATA:", formData instanceof FormData);

  for (const [key, value] of formData.entries()) {
    console.log(key, value instanceof File ? `FILE → ${value.name}` : value);
  }
  const response = await api.post("/products", formData);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.patch(`/products/${id}`, data);
  return response.data;
};

export const updateProductStock = async (id, stock) => {
  const response = await api.patch(`/products/${id}/stock`, {
    stock,
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
