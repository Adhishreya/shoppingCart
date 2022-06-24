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
import Vendor from "./components/Vendor";
import Admin from "./components/Admin";
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
                    <Route path="/vendor" element={<Vendor/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/" element={<Products value={this.props} search={this.props.searchString} />} />
                </Routes>

            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Main);