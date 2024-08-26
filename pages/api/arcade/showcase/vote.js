import AirtablePlus from 'airtable-plus'

const usersTable = new AirtablePlus({
  baseID: 'app4kCWulfB02bV8Q',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'Users'
})

const votesTable = new AirtablePlus({
  baseID: 'app4kCWulfB02bV8Q',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'Vote'
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const authorization = req.headers['authorization']
      ?.replace('Bearer ', '')
      .replace(/[^a-zA-Z0-9-]/g, '')

    if (!authorization || authorization.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid authorization header' })
    }

    const users = await usersTable.read({
      filterByFormula: `{Auth Token} = '${authorization}'`,
      maxRecords: 1
    })
    const user = users[0]

    if (!user) {
      return res.status(400).json({ error: 'Missing or invalid authorization header' })
    }

    if (user.fields['Voted']) {
      return res.status(404).json({ error: 'Already voted' })
    }

    const { overall, technical, creative } = req.body

    if (!overall || !technical || !creative) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    const pointsDistribution = [5, 4, 3, 2, 1]

    let votesToCreate = []

    for (let i = 0; i < overall.length; i++) {
      const project = overall[i]
      const points = pointsDistribution[i]

      votesToCreate.push(addVote(project, points, user.id, 'Overall'))
    }

    for (let i = 0; i < technical.length; i++) {
      const project = technical[i]
      const points = pointsDistribution[i]

      votesToCreate.push(addVote(project, points, user.id, 'Technical'))
    }

    for (let i = 0; i < creative.length; i++) {
      const project = creative[i]
      const points = pointsDistribution[i]

      votesToCreate.push(addVote(project, points, user.id, 'Creative'))
    }

    await Promise.all([
      batchCreate(votesTable, votesToCreate),
      usersTable.update(user.id, {
        Voted: true
      })
    ])

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error creating vote:', error)
    return res.status(500).json({ error: error.message })
  }
}

const addVote = (projectId, points, userID, type) => {
  return {
    fields: {
      Points: parseInt(points, 10),
      Voter: [userID],
      Showcase: [projectId],
      Type: type
    }
  }
}

async function batchCreate(table, records) {
  const chunks = []

  while (records.length > 0) {
    chunks.push(records.splice(0, 10))
  }

  for (const chunk of chunks) {
    console.log({ chunk })
    await table.create(chunk)
  }
}