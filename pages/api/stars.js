import { graphql } from '@octokit/graphql'
import { createAppAuth } from '@octokit/auth-app'

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID,
  privateKey: 'process.env.GITHUB_PRIVATE_KEY',
  installationId: process.env.GITHUB_INSTALLATION_ID
})

export default async function handler(req, res) {
  const { organization } = await graphql(
    !req.query.admin
      ? `
  query {
    organization(login: "hackclub") {
      sinerider: repository(name: "sinerider") {
        stargazerCount
      },
      sprig: repository(name: "sprig") {
        stargazerCount
      }
    }
  }`
      : `query {
      organization(login: "hackclub") {
        sinerider: repository(name: "sinerider") {
          stargazerCount
        },
        sprig: repository(name: "sprig") {
          stargazerCount
        }
      }
    }`,
    {
      request: {
        hook: auth.hook
      }
    }
  )
  res.status(200).json(organization)
}
