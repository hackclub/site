// Define your static routes
import fs from 'fs'
import path from 'path'

export async function getServerSideProps({ res }) {
  // Hack club URL
  const baseUrl = 'https://hackclub.com'
  // Get all files in the pages directory (excluding _app.js, _document.js, _error.js, api, and files/folders starting with _)
  function getAllPageRoutes(
    dir = path.join(process.cwd(), 'pages'),
    routePrefix = ''
  ) {
    let routes = []

    fs.readdirSync(dir).forEach(filename => {
      const filepath = path.join(dir, filename)
      const stat = fs.statSync(filepath)

      // Exclude all files/folders starting with '_', and 'api' routes directory
      if (
        filename.startsWith('_') ||
        filename === 'api' ||
        filename === '404.js' ||
        filename.includes('[')
      ) {
        return
      }

      if (stat.isDirectory()) {
        // Recursively process folders
        routes = routes.concat(
          getAllPageRoutes(filepath, `${routePrefix}/${filename}`)
        )
      } else if (
        /\.(js|jsx|ts|tsx|mdx)$/.test(filename) &&
        filename !== 'sitemap.xml.js'
      ) {
        let name = filename.replace(/\.(js|jsx|ts|tsx|mdx)$/, '')
        let route
        if (name === 'index') {
          route = routePrefix === '' ? '/' : `${routePrefix}`
        } else {
          route = `${routePrefix}/${name}`
        }
        routes.push(route)
      }
    })

    return routes
  }

  const staticPages = getAllPageRoutes()
    .map(path => `${baseUrl}${path}`)
    .sort((a, b) => a.localeCompare(b))

  // Build XML structure
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map(url => {
        return `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `
      })
      .join('')}
  </urlset>`

  // Set headers and send XML
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default function Sitemap() {
  // Next.js will not render this page
  return null
}
