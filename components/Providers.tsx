"use client"

import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as ThemeUIProvider } from 'theme-ui'
import { ThemeProvider } from '../contexts/ThemeContext'
import { queryClient } from '../lib/query-client'
import { ToastProvider } from './ui/use-toast'
import { Toaster } from './ui/toaster'
import { Provider as BalancerProvider } from 'react-wrap-balancer'
import theme from '../lib/theme'
import Analytics from './analytics'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeUIProvider theme={theme}>
        <ThemeProvider>
          <ToastProvider>
            <BalancerProvider>
              {children}
              <Toaster />
              <Analytics />
            </BalancerProvider>
          </ToastProvider>
        </ThemeProvider>
      </ThemeUIProvider>
    </QueryClientProvider>
  )
}
