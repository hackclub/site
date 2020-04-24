const AirtablePlus = require('airtable-plus')

const joinTable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'appaqcJtn33vb59Au',
  tableName: 'Join Requests'
})

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'POST') {
    const data = JSON.parse(req.body)
    console.log(data)
    await joinTable.create({
      'Full Name': data.name,
      'Email Address': data.email,
      Student: data.teen,
      Reason: data.reason
    })
    res.json({ status: 'success' })
  }
}
