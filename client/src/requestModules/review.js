import axios from "axios";
import { REVIEW_DETAILS, url } from "../constants/constant";
import { useQuery } from "react-query";

export const getReview = (id, navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}review/${id}`, {
        headers: {},
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => navigate("/error"));
  });
};

export const useGetReviews = (id, navigate) => {
  return useQuery([REVIEW_DETAILS], () => getReview(id, navigate), {
    refetchOnWindowFocus: false,
  });
};

export const submitReview = (id, review, navigate, image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("details", review.body);
  data.append("rating", review.rating);
  data.append("title", review.title);
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}review/${id}`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (res) => {
          resolve(res);
          navigate(`/products/${id}`);
        },
        (err) => navigate("/error")
      );
  });
};
