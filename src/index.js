import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import Contact from "./Contact";
// import 'bootstrap/dist/css/bootstrap.css';
import "./styles.css";

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Contact />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);