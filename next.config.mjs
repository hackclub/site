/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      'assets.hackclub.com',
      'v5.airtableusercontent.com',
      ''
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud-*-hack-club-bot.vercel.app'
      }
    ]
  },
  webpack: (config, { isServer }) => {
    return config
  },
  async redirects() {
    return [
      {
        source: '/bank/:path*',
        destination: '/hcb/:path*',
        permanent: true
      },
      { source: '/grant/', destination: '/hackathons/grant', permanent: false },
      {
        source: '/sprig/',
        destination: 'https://sprig.hackclub.com',
        permanent: true
      },
      { source: '/start/', destination: '/', permanent: false },
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
      {
        source: '/wom/',
        destination: '/winter/',
        permanent: false
      },
      { source: '/workshops/slack/', destination: '/slack/', permanent: true },
      { source: '/community/', destination: '/slack/', permanent: true },
      { source: '/hack_camp/', destination: '/camp/', permanent: true },
      { source: '/branding/', destination: '/brand/', permanent: true },
      { source: '/ama/', destination: '/amas/', permanent: false },
      { source: '/geohot', destination: '/amas/geohot/', permanent: false },
      { source: '/sal', destination: '/amas/sal/', permanent: false },
      { source: '/vitalik', destination: '/amas/vitalik/', permanent: false },
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
      },
      {
        source: '/daysofservice/',
        destination: 'https://daysofservice.hackclub.com',
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
      },
      {
        source: '/how-to-organize-a-hackathon/style.css',
        destination: 'https://expandables.hackclub.dev/style.css'
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

import million from 'million/compiler'
import withMDX from '@next/mdx'
import withTM from 'next-transpile-modules'

const withMDXConfig = withMDX({ extension: /\.mdx?$/ })
const withAnimeJS = withTM(['animejs'])

export default million.next(withAnimeJS(withMDXConfig(nextConfig)), {
  auto: true
})
