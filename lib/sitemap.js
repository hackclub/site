const fs = require('fs')
const globby = require('globby')

function addPage(page) {
  const path = page.replace('pages', '').replace('.js', '').replace('.mdx', '')
  const route = path === '/index' ? '' : path

  return `  <url>
     <loc>${`https://hackclub.com${route}/`}</loc>
     <changefreq>hourly</changefreq>
   </url>`
}

async function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes
  const pages = await globby([
    'pages/**/*{.js,.mdx}',
    '!pages/_*.js',
    '!pages/api'
  ])
  const rewrites = [
    '/bank',
    '/team',
    '/philosophy',
    '/map',
    '/vip-newsletters',
    '/conduct',
    '/sponsorship',
    '/banner'
  ]
  rewrites.map(path => pages.push(path))
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 ${pages.sort().map(addPage).join('\n')}
 </urlset>`

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()
