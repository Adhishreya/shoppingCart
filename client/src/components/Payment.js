import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useCartItems,
  increment,
  decrement,
  deleteCartItem,
} from "../requestModules/cart";

import { getCardDetails } from "../requestModules/payment";

import { orderCheckout } from "../requestModules/orders";

import DeleteIcon from "@mui/icons-material/Delete";
import AccordionSummary from "@mui/material/AccordionSummary";
import CheckIcon from "@mui/icons-material/Check";

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
import ComponentWrapper from "./ComponentWrapper";
import { Row } from "./Orders";
import { Loading } from "./DataFetch";

const CardNumber = styled("div")(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "700",
}));

const FlexWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const FlexColumnWrapper = styled("div")(({ theme }) => ({
  flexDirection: "column",
}));

const LinkWrapper = styled(Link)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {},
}));

export const Payment = ({
  setOpen,
  navigate,
  style,
  setPaymentDetails,
  address,
  paymentDetailSelected,
  setPaymentDetailSelected,
  paymentDetails,
}) => {
  const [selectDebit, setSelectDebit] = useState(false);
  const [cardDetails, setCardDetails] = useState([]);

  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);

  useEffect(() => {
    if (selectDebit) {
      getCardDetails(navigate).then((res) => {
        setCardDetails(res);
      });
    } else setCardDetails([]);
  }, [selectDebit]);

  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSelect = (e) => {
    const valueSelected = e.target.value;
    if (valueSelected.includes("Debit")) setSelectDebit(true);
    setSelectedMethod(valueSelected);

    setPaymentDetails({
      paymentMethod: valueSelected,
    });
  };

  useEffect(() => {
    setPaymentDetails({
      paymentMethod: "Cash on Delivery",
    });
  }, []);

  useEffect(() => {
    let isValid = true;
    switch (paymentDetails.paymentMethod) {
      case "Cash on Delivery":
        isValid = true;
        break;
      case "Debit/Credit":
        isValid = cardDetails && cardDetails.length > 0;
        break;
      case "UPI Method":
        isValid = upiVerified;
        break;
      default:
        isValid = false;
    }
    setPaymentDetailSelected(isValid);
  }, [paymentDetails, upiVerified, cardDetails]);

  return (
    <Box>
      {!selectDebit && <h2>Select Payment Method</h2>}
      {!selectDebit ? (
        <>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Cash on Delivery"
            name="payment"
            onChange={handleSelect}
          >
            <FormControlLabel
              value="Cash on Delivery"
              control={<Radio />}
              label="Cash on Delivery"
            />
            <FormControlLabel
              value="Debit/Credit"
              control={<Radio />}
              label="Debit/Credit"
            />
            {/* <FormControlLabel
              value="Wallet"
              control={<Radio />}
              label="Wallet"
            /> */}
            <FormControlLabel
              value="UPI Method"
              control={<Radio />}
              label="UPI Method"
            />
            {selectedMethod.includes("UPI") && (
              <ComponentWrapper>
                <AccordionSummary
                  //   expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Verify ID</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Row>
                    <TextField
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        if (upiVerified) setUpiVerified(false);
                      }}
                    />
                    {!upiVerified ? (
                      <Button
                        variant="contained"
                        disabled={upiId === ""}
                        onClick={() => setUpiVerified(true)}
                      >
                        Verify
                      </Button>
                    ) : (
                      <CheckIcon color="success" />
                    )}
                  </Row>
                </AccordionDetails>
              </ComponentWrapper>
            )}
          </RadioGroup>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ cursor: "pointer" }}
            onClick={() => {
              // orderCheckout("COD", "", address, navigate);
            }}
          >
            {/* Cash On Delivery */}
          </Typography>
          {/* <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectDebit(true)}
            >
              Debit/Credit
            </Typography> */}
          {/* <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              style={{ cursor: "pointer" }}
            >
              UPI
            </Typography> */}
          {/* <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              style={{ cursor: "pointer" }}
              onClick={() => {
                orderCheckout("Wallet", "ShopPay", address, navigate);
              }}
            >
              Wallet
            </Typography> */}
        </>
      ) : (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {cardDetails?.length === 0 ? "Add Card" : "Saved Card"}
          </Typography>
          {cardDetails &&
            cardDetails?.length > 0 &&
            cardDetails.map((card) => (
              <Typography
                key={card._id}
                id="modal-modal-description"
                sx={{ mt: 2 }}
                onClick={() => {
                  // orderCheckout("Card", card.cardName);
                }}
              >
                <FlexWrapper>
                  <FlexColumnWrapper>
                    {card.cardName} <br />
                    <CardNumber>
                      {" "}
                      {`${card.cardNumber.substr(
                        0,
                        4
                      )}...${card.cardNumber.substr(-4)}`}
                    </CardNumber>
                  </FlexColumnWrapper>
                  <LinkWrapper to="/managepayments">
                    <Button variant="contained">Change Card</Button>
                  </LinkWrapper>
                </FlexWrapper>
              </Typography>
            ))}
          {cardDetails && cardDetails?.length === 0 && (
            <LinkWrapper to="/managepayments">
              <Button variant="contained">Add Card</Button>
            </LinkWrapper>
          )}
        </>
      )}
    </Box>
  );
};

export default Payment;
