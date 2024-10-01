import axios from "axios";
import { url } from "../constants/constant";

// export const submitReview = (id, review, navigate) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`${url}review`, {review},
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
