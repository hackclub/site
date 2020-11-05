const isProd = process.env.NODE_ENV === 'production'
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: isProd ? '/v3' : '',
  images: {
    domains: ['hackclub.com', 'v3.hackclub.dev', 'v3.hackclub.com', 'dl.airtable.com', 'cdn.glitch.com']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./lib/sitemap')
    }

    return config
  },
  async headers() {
    return [
      {
        source: '/api/(.+)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' }
        ]
      }
    ]
  }
})
