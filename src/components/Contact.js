import React from "react";
import styled from "styled-components";

const BoxBlue = styled.div`
  justify-content: center;
  width: 100%;
  min-height: 10vh;
  color: white;
  background: darkblue;
`;

function Contact() {
  return (
    <BoxBlue>
      <h2>Contact</h2>
      <text>This is a message!</text>
    </BoxBlue>
  );
}

export default Contact;
