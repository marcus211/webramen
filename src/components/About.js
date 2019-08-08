import React from "react";
import styled from "styled-components";

const BoxBase = styled.div`
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  color: white;
  background-color: blue;
`;

function About() {
  return (
    <BoxBase>
      <h2>Second Page!!</h2>
      <br />
      <span>HI!!!</span>
      <br />
      <span>I'm doge!!</span>
    </BoxBase>
  );
}

export default About;
