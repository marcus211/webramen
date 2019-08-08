import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import MapBase from "./components/MapBase";
import About from "./components/About";
import Users from "./components/Users";
import styled from "styled-components";

//reference https://codesandbox.io/s/ppoo7yn5qj

const NavDiv = styled.div`
  overflow: hidden;
  background-color: gray;
`;
const ATag = styled.a`
  float: left;
  width: 100px;
  border-radius: 10px;
  padding: 15px 10px;
  margin: 5px 5px 5px 5px;
  text-decoration: underline;
  font-size: 20px;
  color: white;
  background: green;
  transition: 0.1s all ease-out;
  &:hover {
    position: relative;
    top: -1px;
    background: lightseagreen;
    box-shadow: 2.5px 2.5px 5px 0px #000000;
  }
  &:active {
    position: relative;
    top: 0px;
    background: yellow;
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
          <ATag>Home</ATag>
        </Link>
        <Link to="/MapBase/">
          <ATag>MapBase</ATag>
        </Link>
        <Link to="/About/">
          <ATag>About</ATag>
        </Link>
        <BoxRight>
          <Link to="/Users/">
            <ATag>Users</ATag>
          </Link>
        </BoxRight>
      </NavDiv>
      <Route path="/" exact component={Home} />
      <Route path="/MapBase/" component={MapBase} />
      <Route path="/About/" component={About} />
      <Route path="/Users/" component={Users} />
    </Router>
  );
}

export default AppRouter;
