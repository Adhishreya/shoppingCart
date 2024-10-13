import axios from "axios";
import { cartDetails } from "../requestModules/cart";
import {
  ERRROR,
  PROFILE,
  SIGN_IN,
  SIGN_UP,
  url,
  USERS,
} from "../constants/constant";

export const loginRequest = (
  { username, password },
  navigate,
  setCount,
  setToken
) => {
  var quantity = 0;
  var cartItems = [];

  return axios
    .post(`${url}${USERS}/${SIGN_IN}`, {
      username: username,
      password: password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/");
      axios
        .get(`${url}${USERS}/${PROFILE}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((result) => {
          localStorage.setItem("user", result.data[0].username);
          cartDetails(navigate).then((res) => {
            if (res !== null) {
              res.productDetails.forEach((element) => {
                quantity += element.quantity;
                var temp1 = { id: element._id, quantity: element.quantity };
                cartItems.push(temp1);
              });
              localStorage.setItem("cartDetails", JSON.stringify(cartItems));
              setCount(quantity);
            }
          });
          invalidateFetch();
        });
    })
    .catch((err) => {
      if (err.response.status === 401) return 401;
      else navigate(`/${ERRROR}`);
    });
};

export const signupRequest = (
  { username, password, email, phone },
  navigate,
  setToken
) => {
  return axios
    .post(`${url}${USERS}/${SIGN_UP}`, {
      username: username,
      password: password,
      email: email,
      phoneNumber: phone,
    })
    .then((res) => {
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        setToken(res.data.token);
        axios
          .get(`${url}${USERS}/${PROFILE}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((result) => {
            localStorage.setItem("user", result.data[0].username);
          });
        return null;
      } else {
        return res.data;
      }
    })
    .catch((err) => {
      navigate(`/${ERRROR}`);
    });
};

// export const profileDetails = ()=>{
//     axios.get(`${url}${USERS}/${PROFILE}`,{headers:{Authorization:'Bearer '+localStorage.getItem("token")}}).then(result=>{localStorage.setItem("user",result.data[0].username);})
// }
