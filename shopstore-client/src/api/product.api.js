import api from "./axios";

export const getProducts = async (
  category = "All",
  maxPrice = null,
  sortBy = "newest",
) => {
  const params = {};
  if (category !== "All") {
    params.category = category;
  }
  if (maxPrice !== null) {
    params.maxPrice = maxPrice;
  }
  params.sortBy = sortBy;
  const response = await api.get("/products", {
    params,
  });
  return response.data;
};

export const searchProducts = async (keyword) => {
  const response = await api.get("/products/search", {
    params: {
      keyword,
    },
  });

  return response.data;
};
export const getFeaturedProducts = async () => {
  const response = await api.get("/products?limit=8");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
