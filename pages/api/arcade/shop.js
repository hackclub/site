import AirtablePlus from "airtable-plus"

export const shopParts = async () => {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: "app4kCWulfB02bV8Q",
    tableName: "Shop Items"
  })

  const records = await airtable.read()
  return records.map(record => ({id: record.id, ...record.fields}))
}

export default async function handler(req, res) {
  const data = await shopParts()

  const filteredData = data.filter(record => record["Enabled"]).map(record => {
    return {
      name: record['Name'],
      smallName: record['Small Name'],
      description: record['Description'],
      hours: record['Cost Hours'],
      imageURL: record['Image URL'],
    }
  })

  res.json(filteredData)
}