import { normalizeGitHubCommitUrl } from '../../lib/helpers'

const isRelevantEventType = type =>
  ['PushEvent', 'PullRequestEvent', 'WatchEvent'].includes(type)

const getMessage = (type, payload, repo) => {
  switch (type) {
    case 'PushEvent':
      return payload.commits?.[0]?.message || 'No commit message'
    case 'PullRequestEvent':
      return payload.pull_request.title
    case 'WatchEvent':
      return `starred ${repo.name}`
    default:
      return null
  }
}

const getUrl = (type, payload, repo) => {
  switch (type) {
    case 'PushEvent':
      return payload.commits?.[0].url
        ? normalizeGitHubCommitUrl(payload.commits[0].url)
        : 'https://github.com/hackclub'
    case 'PullRequestEvent':
      return payload.pull_request.html_url
    case 'WatchEvent':
      return `https://github.com/${repo.name}`
    default:
      return `https://github.com/hackclub`
  }
}

export async function fetchGitHub() {
  const initialGitHubData = await fetch(
    'https://api.github.com/orgs/hackclub/events'
  ).then(r => r.json())

  const gitHubData = initialGitHubData
    .filter(({ type }) => isRelevantEventType(type))
    .map(({ type, actor, payload, repo, created_at }) => ({
      type,
      user: actor.login,
      userImage: actor.avatar_url,
      url: getUrl(type, payload, repo),
      message: getMessage(type, payload, repo),
      time: created_at
    }))

  return gitHubData
}

export default async function github(req, res) {
  const git = await fetchGitHub(req, res)
  res.json(git)
}
