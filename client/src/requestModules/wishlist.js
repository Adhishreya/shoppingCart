import axios from "axios";
import { url, WISHLIST } from "../constants/constant";

export const addToWishList = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}${WISHLIST}/${id}`, null, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => navigate("/error"));
  });
};

export const checkWishList = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}${WISHLIST}/${id}`, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => console.log(e));
  });
};

export const removeFromWishList = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${url}${WISHLIST}/${id}`, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => console.log(e));
  });
};

export const getWishList = () => {
  return new Promise((resolve, reject, next) => {
    axios
      .get(`${url}${WISHLIST}`, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then((res) => resolve(res.data))
      .catch((e) => next(e));
  });
};

export const moveToCart = async (id, navigate) => {
  try {
    await increment(id);
    await removeFromWishList(id);
  } catch (e) {
    navigate("/error");
  }
};
