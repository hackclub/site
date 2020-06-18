import AirtablePlus from 'airtable-plus'

const joinTable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'appaqcJtn33vb59Au',
  tableName: 'Join Requests'
})

export default async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.status(204).json({ status: "YIPPE YAY. YOU HAVE CLEARANCE TO PROCEED." })
  }
  if (req.method == 'GET') {
    return res.status(405).json({ error: '*GET outta here!* (Method not allowed, use POST)' })
  }
  if (req.method == 'PUT') {
    return res.status(405).json({ error: '*PUT that request away!* (Method not allowed, use POST)' })
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' })
  }

  const data = req.body || {}

  console.log(data)

  await joinTable.create({
    'Full Name': data.name,
    'Email Address': data.email,
    Student: data.teen,
    Reason: data.reason,
    Invited: true,
    Notes: 'Added by the som-apply flow in the v3 codebase'
  })

  // This is a private api method found in https://github.com/ErikKalkoken/slackApiDoc/blob/master/users.admin.invite.md
  // I only got a successful response by putting all the args in URL params
  // Giving JSON body DID NOT WORK when testing locally
  // —@MaxWofford

  const params = [
    `email=${data.email}`,
    `token=${process.env.SLACK_LEGACY_TOKEN}`,
    `real_name=${data.name}`,
    'restricted=true',
    `channels=C015MKW1A3D`,
    'resend=true'
  ].join('&')
  const url = `https://slack.com/api/users.admin.invite?${params}`
  await fetch(url, { method: 'POST', }).then(r => r.json()).then(r => console.log('Slack response', r))

  res.json({ status: 'success', message: 'You’ve been invited to Slack!' })
}
