import AirtablePlus from 'airtable-plus'

const flavorText = async () => {
  const apiKey = process.env.AIRTABLE_API_KEY
  
  if (!apiKey) {
    console.warn('No Airtable API key provided. Returning empty flavor text.')
    return []
  }

  try {
    const airtable = new AirtablePlus({
      apiKey: apiKey,
      baseID: "app3ODCEuTL5iGjb3",
      tableName: "Flavor Text"
    })

    const records = await airtable.read()
    return records
  } catch (error) {
    console.error('Error fetching flavor text:', error)
    return []
  }
}

const inventoryParts = async () => {
  const apiKey = process.env.AIRTABLE_API_KEY
  
  if (!apiKey) {
    console.warn('No Airtable API key provided. Returning empty inventory.')
    return []
  }

  try {
    const airtable = new AirtablePlus({
      apiKey: apiKey,
      baseID: "app3ODCEuTL5iGjb3",
      tableName: "Inventory"
    })

    const records = await airtable.read()
    return records
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return []
  }
}

export default async function handler(req, res) {
  try {
    const data = {}
    await Promise.all([
      inventoryParts().then(d => data.inventory = d),
      flavorText().then(d => data.flavor = d),
    ])

    const inventoryResults = data.inventory
      .filter(record => record.fields && record.fields['Enabled'])
      .map(record => {
        return {
          name: record.fields['Name'],
          smallName: record.fields['Name Small Text'],
          hours: record.fields['Hours'],
          imageURL: record.fields['Image URL'],
          formURL: record.fields['Order Form URL'],
          description: record.fields['Description'],
          flavorText: record?.fields['Flavor text']?.map(recordID => {
            const flavorRecord = data.flavor.find(f => f.id == recordID)
            if (!flavorRecord || !flavorRecord.fields) {
              return null
            }
            
            const result = {
              message: flavorRecord.fields['Message'],
              character: flavorRecord.fields['Character'],
              imageURL: flavorRecord.fields['Image URL']
            }
            
            if (flavorRecord.fields['Shopkeepers']) {
              result.characterURL =
                flavorRecord.fields['Image Link (from Shopkeepers)']?.[0]
              result.character =
                flavorRecord.fields['Character (from Shopkeepers)']?.[0]
            }
            return result
          }).filter(Boolean) || [] 
        }
      })

    const selfClicks = {}
    data.flavor
      .filter(f => f.fields && f.fields['Self Click'])
      .forEach(record => {
        const char = record.fields['Character (from Shopkeepers)']?.[0]
        const charURL = record.fields['Image Link (from Shopkeepers)']?.[0]
        const charMsg = record.fields['Message']
        
        if (char && charURL && charMsg) {
          selfClicks[char] = selfClicks[char] || []
          selfClicks[char].push({
            message: charMsg,
            characterURL: charURL,
            character: char
          })
        }
      })

    res.status(200).json({inventory: inventoryResults, selfClicks})
  } catch (error) {
    console.error('Error in inventory handler:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}