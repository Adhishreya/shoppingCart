import axios from "axios";
import { PROFILE_DETAILS, url } from "../constants/constant";
import { useQuery } from "react-query";

export const profileDetails = () => {
  // axios.get(`${url}users/profile`, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } }).then(res => { if (res.data) { navigate("/profile") } }, err => {  navigate("/error") })
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}users/profile`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res.data);
        //   if (res.data) { req(res.data) } }
        // , err => {
        //     navigate("/error")
      })
      .catch((err) => {
        localStorage.clear();
        navigate("/");
        navigate(0);
      });
  });
};

export const useProfileDetails = () => {
  return useQuery([PROFILE_DETAILS], () => profileDetails(), {
    refetchOnWindowFocus: false,
  });
};

export const uploadImage = (image, navigate) => {
  const data = new FormData();
  data.append("image", image, "" + image.name + "");
  // const data = {"image":image};
  axios
    .post(`${url}users/uploadProfilePicture`, data, {
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
