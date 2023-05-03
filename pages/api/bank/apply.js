import AirtablePlus from 'airtable-plus'

const applicationsTable = new AirtablePlus({
  baseID: 'apppALh5FEOKkhjLR',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'Events'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    await fetch('https://bank.hackclub.com/api/v1/events/create_demo', {
      body: JSON.stringify({
        email: data.userEmail,
        name: data.eventName
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HCB_API_TOKEN || ''}`
      }
    })
      .then(r => r.json())
      .then(async r => {
        await applicationsTable.create({
          'First Name': data.firstName,
          'Last Name': data.lastName,
          'Email Address': data.userEmail,
          'Phone Number': data.userPhone,
          'Date of Birth': data.userBirthday,
          'Event Name': data.eventName,
          'Event Website': data.eventWebsite,
          'Tell us about your event': data.eventDescription,
          'Mailing Address': data.userAddress,
          'Address Line 1': data.addressLine1,
          'City': data.addressCity,
          'State': data.addressState,
          'Zip Code': data.addressZip,
          'Address Country': data.addressCountry,
          'Address Country Code': data.addressCountryCode,
          'Event Location': data.eventLocation,
          'Event Country Code': data.eventCountryCode,
          'Have you used Hack Club Bank for any previous events?':
            data.returningUser ? 'Yes, I have used Hack Club Bank before' : 'No, first time!',
          'How did you hear about HCB?': data.referredBy,
          'Transparent': data.transparent ? 'Yes, please!' : 'No, thanks.',
          'HCB account URL': `https://bank.hackclub.com/${r.slug}`
        })
        res.writeHead(302, { Location: '/bank/apply/success' }).end()
        console.log(r)
      })
      .catch(error => {
        console.log(error)
        res.json({ status: 'Something went wrong', error })
      })
  } else {
    res.status(405).json({ status: 'error', error: 'Must send POST request' })
  }
}
