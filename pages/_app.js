/** @jsxImportSource theme-ui */
import { ThemeProvider } from "theme-ui";
import theme from "../theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
