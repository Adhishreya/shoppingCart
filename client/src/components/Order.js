import { Button, Rating, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
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

const tabHeaders = [
  "Buy Again",
  "Not Yet Shipped",
  "Cancelled Orders",
  "Returned",
];

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
    if (items.length > 0) ratingRef.current.value = rating;
  }, [rating]);

  // let navigate = useNavigate();
  // useEffect(() => {
  //   orders(navigate).then((data) => console.log(data));
  // }, []);

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Container>
      <Tabs
        value={selectedTab}
        onChange={(e, h) => {
          setSelectedTab(h);
          let selectedTabOption = tabHeaders[h].toLowerCase();
          selectedTabOption = selectedTabOption.split(" ").join("")
          navigate(`/order/${selectedTabOption}`)
        }}
      >
        <Tab label={`${tabHeaders[0]}`} />
        <Tab label={`${tabHeaders[1]}`} />
        <Tab label={`${tabHeaders[2]}`} />
        <Tab label={`${tabHeaders[3]}`} />
      </Tabs>
      <Routes>
        <Route path="buyagain" element={<BuyAgain/>}/>
        <Route path="notyetshipped" element={<NotYetShiped/>}/>
        <Route path="cancelledorders" element={<Cancelled/>}/>
        <Route path="returned" element={<Returned/>}/>
      </Routes>
      <Outlet></Outlet>
      <OrderTiles>
        {value &&
          value.map((item) => (
            <>
              <OrderTile
                key={item._id}
                onClick={() => handleOrderFetch(item._id)}
              >
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
                      <Button>Add a review</Button>
                    </OrderItem>
                  </OrderList>
                ))}
            </>
          ))}
      </OrderTiles>
    </Container>
  );
};

const BuyAgain = () => {
  return <>BuyAgain</>;
};

const NotYetShiped = () => {
  return <>NotYetShiped</>;
};

const Cancelled = () => {
  return <>Cancelled</>;
};

const Returned = () => {
  return <>Returned</>;
};

export default Order;
