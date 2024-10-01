import axios from "axios";
import { cartDetails } from "../requestModules/cart";
import { url } from "../constants/constant";

export const loginRequest = ({ username, password }, navigate, setCount) => {
  var quantity = 0;
  var cartItems = [];

  return axios
    .post(`${url}signin`, {
      username: username,
      password: password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      navigate("/");
      axios
        .get(`${url}users/profile`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((result) => {
          localStorage.setItem("user", result.data[0].username);
          cartDetails(navigate).then((res) => {
            if (res.data !== null) {
              res.data[0].products.forEach((element) => {
                quantity += element.quantity;
                var temp1 = { id: element._id, quantity: element.quantity };
                cartItems.push(temp1);
              });
              localStorage.setItem("cartDetails", JSON.stringify(cartItems));
              setCount(quantity);
            }
          });
        });
    })
    .catch((err) => {
      if (err.response.status === 401) return 401;
      else navigate("/error");
    });
};

export const signupRequest = (
  { username, password, email, phone },
  navigate
) => {
  return axios
    .post(`${url}users/signup`, {
      username: username,
      password: password,
      email: email,
      phoneNumber: phone,
    })
    .then((res) => {
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        axios
          .get(`${url}users/profile`, {
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
      navigate("/error");
    });
};

// export const profileDetails = ()=>{
//     axios.get(`${url}users/profile`,{headers:{Authorization:'Bearer '+localStorage.getItem("token")}}).then(result=>{localStorage.setItem("user",result.data[0].username);})
// }
