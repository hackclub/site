const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  images: {
    domains: [
      'hackclub.com',
      'dl.airtable.com',
      'emoji.slack-edge.com',
      'cdn.glitch.com',
      'scrapbook.hackclub.com',
      'cloud-k18c7grqc-hack-club-bot.vercel.app',
      'cloud-kcloydjv0-hack-club-bot.vercel.app',
      'cloud-dtijd5g0u-hack-club-bot.vercel.app',
      'cloud-3aeson6ue-hack-club-bot.vercel.app',
      'cloud-k3mgtdz5i-hack-club-bot.vercel.app',
      'cloud-2jmtbnrpz-hack-club-bot.vercel.app',
      'assets.hackclub.com',
      ''
    ]
  },
  webpack: (config, { isServer }) => {
    if (isServer) require('./lib/sitemap')
    return config
  },
  async redirects() {
    return [
      { source: '/grant/', destination: '/hackathons/grant', permanent: false },
      { source: '/start/', destination: '/', permanent: false },
      { source: '/clubs/', destination: '/', permanent: false },
      { source: '/repl/', destination: '/', permanent: true },
      { source: '/c9/', destination: '/deprecated/cloud9/', permanent: true },
      {
        source: '/cloud9_setup/',
        destination: '/deprecated/cloud9/',
        permanent: true
      },
      {
        source: '/redeem_tech_domain/',
        destination: '/deprecated/tech_domains/',
        permanent: true
      },
      {
        source: '/challenge/',
        destination: '/deprecated/challenge/',
        permanent: true
      },
      { source: '/slack_invite/', destination: '/slack/', permanent: true },
      {
        source: '/jobs/bank-tech-lead/',
        destination: '/jobs/lead-hacker/',
        permanent: true
      },
      {
        source: '/first/',
        destination: '/bank/first/',
        permanent: false
      },
      {
        source: '/bank/frc/',
        destination: '/bank/first/',
        permanent: false
      },
      {
        source: '/bank/ftc/',
        destination: '/bank/first/',
        permanent: false
      },
      {
        source: '/bank/fll/',
        destination: '/bank/first/',
        permanent: false
      },
      { source: '/workshops/slack/', destination: '/slack/', permanent: true },
      { source: '/community/', destination: '/slack/', permanent: true },
      { source: '/hack_camp/', destination: '/camp/', permanent: true },
      { source: '/branding/', destination: '/brand/', permanent: true },
      { source: '/ama/', destination: '/amas/', permanent: false },
      {
        source: '/open-source/',
        destination: '/opensource/',
        permanent: false
      },
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
        source: '/camp/',
        destination: 'https://camp.hackclub.com',
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
      },
      {
        source: '/jobs/creative-director/',
        destination: '/jobs/brand-director/',
        permanent: false
      },
      {
        source: '/jobs/bank-ops-assistant/',
        destination: '/jobs/bank-ops-associate/',
        permanent: false
      },
      {
        source: '/jobs/vp-DonorEngagement/',
        destination: '/jobs/vp-donor-engagement/',
        permanent: false
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
        destination: '/content/sponsorship/'
      },
      {
        source: '/covid19/',
        destination: '/content/covid19/'
      },
      {
        source: '/it-admins/',
        destination: '/content/it-admins/'
      },
      {
        source: '/sunsetting-som/',
        destination: '/content/sunsetting-som/'
      },
      {
        source: '/bank/apply/success',
        destination: '/bank/success'
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
        source: '/newsletter/',
        destination: 'https://workshops.hackclub.com/newsletter/'
      },
      {
        source: '/newsletter/(.*)',
        destination: 'https://workshops.hackclub.com/newsletter/$1'
      },
      {
        source: '/transparency/may-2020/',
        destination: '/content/transparency/may-2020/'
      },
      {
        source: '/map/',
        destination: 'https://map.hackclub.dev/'
      },
      {
        source: '/map/(.*)',
        destination: 'https://map.hackclub.dev/$1'
      },
      {
        source: '/how-to-organize-a-hackathon',
        destination: 'https://expandables.hackclub.dev/organizing.html'
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
}

const withPlugins = require('next-compose-plugins')

const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
const withTM = require('next-transpile-modules')(['animejs'])

module.exports = withPlugins([withTM, withMDX], nextConfig)
