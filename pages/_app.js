import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import NextApp from 'next/app'
import Head from 'next/head'

import Meta from '@hackclub/meta'
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'
import * as Fathom from 'fathom-client'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    Fathom.load('OGIMJEFA', {
      includedDomains: ['hackclub.com', 'v3.hackclub.com'],
      url: 'https://aardvark.hackclub.com/script.js'
    })
    const onRouteChangeComplete = () => Fathom.trackPageview()
    router.events.on('routeChangeComplete', onRouteChangeComplete)
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Meta as={Head} />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
