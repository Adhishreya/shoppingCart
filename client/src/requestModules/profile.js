import axios from "axios";
import { url } from "../constants/constant";


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
        });
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
  