import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#ffffff",
  text: "#333",
  cardBackground: "#f9f9f9",
  buttonBackground: "#007bff",
  buttonText: "#ffffff",
};

export const darkTheme = {
  body: "#121212",
  text: "#ffffff",
  cardBackground: "#1e1e1e",
  buttonBackground: "#ff9800",
  buttonText: "#000000",
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    font-family: 'Arial', sans-serif;
    transition: all 0.3s ease-in-out;
  }
`;
