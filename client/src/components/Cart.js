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
import Checkout from "./Checkout";
import { Loading } from "./DataFetch";

const FlexContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5rem",
}));

export const EmptyContainer = styled("div")(({ theme }) => ({
  flexDirection: "column",
  gap: "0rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CartItem = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "4rem",
  width: "100%",
  margin: "1rem 0rem",
  [theme.breakpoints.down("md")]: {
    gap: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "space-between",
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
  [theme.breakpoints.down("md")]: {
    width: "40%",
    height: "auto",
  },
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

  const { isLoading, isError, data } = useCartItems(navigate, !!signedIn);

  useEffect(() => {
    if (
      data !== null &&
      typeof data !== "undefined" &&
      data?.productDetails?.length > 0
    ) {
      const cartData = data?.productDetails;
      setCartData(cartData);
      cartData.forEach((element) => {
        quantity += element.quantity;
      });
      props.value.setQuantity(quantity);
    }
  }, [isLoading, data]);

  return (
    <Container>
      {!isLoading &&
      (cartData === null ||
        cartData.length === 0 ||
        typeof cartData === "undefined") ? (
        <>
          <EmptyContainer style={{ flexDirection: "column" }}>
            <img
              src="https://cdni.iconscout.com/illustration/free/thumb/empty-cart-4085814-3385483.png"
              alt="empty cart"
            />
            <h3>Cart is empty</h3>
            {!signedIn ? "Login to view Cart" : ""}
          </EmptyContainer>
        </>
      ) : isLoading ? (
        <Loading>
          <CircularProgress />
        </Loading>
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
                      disabled={cartItem.productId.availability === 0}
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

export default Cart;
