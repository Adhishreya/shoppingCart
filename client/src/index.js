import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Main from "./Main";
import {
  BrowserRouter
} from "react-router-dom";
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
        <Provider store={store}>
          {/* this is the global space */}
          <BrowserRouter >
            <Main />
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
