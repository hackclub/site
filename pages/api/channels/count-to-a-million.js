export default async function getCount(req, res) {
  // fetches the latest message in #counttoamillion and returns the current count

  const history = await fetch(`https://slack.com/api/conversations.history?token=${process.env.SCRAPPY_TOKEN}&channel=CDJMS683D&limit=1&inclusive=true`)
    .then(r => r.json())
    .catch(err => console.err(`Error: ${err}`));
  const latestCount = history.messages[0].text.split(' ')[0].replace(/[^0-9]/g, '');
  return latestCount;
  // res.status(200).send(latestCount)
}