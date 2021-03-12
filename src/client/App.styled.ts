import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    min-width: 320px;
    font-family: Arial, sans-serif;
  }

  a {
    color: inherit
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;
