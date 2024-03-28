import AirtablePlus from 'airtable-plus'

export default async function handler(req, res) {
  const { 
    name,
    address_line_1,
    address_city,
    address_state,
    address_country,
    address_zip,
    phone_number,
   } = req.body

  const fields = {
    'Name': name,
    'Address (Line 1)': address_line_1,
    'Address (City)': address_city,
    'Address (State)': address_state,
    'Address (Country)': address_country,
    'Address (Zip)': address_zip,
    'Phone Number': phone_number,
  }

  const stickersTable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'appQdl1s9MOxDWdGt',
    tableName: 'Sticker Shipments'
  })

  await stickersTable.create(fields)

  res.status(200).json({ success: true })
}