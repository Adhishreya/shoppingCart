import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { styled, alpha } from "@mui/material/styles";
import { Form } from "./Address";
import { Button, TextField } from "@mui/material";

// import { PUBLISHABLE_KEY } from "../config";

const ManagePayments = () => {
  return <CheckOutForm />;
};

const Header = styled("div")(({ theme }) => ({
  fontSize: "1.6rem",
  fontWeight: "500",
}));

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: "2rem",
}));

const CheckOutForm = () => (
  <Wrapper>
    <Header>Your Payment Options</Header>

    <Form onSubmit={(e) => submitAddress(e)}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="standard"
        name="card_holder_name"
        // value={addressLine1}
        required
        // onChange={(e) => setAddressLine1(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Address"
        variant="standard"
        name="card_holder_address"
        // value={addressLine2}
        required
        // onChange={(e) => setAddressLine2(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Month"
        variant="standard"
        name="card_expiry_month"
        // value={city}
        required
        // onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Year"
        variant="standard"
        name="card_expiry_year"
        // value={post_code}
        required
        // onChange={(e) => setPost_code(e.target.value)}
      />

      <Button color="success" variant="contained" type="submit">
        Save
      </Button>
    </Form>
  </Wrapper>
);

export default ManagePayments;
