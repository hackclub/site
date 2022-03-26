import { graphql } from '@octokit/graphql'
import { createAppAuth } from '@octokit/auth-app'

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_PRIVATE_KEY,
  installationId: process.env.GITHUB_INSTALLATION_ID,
})

export default async function handler(_, res) {
  const { organization } = await graphql(`
    query orgQuery($login: String!) {
      organization(login: $login) {
        repositories(first: 20, privacy: PUBLIC, orderBy: {
          field: PUSHED_AT, direction: DESC
        }){
          nodes {
            name
            description
            languages(first: 1) {
              nodes {
                name
              }
            }
            pushedAt
            url
            issues(states: OPEN) {
              totalCount
            }
          }
        }
      }
    }`,
    {
      login: 'hackclub',
      request: {
        hook: auth.hook,
      }
    }
  )
  res.status(200).json(organization);
}
