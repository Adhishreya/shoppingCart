import React, { Component } from "react";
import { render } from "react-dom";
// import LandingPage from "./LandingPage";
import Main from "./Main";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import Users from "./Users";
import "./app.css";

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
        {/* <LandingPage /> */}
        <BrowserRouter>
          {/* <Provider> */}
            <Main />
          {/* </Provider> */}
        </BrowserRouter>
        {/* <Users /> */}

        <p />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
