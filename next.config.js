const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  images: {
    domains: ['hackclub.com', 'dl.airtable.com', 'cdn.glitch.com']
  },
  webpack: (config, { isServer }) => {
    if (isServer) require('./lib/sitemap')
    return config
  },
  async redirects() {
    return [
      { source: '/clubs/', destination: '/', permanent: false },
      { source: '/c9/', destination: '/cloud9_setup/' },
      { source: '/slack_invite/', destination: '/slack/' },
      { source: '/workshops/slack/', destination: '/slack/' },
      { source: '/community/', destination: '/slack/' },
      { source: '/hack_camp/', destination: '/camp/' },
      { source: '/repl/', destination: '/' },
      { source: '/coc/', destination: '/conduct/' },
      { source: '/code_of_conduct/', destination: '/conduct/' },
      { source: '/branding/', destination: '/brand/' },
      { source: '/ama/', destination: '/amas/' },
      { source: '/finder/', destination: 'https://finder.hackclub.com' },
      { source: '/apply/', destination: 'https://apply.hackclub.com' },
      { source: '/icons/', destination: 'https://icons.hackclub.com' },
      {
        source: '/updates/',
        destination:
          'https://www.youtube.com/playlist?list=PLbNbddgD-XxEC5-_KQTye6nFPBLtI_mds'
      },
      {
        source: '/admin/',
        destination:
          'https://5c8804a629a378000833619c--hackclub.netlify.com/admin/'
      },
      {
        source: '/checkup/',
        destination:
          'https://5c8804a629a378000833619c--hackclub.netlify.com/checkup/',
        statusCode: 302
      },
      {
        source: '/workshops/',
        destination: 'https://workshops.hackclub.com/'
      },
      {
        source: '/workshops/([a-z_]+)/',
        destination: 'https://workshops.hackclub.com/$1/'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/v3/_next/:path*',
        destination: '/_next/:path*'
      },
      {
        source: '/workshops/_next/:path*',
        destination: 'https://workshops.hackclub.com/_next/:path*'
      },
      {
        source: '/summer/_next/:path*',
        destination: 'https://summer.hackclub.com/_next/:path*'
      },
      {
        source: '/sponsorship/',
        destination: 'https://workshops.hackclub.com/sponsorship/'
      },
      {
        source: '/covid19/',
        destination: 'https://workshops.hackclub.com/covid19/'
      },
      {
        source: '/sunsetting-som/',
        destination: 'https://workshops.hackclub.com/sunsetting-som/'
      },
      {
        source: '/banner/',
        destination: 'https://workshops.hackclub.com/banner/'
      },
      {
        source: '/conduct/',
        destination: 'https://workshops.hackclub.com/conduct/'
      },
      {
        source: '/workshop-bounty/',
        destination: 'https://workshops.hackclub.com/workshop-bounty/'
      },
      {
        source: '/vip-newsletters/',
        destination: 'https://workshops.hackclub.com/vip-newsletters/'
      },
      {
        source: '/vip-newsletters/(.*)',
        destination: 'https://workshops.hackclub.com/vip-newsletters/$1'
      },
      {
        source: '/transparency/may-2020/',
        destination: 'https://workshops.hackclub.com/transparency-may/'
      },
      {
        source: '/map/',
        destination: 'https://map.hackclub.dev/'
      },
      {
        source: '/(.*)',
        destination: 'https://site.hackclub.dev/$1'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/banners/(.*)',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }]
      },
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }]
      },
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
