import axios from "axios";
import { ADDRESS_PATH, ERRROR, GET_ADDRESS, PROFILE, url } from "../constants/constant";
import { useMutation, useQuery } from "react-query";

// ADD NEW ADDRESS

export const addAddress = (address, navigate, retain = false) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}${ADDRESS_PATH}`,
        { address: address },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        resolve(res.data);
      });
  });
};

const defaultSuccessFn = (navigate, retain) => {
  if (res.data) {
    if (retain) {
      navigate(`/${PROFILE}`);
      window.location.reload();
    } else {
      return res.data.address[0];
    }
  }
};

export const useAddAddress = (
  address,
  navigate,
  onSuccess = (d) => defaultSuccessFn(navigate, retain),
  retain = false
) => {
  return useMutation(
    (address, navigate) => addAddress(address, navigate, (retain = false)),
    {
      onError: (d) => {
        navigate(`/${ERRROR}`);
      },
      onSuccess: onSuccess,
    }
  );
};

// DELETE ADDRESS

export const deleteAddress = (id, navigate) => {
  axios
    .delete(`${url}${ADDRESS_PATH}/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
      if (res.data) {
        navigate(`/${PROFILE}`);
        window.location.reload();
      }
    })
    .catch((err) => {
      navigate(`/${ERRROR}`);
    });
};

// EDIT ADDRESS

export const changeAddress = (id, address, navigate) => {
  axios
    .post(
      `${url}${ADDRESS_PATH}/${id}`,
      { address: address },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    )
    .then(
      (res) => {
        if (res.data) {
          navigate(`/${PROFILE}`);
          window.location.reload();
        }
      },
      (err) => {
        navigate(`/${ERRROR}`);
      }
    );
};

// GET USER ADDRESS

export const getAddress = (navigate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}${ADDRESS_PATH}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        resolve(res.data);
      });
  });
};

export const useGetAddress = (navigate) => {
  return useQuery([GET_ADDRESS], () => getAddress(navigate), {
    refetchOnWindowFocus: false,
    onError: (d) => {
      navigate(`/${ERRROR}`);
    },
  });
};
