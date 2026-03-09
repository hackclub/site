import fs from 'fs'
import path from 'path'

const CACHE_FILE = path.join(process.cwd(), '.next', 'hcb-orgs-cache.json')

export async function fetchAllOrganizations() {
  try {
    const data = fs.readFileSync(CACHE_FILE, 'utf8')
    return JSON.parse(data)
  } catch (e) {
    // miss
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
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true })
    fs.writeFileSync(CACHE_FILE, JSON.stringify(total))
  } catch (e) {
    // Non-fatal if write fails
  }

  return total
}
