import { graphql } from '@octokit/graphql'

export async function fetchStars() {
  const { organization } = await graphql(
    `
      {
        organization(login: "hackclub") {
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
