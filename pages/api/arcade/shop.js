import AirtablePlus from "airtable-plus"

const shopParts = async () => {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: "app4kCWulfB02bV8Q",
    tableName: "Shop Items"
  })

  const records = await airtable.read()
  return records
}

export default async function handler(req, res) {
  const data = await inventoryParts()

  const filteredData = data.filter(record => record.fields["Enabled"]).map(record => {
    return {
      name: record.fields['Name'],
      smallName: record.fields['Small Name'],
      description: record.fields['Description'],
      hours: record.fields['Cost Hours'],
      imageURL: record.fields['Image URL'],
    }
  })

  res.json(filteredData)
}