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
} from "./components";

import { mapDispatchToProps, mapStateToProps } from "./reduxStore/store";

class Main extends Component {
  render() {
    return (
      <div>
        <Menu
          value={this.props.itemCount}
          setCount={this.props.setQuantity}
          searchString={this.props.setSearchState}
          // selectedAddress={this.props.selectedAddress}
          // selectAddress= {this.props.selectAddress}
        />
        <Routes>
          {["*", "/error"].map((path) => (
            <Route key={path} path={path} element={<ErrorPage />} />
          ))}
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/cart" element={<Cart value={this.props} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/order/*" element={<Order />} />
          <Route path="/review/*" element={<Review />} />
          <Route
            path="/"
            element={
              <Products value={this.props} search={this.props.searchString} />
            }
          />
          <Route path="/wish-list/*" element={<WishList />} />
          <Route path="/managepayments" element={<ManagePayments />} />
        </Routes>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
