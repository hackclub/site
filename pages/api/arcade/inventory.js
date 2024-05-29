import AirtablePlus from "airtable-plus"

const flavorText = async () => {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: "app3ODCEuTL5iGjb3",
    tableName: "Flavor Text"
  })

  const records = airtable.read()
  return records
}

const inventoryParts = async () => {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: "app3ODCEuTL5iGjb3",
    tableName: "Inventory"
  })

  const records = await airtable.read()
  return records
}

export default async function handler(req, res) {
  const data = {}
  await Promise.all([
    inventoryParts().then(d => data.inventory = d),
    flavorText().then(d => data.flavor = d),
  ])

  const result = data.inventory.filter(record => record.fields["Enabled"]).map(record => {
    return {
      name: record.fields['Name'],
      hours: record.fields['Hours'],
      imageURL: record.fields['Image URL'],
      flavorText: record?.fields['Flavor text']?.map(recordID => {
        return {
          message: data.flavor.find(f => f.id == recordID).fields["Message"],
          character: data.flavor.find(f => f.id == recordID).fields["Character"]
        }
      })
    }
  })

  res.status(200).json(result)
}