import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.17:8000",
});

export const createOrder = (order) => API.post("/order", order);
export const getOrders = () => API.get("/orders");
export const printOrder = (id) => API.post(`/orders/${id}/print`);
export const updateOrderStatus = (id, status) =>
  API.post(`/orders/${id}/status?status=${status}`);