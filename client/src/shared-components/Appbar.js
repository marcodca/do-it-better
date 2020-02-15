import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const Bar = styled(animated.div)`
  min-height: 60px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #ed673b;
  z-index: 10;
  box-shadow: -2px 10px 26px -8px rgba(0,0,0,0.75);
  will-change: height;
`;

const Logo = styled(animated.div)`
  font-family: "Pacifico", cursive;
  font-size: 25px;
  color: #fff;
  text-align: center;
  display: flexbox;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 75px;
  height: 75px;
  background: inherit;
  border-radius: 50%;
  box-shadow: 0px 24px 16px -15px rgba(0,0,0,0.75);
  span {
    font-size: 30px;
  }
`;

const Appbar = () => {
  const BarAnimation = useSpring({
    height: `10vh`,
    from: { height: `100vh` },
    delay: 400
  });
  const LogoAnimation = useSpring({
    transform: `scale(1) rotate(-20deg)`,
    from: { transform: `scale(8) rotate(0deg)` }
  });

  return (
    <Bar style={BarAnimation}>
      <Logo style={LogoAnimation}>
        <Link to={`/`}>
          Do it <br />
          <span>better</span>
        </Link>
      </Logo>
    </Bar>
  );
};

export default Appbar;
