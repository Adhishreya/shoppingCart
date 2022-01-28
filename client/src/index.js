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
import ProductDetails from "./components/ProductDetails";
import ErrorPage from "./components/ErrorPage"
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
          <Main />
        </Provider>
      </div>
    );
  }
}
render(<div>
  <BrowserRouter >
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="*" element={<ErrorPage/>}/>
      <Route path="/products/:id" element={<ProductDetails />} />
      
    </Routes>

  </BrowserRouter>

</div>, document.getElementById("root"));
