import AirtablePlus from 'airtable-plus'

async function inviteToArcadius({ email }) {
  const slackKey = process.env.SLACK_KEY
  
  if (!slackKey) {
    console.warn('No Slack key provided. Skipping Arcadius invitation.')
    return { ok: false, error: 'Slack key not configured' }
  }

  try {
    const response = await fetch('https://arcadius.hackclub.com/slack-invite', {
      body: JSON.stringify({
        email
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${slackKey}`
      }
    }).then(r => r.json())

    return response
  } catch (error) {
    console.error('Error inviting to Arcadius:', error)
    return { ok: false, error: 'Failed to send Slack invitation' }
  }
}

async function inviteToAirtable({ email, ip }) {
  const apiKey = process.env.AIRTABLE_API_KEY
  
  if (!apiKey) {
    console.warn('No Airtable API key provided. Skipping Airtable logging.')
    return { id: null, error: 'Airtable API key not configured' }
  }

  try {
    const airtable = new AirtablePlus({
      baseID: 'appaqcJtn33vb59Au',
      apiKey: apiKey,
      tableName: 'Arcade Joins'
    })
    return await airtable.create({ 'Email': email, 'IP': ip })
  } catch (error) {
    console.error('Error creating Airtable record:', error)
    return { id: null, error: 'Failed to log to Airtable' }
  }
}

async function markInvitedInAirtable({ recordID }) {
  const apiKey = process.env.AIRTABLE_API_KEY
  
  if (!apiKey || !recordID) {
    console.warn('No Airtable API key or record ID provided. Skipping invite marking.')
    return { error: 'Cannot mark as invited - missing API key or record ID' }
  }

  try {
    const airtable = new AirtablePlus({
      baseID: 'appaqcJtn33vb59Au',
      apiKey: apiKey,
      tableName: 'Arcade Joins'
    })
    const result = await airtable.update(recordID, { 'Invited': true })
    return result
  } catch (error) {
    console.error('Error marking as invited in Airtable:', error)
    return { error: 'Failed to mark as invited in Airtable' }
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body
      const email = data.userEmail
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

      if (!email) {
        return res.json({ status: 400, error: 'Email is required' })
      }

      const result = {}
      await Promise.all([
        inviteToArcadius({ email }).then(r => result.arcadius = r),
        inviteToAirtable({ email, ip }).then(r => result.airtable = r)
      ])

      if (result.arcadius?.ok) {
        if (result.airtable?.id) {
          await markInvitedInAirtable({ recordID: result.airtable.id })
        }
        res.json({ status: 200, message: 'Invitation sent!' })
      } else {
        const errorMessage = result.arcadius?.error || 'Failed to send invitation'
        res.json({ status: 400, error: errorMessage })
      }
    } catch (error) {
      console.error('Handler error:', error)
      res.json({ status: 500, error: 'Internal server error' })
    }
  } else {
    res.json({ status: 405, error: 'POST method required' })
  }
}