import { graphql } from '@octokit/graphql'
import { createAppAuth } from '@octokit/auth-app'

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_PRIVATE_KEY,
  installationId: process.env.GITHUB_INSTALLATION_ID
})

export default async function handler(req, res) {
  const { organization } = await graphql(
    !req.query.admin
      ? `
    query orgQuery($login: String!) {
      organization(login: $login) {
        repositories(first: 50, privacy: PUBLIC, orderBy: {
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
    }`
      : `query orgQuery($login: String!) {
      organization(login: $login) {
        repositories(first: 100, privacy: PUBLIC, orderBy: {
          field: PUSHED_AT, direction: DESC
        }){
          nodes {
            name
            description
            isArchived
            languages(first: 1) {
              nodes {
                name
              }
            }
            pushedAt
            url
            pullRequests(first: 50, states: OPEN) {
              nodes {
                title,
                url,
                number,
                repository {
                  id,
                  name
                }
              }
            }
          }
        }
      }
    }`,
    {
      login: 'hackclub',
      request: {
        hook: auth.hook
      }
    }
  )
  res.status(200).json(organization)
}
