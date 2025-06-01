import React from 'react'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Analytics from '../components/analytics.js'
import { ToastProvider } from '../components/ui/use-toast'
import Meta from '@hackclub/meta'
import '@hackclub/theme/fonts/reg-bold.css'
import '../styles/globals.css'
import theme from '../lib/theme'
import { ThemeProvider as ThemeUIProvider } from 'theme-ui'
import { ThemeProvider } from '../contexts/ThemeContext'
import { Provider as BalancerProvider } from 'react-wrap-balancer'

// Create a client
const queryClient = new QueryClient()

const App = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeUIProvider theme={theme}>
      <ThemeProvider>
        <Meta as={Head}>
          <meta
            name="google-site-verification"
            content="7zE7h5foPaxIcnv5Frq6BkcUb9-3UzVc8q3P_cexf9I"
          />
        </Meta>
        <ToastProvider>
          <BalancerProvider>
            <div className="min-h-screen bg-white">
              <Component {...pageProps} />
            </div>
          </BalancerProvider>
        </ToastProvider>
        <Analytics />
      </ThemeProvider>
    </ThemeUIProvider>
  </QueryClientProvider>
)

export default App
