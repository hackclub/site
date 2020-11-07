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
    let address = (await addressesTable.read({
      filterByFormula: `AND({Email} = '${data.email}', {Status} = '👍')`
    }))[0]

    if (!address) {
      let personRecord = await peopleTable.create({
        'Full Name': data.name,
        'Email': data.email
      })
      address = await addressesTable.create({
        'Street (First Line)': data.addressFirst,
        'Street (Second Line)': data.addressSecond,
        'City': data.city,
        'State/Province': data.state,
        'Country': data.country,
        'Person': [personRecord[0].id]
      })
      
      console.log('created address:', address)
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
