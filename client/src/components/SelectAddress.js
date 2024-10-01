import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AccordionDetails,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import {
  addAddress,
  getAddress,
  useGetAddress,
} from "../requestModules/address";
import { Row } from "./Orders";
import { Loading } from "./DataFetch";
import EditAddress from "./EditAddress";
import { GET_ADDRESS } from "../constants/constant";
import { useQueryClient } from "react-query";

const Column = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
}));

export const SelectAddress = ({
  navigate,
  selectAddress,
  address,
  setIsCheckoutValid,
}) => {
  const [addresses, setAddresses] = useState(null);

  const [newAddress, setNewAddress] = useState();
  const [editAdd, setEditAdd] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState();
  const [editAddress, setEditAddress] = useState(false);

  useEffect(() => {
    setIsCheckoutValid(!editAddress);
  }, [editAddress]);

  const [invalidate, setInvalidate] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (invalidate) {
      queryClient.invalidateQueries([GET_ADDRESS]);
    }
  }, [invalidate]);

  const { data, isLoadng } = useGetAddress(navigate);

  useEffect(() => {
    if (!isLoadng && data) setAddresses(data);
  }, [data, isLoadng]);

  const handleEvent = () => {
    setEditAddress(true);
    // addAddress({ addressLine1: newAddress }, navigate).then((res) => {
    //   setSelectedAddress(res);
    //   selectAddress(res);
    // });
    setSelectedAddress(null);
    selectAddress(null);
  };

  const handleChange = (e) => {
    setNewAddress(e.target.value);
  };

  const hideForm = () => {
    if (editAdd) setEditAddress(false);
  };

  const handleSelect = (e) => {
    hideForm();
    setSelectedAddress(e.target.value);
    selectAddress(e.target.value);
  };

  useEffect(() => {
    if (addresses && addresses[0]?._id) {
      setSelectedAddress(addresses[0]._id);
    }
  }, [addresses]);

  return (
    <div>
      <h2>Select Shipping Address</h2>
      {addresses && addresses.length > 0 && !editAddress && (
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={addresses[0]._id}
          name="address"
          value={selectedAddress}
          onChange={handleSelect}
        >
          {addresses.map((address, index) => {
            let label_address =
              address &&
              address.addressLine1 +
                (address.addressLine2 && address.addressLine2 !== "undefined"
                  ? ` ${address.addressLine2}`
                  : "") +
                (address.city && address.city !== "undefined"
                  ? ` ${address.city}`
                  : "") +
                (address.country && address.country !== "undefined"
                  ? ` ${address.country}`
                  : "") +
                (address.country_code && address.country_code !== "undefined"
                  ? ` ${address.country_code}`
                  : "") +
                (address.post_code && address.post_code !== "undefined"
                  ? ` ${address.post_code}`
                  : "");
            return (
              <FormControlLabel
                key={address._id}
                value={address._id}
                control={<Radio />}
                label={label_address}
                checked={
                  selectedAddress === addresses[index]?._id && !editAddress
                }
              />
            );
          })}
        </RadioGroup>
      )}
      <Column>
        {!editAddress && (
          <Button variant="contained" onClick={handleEvent}>
            Add new Address
          </Button>
        )}

        {editAddress && (
          <EditAddress
            addLine1=""
            addLine2=""
            addCity=""
            addPost_code=""
            addCountry=""
            addCountry_code=""
            addMobile=""
            setEditAdd={setEditAdd}
            setEditAddress={setEditAddress}
            navigate={navigate}
            id={null}
            setInvalidate={setInvalidate}
          />
        )}
      </Column>
    </div>
  );
};

export default SelectAddress;
