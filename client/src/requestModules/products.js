import axios from "axios";

const url = "http://localhost:5000/";

export const fetchAllProducts = (pageNumber) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}products?pageNumber=${pageNumber}`).then((res) => {
      resolve(res.data);
    });
  });
};

export const productDetails = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}products/${id}`).then((res) => {
      resolve(res.data);
    });
  });
};

export const tagsDetails = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}tags`).then((res) => {
      resolve(res.data);
    });
  });
};

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}categories`).then((res) => {
      resolve(res.data);
    });
  });
};

export const discountDetails = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}discount`).then((res) => {
      resolve(res.data);
    });
  });
};

export const sellProduct = (productDetails) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}products/`,
        { productDetails: productDetails },
        {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        }
      )
      .then((result) => {
        resolve(result);
      });
  });
};

export const getProductByCategory = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}products/category/${id}`).then((res) => {
      conosole.log(res.data);
      resolve(res.data);
    });
  });
};

export const getProductByTag = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}products/tags/${id}`).then((res) => {
      resolve(res.data);
    });
  });
};

export const getProductByDiscount = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}products/discount/${id}`).then((res) => {
      resolve(res.data);
    });
  });
};

export const filterProducts = (customUrl) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}products/filter${customUrl}`).then((res) => {
      resolve(res.data);
    });
  });
};

// const tage = ["Refurbished","New","Used","Damaged","Discontinued","Refurbished","NewArivals","Used","Damaged","Discontinued"];
// export const cartDetails = () => {
//     return new Promise((resolve, reject) => {
//         axios.get("http://localhost:5000/cart", { headers: { Authorization: "bearer " + localStorage.getItem("token") } }).then(res => resolve(res));
//     })
// }

export const cartDetails = (navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}cart`, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        navigate("/error");
      });
  });
};

export const increment = (id, navigate, quantity) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}cart/increment/${id}`, {quantity:quantity}, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
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
      url: "http://localhost:5000/cart/delete/" + id,
      method: "delete",
      data: { orderId: id },
      headers: { Authorization: "bearer " + localStorage.getItem("token") },
    }).then((res) => {
      resolve(res.data);
    });
  });
};

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

export const modifyRating = (navigate, id, rating) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}products/rating/${id}`, rating, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then(
        (res) => {
          navigate("/order");
        },
        (err) => navigate("/error")
      );
  });
};

// export const deleteCartItem = (id, navigate) => {
//     return new Promise((resolve, reject) => {
//         axios({
//             url: "http://localhost:5000/cart/delete/" + id,
//             method: 'delete',
//             data: { orderId: id },
//             headers: { Authorization: "bearer " + localStorage.getItem("token") }
//         }).then(res => {
//             resolve(res.data);
//         })
//     })
// }

export const basicProductDetails = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}products/basic/${id}`).then(
      (res) => {
        resolve(res);
      },
      (err) => navigate("/error")
    );
  });
};

// export const submitReview = (id, review, navigate) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`http://localhost:5000/review`, {review},
//       //  {
//       //   headers: { Authorization: "bearer " + localStorage.getItem("token") },
//       // }
//       )
//       .then((res) => {
//         if (res.status === 201) navigate("/");
//         else navigate("/error");
//       })
//       .catch((e) => navigate("/error"));
//   });
// };

export const submitReview = (id, review, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}review/${id}`,
        { ...review },
        {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        }
      )
      .then(
        (res) => {
          resolve(res);
        },
        (err) => navigate("/error")
      );
  });
};

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
