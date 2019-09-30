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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(240, 175, 58);
  background: radial-gradient(
    circle,
    rgba(240, 175, 58, 1) 0%,
    rgba(219, 145, 13, 1) 100%
  );
`;
const Text = styled(animated.p)`
  font-family: "Pacifico";
  font-size: 48px;
  letter-spacing: 5px;
`;

export default Loading;
