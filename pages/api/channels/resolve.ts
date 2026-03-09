export default async function handler(req, res) {
  // get a public channel name by id
  const channelDataReq = await fetch(
    `https://slack.com/api/conversations.info?channel=${req.query.id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
      }
    }
  )

  if (!channelDataReq.ok) {
    console.warn(await channelDataReq.text())
    return res.status(503).end()
  }

  const channelData = await channelDataReq.json()
  if (!channelData.ok) {
    console.warn(channelData)
    return res.status(400).end()
  }

  res.status(200).send({ name: channelData.channel.name })
}
