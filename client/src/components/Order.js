import { Button, CircularProgress, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  getInTransitOrderItems,
  cancelOrder,
  getDeliveredItems,
  returnOrder,
  getReturnedItems,
  getCancelledItems,
} from "../requestModules/orders";

import { Loading } from "./DataFetch";

import { styled, alpha } from "@mui/material/styles";
const Container = styled("div")(({ theme }) => ({
  width: "90%",
  margin: "2rem auto",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const tabHeaders = [
  "Buy Again",
  "Not Yet Shipped",
  "Cancelled Orders",
  "Returned",
];

const OrderList = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: "1rem",
  gap: "1rem",
  [theme.breakpoints.down("md")]: {
    width: "90%",
    margin: "0rem auto",
  },
}));
const OrderItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "0rem 0rem",
  [theme.breakpoints.down("md")]: {
    gap: "0rem",
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
  marginLeft: "0.3rem",
  backgroundColor: alpha(theme.palette.common.black, 0.5),
}));

export const Row = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
}));

const Order = () => {
  let navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Container>
      <Tabs
        value={selectedTab}
        onChange={(e, h) => {
          setSelectedTab(h);
          let selectedTabOption = tabHeaders[h].toLowerCase();
          selectedTabOption = selectedTabOption.split(" ").join("");
          navigate(`/order/${selectedTabOption}`);
        }}
      >
        <Tab label={`${tabHeaders[0]}`} />
        <Tab label={`${tabHeaders[1]}`} />
        <Tab label={`${tabHeaders[2]}`} />
        <Tab label={`${tabHeaders[3]}`} />
      </Tabs>
      <Routes>
        <Route path="buyagain" element={<BuyAgain />} index />
        <Route path="notyetshipped" element={<NotYetShiped />} />
        <Route path="cancelledorders" element={<Cancelled />} />
        <Route path="returned" element={<Returned />} />
      </Routes>
    </Container>
  );
};

const BuyAgain = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handleOrderFetch = async () => {
      await getDeliveredItems().then((data) => {
        setItems(data);
      });
    };
    handleOrderFetch();
  }, []);
  return <OrderWrapper items={items} route={"delivered"} />;
};

const NotYetShiped = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handleOrderFetch = async () => {
      await getInTransitOrderItems().then((data) => {
        setItems(data);
      });
    };
    handleOrderFetch();
  }, []);
  return <OrderWrapper items={items} route={"transit"} />;
};

const Cancelled = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handleOrderFetch = async () => {
      await getCancelledItems().then((data) => {
        setItems(data);
      });
    };
    handleOrderFetch();
  }, []);
  return <OrderWrapper items={items} route={"cancelled"} />;
};

const Returned = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handleOrderFetch = async () => {
      await getReturnedItems().then((data) => {
        setItems(data);
      });
    };
    handleOrderFetch();
  }, []);
  return <OrderWrapper items={items} route={"returned"} />;
};

const OrderWrapper = ({ items, route }) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (items.length > 0) ratingRef.current.value = rating;
  // }, [rating]);

  const handleCancel = async (id) => {
    route == "transit" &&
      (await cancelOrder(id).then(() => {
        navigate("/order/notyetshipped");
      }));

    route == "delivered" &&
      (await returnOrder(id).then(() => {
        navigate("/order/buyagain");
      }));
  };

  return (
    <>
      <OrderTiles>
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <OrderList key={item._id}>
              <Image src={item.image} />
              <OrderItem>
                <h2>{item.productName}</h2>
                <h3>&#8377;{item.cost}</h3>
                <p>{item.quantity}</p>
                <Row>
                  <Link to={`/review?review-purchase=${item.product_id}`}>
                    <Button>Add a review</Button>
                  </Link>
                  <Button onClick={() => handleCancel(item._id)}>
                    {route === "transit" && "Cancel Order"}
                    {route === "delivered" && "Return"}
                  </Button>
                </Row>
              </OrderItem>
            </OrderList>
          ))}
      </OrderTiles>
      {items === null ||
        (items.length === 0 && (
          <Loading>
            <CircularProgress />
          </Loading>
        ))}
    </>
  );
};

export default Order;
