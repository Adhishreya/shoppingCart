import axios from "axios";
import { useQuery } from "react-query";
import { CART_COUNT, CART_DETAILS, PRODUCTS, url } from "../constants/constant";

export const localItems = () => {
  var itemC = 0;
  var itemRaw = localStorage.getItem("cartDetails");

  if (itemRaw != null) {
    var items = JSON.parse(itemRaw);

    items.forEach((element) => {
      itemC += element.quantity;
    });
  }

  return itemC;
};

export const getCartCount = () => {
  const data = axios.get(`${url}cart/count`, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });

  return new Promise((resolve, reject) => {
    data.then((res) => {
      resolve(res);
    });
  });
};

export const useCartCountFetch = (enable) => {
  const res = useQuery([CART_COUNT], () => getCartCount(), {
    refetchOnWindowFocus: false,
    enabled: enable,
  });
  return res;
};

export const cartDetails = (navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}cart`, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res.data);
      });
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //     navigate("/error");
    //   });
  });
};

export const useCartItems = (navigate, signedIn) => {
  return useQuery([CART_DETAILS], () => cartDetails(), {
    refetchOnWindowFocus: false,
    enabled: signedIn,
  });
};

export const increment = (id, navigate, quantity) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}cart/increment/${id}`,
        { quantity: quantity },
        {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        navigate("/error");
      });
  });
};

export const getQuantity = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}cart/quantity/${id}`, null, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then(
        (res) => {
          resolve(res);
        },
        (err) => navigate(err.response)
      );
  });
};

export const decrement = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}cart/decrement/${id}`,
        { orderId: id },
        {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err.response);
        navigate("/error");
      });
  });
};

export const deleteCartItem = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${url}cart/delete/` + id,
      method: "delete",
      data: { orderId: id },
      headers: { Authorization: "bearer " + localStorage.getItem("token") },
    }).then((res) => {
      resolve(res.data);
    });
  });
};

// export const deleteCartItem = (id, navigate) => {
//     return new Promise((resolve, reject) => {
//         axios({
//             url: `${url}cart/delete/` + id,
//             method: 'delete',
//             data: { orderId: id },
//             headers: { Authorization: "bearer " + localStorage.getItem("token") }
//         }).then(res => {
//             resolve(res.data);
//         })
//     })
// }
