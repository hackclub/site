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

    const exists = await recordExists(data.name)
    const empty = await isEmpty(data)

    if (!exists && !empty) {
      await joinTable.create({
        'Full Name': data.name,
        'Email Address': data.email,
        Student: data.teen,
        Reason: data.reason
      })
    }
    res.json({ status: 'success' })
  }
}

async function recordExists(name) {
  const exists = await joinTable.read({
    filterByFormula: `{Full Name} = '${name}'`
  })
  return typeof exists !== 'undefined'
}

function isEmpty(jsonObject) {
  let empty = true
  Object.entries(jsonObject).map(key => {
    if (key[1] !== '') {
      empty = false
    }
  })
  return empty
}
