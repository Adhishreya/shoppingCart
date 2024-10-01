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

export const Payment = ({
  setOpen,
  navigate,
  style,
  selectAddress,
  address,
}) => {
  const [selectDebit, setSelectDebit] = useState(false);
  const [cardDetails, setCardDetails] = useState([]);

  useEffect(() => {
    if (selectDebit) {
      getCardDetails(navigate).then((res) => {
        setCardDetails(res.data);
      });
    } else setCardDetails([]);
  }, [selectDebit]);

  const handleSelect = () => {};

  return (
    <Box>
      <h2>Select Payment Method</h2>
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
            <FormControlLabel
              value="Wallet"
              control={<Radio />}
              label="Wallet"
            />
            <FormControlLabel value="Wallet" control={<Radio />} label="Wallet">
              <ComponentWrapper>
                <AccordionSummary
                  //   expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>UPI Method</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Row>
                    <TextField />
                    <Button variant="contained">Verify</Button>
                  </Row>
                </AccordionDetails>
              </ComponentWrapper>
            </FormControlLabel>
          </RadioGroup>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ cursor: "pointer" }}
            onClick={() => {
              orderCheckout("COD", "", address, navigate);
            }}
          >
            Cash On Delivery
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
            Select Card
          </Typography>
          {cardDetails &&
            cardDetails.map((card) => (
              <Typography
                key={card._id}
                id="modal-modal-description"
                sx={{ mt: 2 }}
                onClick={() => {
                  orderCheckout("Card", card.cardName);
                }}
              >
                {card.cardName}{" "}
                {`${card.cardNumber.substr(0, 4)}...${card.cardNumber.substr(
                  -4
                )}`}
              </Typography>
            ))}
        </>
      )}
    </Box>
  );
};

export default Payment;
