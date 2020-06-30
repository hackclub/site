const isProd = process.env.NODE_ENV === 'production'
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  experimental: { trailingSlash: true },
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: isProd ? '/v3' : ''
})
