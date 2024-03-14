export default async function handler(req, res) {
  const channelDataReq = await fetch(
      `https://slack.com/api/conversations.info?channel=${req.body.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
        }
      }
  )
  console.log(channelDataReq)
  return res.status(200).send(channelDataReq)
}
