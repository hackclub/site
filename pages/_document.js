import Document, { Html, Head, Main, NextScript } from 'next/document'
import * as snippet from '@segment/snippet'
// import { InitializeColorMode } from 'theme-ui'

const org = {
  '@context': 'http://schema.org',
  '@type': 'Organization',
  name: 'Hack Club',
  url: 'https://hackclub.com/',
  logo: 'https://hackclub.com/social.png',
  sameAs: [
    'https://twitter.com/hackclub',
    'https://github.com/hackclub',
    'https://www.instagram.com/starthackclub',
    'https://www.facebook.com/Hack-Club-741805665870458',
    'https://www.youtube.com/channel/UCQzO0jpcRkP-9eWKMpJyB0w'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'team@hackclub.com',
      contactType: 'customer support',
      url: 'https://hackclub.com/'
    }
  ]
}

const {
  ANALYTICS_WRITE_KEY = '35oTlU4UqlhIN8VGYmBxAzyDdfzhcscw',
  NODE_ENV = 'development'
} = process.env

const renderSnippet = () => {
  const opts = { apiKey: ANALYTICS_WRITE_KEY, page: true }
  return NODE_ENV === 'production' ? snippet.min(opts) : ''
}

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="format-detection" content="telephone=no" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
          />
        </Head>
        <body>
          {/* <InitializeColorMode /> */}
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: renderSnippet() }} />
        </body>
      </Html>
    )
  }
}
