export async function fetchGitHub() {
  let initialGitHubData = await fetch(
    'https://api.github.com/orgs/hackclub/events'
  ).then(r => r.json())

  let gitHubData = initialGitHubData.map(x => ({
    type: x.type,
    user:
      x.type === 'PushEvent'
        ? x.actor.login
        : x.type === 'PullRequestEvent'
        ? x.actor.login
        : x.type === 'WatchEvent'
        ? x.actor.login
        : null,
    userImage:
      x.type === 'PushEvent'
        ? x.actor.avatar_url
        : x.type === 'PullRequestEvent'
        ? x.actor.avatar_url
        : x.type === 'WatchEvent'
        ? x.actor.avatar_url
        : null,
    message:
      x.type === 'PushEvent'
        ? x.payload.commits[0]?.message
        : x.type === 'PullRequestEvent'
        ? x.payload.pull_request.title
        : x.type === 'WatchEvent'
        ? `starred ${x.repo.name}`
        : null,
    time: x.created_at
  }))

  gitHubData = gitHubData.filter(
    x =>
      x.type === 'PushEvent' ||
      x.type === 'PullRequestEvent' ||
      x.type === 'WatchEvent'
  )

  return gitHubData
}

export default async function github(req, res) {
  const git = await fetchGitHub(req, res)
  res.json(git)
}
