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

  const inventoryResults = data.inventory.filter(record => record.fields["Enabled"]).map(record => {
    return {
      name: record.fields['Name'],
      smallName: record.fields['Name Small Text'],
      hours: record.fields['Hours'],
      imageURL: record.fields['Image URL'],
      flavorText: record?.fields['Flavor text']?.map(recordID => {
        const flavorRecord = data.flavor.find(f => f.id == recordID)
        const result = {
          message: flavorRecord.fields["Message"],
          character: flavorRecord.fields["Character"],
          imageURL: flavorRecord.fields["Image URL"]
        }
        if (flavorRecord.fields["Shopkeepers"]) {
          result.characterURL = flavorRecord.fields["Image Link (from Shopkeepers)"][0]
          result.character = flavorRecord.fields["Character (from Shopkeepers)"][0]
        }
        return result
      })
    }
  })

  const selfClicks = {}
  data.flavor.filter(f => f.fields['Self Click']).forEach(record => {
    const char = record.fields["Character (from Shopkeepers)"][0]
    const charURL = record.fields["Image Link (from Shopkeepers)"][0]
    const charMsg = record.fields["Message"]
    selfClicks[char] = selfClicks[char] || []
    selfClicks[char].push({
      message: charMsg,
      characterURL: charURL,
      character: char
    })
  })

  res.status(200).json({inventory: inventoryResults, selfClicks})
}