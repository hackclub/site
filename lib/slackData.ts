type SlackData = {
  active_users_28d?: number
  full_members_count?: number
  total_members_count?: number
  ds?: string
}

export const slackData = async () =>
  (await fetch('https://slack-data.hackclub.dev/full')
    .then(r => r.json())
    .then(d => d.stats?.sort((a, b) => b.ds.localeCompare(a.ds))[0] ?? {})
    .catch(() => ({}))) as SlackData
