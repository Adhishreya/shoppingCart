import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

import { styled, alpha } from "@mui/material/styles";
import {
  changeAddress,
  deleteAddress,
  useAddAddress,
} from "../requestModules/address";
import { Wrapper } from "./Profile";
import {
  alphanumericWithSpaceHash,
  isAlpha,
  isAlphanumeric,
  isNumeric,
} from "../utilities/patterns";
import { useQueryClient } from "react-query";
import { GET_ADDRESS } from "../constants/constant";

export const Form = styled("form")(({ theme, isNotPage }) => ({
  display: "flex",
  width: isNotPage ? "100%" : "50%",
  margin: "0rem auto",
  flexDirection: "column",
  gap: "2rem",
  outline: "none",
  background: "alpha(theme.palette.common.black, 0.25)",
  border: "none",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const ButtonRow = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "0rem auto",
  justifyContent: "space-between",
  width: "100%",
  paddingBottom: "2rem",
}));

const EditAddress = ({
  setEditAdd,
  setEditAddress,
  id,
  navigate,
  addLine1,
  addLine2,
  addCity,
  addPost_code,
  addCountry,
  addCountry_code,
  addMobile,
  sourceCode,
  setInvalidate,
  setDetails,
  setCheckValidity,
}) => {
  const [addressLine1, setAddressLine1] = useState(addLine1);
  const [addressLine2, setAddressLine2] = useState(addLine2);
  const [city, setCity] = useState(addCity);
  const [post_code, setPost_code] = useState(addPost_code);
  const [country, setCountry] = useState(addCountry);
  const [country_code, setCountry_code] = useState(addCountry_code);
  const [mobile, setMobile] = useState(addMobile);
  const [formValid, setIsFormValid] = useState(false);

  const onSuccess = (d) => {
    if (sourceCode !== "page") setEditAddress(false);
    if (setInvalidate) setInvalidate(true);
  };

  const addAddressMutation = useAddAddress(
    {},
    navigate,
    onSuccess,
    sourceCode === "page"
  );

  const validateForm = () => {
    const isValid =
      addressLine1.trim() !== "" &&
      addressLine2.trim() !== "" &&
      city.trim() !== "" &&
      country.trim() !== "" &&
      mobile.trim() !== "" &&
      post_code.trim() !== "";
    setIsFormValid(isValid);
    if (setCheckValidity) setCheckValidity(isValid);
    if (setDetails)
      setDetails({
        addressLine1,
        addressLine2,
        city,
        post_code,
        country,
        country_code,
        mobile,
        isValid,
      });
  };

  useEffect(() => {
    validateForm();
  }, [
    addressLine1,
    addressLine2,
    city,
    post_code,
    country,
    country_code,
    mobile,
  ]);

  const submitAddress = (e) => {
    e.preventDefault();
    const address = {
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      post_code: post_code,
      country: country,
      country_code: country_code,
      mobile: mobile,
    };

    if (id === null) {
      setEditAdd(false);
      addAddressMutation.mutate(address);
    } else {
      changeAddress(id, address, navigate);
    }
  };

  return (
    <Form onSubmit={(e) => submitAddress(e)} isNotPage={sourceCode !== "page"}>
      <TextField
        id="outlined-basic"
        label="Address Line1"
        variant="standard"
        name="addressLine1"
        value={addressLine1}
        required
        onKeyDown={(e) => {
          if (!alphanumericWithSpaceHash(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => setAddressLine1(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Address Line2"
        variant="standard"
        name="addressLine2"
        value={addressLine2}
        required
        onKeyDown={(e) => {
          if (!alphanumericWithSpaceHash(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => setAddressLine2(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="City"
        variant="standard"
        name="city"
        value={city}
        required
        onKeyDown={(e) => {
          if (!isAlphanumeric(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Post Code"
        variant="standard"
        name="post_code"
        value={post_code}
        inputProps={{ maxLength: 6 }}
        required
        onKeyDown={(e) => {
          if (!isNumeric(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => setPost_code(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Country"
        variant="standard"
        name="country"
        value={country}
        required
        onKeyDown={(e) => {
          if (!isAlpha(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => setCountry(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Country code"
        variant="standard"
        name="country_code"
        inputProps={{ pattern: "[A-Za-z]{3}" }}
        value={country_code}
        required
        onKeyDown={(e) => {
          if (!isAlpha(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => setCountry_code(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Mobile"
        variant="standard"
        name="mobile"
        type="tel"
        onKeyDown={(e) => {
          if (!isNumeric(e.key)) {
            e.preventDefault();
          }
        }}
        value={mobile}
        inputProps={{ pattern: "[1-9]{1}[0-9]{9}", maxLength: 10 }}
        onChange={(e) => setMobile(e.target.value)}
      />
      {sourceCode === "page" && (
        <Button
          color="success"
          variant="contained"
          type="button"
          disabled={!formValid}
        >
          Save
        </Button>
      )}

      {sourceCode !== "page" && sourceCode !== "paymentpage" && (
        <ButtonRow>
          {" "}
          <Button
            style={{ width: "48%" }}
            color="success"
            variant="contained"
            type="submit"
            disabled={!formValid}
          >
            Save
          </Button>
          <Button
            style={{ width: "48%" }}
            color="error"
            variant="contained"
            type="reset"
            onClick={() => setEditAddress(false)}
          >
            Cancel
          </Button>
        </ButtonRow>
      )}
    </Form>
  );
};

export default React.memo(EditAddress);
