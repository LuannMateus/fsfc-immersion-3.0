import '../../styles/globals.scss';
import type { AppProps } from 'next/app';
import {
  Container,
  CssBaseline,
  MuiThemeProvider,
  Box,
} from '@material-ui/core';
import theme from '../theme';
import Navbar from '../components/Navbar';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <Navbar />
        <Container>
          <Box marginTop={1}>
            <Component {...pageProps} />
          </Box>
        </Container>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}
export default MyApp;
