import { css } from "styled-components";

const screens = {
  sm: "320px",
  md: "768px",
  lg: "1240px"
};

//Media queries spitter, mobile first.
 export default Object.keys(screens).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${screens[label].replace("px", "") / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
