import AirtablePlus from 'airtable-plus'

const airtable = new AirtablePlus({
  baseID: 'app1o9tRo6XulLnsr',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'rsvp'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const rsvp = await airtable.create({
      Name: req.body.Name,
      Email: req.body.Email,
      Age: req.body.Age,
      IP: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    })
    const url = process.env.WOM_SLACK_WEBHOOK_URL
    const body = JSON.stringify({
      rsvp
    })
    fetch(url, {
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.status(200).json({ success: true }))
      .catch(error => {
        console.error(error)
        res.json({ status: 'Something went wrong', error })
      })
  } else {
    res.status(405).json({ status: 'error', error: 'Must send POST request' })
  }
}
