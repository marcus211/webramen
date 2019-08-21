import React from "react";
import styled from "styled-components";

const BoxContact = styled.div`
  width: 100%;
  height: 150px;
  color: white;  
  background: rgb( 54, 54, 54);
  justify-content: center;
  filter: brightness(0.7);
`;

class Contact extends React.Component {

  render() {
    return (
      <BoxContact>
        <br />
        <h2>Contact</h2>
        <text>made by marcus211</text>
      </BoxContact>
    )
  }
}
export default Contact;
