import teamMembers from '../../public/team.json'
import type { NextApiRequest, NextApiResponse } from 'next'

interface TeamMember {
  name: string
  department: string
  role: string | string[]
  order: number
  acknowledged: boolean
  bio: string
  bioHackFoundation: string
  slackId: string
  overrideAvatar: string
  email: string
  website: string
  pronouns: string
  avatar: string
}

export async function fetchTeam() {
  const current: TeamMember[] = []
  const acknowledged: TeamMember[] = []

  for (const member of teamMembers as TeamMember[]) {
    if (process.env.SLACK_API_TOKEN) {
      const formData = new FormData()
      formData.append('token', process.env.SLACK_API_TOKEN)
      formData.append('user', member.slackId)

      const slackData = await fetch(
        `https://hackclub.slack.com/api/users.profile.get?user=${member.slackId}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data',
            cookie: process.env.SLACK_API_COOKIE || ''
          },
          body: formData
        }
      ).then(r => r.json())

      if (slackData.ok) {
        member.pronouns = slackData.profile.pronouns
      } else {
        console.warn('Not found:', member.slackId)
      }
    }

    if (member.acknowledged) {
      acknowledged.push(member)
    } else {
      current.push(member)
    }
  }

  return { current, acknowledged }
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(await fetchTeam())
}
