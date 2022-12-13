import { createGlobalStyle, css } from 'styled-components';
// import { ThemeType } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    cursor: none !important;
    font-family: "Rubik", sans-serif;
   
  }

  #root{ 
    height: inherit;
    width: inherit;
  }
  :root {
    ${(props) => css`
      --blur-enabled: ${props.blur ? 'blur(24px)' : 'none'};
      --border-color: ${props.theme.colors.ui.borderColor};
      --background-color: ${props.theme.colors.bg.primary};
      --transition-fast: ${props.theme.transitionFast};
      --transition: ${props.theme.transition};
      --text-color: ${props.theme.colors.text.primary};
    `}
  }

  body {
    background-color: ${(props) => props.theme.colors.bg.body};
    transition: background-color 1s ease;
    color: ${(props) => props.theme.colors.text.primary};
    height: 100vh;
    width: 100vw;
    margin: 0;
  }

  li {
    list-style: none;
  }

  ul {
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }

  a {
    text-decoration: none;
    height: fit-content;
    width: fit-content;
    margin: 10px;
  }

  fieldset {
    border: 0;
  }

`;

export default { GlobalStyle };
