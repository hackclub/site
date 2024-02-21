import AirtablePlus from 'airtable-plus'

const joinTable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'appaqcJtn33vb59Au',
  tableName: 'Join Requests'
})

async function postData(url = '', data = {}, headers = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
  return response.text()
}

export default async function handler(req, res) {
  switch (req.method) {
    case 'OPTIONS':
      return res.status(200).send('YIPPE YAY. YOU HAVE CLEARANCE TO PROCEED.')
    case 'GET':
      return res
        .status(405)
        .json({ error: '*GET outta here!* (Method not allowed, use POST)' })
    case 'PUT':
      return res.status(405).json({
        error: '*PUT that request away!* (Method not allowed, use POST)'
      })
    case 'POST':
      break
    default:
      return res.status(405).json({ error: 'Method not allowed, use POST' })
  }

  const data = req.body || {}
  const open = process.env.NEXT_PUBLIC_OPEN === 'true'
  const waitlist = !open
  const isAdult = data.educationLevel === 'tertiary'

  const secrets = (process.env.NAUGHTY || '').split(',')

  if (secrets.includes(req.headers['x-forwarded-for'])) {
    return res.json({
      status: 'success',
      message: 'You’ve been invited to Slack!'
    })
  }

  const airtablePromise = joinTable.create({
    'Full Name': data.name,
    'Email Address': data.email,
    Student: !isAdult,
    Reason: data.reason,
    Invited: !waitlist,
    Club: data.club ? data.club : '',
    Event: data.event ? data.event : '',
    IP: req.headers['x-forwarded-for'] || req.socket.remoteAddress
  })

  if (waitlist) {
    return res.json({
      status: 'success',
      message: 'Your request will be reviewed soon.'
    })
  }

  const slackPromise = postData(
    'https://toriel.hackclub.com/slack-invite',
    {
      email: data.email,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      continent: data.continent,
      teen: !isAdult,
      educationLevel: data.educationLevel,
      reason: data.reason,
      event: data.event,
      userAgent: req.headers['user-agent']
    },
    { authorization: `Bearer ${process.env.TORIEL_KEY}` }
  )

  Promise.all([airtablePromise, slackPromise])
    .then(() =>
      res.json({ status: 'success', message: 'You’ve been invited to Slack!' })
    )
    .catch(error => {
      res.status(500).json({ error })
    })
}
