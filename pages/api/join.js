import AirtablePlus from 'airtable-plus'

const joinTable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'appaqcJtn33vb59Au',
  tableName: 'Join Requests'
})

async function postData(url = '', data = {}, headers = {}) {
  console.log(data)
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
  const open = process.env.NEXT_PUBLIC_OPEN === 'true'
  const waitlist = !open
  const isAdult = data.educationLevel === 'tertiary'

  const secrets = (process.env.NAUGHTY || '').split(',')


  for (const secret of secrets) {
    if (secret === req.headers['x-forwarded-for']) {
      return res.json({
        status: 'success',
        message: 'You’ve been invited to Slack!'
      })
    }
  }


  await joinTable.create({
    'Full Name': data.name,
    'Email Address': data.email,
    Student: !isAdult,
    Reason: data.reason,
    Invited: !waitlist,
    Club: data.club ? data.club : '',
    Event: data.event ? data.event : '',
    IP: req.headers['x-forwarded-for'] || req.socket.remoteAddress
  })

  if (!waitlist) {
    let result = await postData(
      'https://to.underpass.clb.li/slack-invite',
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
    console.log(result)
    res.json({ status: 'success', message: 'You’ve been invited to Slack!' })
  } else {
    res.json({
      status: 'success',
      message: 'Your request will be reviewed soon.'
    })
  }
}
