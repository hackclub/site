import { graphql } from '@octokit/graphql'

export async function fetchStars() {
  if (!process.env.GITHUB_TOKEN) {
    console.warn(
      'Note - GITHUB_TOKEN not defined, stars will not be fetched from github'
    )
    return {
      sprig: '?',
      sinerider: '?',
      sprigHardware: '?',
      hackclub: '?',
      hackathons: '?',
      blot: '?'
    }
  }
  const { organization } = await graphql(
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
}

export default async function Stars(req, res) {
  res.status(200).json(await fetchStars())
}
