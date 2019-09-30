import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <Text>Loading...</Text>
    </Container>
  );
};

const Container = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  font-family: "Pacifico";
  font-size: 48px;
`;

export default Loading;
