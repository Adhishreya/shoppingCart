import axios from "axios";

const url = "http://localhost:5000/";

export const getOrderItems = async (id) => {
  const orderItems = await axios.get(`${url}orders/items/${id}`, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });
  console.log(orderItems.data);
  return orderItems.data;
};

export const getInTransitOrderItems = async () => {
  const orderItems = await axios.get(`${url}orders/items`, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });
  return orderItems.data;
};

export const getDeliveredItems = async () => {
  const orderItems = await axios.get(`${url}orders/delivered`, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });
  return orderItems.data;
};

export const cancelOrder = async (id) => {
  const returnedOrder = await axios.post(`${url}orders/cancel/${id}`, null, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });
  return returnedOrder.data;
};

export const returnOrder = async (id) => {
  const returnedOrder = await axios.post(`${url}orders/return/${id}`, null, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });
  return returnedOrder.data;
};

export const getReturnedItems = async () => {
  const orderItems = await axios.get(`${url}orders/returned`, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });
  return orderItems.data;
};

export const getCancelledItems = async () => {
  const orderItems = await axios.get(`${url}orders/cancelled`, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });
  return orderItems.data;
};
