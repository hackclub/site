const AirtablePlus = require('airtable-plus')

const peopleTable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  basedID: 'apptEEFG5HTfGQE7h',
  tableName: 'People'
})
const addressesTable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  basedID: 'apptEEFG5HTfGQE7h',
  tableName: 'Addresses'
})

export default async (req, res) => {
  if (req.method === 'POST') {
    const data = JSON.parse(body)
    let address

    // fetch person record
    const personRecord = await peopleTable.read({
      filterByFormula: `{Email} = '${data.email}'`,
      maxRecords: 1
    })
    if (typeof personRecord === 'undefined') {
      let personRecord = await peopleTable.create({
        'Full Name': data.name,
        'Email': data.email,
        'Address (first line)': data.addressFirst,
        'Address (second line)': data.addressSecond,
        'Address (city)': data.city,
        'Address (state)': data.state,
        'Address (zip code)': data.zipCode
      })
      address = await addressesTable.create({
        'Address (first line)': data.addressFirst,
        'Address (second line)': data.addressSecond,
        'Address (city)': data.city,
        'Address (state)': data.state,
        'Address (zip code)': data.zipCode,
        'Person': personRecord.id
      })
    }
    else {
      address = personRecord[0]
    }

    fetch(`https://hooks.zapier.com/hooks/catch/507705/o2dbufn/`, {
      method: 'POST',
      body: JSON.stringify({
        'test': false,
        'scenarioRecordID': 'recNDwjb7Zr04Szix',
        'receiverAddressRecordID': address.id,
        'missionNotes': 'Requested via hackclub.com'
      }
    })
      .then(r => { console.log(r.statusText); res.json({ status: 'success' }) })
      .then(r => res.json({ status: r.status }))
      })
    })
  }
}
