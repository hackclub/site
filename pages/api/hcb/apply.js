import AirtablePlus from 'airtable-plus'

const applicationsTable = new AirtablePlus({
  baseID: 'apppALh5FEOKkhjLR',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'Events'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    await fetch('https://hcb.hackclub.com/api/v1/events/create_demo', {
      body: JSON.stringify({
        email: data.userEmail,
        name: data.eventName,
        transparent: data.transparent
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
          City: data.addressCity,
          State: data.addressState,
          'Zip Code': data.addressZip,
          'Address Country': data.addressCountry,
          'Address Country Code': data.addressCountryCode,
          'Event Location': data.eventLocation,
          'Event Country Code': data.eventCountryCode,
          'Have you used HCB for any previous events?':
            data.returningUser === 'true'
              ? 'Yes, I have used HCB before'
              : 'No, first time!',
          'How did you hear about HCB?': data.referredBy,
          Transparent:
            data.transparent === 'true' ? 'Yes, please!' : 'No, thanks.',
          'HCB account URL': `https://hcb.hackclub.com/${r.slug}`,
          'Contact Option': data.contactOption,
          'Slack Username': data.slackUsername,
          Accommodations: data.accommodations
        })
        res.writeHead(302, { Location: '/hcb/apply/success' }).end()
      })
      .catch(error => {
        console.error(error)
        res.writeHead(500, {
          Location: `/hcb/apply?step=3&airtable-error=${error}`
        })
      })
  } else {
    res.status(405).json({ status: 'error', error: 'Must send POST request' })
  }
}
