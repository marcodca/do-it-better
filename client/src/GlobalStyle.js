import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyle = createGlobalStyle`
    ${reset}
    body{
        font-family: 'Catamaran', sans-serif;
    }
    a{
      text-decoration: none;
      color: inherit;
    }
`;

export default globalStyle;
