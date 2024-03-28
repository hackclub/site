import AirtablePlus from 'airtable-plus'

export default async function handler(req, res) {
  const { email, t } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const fields = {}
  fields['Email'] = email
  fields['Type'] = t

  const subscribersTable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'appQdl1s9MOxDWdGt',
    tableName: 'Email Subscribers'
  })

  await subscribersTable.create(fields)

  res.status(200).json({ success: true })
}