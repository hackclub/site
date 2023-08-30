// 1. create a demo account on HCB and invite them to it
// 2. add this demo account info to the Applications Table

import AirtablePlus from 'airtable-plus'

const applicationsTable = new AirtablePlus({
  baseID: 'apppALh5FEOKkhjLR',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'Events'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body)

    await fetch('https://hcb.hackclub.com/api/v1/events/create_demo', {
      body: JSON.stringify({
        email: data.userEmail,
        name: data.eventName,
        category: data.eventCategory
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HCB_API_TOKEN}`
      }
    })
      .then(r => r.json())
      .then(async r => {
        await applicationsTable.create({
          'Email Address': data.userEmail,
          'Event Name': `${data.eventName} (${data.teamType} ${data.teamNumber})`,
          Status: 'Demo Account',
          'HCB account URL': `https://hcb.hackclub.com/${r.slug}`
        })
        res
          .status(200)
          .json({ message: 'Success! Check your email for next steps.' })
      })
      .catch(error => {
        console.error(error)
        res.json({ status: 'Something went wrong', error })
      })
  } else {
    res.status(405).json({ status: 'error', error: 'Must send POST request' })
  }
}
