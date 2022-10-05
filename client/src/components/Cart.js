import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  cartDetails,
  increment,
  decrement,
  deleteCartItem,
  orderCheckout,
  getCardDetails,
} from "../requestModules/products";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Modal, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

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

const Cart = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cartData, setCartData] = useState(null);
  const [selectDebit, setSelectDebit] = useState(false);
  const [cardDetails, setCardDetails] = useState([]);

  let navigate = useNavigate();
  var quantity = 0;

  const signedIn = localStorage.getItem("token");
  useEffect(() => {
    if (selectDebit) {
      getCardDetails(navigate).then((res) => {
        setCardDetails(res.data);
      });
    } else setCardDetails([]);
  }, [selectDebit]);

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
                  <h4>{cartItem.productId.productName}</h4>
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
          {!selectDebit ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Payment methods
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  orderCheckout("COD", "", setOpen, navigate);
                }}
              >
                Cash On Delivery
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectDebit(true)}
              >
                Debit/Credit
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                style={{ cursor: "pointer" }}
              >
                UPI
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  orderCheckout("Wallet", "ShopPay", setOpen);
                }}
              >
                Wallet
              </Typography>
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
                    {`${card.cardNumber.substr(
                      0,
                      4
                    )}...${card.cardNumber.substr(-4)}`}
                  </Typography>
                ))}
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};
export default Cart;
