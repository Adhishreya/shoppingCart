import axios from "axios";
import {
  CANCELLED_ORDERS,
  DELIVERED_ORDERS,
  INTRANSIT_ORDERS,
  ORDER_PROCESS,
  RETURNED_ORDERS,
  url,
} from "../constants/constant";
import { useMutation, useQuery } from "react-query";

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

export const useGetInTransitOrderItems = () => {
  return useQuery([INTRANSIT_ORDERS], () => getInTransitOrderItems(), {
    refetchOnWindowFocus: false,
  });
};

export const getDeliveredItems = async () => {
  const orderItems = await axios.get(`${url}orders/delivered`, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });
  return orderItems.data;
};

export const useGetDeliveredItems = () => {
  return useQuery([DELIVERED_ORDERS], () => getDeliveredItems(), {
    refetchOnWindowFocus: false,
  });
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

export const useGetReturnedItems = () => {
  return useQuery([RETURNED_ORDERS], () => getReturnedItems(), {
    refetchOnWindowFocus: false,
  });
};

export const getCancelledItems = async () => {
  const orderItems = await axios.get(`${url}orders/cancelled`, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });
  return orderItems.data;
};

export const useGetCancelledItems = () => {
  return useQuery([CANCELLED_ORDERS], () => getCancelledItems(), {
    refetchOnWindowFocus: false,
  });
};

export const orderCheckout = (paymentMode, provider, address, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}orders/checkout`,
        { paymentMode: paymentMode, provider: provider, address: address },
        {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log("success");
        resolve(res);
      })
      .catch((e) => console.log("error"));
    // .then((res) => {
    //   if (res.status === 200) {
    //     console.log("res", res.data);
    //     axios
    //       .post(
    //         `${url}status/success`,
    //         {
    //           order_id: res.data,
    //           paymentMode,
    //         },
    //         {
    //           headers: {
    //             Authorization: "bearer " + localStorage.getItem("token"),
    //           },
    //         }
    //       )
    //       .then((result) => {
    //         console.log(result.data, "fial");
    //         resolve("Payment successful");
    //         // navigate("/");
    //       });
    //   }
    // });
  });
};

export const useOrderCheckout = (
  paymentMode,
  address,
  navigate,
  onSuccess,
  onError
) => {
  return useMutation(
    (paymentMode, provider, address) =>
      orderCheckout(paymentMode, provider, address, navigate),
    {
      onSuccess: (d) => onSuccess(d),
      onError: (d) => onError(d),
      mutationKey: [ORDER_PROCESS],
    }
  );
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
