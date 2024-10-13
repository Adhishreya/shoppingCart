import axios from "axios";
import { useQuery } from "react-query";
import {
  CART_COUNT,
  DISCOUNT,
  FILTERED_PRODUCTS,
  PRODUCT_CATEGORY,
  PRODUCT_FILTER,
  PRODUCTS,
  PRODUCTS_PATH,
  RATING,
  TAGS,
  url,
} from "../constants/constant";

export const fetchAllProducts = (pageNumber) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}${PRODUCTS_PATH}?pageNumber=${pageNumber}`).then((res) => {
      resolve(res);
    });
  });
};

export const useFeatureFetch = (pageNumber) => {
  const res = useQuery(
    [PRODUCTS, pageNumber],
    () => fetchAllProducts(pageNumber),
    {
      refetchOnWindowFocus: false,
    }
  );
  return res;
};

export const productDetails = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}${PRODUCTS_PATH}/${id}`).then((res) => {
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
        `${url}${PRODUCTS_PATH}/`,
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
    axios
      .get(`${url}${PRODUCTS_PATH}/${PRODUCT_CATEGORY}/${id}`)
      .then((res) => {
        conosole.log(res.data);
        resolve(res.data);
      });
  });
};

export const getProductByTag = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}${PRODUCTS_PATH}/${TAGS}/${id}`).then((res) => {
      resolve(res.data);
    });
  });
};

export const getProductByDiscount = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}${PRODUCTS_PATH}/${DISCOUNT}/${id}`).then((res) => {
      resolve(res.data);
    });
  });
};

export const filterProducts = (customUrl) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}${PRODUCTS_PATH}/${PRODUCT_FILTER}${customUrl}`)
      .then((res) => {
        resolve(res.data);
      });
  });
};

export const useFilterFetch = (customUrl) => {
  const res = useQuery(
    [FILTERED_PRODUCTS, customUrl],
    () => filterProducts(customUrl),
    {
      refetchOnWindowFocus: false,
      // enabled: false,
    }
  );
  return res;
};

// const tage = ["Refurbished","New","Used","Damaged","Discontinued","Refurbished","NewArivals","Used","Damaged","Discontinued"];
// export const cartDetails = () => {
//     return new Promise((resolve, reject) => {
//         axios.get(`${url}cart`, { headers: { Authorization: "bearer " + localStorage.getItem("token") } }).then(res => resolve(res));
//     })
// }

export const modifyRating = (navigate, id, rating) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}${PRODUCTS_PATH}/${RATING}/${id}`, rating, {
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

export const basicProductDetails = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}${PRODUCTS_PATH}/basic/${id}`).then(
      (res) => {
        resolve(res);
      },
      (err) => navigate("/error")
    );
  });
};
