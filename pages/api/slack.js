import FormData from 'form-data'

export async function Slack() {
  if (!process.env.SLACK_API_TOKEN)
    return { error: 'No Slack API token found!' }

  const formData = new FormData()

  formData.append('token', process.env.SLACK_API_TOKEN)
  formData.append('date_range', '30d')

  let slackData = await fetch(
    'https://hackclub.slack.com/api/team.stats.timeSeries',
    {
      method: 'POST',
      body: `--orpheus\r\nContent-Disposition: form-data; name="token"\r\n\r\n${process.env.SLACK_API_TOKEN}\r\n--orpheus\r\nContent-Disposition: form-data; name="date_range"\r\n\r\n30d\r\n--orpheus\r\nContent-Disposition: form-data;`,
      headers: {
        'content-type': 'multipart/form-data; boundary=orpheus',
        cookie: process.env.SLACK_API_COOKIE
      }
    }
  ).then(r => r.json())

  if (!slackData || !slackData.stats) {
    console.warn(`No slack data: ${JSON.stringify(slackData)}`)
    return {}
  } else {
    return slackData.stats.sort((a, b) => a.ds - b.ds).reverse()[0]
  }
}

export default async function Slacky(req, res) {
  res.status(200).json(await Slack())
}
