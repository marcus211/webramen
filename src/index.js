import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import Contact from "./components/Contact";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>AppRouter test</h1>
      <AppRouter />
      <Contact />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
