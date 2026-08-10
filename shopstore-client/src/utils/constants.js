const API_URL = "http://localhost:3000";

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return "https://placehold.co/600x600?text=No+Image";
  }

  // Already a complete URL
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Backend-relative image path
  return `${API_URL}${imageUrl}`;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};
