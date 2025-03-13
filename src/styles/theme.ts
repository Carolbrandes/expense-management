import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    colors: {
        primary: "#cdd4dd",
        secondary: "#1db954",
        background: "#ffffff",
        text: "#333",
        diviser: "#33333338",
        error: "#d76060",
        success: "#87aa81",
        info: "#efd4af"
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
        error: "#d76060",
        success: "#87aa81",
        info: "#efd4af"
    },
    fonts: {
        main: "'Arial', sans-serif",
    },
};

export type ThemeType = typeof lightTheme | typeof darkTheme;