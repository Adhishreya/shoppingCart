import React, { Component, useState } from "react";
import { render } from "react-dom";
import "./app.css";
import Trial from "./Trial";

const App = () => {
  const [value, setValue] = useState("cleared");
  return (
    <div className="App">
      <h1>{value}</h1>
      <Trial onValue={() => setValue("value")} />
    </div>
  );
};
render(<App />, document.getElementById("root"));
