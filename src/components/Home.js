import React from 'react';
import styled from "styled-components";
import Filter from './Search/Filter';

const BoxBase = styled.div`
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  color: white;
`;

function Home() {
  return (
    <BoxBase>
      <Filter />
    </BoxBase>
  );
}

export default Home;
