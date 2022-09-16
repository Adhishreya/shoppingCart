import { Rating } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { orders, modifyRating } from "../requestModules/products";
import { getOrderItems } from "../requestModules/orders";

import { styled, alpha } from "@mui/material/styles";
const Container = styled("div")(({ theme }) => ({
  width: "90%",
  margin: "2rem auto",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const Wrapper = styled("div")(({ theme }) => ({}));

const OrderList = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    width: "90%",
    margin: "0rem auto",
  },
}));
const OrderItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  margin: "1.5rem 0rem",
  [theme.breakpoints.down("md")]: {
    gap: "1rem",
  },
}));

const OrderTiles = styled("div")(({ theme }) => ({}));

const OrderTile = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "2rem",
  alignItems: "center",
  cursor: "pointer",
  margin: "0rem auto",
  padding: "2rem 1rem",
}));

const Image = styled("img")(({ theme }) => ({
  width: "8rem",
  height: "8rem",
  backgroundColor: alpha(theme.palette.common.black, 0.5),
}));

const Order = () => {
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);
  const [rating, setRating] = useState(2);

  const ratingRef = useRef();

  let navigate = useNavigate();
  useEffect(() => {
    orders(navigate).then((data) => setValue(data));
  }, []);

  const handleOrderFetch = async (id) => {
    await getOrderItems(id).then((data) => {
      setItems(data);
    });
  };

  useEffect(() => {
    console.log(rating);
    if (items.length > 0) ratingRef.current.value = rating;
    // return () =>{

    // }
  }, [rating]);

  // let navigate = useNavigate();
  // useEffect(() => {
  //   orders(navigate).then((data) => console.log(data));
  // }, []);
  return (
    <Container>
      <OrderTiles>
        {value &&
          value.map((item) => (
            <>
              <OrderTile
                key={item._id}
                onClick={() => handleOrderFetch(item._id)}
              >
                <Image />
                <p>Payment {item.status}</p>
                <p>&#8377;{item.total}</p>
              </OrderTile>
              {items &&
                items.map((item) => (
                  <OrderList key={item._id}>
                    <OrderItem>
                      <Image src={item.image} />
                      <p>{item.productName}</p>
                      <p>{item.quantity}</p>
                      <Rating
                        name="simple-controlled"
                        value={item.averageRating}
                        id={item._id}
                        ref={ratingRef}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                          modifyRating(navigate, item._id, rating);
                        }}
                      />
                    </OrderItem>
                  </OrderList>
                ))}
            </>
          ))}
      </OrderTiles>
    </Container>
  );
};

export default Order;
