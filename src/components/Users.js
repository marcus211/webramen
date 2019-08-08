import React from "react";
import styled from "styled-components";

const BoxBase = styled.div`
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  color: white;
  background-color: purple;
`;

function Users() {
  return (
    <BoxBase>
      <h2>Third Page!!</h2>
      <br />
      <span>build user here!</span>
    </BoxBase>
  );
}

export default Users;
