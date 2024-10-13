import axios from "axios";
import { url } from "../constants/constant";
export const vendor = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}vendor/profile/` + id).then((res) => {
      resolve(res.data);
    });
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
