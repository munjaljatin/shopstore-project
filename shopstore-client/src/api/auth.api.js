import api from "./axios";

export const registerUser = (data) => {
  const response = api.post("/auth/register", data);
  return response;
};

export const loginUser = (data) => {
  const response = api.post("/auth/login", data);
  return response;
};
