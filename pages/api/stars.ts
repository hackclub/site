import { graphql } from '@octokit/graphql'
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

interface GitHubStarsResponse {
  organization: {
    blot: { stargazerCount: number };
    sinerider: { stargazerCount: number };
    sprig: { stargazerCount: number };
    hackclub: { stargazerCount: number };
    hackathons: { stargazerCount: number };
    sprigHardware: { stargazerCount: number };
    onboard: { stargazerCount: number };
  }
}

export async function fetchStars() {
  const emptyStats = {
    sprig: { stargazerCount: 0 },
    sinerider: { stargazerCount: 0 },
    sprigHardware: { stargazerCount: 0 },
    hackclub: { stargazerCount: 0 },
    hackathons: { stargazerCount: 0 },
    blot: { stargazerCount: 0 },
    onboard: { stargazerCount: 0 }
  }

  if (!process.env.GITHUB_TOKEN) {
    console.warn(
      'Note - GITHUB_TOKEN not defined, stars will not be fetched from github'
    )
    return emptyStats
  }

  try {
    const { organization } = await graphql<GitHubStarsResponse>(
      `
        {
          organization(login: "hackclub") {
            blot: repository(name: "blot") {
              stargazerCount
            }
            sinerider: repository(name: "sinerider") {
              stargazerCount
            }
            sprig: repository(name: "sprig") {
              stargazerCount
            }
            hackclub: repository(name: "hackclub") {
              stargazerCount
            }
            hackathons: repository(name: "hackathons") {
              stargazerCount
            }
            sprigHardware: repository(name: "sprig-hardware") {
              stargazerCount
            }
            onboard: repository(name: "onboard") {
              stargazerCount
            }
          }
        }
      `,
      {
        headers: {
          authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      }
    )
    return organization
  } catch (error) {
    console.error('Error fetching stars:', error)
    return emptyStats
  }
}

export default async function Stars(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await fetchStars())
}
