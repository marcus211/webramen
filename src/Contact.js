import React from "react";
import styled from "styled-components";

const BoxContact = styled.div`
  width: 100%;
  color: white;  
  background: rgb( 54, 54, 54);
  padding: 20px 0px 20px 0px;
  justify-content: center;
  filter: brightness(0.7);
`;
const DivText = styled.div`
  display: inline-flex;
`

class Contact extends React.Component {

  render() {
    return (
      <BoxContact>
        <DivText>網站製作：marcus211　</DivText>
        <DivText>資料來源：台灣拉麵愛好會(台湾ラーメン愛好会 / Ramen club of Taiwan)</DivText>
        <br />
      </BoxContact >
    )
  }
}
export default Contact;
