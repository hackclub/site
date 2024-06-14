import AirtablePlus from 'airtable-plus'

async function inviteToArcadius({ email }) {
  const response = await fetch('https://arcadius.hackclub.com/slack-invite', {
    body: JSON.stringify({
      email
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SLACK_KEY}`
    }
  })

  return response
}
async function inviteToAirtable({ email, ip }) {
  const airtable = new AirtablePlus({
    baseID: 'appaqcJtn33vb59Au',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'Arcade Joins'
  })
  return await airtable.create({ 'Email': email, 'IP': ip })
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body

      const email = data.userEmail
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

      const result = await Promise.all([
        // inviteToArcadius({ email }),
        inviteToAirtable({ email, ip })
      ])

      if (result[0]?.response?.ok) {
        res.json({ status: 200, message: 'Invitation sent!' })
      } else {
        const errorData = await result[0]?.response?.json()
        res.json({ status: 400, error: errorData })
      }
    } catch (error) {
      console.error(error)
      res.json({ status: 400, error })
    }
  } else {
    res.json({ status: 405, error: 'POST method required' })
  }
}
