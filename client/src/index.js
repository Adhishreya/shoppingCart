import React, { Component } from "react";
import { render } from "react-dom";
// import LandingPage from "./LandingPage";
import { Provider } from "react-redux";
import Main from "./Main";
import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
// import Users from "./Users";
import "./app.css";

import { store } from "./reduxStore/store";
// import ProductDetails from "./components/ProductDetails";
// import ErrorPage from "./components/ErrorPage"
import Menu from "./components/MenuComponent";
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }
  render() {
    return (
      <div>
        <Provider store={store}>
          {/* this is the global space */}
          {/* <Menu value={this.props.itemCount} /> */}
          <BrowserRouter >
            <Main />

          </BrowserRouter>

        </Provider>
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
