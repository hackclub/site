import React from 'react'
import { Inter } from 'next/font/google'
import Meta from '@hackclub/meta'
import '@hackclub/theme/fonts/reg-bold.css'
import '../styles/globals.css'
import Head from 'next/head'
import { Providers } from '../components/Providers'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }) => (
  <>
    <Meta as={Head}>
      <meta
        name="google-site-verification"
        content="7zE7h5foPaxIcnv5Frq6BkcUb9-3UzVc8q3P_cexf9I"
      />
    </Meta>
    <div className="min-h-screen bg-white">
      <Head>
        <title>Hack Club</title>
        <meta name="description" content="A global community of high school hackers making things with code." />
      </Head>
      <div className={inter.className}>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </div>
    </div>
  </>
)

export default App
