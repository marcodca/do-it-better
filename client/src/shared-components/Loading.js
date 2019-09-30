import React from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

const Loading = () => {
  const textAnimation = useSpring({
    to: async next => {
      while (true) {
        await next({ opacity: 1, transform: `scale(1.2)` });
        await next({ opacity: 0.8, transform: `scale(1)` });
      }
    },
    from: { opacity: 0.8, transform: `scale(1)` }
  });

  return (
    <Container>
      <Text style={textAnimation}>Loading...</Text>
    </Container>
  );
};
const Container = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled(animated.p)`
  font-family: "Pacifico";
  font-size: 48px;
  letter-spacing: 5px;
`;

export default Loading;
