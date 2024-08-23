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

    console.log(req.body)
    const { overall, technical, creative } = req.body

    const pointsDistribution = [5, 4, 3, 2, 1]

    const users = await usersTable.read({
      filterByFormula: `{Auth Token} = '${authorization}'`
    })

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const userID = users[0].id

    const userRecord = await usersTable.find(userID)

    console.log(userRecord)
    const voted = userRecord.fields.Voted

    if (voted) {
      return res.status(404).json({ error: 'Already voted' })
    }

    let jobs = []

    for (let i = 0; i < overall.length; i++) {
      const project = overall[i]
      const points = pointsDistribution[i]

      jobs.push(addVote(project, points, userID, 'Overall'))
    }

    await Promise.all(jobs)

    jobs = []

    for (let i = 0; i < technical.length; i++) {
      const project = technical[i]
      const points = pointsDistribution[i]

      await addVote(project, points, userID, 'Technical')
    }

    await Promise.all(jobs)

    jobs = []

    for (let i = 0; i < creative.length; i++) {
      const project = creative[i]
      const points = pointsDistribution[i]

      await addVote(project, points, userID, 'Creative')
    }

    await Promise.all(jobs)

    await usersTable.update(userID, {
      Voted: true
    })

    res.status(200)
  } catch (error) {
    console.error('Error creating vote:', error)
    res.status(500).json({ error: error.message })
  }
}

const addVote = async (projectId, points, userID, type) => {
  if (!userID || !points || !projectId) {
    return res.status(400).json({ error: 'Missing required headers' })
  }

  const vote = await votesTable.create({
    Points: parseInt(points, 10),
    Voter: [userID],
    Showcase: [projectId],
    Type: type
  })
}
