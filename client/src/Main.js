import React, { Component } from "react"
import Products from "./components/DataFetch";
import Menu from "./components/MenuComponent";
import { connect, context } from "react-redux";
import {
    BrowserRouter,
    Switch,
    Route,
    Routes,
    Link
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import ProductDetails from "./components/ProductDetails";
import Profile from "./components/Profile";

import { mapDispatchToProps, mapStateToProps } from "./reduxStore/store";
import Cart from "./components/Cart";
class Main extends Component {
    render() {
        return (
            <div>
                {/* <nav> */}
                <Menu value={this.props.itemCount} />
                {localStorage.getItem("user") ? "Welcome " + localStorage.getItem("user") : null}
                {/* </nav> */}
                <Routes>
                    <Route path="/" element={<Products value={this.props} search={this.props.searchString} />} />
                    {/* <Route path="*" element={<ErrorPage  />} /> */}
                    {["*", "/error"].map((path) => <Route key={path} path={path} element={<ErrorPage />} />)}
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart"  element={<Cart  value={this.props}/>} />
                </Routes>

            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Main);