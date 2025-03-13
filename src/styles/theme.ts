import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    colors: {
        primary: "#cdd4dd",
        secondary: "#1db954",
        background: "#ffffff",
        text: "#333",
        diviser: "#33333338",
    },
    fonts: {
        main: "'Arial', sans-serif",
    },
};

export const darkTheme: DefaultTheme = {
    colors: {
        primary: "#40474f",
        secondary: "#0070f3",
        background: "#121212",
        text: "#ffffff",
        diviser: "#fff",
    },
    fonts: {
        main: "'Arial', sans-serif",
    },
};

export type ThemeType = typeof lightTheme | typeof darkTheme;