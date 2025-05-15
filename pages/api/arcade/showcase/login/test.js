import AirtablePlus from "airtable-plus"

export const testAuth = async (authToken) => {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: "Users"
  })

  const safeAuthToken = authToken.replace(/[^a-zA-Z0-9-]/g, '')

  const results = await airtable.read({
    filterByFormula: `AND(NOT({Auth Token} = BLANK()), {Auth Token} = '${safeAuthToken}')`,
    maxRecords: 1
  })

  return results[0]
}

export const ensureAuthed = async (req) => {
  const authToken = req.headers['authorization']?.replace('Bearer ', '')
  const user = await testAuth(authToken || '')
  if (!user) {
    return { error: "User not found" }
  }
  return user
}

export default async function handler(req, res) {
  // example of how to ensure a request is authenticated
  const result = await ensureAuthed(req)
  if (result.error) {
    return res.status(401).json(result)
  } else {
    return res.status(200).json(result)
  }
}