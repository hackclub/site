const CACHE_FILENAME = 'hcb-orgs-cache.json'

export async function fetchAllOrganizations() {
  const fs = require('fs')
  const path = require('path')
  const cacheFile = path.join(process.cwd(), '.next', CACHE_FILENAME)

  try {
    return JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
  } catch (e) {
    // Cache miss
  }

  let lastLength = 100
  let total = []
  let page = 1
  while (lastLength >= 100) {
    const json = await fetch(
      'https://hcb.hackclub.com/api/v3/directory/organizations?per_page=100&page=' +
        page
    ).then(res => res.json())
    lastLength = json.length
    page++
    total = [...total, ...json]
  }

  try {
    fs.mkdirSync(path.dirname(cacheFile), { recursive: true })
    fs.writeFileSync(cacheFile, JSON.stringify(total))
  } catch (e) {}

  return total
}
