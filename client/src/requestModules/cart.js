import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import {
  CART,
  CART_COUNT,
  CART_DETAILS,
  ERRROR,
  PRODUCTS,
  url,
} from "../constants/constant";

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

export const getCartCount = (setToken, setCount) => {
  const data = axios.get(`${url}${CART}/count`, {
    headers: { Authorization: "bearer " + localStorage.getItem("token") },
  });

  return new Promise((resolve, reject) => {
    data
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        if (error?.message.includes("401")) {
          setToken(null);
          localStorage.clear();
          setCount(0);
        }
      });
  });
};

export const useCartCountFetch = (enable, setToken, setCount) => {
  const res = useQuery([CART_COUNT], () => getCartCount(setToken, setCount), {
    refetchOnWindowFocus: false,
    enabled: enable,
  });
  return res;
};

export const cartDetails = (navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}${CART}`, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res.data);
      });
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //     navigate(`/${ERRROR}`);
    //   });
  });
};

export const useCartItems = (navigate, signedIn) => {
  return useQuery([CART_DETAILS], () => cartDetails(), {
    refetchOnWindowFocus: false,
    enabled: signedIn,
  });
};

export const increment = (id, navigate, quantity, queryClient) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}${CART}/increment/${id}`,
        { quantity: quantity },
        {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        resolve(res);
        queryClient.invalidateQueries([CART_COUNT]);
      })
      .catch((err) => {
        navigate(`/${ERRROR}`);
      });
  });
};

export const getQuantity = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}${CART}/quantity/${id}`, null, {
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
        `${url}${CART}/decrement/${id}`,
        { orderId: id },
        {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        navigate(`/${ERRROR}`);
      });
  });
};

export const deleteCartItem = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${url}${CART}/delete/` + id,
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
//             url: `${url}${CART}/delete/` + id,
//             method: 'delete',
//             data: { orderId: id },
//             headers: { Authorization: "bearer " + localStorage.getItem("token") }
//         }).then(res => {
//             resolve(res.data);
//         })
//     })
// }
