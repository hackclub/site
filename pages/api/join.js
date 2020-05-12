const AirtablePlus = require('airtable-plus')
import fetch from 'isomorphic-unfetch'

const joinTable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'appaqcJtn33vb59Au',
  tableName: 'Join Requests'
})

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'POST') {
    const data = JSON.parse(req.body)

    const exists = await isDuplicate(data.name, data.email, data.reason)
    const empty = await isEmpty(data)

    if (!exists && !empty) {
      await joinTable.create({
        'Full Name': data.name,
        'Email Address': data.email,
        Student: data.teen,
        Reason: data.reason
      })
      fetch('https://hackclub-slacker.glitch.me/newmember', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(r => r.json())
    }
    res.json({ status: 'success' })
  }
}

async function isDuplicate(name, email, reason) {
  reason = reason.replace(`'`, `\\'`)
  const exists = await joinTable.read({
    filterByFormula: `AND({Full Name} = '${name}', {Email Address} = '${email}', Reason = '${reason}')`
  })
  return typeof exists[0] !== 'undefined'
}

function isEmpty(jsonObject) {
  let empty = true
  for (let key of Object.entries(jsonObject)) {
    if (key[1] !== '' && key[0] !== 'teen') {
      empty = false
      break
    }
  }
  return empty
}
