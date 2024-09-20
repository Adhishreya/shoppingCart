import axios from "axios";
import { cartDetails } from "../requestModules/cart";

let url = "http://localhost:5000";

export const loginRequest = ({ username, password }, navigate, setCount) => {
  var quantity = 0;
  var cartItems = [];

  return axios
    .post(`${url}/signin`, {
      username: username,
      password: password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      navigate("/");
      axios
        .get(`${url}/users/profile`, {
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
    .post(`${url}/users/signup`, {
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
          .get(`${url}/users/profile`, {
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
//     axios.get("http://localhost:5000/users/profile",{headers:{Authorization:'Bearer '+localStorage.getItem("token")}}).then(result=>{localStorage.setItem("user",result.data[0].username);})
// }

export const uploadImage = (image, navigate) => {
  const data = new FormData();
  data.append("image", image, "" + image.name + "");
  // const data = {"image":image};
  axios
    .post(`${url}/users/uploadProfilePicture`, data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then(
      (res) => {
        if (res.data) {
          navigate("/profile");
        }
      },
      (err) => {
        navigate("/error");
      }
    );
};

export const changeAddress = (id, address, navigate) => {
  axios
    .post(
      `${url}/address/${id}`,
      { address: address },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    )
    .then(
      (res) => {
        if (res.data) {
          navigate("/profile");
          window.location.reload();
        }
      },
      (err) => {
        navigate("/error");
      }
    );
};

export const addAddress = (address, navigate, retain = false) => {
  return axios
    .post(
      `${url}/address`,
      { address: address },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    )
    .then(
      (res) => {
        if (res.data) {
          if (retain) {
            navigate("/profile");
            window.location.reload();
          } else {
            return res.data.address[0];
          }
        }
      },
      (err) => {
        navigate("/error");
      }
    );
};

export const profileDetails = () => {
  // axios.get("http://localhost:5000/users/profile", { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } }).then(res => { if (res.data) { navigate("/profile") } }, err => {  navigate("/error") })
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/users/profile`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res.data);
        //   if (res.data) { req(res.data) } }
        // , err => {
        //     navigate("/error")
      });
  });
};

export const deleteAddress = (id, navigate) => {
  axios
    .delete(`${url}/address/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
      if (res.data) {
        navigate("/profile");
        window.location.reload();
      }
    })
    .catch((err) => {
      navigate("/error");
    });
};

export const userVendorProfile = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/vendor/profile`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const vendorRegister = (vendorDetails, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}/vendor/profile`,
        { vendorDetails },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.data) {
          navigate("/vendor");
          window.location.reload();
        }
      })
      .catch((err) => {
        navigate("/error");
      });
  });
};

export const getAddress = (navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/address`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        console.log(e);
        navigate("/error");
      });
  });
};
