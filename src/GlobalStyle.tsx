import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body, html {
    font-size: large;
    margin: 0;
    padding: 0;
    font-family: Open Sans, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
`;

export { GlobalStyle };