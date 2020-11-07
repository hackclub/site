import AirtablePlus from 'airtable-plus'

const peopleTable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'apptEEFG5HTfGQE7h',
  tableName: 'People'
})
const addressesTable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'apptEEFG5HTfGQE7h',
  tableName: 'Addresses'
})

export default async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body
    let address

    // fetch person record
    let personRecord = await peopleTable
      .read({
        filterByFormula: `{Email} = '${data.email}'`,
        maxRecords: 1
      })
      .catch(err => console.error(err))

    if (personRecord.length === 0) {
      personRecord = await peopleTable.create({
        'Full Name': data.name,
        'Email': data.email
      })
      let addressRecord = await addressesTable.create({
        'Street (First Line)': data.addressFirst,
        'Street (Second Line)': data.addressSecond,
        'City': data.city,
        'State/Province': data.state,
        'Country': data.country,
        'Person': [personRecord[0].id]
      })
      address = await addressesTable.create({
        'Address (first line)': data.addressFirst,
        'Address (second line)': data.addressSecond,
        'Address (city)': data.city,
        'Address (state)': data.state,
        'Address (zip code)': data.zipCode,
        'Person': [personRecord[0].id]
      })
    }
    else {
      address = (await addressesTable.read({
        filterByFormula: `AND({Email} = '${data.email}', {Status} = '👍')`
      }))[0]
    }

    const url = process.env.MAIL_MISSION_WEBHOOK
    const body = JSON.stringify({
      test: false,
      scenarioRecordID: 'recNDwjb7Zr04Szix',
      receiverAddressRecordID: address.id,
      missionNotes: 'Requested via hackclub.com'
    })
    fetch(url, {
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => {
        res.json({ status: 'success' })
        console.log(r.statusText)
      })
      .catch(error => {
        console.log(error)
        res.json({ status: 'error', error })
      })
  } else {
    res.status(405).json({ status: 'error', error: 'Must send POST request' })
  }
}
