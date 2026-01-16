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
  pronouns: string
  avatar: string
  staff?: boolean
  gapyear?: boolean
}

export async function fetchTeam() {
  const current: TeamMember[] = []
  const acknowledged: TeamMember[] = []

  for (const member of teamMembers as TeamMember[]) {
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
