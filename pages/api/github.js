import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB
})

export default async function handler(_, res) {
  const { data } = await octokit.repos.listForOrg({
    org: 'hackclub',
    type: 'public',
    per_page: 100
  })
  res.status(200).json(data)
}
