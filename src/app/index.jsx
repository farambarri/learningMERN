import React from "react";
import ReactDom from "react-dom";
const { Component } = require("react");
const { render } = require("react-dom");

class App extends Component {
  render() {
    return <h1>Hello World</h1>;
  }
}

export default App;

render(<App />, document.getElementById("app"));
