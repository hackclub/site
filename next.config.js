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
      { source: '/c9/', destination: '/cloud9/', permanent: true },
      { source: '/cloud9_setup/', destination: '/cloud9/', permanent: true },
      { source: '/slack_invite/', destination: '/slack/', permanent: true },
      { source: '/workshops/slack/', destination: '/slack/', permanent: true },
      { source: '/community/', destination: '/slack/', permanent: true },
      { source: '/hack_camp/', destination: '/camp/', permanent: true },
      { source: '/repl/', destination: '/', permanent: true },
      { source: '/branding/', destination: '/brand/', permanent: true },
      { source: '/ama/', destination: '/amas/', permanent: false },
      { source: '/coc/', destination: '/conduct/', permanent: true },
      {
        source: '/code_of_conduct/',
        destination: '/conduct/',
        permanent: true
      },
      {
        source: '/finder/',
        destination: 'https://finder.hackclub.com',
        permanent: true
      },
      {
        source: '/apply/',
        destination: 'https://apply.hackclub.com',
        permanent: true
      },
      {
        source: '/icons/',
        destination: 'https://icons.hackclub.com',
        permanent: true
      },
      {
        source: '/updates/',
        destination:
          'https://www.youtube.com/playlist?list=PLbNbddgD-XxEC5-_KQTye6nFPBLtI_mds',
        permanent: false
      },
      {
        source: '/admin/',
        destination:
          'https://5c8804a629a378000833619c--hackclub.netlify.com/admin/',
        permanent: false
      },
      {
        source: '/checkup/',
        destination:
          'https://5c8804a629a378000833619c--hackclub.netlify.com/checkup/',
        permanent: false
      },
      {
        source: '/workshops/',
        destination: 'https://workshops.hackclub.com/',
        permanent: false
      },
      {
        source: '/workshops/([a-z_]+)/',
        destination: 'https://workshops.hackclub.com/$1/',
        permanent: true
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
        source: '/:path*',
        destination: '/:path*'
      },
      {
        source: '/:slug*',
        destination: 'https://site.hackclub.dev/:slug*'
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
