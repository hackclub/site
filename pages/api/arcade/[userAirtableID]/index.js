import AirtablePlus from "airtable-plus"

export async function getArcadeUser(recordID) {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: "Users"
  })

  return await airtable.find(recordID)
}

export default async function handler(req, res) {
  const { userAirtableID } = req.query

  const user = await getArcadeUser(userAirtableID)

  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }

  const hoursBalance = user.fields["Balance (Hours)"]

  res.json({ userAirtableID, hoursBalance })
}