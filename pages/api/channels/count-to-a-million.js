export default async (req, res) => {
  // fetches the latest message in #counttoamillion and returns the current count

  const history = await fetch(`https://slack.com/api/conversations.history?token=${process.env.SCRAPPY_TOKEN}&channel=CDJMS683D&limit=1&inclusive=true`)
    .then(r => r.json())
    .catch(err => res.status(400).send(`Error: ${err}`))
  const latestCount = history.messages[0].text.split(' ')[0].replace(/[^0-9]/g, '')

  res.status(200).send(latestCount)
}
