import api from "./axios";

export const createOrder = async ({ productId, quantity }) => {
  const response = await api.post("/orders", {
    productId,
    quantity,
  });
  return response.data;
};
