import axios from "axios";

const url = "http://localhost:5000/";

export const addToWishList = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}wish-list/${id}`, null, {
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
      .get(`${url}wish-list/${id}`, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => console.log(e));
  });
};

export const removeFromWishList = (id, navigate) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    axios
      .delete(`${url}wish-list/${id}`, {
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
      .get(`${url}wish-list`, {
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
