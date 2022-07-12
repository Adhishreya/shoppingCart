import React, { Component } from "react"
import { connect, context } from "react-redux";
import {
    BrowserRouter,
    Switch,
    Route,
    Routes,
    Link
} from "react-router-dom";
import {
    Products,
    Menu,
    ErrorPage,
    ProductDetails,
    Profile,
    Cart,
    Vendor,
    Admin,
    Order
} from "./components";

import { mapDispatchToProps, mapStateToProps } from "./reduxStore/store";

class Main extends Component {
    render() {
        return (
            <div>
                <Menu value={this.props.itemCount} setCount={this.props.setQuantity} searchString={this.props.setSearchState} />
                {/* {localStorage.getItem("user") ? "Welcome " + localStorage.getItem("user") : null} */}
                <Routes>

                    {/* <Route path="*" element={<ErrorPage  />} /> */}
                    {["*", "/error"].map((path) => <Route key={path} path={path} element={<ErrorPage />} />)}
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart value={this.props} />} />
                    <Route path="/vendor" element={<Vendor />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/" element={<Products value={this.props} search={this.props.searchString} />} />
                </Routes>

            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Main);