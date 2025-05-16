import teamMembers from '../../public/team.json'
import type { NextApiRequest, NextApiResponse } from 'next'

interface TeamMember {
  name: string
  department: string
  role: string | string[]
  acknowledged: boolean
  bio: string
  bioHackFoundation: string
  slackId: string
  overrideAvatar: string
  email: string
  website: string
  pronouns?: string
  avatar: string
}

// Cache duration in seconds (5 minutes)
const CACHE_DURATION = 5 * 60

export async function fetchTeam() {
  const current: TeamMember[] = []
  const acknowledged: TeamMember[] = []

  try {
    // Fetch cached user data
    const cacheResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'http://localhost:3000'}/api/team-cache`,
      {
        headers: { 'Cache-Control': 'no-cache' }
      }
    )

    const { cache: userDataCache = {} } = await cacheResponse.json()

    for (const member of teamMembers as TeamMember[]) {
      // Always use cachet.dunkirk.sh for avatar images
      if (member.slackId) {
        member.avatar = `https://cachet.dunkirk.sh/users/${member.slackId}/r`

        // Apply cached pronouns if available
        if (userDataCache[member.slackId]?.pronouns) {
          member.pronouns = userDataCache[member.slackId].pronouns
        }
      }

      if (member.acknowledged) {
        acknowledged.push(member)
      } else {
        current.push(member)
      }
    }
  } catch (error) {
    console.error('Error fetching cached team data:', error)
  }

  return { current, acknowledged }
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // Set cache headers
  res.setHeader(
    'Cache-Control',
    `s-maxage=${CACHE_DURATION}, stale-while-revalidate`
  )
  res.status(200).json(await fetchTeam())
}
