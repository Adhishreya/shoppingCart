import axios from "axios";

const url = "http://localhost:5000/";

export const getOrderItems = async (id) => {
  const orderItems = await axios.get(`${url}orders/items/${id}`, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });
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


export const orderCheckout = (paymentMode, provider, address, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:5000/orders/checkout",
        { paymentMode: paymentMode, provider: provider, address: address },
        {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          axios
            .post(
              "http://localhost:5000/status/success",
              {
                order_id: res.data,
                paymentMode: "COD",
              },
              {
                headers: {
                  Authorization: "bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((result) => {
              resolve("Payment successful");
              navigate("/");
            });
        }
      });
  });
};

export const orders = (navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}orders`, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then(
        (res) => {
          resolve(res.data);
        },
        (err) => navigate("/error")
      );
  });
};