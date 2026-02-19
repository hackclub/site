import teamMembers from '../../public/team.json'
import acknowledgedMembers from '../../public/acknowledged.json'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface TeamMember {
  name: string
  department: string
  role: string | string[]
  acknowledged?: boolean
  bio: string
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
  return teamMembers as TeamMember[]
}

export async function fetchAcknowledged() {
  return acknowledgedMembers as TeamMember[]
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(await fetchTeam())
}
