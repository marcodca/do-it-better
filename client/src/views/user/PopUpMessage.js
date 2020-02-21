import React from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import media from "../../mediaHelper";

const PopUpMessage = () => {
  const messageAnimation = useSpring({
    transform: "scale(1) rotate(5deg)",
    from: { transform: "scale(0) rotate(0deg)" },
    delay: 1500
  });

  return (
    <Message
      href={window.location.href}
      target="_blank"
      style={messageAnimation}
    >
      <h3>It's real time!</h3>
      <p>Click here to open a new tab, make changes and see it in action.</p>
    </Message>
  );
};

const Message = styled(animated.a)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(218, 255, 36, 0.7);
  border: 4px solid #000;
  position: absolute;
  top: 380px;
  transform: translateX(-10%);
  box-shadow: 0px 2px 12px 1px rgba(0, 0, 0, 0.8);
  right: 30px;
  ${media.lg`right: 20%`}
  visibility: hidden;
  ${media.md`visibility: initial;`}
  h3 {
    font-size: 36px;
    text-align: center;
  }
  p {
    display: inline-block;
    width: 80%;
    text-align: center;
  }
`;

export default PopUpMessage;
