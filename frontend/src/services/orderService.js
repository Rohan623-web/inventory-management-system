import api from "./api";

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const createOrder = async (data) => {
  const response = await api.post("/orders", data);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await api.post(`/orders/${id}/cancel`);
  return response.data;
};