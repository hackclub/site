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
  let open = process.env.NEXT_PUBLIC_OPEN == 'true' ? true : false

  if (req.method === 'OPTIONS') {
    return res.status(200).send('YIPPE YAY. YOU HAVE CLEARANCE TO PROCEED.')
  }
  if (req.method === 'GET') {
    return res
      .status(405)
      .json({ error: '*GET outta here!* (Method not allowed, use POST)' })
  }
  if (req.method === 'PUT') {
    return res.status(405).json({
      error: '*PUT that request away!* (Method not allowed, use POST)'
    })
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' })
  }

  const data = req.body || {}

  let secrets = (process.env.NAUGHTY || '').split(',')

  for (const secret of secrets) {
    if (secret === req.headers['x-forwarded-for']) {
      return res.json({
        status: 'success',
        message: 'You’ve been invited to Slack!'
      })
    }
  }

  if (open) {
    postData(
      'https://toriel.hackclub.com/slack-invite',
      {
        email: data.email,
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        continent: data.continent,
        teen: data.educationLevel != 'tertiary' ? true : false,
        educationLevel: data.educationLevel,
        reason: data.reason,
        userAgent: req.headers['user-agent'],
      },
      { authorization: `Bearer ${process.env.TORIEL_KEY}` }
    )
    res.json({ status: 'success', message: 'You’ve been invited to Slack!' })
  } else {
    res.json({
      status: 'success',
      message: 'Your request will be reviewed soon.'
    })
  }
}
