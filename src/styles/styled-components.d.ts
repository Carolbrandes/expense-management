import "styled-components";
import { lightTheme } from "./theme";

// Criamos um tipo baseado no `lightTheme`
export type ThemeType = typeof lightTheme;

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      secondaryText: string
      diviser: string;
      error: string;
      success: string;
      info: string
    };
    fonts: {
      main: string;
    };
  }
}