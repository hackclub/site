import AirtablePlus from 'airtable-plus'

async function getCohortFromAuth(authToken) {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: 'Cohorts'
  })
  const cohorts = await airtable.read({
    filterByFormula: `AND(
      FIND("${authToken}", ARRAYJOIN({Allowed Voter Keys})) > 0,
      {Is Active} = TRUE()
    )`,
    maxRecords: 1
  })
  const cohort = cohorts[0]
  return cohort
}

async function getShowcasesFromAuth(authToken) {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: 'Showcase'
  })

  const showcases = await airtable.read({
    filterByFormula: `
      FIND("${authToken}", ARRAYJOIN({Allowed Voter Keys})) > 0
    `,
    fields: ['Name', 'Code Link', 'Play Link', 'Description', 'color', 'textColor', 'ScreenshotLink', 'ReadMeLink', 'View link']
  })

  return showcases
}

async function getUserFromAuth(authToken) {
  const usersTable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: 'Users'
  })
  const users = await usersTable.read({
    filterByFormula: `{Auth Token} = '${authToken}'`,
    maxRecords: 1
  })
  const user = users[0]
  return user
}

export default async function handler(req, res) {
  const authorization = req.headers['authorization']?.replace('Bearer ', '')
    ?.replace(/[^a-zA-Z0-9-]/g, '')

  if (!authorization || authorization.length === 0) {
    return res.status(400).json({ error: 'Missing or invalid authorization header' })
  }

  const [cohort, user, showcases] = await Promise.all([
    getCohortFromAuth(authorization),
    getUserFromAuth(authorization),
    getShowcasesFromAuth(authorization)
  ])

  if (!cohort || !user) {
    return res.status(401).json({ error: 'No cohort or user found' })
  }

  res.status(200).json({
    voted: user.fields['Voted'],
    cohort: {
      id: cohort.id
    },
    showcases
  })
}
