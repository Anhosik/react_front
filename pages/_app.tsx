import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/reset';
import theme from '../styles/theme';

import {StoreProvider } from '../store/Context'
import {RootStore} from '../store/RootStore'

const rootStore  = new RootStore();



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StoreProvider value={rootStore}>
        <Component {...pageProps} />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default MyApp;