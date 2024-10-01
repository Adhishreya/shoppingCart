import { Button, CircularProgress, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  useGetInTransitOrderItems,
  cancelOrder,
  returnOrder,
  getReturnedItems,
  useGetCancelledItems,
  useGetDeliveredItems,
} from "../../requestModules/orders";

import { Loading } from "../DataFetch";

import { styled, alpha } from "@mui/material/styles";
import { tabHeaders } from "../../utilities/predefinedData";
const Container = styled("div")(({ theme }) => ({
  width: "90%",
  margin: "2rem auto",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const TabWrapper = styled(Tabs)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    overflowX: "scroll",
  },
}));

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

export const Column = styled(Row)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "start",
  },
}));

const Order = () => {
  let navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Container>
      <TabWrapper
        value={selectedTab}
        allowScrollButtonsMobile
        scrollButtons={false}
        variant="scrollable"
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
      </TabWrapper>
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

  const { data, isLoading, isError } = useGetDeliveredItems();

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <OrderWrapper items={items} route={"delivered"} isLoading={isLoading} />
  );
};

const NotYetShiped = () => {
  const [items, setItems] = useState([]);

  const { isLoading, data } = useGetInTransitOrderItems();

  useEffect(() => {
    setItems(data);
  }, [data]);

  return <OrderWrapper items={items} route={"transit"} isLoading={isLoading} />;
};

const Cancelled = () => {
  const [items, setItems] = useState([]);

  const { data, isLoading } = useGetCancelledItems();

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <OrderWrapper items={items} route={"cancelled"} isLoading={isLoading} />
  );
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

const OrderWrapper = ({ items, route, isLoading }) => {
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
                <Row>
                  <h3>&#8377;{item.cost}</h3>
                  <p>Qty: {item.quantity}</p>
                </Row>
                <Column>
                  <Link to={`/review?review-purchase=${item.product_id}`}>
                    <Button style={{ width: "fit-content" }}>
                      Add a review
                    </Button>
                  </Link>
                  {(route === "transit" || route === "delivered") && (
                    <Button onClick={() => handleCancel(item._id)}>
                      {route === "transit" && "Cancel Order"}
                      {route === "delivered" && "Return"}
                    </Button>
                  )}
                </Column>
              </OrderItem>
            </OrderList>
          ))}
      </OrderTiles>
      {items === null ||
        (isLoading && (
          <Loading>
            <CircularProgress />
          </Loading>
        ))}
      {!isLoading && items?.length === 0 && <>Nothing here!</>}
    </>
  );
};

export default Order;
