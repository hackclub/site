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
        Email: data.email
      })
      address = await addressesTable.create({
        'Street (First Line)': data.addressFirst,
        'Street (Second Line)': data.addressSecond,
        City: data.city,
        'State/Province': data.state,
        'Postal Code': data.zipCode,
        Person: [personRecord.id]
      })
    } else {
      address = (
        await addressesTable.read({
          filterByFormula: `{Person ID} = '${personRecord[0].fields['ID']}'`
        })
      )[0]
    }
    console.log('Address', address)

    const url = `https://hooks.zapier.com/hooks/catch/507705/o2dbufn/`
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
