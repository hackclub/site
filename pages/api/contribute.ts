import { graphql } from '@octokit/graphql'
import { createAppAuth } from '@octokit/auth-app'
import { NextApiRequest, NextApiResponse } from 'next'

interface OrgQueryResponse {
  organization: Record<string, any>
}

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID as string,
  privateKey: process.env.GITHUB_PRIVATE_KEY as string,
  installationId: process.env.GITHUB_INSTALLATION_ID as string
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { organization } = await graphql<OrgQueryResponse>(
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
