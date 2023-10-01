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

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    let personRecord = (
      await peopleTable.read({
        filterByFormula: `{Email} = '${data.email}'`
      })
    )[0]
    if (!personRecord) {
      personRecord = await peopleTable.create({
        'Full Name': data.name,
        Email: data.email
      })
    }

    let address = (
      await addressesTable.read({
        filterByFormula: `AND({Email} = '${data.email}', {Is Valid?} = '1', {Club} = '')`
      })
    )[0]

    if (!address) {
      address = await addressesTable.create({
        'Street (First Line)': data.addressFirst,
        'Street (Second Line)': data.addressSecond,
        City: data.city,
        'State/Province': data.state,
        'Postal Code': data.zipCode,
        Country: data.country,
        Person: [personRecord.id]
      })
    }

    if (
      !(
        address.fields['Street (First Line)'].toLowerCase() ===
        data.addressFirst.toLowerCase()
      )
    ) {
      address = await addressesTable.create({
        'Street (First Line)': data.addressFirst,
        'Street (Second Line)': data.addressSecond,
        City: data.city,
        'State/Province': data.state,
        'Postal Code': data.zipCode,
        Country: data.country,
        Person: [personRecord.id]
      })
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
      })
      .catch(error => {
        console.error(error)
        res.json({ status: 'error', error })
      })
  } else {
    res.status(405).json({ status: 'error', error: 'Must send POST request' })
  }
}
