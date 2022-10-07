import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  cartDetails,
  increment,
  decrement,
  deleteCartItem,
  orderCheckout,
  getCardDetails,
} from "../requestModules/products";
import DeleteIcon from "@mui/icons-material/Delete";
import AccordionSummary from "@mui/material/AccordionSummary";

import {
  AccordionDetails,
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { addAddress, getAddress } from "../requestModules/authenticate";
import Checkout from "./Checkout";
import Trial from "./Trial";
import { Row } from "./Order";

const FlexContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5rem",
}));

const CartItem = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "4rem",
  width: "100%",
  margin: "1rem 0rem",
  [theme.breakpoints.down("md")]: {
    gap: "1rem",
  },
}));

const Container = styled("div")(({ theme }) => ({
  width: "90%",
  margin: "2rem auto",
}));

const Controls = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "2rem",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    gap: "0rem",
  },
}));

const Wrapper = styled("div")(({ theme }) => ({}));

const Image = styled("img")(({ theme }) => ({
  height: "10rem",
  width: "10rem",
  [theme.breakpoints.down("md")]: {
    height: "5rem",
    width: "5rem",
  },
}));

const Column = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
}));

const Cart = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cartData, setCartData] = useState(null);

  let selectAddress = props.value.selectAddress;
  let address = props.value.address;

  let navigate = useNavigate();
  var quantity = 0;

  const signedIn = localStorage.getItem("token");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    signedIn &&
      cartDetails(navigate).then((res) => {
        if (
          res.data !== null &&
          typeof res.data !== "undefined" &&
          res.data.length > 0
        ) {
          setCartData(res.data);
          res.data.forEach((element) => {
            quantity += element.quantity;
          });
          props.value.setQuantity(quantity);
        }
      });
  }, [signedIn]);

  return (
    <Container>
      {cartData === null ||
      cartData.length === 0 ||
      typeof cartData === "undefined" ? (
        <>
          <FlexContainer>
            <img
              src="https://cdni.iconscout.com/illustration/free/thumb/empty-cart-4085814-3385483.png"
              alt="empty cart"
            />
            <h3>Cart Empty</h3>
            {!signedIn ? "Login to view Cart" : ""}
          </FlexContainer>
        </>
      ) : (
        <Wrapper>
          {cartData.map((cartItem, key) => {
            return (
              <CartItem key={cartItem._id}>
                <Image src={cartItem.productId.images[0]} />
                <div>
                  <Link to={`/products/${cartItem.productId._id}`}>
                    <h4>{cartItem.productId.productName}</h4>
                  </Link>
                  <h2>
                    <strike>{cartItem.productId.price / 100}</strike>
                    {"  "}
                    <span>
                      &#8377;
                      {cartItem.cost}
                    </span>
                  </h2>
                  <Controls>
                    <Button
                      variant="contained"
                      onClick={() => {
                        decrement(cartItem.productId._id, navigate).then(
                          (res) => {
                            props.value.remove();
                            window.location.reload();
                          }
                        );
                      }}
                    >
                      -
                    </Button>{" "}
                    <span>{cartItem.quantity}</span>
                    <Button
                      variant="contained"
                      onClick={() => {
                        increment(cartItem.productId._id, navigate).then(
                          (res) => {
                            props.value.add();
                            window.location.reload();
                          }
                        );
                      }}
                    >
                      +
                    </Button>
                    <DeleteIcon
                      onClick={() => {
                        deleteCartItem(cartItem._id, navigate).then((res) => {
                          props.value.remove();
                          window.location.reload();
                        });
                      }}
                    />
                  </Controls>
                </div>
              </CartItem>
            );
          })}
        </Wrapper>
      )}
      {cartData !== null && typeof cartData !== "undefined" ? (
        <div className="">
          <Button variant="contained" onClick={handleOpen}>
            Checkout
          </Button>
        </div>
      ) : null}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Checkout
            setOpen={setOpen}
            navigate={navigate}
            style={style}
            selectAddress={selectAddress}
            address={address}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export const SelectAddress = ({ navigate, selectAddress, address }) => {
  const [addresses, setAddresses] = useState(null);

  const [newAddress, setNewAddress] = useState();

  const [selectedAddress, setSelectedAddress] = useState();

  useEffect(() => {
    getAddress(navigate).then((res) => {
      setAddresses(res);
    });
  }, []);

  const handleEvent = () => {
    addAddress({ addressLine1: newAddress }, navigate).then((res) => {
      setSelectedAddress(res);
      selectAddress(res);
    });
  };

  const handleChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleSelect = (e) => {
    setSelectedAddress(e.target.value);
    selectAddress(e.target.value);
  };

  return (
    <div>
      <h2>Select Shipping Address</h2>
      {addresses && addresses.length > 0 && (
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={addresses[0]._id}
          name="address"
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
              />
            );
          })}
        </RadioGroup>
      )}
      <Column>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={8}
          value={newAddress}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleEvent}>
          Add new Address
        </Button>
      </Column>
    </div>
  );
};

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
          </RadioGroup>
          {/* <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ cursor: "pointer" }}
            onClick={() => {
              orderCheckout("COD", "", address, navigate);
            }}
          >
            Cash On Delivery
          </Typography> */}
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
          <Trial>
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
          </Trial>
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

export default Cart;
