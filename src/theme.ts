import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    logotype: `"Pacifico", "Brush Script MT", cursive`,
    heading: `"Poppins", Arial, Helvetica, "Trebuchet MS", Verdana, sans-serif`,
    body: `"Poppins", Arial, Helvetica, "Trebuchet MS", Verdana, sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'blue.50',
      }
    }
  }
});

export default theme
