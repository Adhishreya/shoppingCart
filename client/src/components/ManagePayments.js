import React, { useEffect, useState } from "react";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { styled, alpha } from "@mui/material/styles";
import EditAddress, { Form } from "./EditAddress";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useGetCardDetails,
  useSetCardDetails,
} from "../requestModules/payment";
import { Loading } from "./DataFetch";
import { useQueryClient } from "react-query";
import { PAYMENT_DETAILS } from "../constants/constant";

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

const FlexWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "1rem",
}));

const YearWrapper = styled("div")(({ theme }) => ({
  flexBasis: "20%",
}));

const CheckOutForm = () => {
  const stripePromise = loadStripe(
    `${process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY}`
  );

  const [checkValidity, setCheckValidity] = useState(false);
  const [cardDetailsEntered, setCardDetailsEntered] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editAdd, setEditAdd] = useState(false);
  const [cardId, setCardId] = useState(null);
  const navigate = useNavigate();

  const [details, setDetails] = useState({});

  const [cardDetails, setCardDetails] = useState({
    name: "",
    monthYear: "",
  });

  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    if (
      cardNumber === "" ||
      cardNumber?.replace(/ /g, "").length !== 16 ||
      cardDetails.name === "" ||
      cardDetails.monthYear === "" ||
      cardDetails.monthYear?.replace(/\//g, "").length !== 4
    )
      setCardDetailsEntered(false);
    else setCardDetailsEntered(true);
  }, [cardNumber, cardDetails]);

  const monthYearRegex = (value) => {
    let removeAlphabets = value.replace(`/\D/g`, "");
    if (removeAlphabets[0] === "0" && removeAlphabets[1] === "0")
      removeAlphabets = removeAlphabets[0];

    if (removeAlphabets.length <= 5) {
      if (removeAlphabets[2] === "0")
        removeAlphabets = removeAlphabets.slice(0, 1);
      else {
        const monthYearRegex = removeAlphabets.replace(/(\d{2})(?=\d)/, "$1/");
        setCardDetails({
          ...cardDetails,
          monthYear: monthYearRegex,
        });
      }
    }
  };

  const modifyCardRegex = (value) => {
    const removeAlphabets = value.replace(/\D/g, ""); // Remove non-digit characters
    const addSpace = removeAlphabets.replace(/(\d{4})(?=\d)/g, "$1 "); // Add space every 4 digits

    setCardNumber(addSpace);
  };

  const { data, isLoading, isError, isFetching } = useGetCardDetails(navigate);

  useEffect(() => {
    if (data && data.length > 0) {
      const { cardNumber, cardName, expiryMonth, expiryYear, _id } = data[0];
      setCardNumber(cardNumber);
      setCardDetails({
        name: cardName,
        monthYear: `${expiryMonth}/${expiryYear}`,
      });
      setCardId(_id);
    }
  }, [data, isFetching, isLoading]);

  const queryClient = useQueryClient();

  const onSuccess = (d) => {
    queryClient.invalidateQueries([PAYMENT_DETAILS]);
  };

  const onError = (d) => {
    // console.log(d, "checking");
  };

  const setMutation = useSetCardDetails({}, onSuccess, onError, navigate);

  const submitDetails = () => {
    const monthYear = cardDetails.monthYear.split("/");
    const data = {
      cardNumber: cardNumber.replace(/ /g, ""),
      cardName: cardDetails.name,
      expiryMonth: monthYear[0],
      expiryYear: monthYear[1],
      cardId,
    };

    setMutation.mutate(data);
  };

  return (
    <>
      {isLoading ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : (
        <Wrapper>
          <Header>Your Payment Options</Header>
          <Form onSubmit={(e) => e.preventDefault()}>
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
            <FlexWrapper>
              <TextField
                onChange={(e) => modifyCardRegex(e.target.value)}
                value={cardNumber}
                label="Card Number"
                name="card_number"
                required
                variant="standard"
                inputProps={{ maxLength: 19 }}
              />
              <YearWrapper>
                <TextField
                  id="outlined-basic"
                  label="Expiry Date (MM/YY)"
                  variant="standard"
                  name="card_expiry_year"
                  value={cardDetails.monthYear}
                  required
                  onChange={(e) => monthYearRegex(e.target.value)}
                  inputProps={{ maxLength: "5" }}
                />
              </YearWrapper>
            </FlexWrapper>
            {/* Stripe integration */}
            {/* <Elements stripe={stripePromise}>
          <TextField
            // label="Card Number"
            InputProps={{
              inputComponent: CardElement,
              // inputProps: { options: cardElementOptions },
            }}
            variant="standard"
            onChange={(e)=>{
              console.log("card details",e.target.value)
            }}
            fullWidth
          />
        </Elements> */}
            {/* <EditAddress
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
          setCheckValidity={setCheckValidity}
        /> */}
            {/* <TextField
          id="outlined-basic"
          label="Month"
          variant="standard"
          name="card_expiry_month"
          value={cardDetails.month}
          required
          onChange={(e) =>
            setCardDetails({ ...cardDetails, month: e.target.value })
          }
        /> */}

            <Button
              color="warning"
              variant="contained"
              type="button"
              disabled={
                // !checkValidity ||
                !cardDetailsEntered
              }
              onClick={submitDetails}
            >
              {!!data && data?.length > 0 ? "Edit" : "Save"}
            </Button>
          </Form>
        </Wrapper>
      )}
    </>
  );
};

export default ManagePayments;
