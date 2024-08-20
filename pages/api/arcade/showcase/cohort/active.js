import AirtablePlus from 'airtable-plus'

async function getCohortFromAuth(authToken) {
  const safeAuthToken = authToken?.replace(/[^a-zA-Z0-9-]/g, '')
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: 'Cohorts'
  })
  const cohorts = await airtable.read({
    filterByFormula: `AND(
      FIND("${safeAuthToken}", {Allowed Voter Keys}) > 0,
      {Is Active} = true
    )`,
    maxRecords: 1
  })
  const cohort = cohorts[0]
  return cohort
}

async function getShowcases(cohort) {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: 'Showcase'
  })

  const showcaseIDs = cohort.fields['Showcases']
  const showcaseFormula = [
    'FALSE()',
    ...showcaseIDs.map(id => `RECORD_ID() = '${id}'`)
  ]

  const showcases = await airtable.read({
    filterByFormula: `OR(${showcaseFormula.join(', ')})`
  })
  return showcases
}

export default async function handler(req, res) {
  const authToken = req.headers['authorization']?.replace('Bearer ', '')

  const cohort = await getCohortFromAuth(authToken)
  if (!cohort) {
    return res.status(401).json({ error: 'No cohort found for user' })
  }

  let showcases = await getShowcases(cohort)

  res.status(200).json({
    cohort: {
      id: cohort.id
    },
    showcaseIDs: cohort.fields['Showcases'],
    showcases
  })
}
