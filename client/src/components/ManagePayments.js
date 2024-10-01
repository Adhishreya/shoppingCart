import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { styled, alpha } from "@mui/material/styles";
import EditAddress, { Form } from "./EditAddress";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  [theme.breakpoints.down("sm")]: {
    width: "calc(100% - 4rem)",
  },
}));

const CheckOutForm = () => {
  const [editAddress, setEditAddress] = useState(false);
  const [editAdd, setEditAdd] = useState(false);

  const navigate = useNavigate();

  const [details, setDetails] = useState({});

  const [cardDetails, setCardDetails] = useState({
    name: "",
    month: 9,
    year: 2024,
  });

  console.log("details", details);

  return (
    <Wrapper>
      <Header>Your Payment Options</Header>

      <Form onSubmit={(e) => submitAddress(e)}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="standard"
          name="card_holder_name"
          value={cardDetails.name}
          required
          onChange={(e) =>
            setCardDetails({ ...cardDetails, name: e.target.value })
          }
        />

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
          sourceCode="paymentpage"
          setDetails={setDetails}
        />
        <TextField
          id="outlined-basic"
          label="Month"
          variant="standard"
          name="card_expiry_month"
          value={cardDetails.month}
          required
          onChange={(e) =>
            setCardDetails({ ...cardDetails, month: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Year"
          variant="standard"
          name="card_expiry_year"
          value={cardDetails.year}
          required
          onChange={(e) =>
            setCardDetails({ ...cardDetails, year: e.target.value })
          }
        />

        <Button color="warning" variant="contained" type="submit">
          Save
        </Button>
      </Form>
    </Wrapper>
  );
};

export default ManagePayments;
