import axios from "axios";
import { useQuery } from "react-query";
import { CART_COUNT, PRODUCTS, url } from "../constants/constant";

export const getCardDetails = (navigate) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}payment/methods`, {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        })
        .then(
          (res) => {
            resolve(res);
          },
          (err) => navigate("/error")
        );
    });
  };