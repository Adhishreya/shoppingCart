import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  Products,
  Menu,
  ErrorPage,
  ProductDetails,
  Profile,
  Cart,
  Admin,
  Order,
  ManagePayments,
  Review,
  WishList,
  Invoice,
} from "./components";
import ProductCarousel from "./components/ProductCarousel";
import Slider from "./components/reusable/Slider";

import { mapDispatchToProps, mapStateToProps } from "./reduxStore/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { styled } from "@mui/material";

const MenuWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    position: "fixed",
    width: "100%",
    zIndex: 100,
  },
}));

const ConstantWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    position: "relative",
    top: "4rem",
  },
}));

const Main = (props) => {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <MenuWrapper>
          <Menu
            value={props.itemCount}
            setCount={props.setQuantity}
            searchString={props.setSearchState}
            // selectedAddress={props.selectedAddress}
            // selectAddress= {props.selectAddress}
          />
        </MenuWrapper>
        {/* <ProductCarousel/> */}
        <ConstantWrapper className="body-wrapper">
          <Routes>
            {["*", "/error"].map((path) => (
              <Route key={path} path={path} element={<ErrorPage />} />
            ))}
            <Route
              path="/products/:id"
              element={<ProductDetails value={props} />}
            />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/cart" element={<Cart value={props} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/order/*" element={<Order />} />
            <Route path="/review/*" element={<Review />} />
            <Route
              path="/"
              element={<Products value={props} search={props.searchString} />}
            />
            <Route path="/wish-list/*" element={<WishList />} />
            <Route path="/managepayments" element={<ManagePayments />} />
            <Route path="/invoice/*" element={<Invoice />} />
          </Routes>
        </ConstantWrapper>
      </QueryClientProvider>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
