import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import MapBase from "./components/MapBase";
import About from "./components/About";
import styled from "styled-components";

//reference https://codesandbox.io/s/ppoo7yn5qj

const NavDiv = styled.div`
  overflow: hidden;
  background-color: rgb(54, 54, 54);
`;
const ATag = styled.a`
  float: left;
  width: 90px;
  font-size: 1.2em;
  border-radius: 10px;
  padding: 10px 10px;
  margin: 5px 5px 5px 5px;
  background: rgb(54,54,54);
  transition: 0.1s all ease-out;
  &:hover {
    position: relative;
    top: -1px;
    background: rgb(108,108,108);
    box-shadow: 2.5px 2.5px 5px 0px #000000;
  }
  &:active {
    position: relative;
    top: 0px;
    background: white;
    box-shadow: 0px 0px 0px 0px #000000;
  }
`;
const BoxRight = styled.a`
  float: right;
`;

function AppRouter() {
  return (
    <Router>
      <NavDiv>
        <Link to="/">
          <ATag>拉麵找</ATag>
        </Link>
        <Link to="/MapBase/">
          <ATag>地圖找</ATag>
        </Link>
        <BoxRight>
          <Link to="/About/">
            <ATag>關於本站</ATag>
          </Link>
        </BoxRight>
      </NavDiv>
      <Route path="/" exact component={Home} />
      <Route path="/MapBase/" component={MapBase} />
      <Route path="/About/" component={About} />
    </Router>
  );
}

export default AppRouter;
