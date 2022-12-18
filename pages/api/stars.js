import { graphql } from '@octokit/graphql'

export default async function handler(req, res) {
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
  res.status(200).json(organization)
}
