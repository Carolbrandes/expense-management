import "styled-components";
import { lightTheme } from "./theme";


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