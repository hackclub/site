const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// fetches the latest message in #counttoamillion and returns the current count
export const getCount = async (req, res) => {
  const history = await fetch(
    `https://slack.com/api/conversations.history?token=${process.env.SLACK_LEGACY_TOKEN}&channel=CDJMS683D&limit=1&inclusive=true`
  )
    .then(r => r.json())
    .catch(err => console.err(`Error: ${err}`))
  const str = history.messages?.[0].text.split(' ')?.[0].replace(/[^0-9]/g, '')
  if (!str) return 'error'
  return withCommas(Number(str))
}

const getCountEndpoint = (req, res) => getCount().then(v => res.send(v))

export default getCountEndpoint
