import axios from "axios";
import { useMutation, useQuery } from "react-query";
import {
  CART_COUNT,
  PAYMENT_DETAILS,
  PRODUCTS,
  url,
} from "../constants/constant";

export const getCardDetails = (navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}payment/methods`, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then(
        (res) => {
          resolve(res.data);
        }
        // (err) => navigate("/error")
      );
  });
};

export const useGetCardDetails = (navigate) => {
  return useQuery([PAYMENT_DETAILS], () => getCardDetails(navigate), {
    refetchOnWindowFocus: false,
    onError: (d) => {
      navigate("/error");
    },
  });
};

const setCardDetails = (data, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}payment/methods`,
        { data: data },
        {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        }
      )
      .then(
        (res) => {
          resolve(res);
        }
        // (err) => navigate("/error")
      );
  });
};

export const useSetCardDetails = (data, onSuccess, onError, navigate) => {
  // return useMutation((data) => setCardDetails(data, navigate), {
  //   onError: onError,
  //   onSuccess: onSuccess,
  // });

  return useMutation((data) => setCardDetails(data, navigate), {
    onError: onError,
    onSuccess: onSuccess,
  });
};
