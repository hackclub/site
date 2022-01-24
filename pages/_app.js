import React from 'react'
import Head from 'next/head'

import Analytics from "../components/analytics.js";

import Meta from '@hackclub/meta'
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Meta as={Head} />
    <Component {...pageProps} />
    <Analytics />
  </ThemeProvider>
)

export default App
