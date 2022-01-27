import AirtablePlus from 'airtable-plus'

const applicationsTable = new AirtablePlus({
  baseID: 'apppALh5FEOKkhjLR',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'Events'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const application = await applicationsTable.create({
      'First Name': data.firstName,
      'Last Name': data.lastName,
      'Email Address': data.userEmail,
      'Phone Number': data.userPhone,
      'Date of Birth': data.userBirthday,
      'Event Name': data.eventName,
      'Event Website': data.eventWebsite,
      'Tell us about your event': data.eventDescription,
      'Mailing Address': data.mailingAddress,
      Country: data.eventCountry,
      'Event Location': data.eventLocation,
      'Have you used Hack Club Bank for any previous events?':
        data.returningUser
    })

    const url = 'http://localhost:3000/api/bank-apply'
    const body = JSON.stringify(url, {
      application
    })
    fetch({
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => {
        res.redirect('/bank')
        console.log(r.statusText)
      })
      .catch(error => {
        console.log(error)
        res.json({ status: 'Something went wrong', error })
      })
  } else {
    res.status(405).json({ status: 'error', error: 'Must send POST request' })
  }
}
