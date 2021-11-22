import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
    // custom: {
    //   main: string;
    // };
  }

  interface CustomThemeOptions extends ThemeOptions {
    // custom?: {
    //   main?: string;
    // };
  }

  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
