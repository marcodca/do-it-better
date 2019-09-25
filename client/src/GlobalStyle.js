import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyle = createGlobalStyle`
    ${reset}
    body{
        background: rgb(189,189,189);
        background: linear-gradient(0deg, rgba(189,189,189,1) 0%, rgba(255,255,255,1) 100%);
        overflow: hidden;
        font-family: 'Catamaran', sans-serif;
    }
    a{
      text-decoration: none;
      color: inherit;
    }
`;

export default globalStyle;
