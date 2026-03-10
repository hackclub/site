import { GetServerSideProps } from 'next'
import fs from 'fs'
import path from 'path'

const SITE_URL = 'https://hackclub.com'

function getPages(dir: string, base = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const pages: string[] = []

  for (const entry of entries) {
    const name = entry.name
    if (name.startsWith('_') || name.startsWith('[')) continue
    if (name === 'api' || name === 'sitemap.xml.tsx') continue

    if (entry.isDirectory()) {
      pages.push(...getPages(path.join(dir, name), `${base}/${name}`))
    } else if (/\.(tsx|ts|js|jsx|mdx)$/.test(name)) {
      const slug = name.replace(/\.(tsx|ts|js|jsx|mdx)$/, '')
      if (slug === 'index') {
        pages.push(`${base}/`)
      } else if (slug !== '404') {
        pages.push(`${base}/${slug}/`)
      }
    }
  }

  return pages
}

function generateSitemap(pages: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .sort()
  .map(
    page => `  <url>
    <loc>${SITE_URL}${page}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pagesDir = path.join(process.cwd(), 'pages')
  const pages = getPages(pagesDir)
  const sitemap = generateSitemap(pages)

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
