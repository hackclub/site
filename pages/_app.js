import React from 'react'
import Head from 'next/head'

import Meta from '@hackclub/meta'
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'
import { useRouter } from 'next/router'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const pathsToIgnore = ['bank']
  const path = router.asPath.slice(1, -1) // remove `/` from start and end, i.e /bank/ => bank

  if (!pathsToIgnore.includes(path)) {
    /**Disable dark mode */
    theme.useColorSchemeMediaQuery = false
    theme.colors.modes = {}
  }

  return (
    <ThemeProvider theme={theme}>
      <Meta as={Head} />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
