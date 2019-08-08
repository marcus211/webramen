import React from 'react';
import styled from 'styled-components';
import Filter from './Search/Filter';

const BoxBase = styled.div`
  justify-content: center;
  text-align: center;
  width: 100%;
  min-height: 100vh;
  color: white;
  background-color: brown;
`;

function Home() {
  return (
    <BoxBase>
      <h2>First Page!!</h2>
      <p>This is my first AppRouter</p>
      <p>Find some thing!!</p>
      <Filter />
    </BoxBase>
  );
}

export default Home;
