import type { NextApiRequest, NextApiResponse } from 'next'
import teamMembers from '../../public/team.json'

// Cache duration in seconds (12 hours)
const CACHE_DURATION = 12 * 60 * 60

// In-memory cache for user data
let userDataCache: Record<string, any> = {}
let cacheTimestamp = 0

async function fetchUserData(slackId: string) {
  try {
    const response = await fetch(`https://cachet.dunkirk.sh/users/${slackId}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    
    return await response.json()
  } catch (error) {
    console.error(`Error fetching data for ${slackId}:`, error)
    return { message: 'Error fetching user data' }
  }
}

async function refreshCache() {
  // Skip refresh if cache is still fresh
  const now = Date.now()
  if (now - cacheTimestamp < CACHE_DURATION * 1000) {
    return userDataCache
  }
  
  console.log('Refreshing team data cache...')
  const newCache: Record<string, any> = {}
  
  // Process members in batches to avoid rate limiting
  const batchSize = 5
  const slackIds = teamMembers
    .filter(member => member.slackId)
    .map(member => member.slackId)
  
  for (let i = 0; i < slackIds.length; i += batchSize) {
    const batch = slackIds.slice(i, i + batchSize)
    const promises = batch.map(async slackId => {
      const data = await fetchUserData(slackId)
      if (!data.message) {
        newCache[slackId] = {
          pronouns: data.pronouns,
          displayName: data.displayName,
          user: data.user
        }
      }
    })
    
    await Promise.all(promises)
    
    // Small delay between batches
    if (i + batchSize < slackIds.length) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }
  
  userDataCache = newCache
  cacheTimestamp = now
  return newCache
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Force refresh if requested
  const forceRefresh = req.query.refresh === 'true'
  
  if (forceRefresh || Object.keys(userDataCache).length === 0 || Date.now() - cacheTimestamp > CACHE_DURATION * 1000) {
    await refreshCache()
  }
  
  // Set cache control headers
  res.setHeader('Cache-Control', `s-maxage=${CACHE_DURATION}, stale-while-revalidate`)
  res.status(200).json({
    cache: userDataCache,
    timestamp: cacheTimestamp,
    expires: new Date(cacheTimestamp + CACHE_DURATION * 1000).toISOString()
  })
}