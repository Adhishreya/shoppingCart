import React, { Component } from "react";
import { render } from "react-dom";
// import LandingPage from "./LandingPage";
import { Provider } from "react-redux";
import Main from "./Main";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import Users from "./Users";
import "./app.css";

import { store } from "./reduxStore/store";
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
        <BrowserRouter >
          <Provider store={store}>
            <Main />
          </Provider>
        </BrowserRouter>
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
