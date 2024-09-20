import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

import { styled, alpha } from "@mui/material/styles";
import {
  changeAddress,
  addAddress,
  deleteAddress,
} from "../requestModules/authenticate";
import { Wrapper } from "./Profile";

const Cancel = styled(Button)(({ theme }) => ({
  width: "50%",
  margin: "2rem auto",
}));

export const Form = styled("form")(({ theme }) => ({
  display: "flex",
  width: "50%",
  margin: "0rem auto",
  flexDirection: "column",
  gap: "2rem",
  outline: "none",
  background: "alpha(theme.palette.common.black, 0.25)",
  border: "none",
}));

const Info = styled("div")(({ theme }) => ({
  fontSize: "16px",
}));

const AddressItem = styled("div")(({ theme }) => ({
  display: "flex",
  width: "calc(100% - 4.8rem)",
  border: `0.2rem solid ${alpha(theme.palette.common.black, 0.15)}`,
  padding: "2rem",
  gap: "1rem",
  flexDirection: "column",
}));

const WrapperAddress = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: "2rem",
}));

export const FormCoulum = styled(WrapperAddress)(({ theme }) => ({
  padding: "0rem",
}));

const Header = styled("div")(({ theme }) => ({
  fontSize: "1.6rem",
  fontWeight: "500",
}));

const EditProfie = ({
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
}) => {
  const [addressLine1, setAddressLine1] = useState(addLine1);
  const [addressLine2, setAddressLine2] = useState(addLine2);
  const [city, setCity] = useState(addCity);
  const [post_code, setPost_code] = useState(addPost_code);
  const [country, setCountry] = useState(addCountry);
  const [country_code, setCountry_code] = useState(addCountry_code);
  const [mobile, setMobile] = useState(addMobile);

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
      addAddress(address, navigate);
    } else {
      changeAddress(id, address, navigate);
    }
  };

  return (
    <Form onSubmit={(e) => submitAddress(e)}>
      <TextField
        id="outlined-basic"
        label="Address Line1"
        variant="standard"
        name="addressLine1"
        value={addressLine1}
        required
        onChange={(e) => setAddressLine1(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Address Line2"
        variant="standard"
        name="addressLine2"
        value={addressLine2}
        required
        onChange={(e) => setAddressLine2(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="City"
        variant="standard"
        name="city"
        value={city}
        required
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Post Code"
        variant="standard"
        name="post_code"
        value={post_code}
        required
        onChange={(e) => setPost_code(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Country"
        variant="standard"
        name="country"
        value={country}
        required
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
        onChange={(e) => setCountry_code(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Mobile"
        variant="standard"
        name="mobile"
        type="tel"
        value={mobile}
        inputProps={{ pattern: "[1-9]{1}[0-9]{9}" }}
        onChange={(e) => setMobile(e.target.value)}
      />
      <Button color="success" variant="contained" type="submit">
        Save
      </Button>
    </Form>
  );
};

const Address = (props) => {
  const { profile, navigate } = props;
  const [editAdd, setEditAdd] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  return (
    <WrapperAddress>
      <Header> Address </Header>
      {editAdd ? (
        <Wrapper>
          <EditProfie
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
          />
          <Cancel
            color="error"
            variant="contained"
            onClick={() => setEditAdd((editAdd) => !editAdd)}
          >
            Cancel
          </Cancel>
        </Wrapper>
      ) : (
        <FormCoulum>
          <div>
            {profile?.address?.map((item, index) => (
              <>
                {!editAddress ? (
                  <AddressItem key={item._id}>
                    <Info key={index}>
                      {item.addressLine1},{item.addressLine2}
                    </Info>
                    <Info key={index}>
                      {item.city},{item.country}
                    </Info>
                    {/* <p key={index}>{item.country_code}</p> */}
                    <Info key={index}>{item.post_code}</Info>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteAddress(item._id, navigate)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setEditAddress(true);
                      }}
                    >
                      Edit Address
                    </Button>
                  </AddressItem>
                ) : (
                  <Wrapper>
                    <EditProfie
                      id={item._id}
                      addLine1={item.addressLine1}
                      addLine2={item.addressLine2}
                      addCity={item.city}
                      addPost_code={item.post_code}
                      addCountry={item.country}
                      addCountry_code={item.country_code}
                      addMobile={item.mobile}
                      setEditAdd={setEditAdd}
                      setEditAddress={setEditAddress}
                      navigate={navigate}
                    />
                    <Cancel
                      color="error"
                      variant="contained"
                      onClick={() => window.location.reload()}
                    >
                      Cancel
                    </Cancel>
                  </Wrapper>
                )}
                {/* <hr /> */}
              </>
            ))}
          </div>
          {!editAdd && (
            <Button
              variant="contained"
              onClick={() => {
                setEditAdd((editAdd) => !editAdd);
              }}
            >
              Add Address
            </Button>
          )}
        </FormCoulum>
      )}
    </WrapperAddress>
  );
};

export default Address;
