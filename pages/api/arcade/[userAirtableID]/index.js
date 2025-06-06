import AirtablePlus from "airtable-plus"

export async function getArcadeUser(recordID) {
  const apiKey = process.env.AIRTABLE_API_KEY
  
  if (!apiKey || apiKey === 'dummy_key_for_builds') {
    console.warn('No valid Airtable API key provided.')
    return null
  }

  try {
    const airtable = new AirtablePlus({
      apiKey,
      baseID: 'app4kCWulfB02bV8Q',
      tableName: "Users"
    })

    return await airtable.find(recordID)
  } catch (error) {
    console.error('Error fetching user from Airtable:', error.message)
    return null
  }
}

export default async function handler(req, res) {
  const { userAirtableID } = req.query

  if (!userAirtableID) {
    return res.status(400).json({ error: "User ID is required" })
  }

  try {
    const user = await getArcadeUser(userAirtableID)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const hoursBalance = user.fields?.["Balance (Hours)"] || 0

    res.json({ userAirtableID, hoursBalance })
  } catch (error) {
    console.error('Error in user handler:', error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}