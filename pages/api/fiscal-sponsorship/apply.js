import AirtablePlus from 'airtable-plus'
import { getCode } from 'country-list'

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
        country: getCode(data.eventLocation) || '',
        transparent: data.transparent,
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
          'Mailing Address': '',
          'Address Line 1': '',
          City: '',
          State: '',
          'Zip Code': '',
          'Address Country': '',
          'Address Country Code': '',
          'Event Location': data.eventLocation,
          'Event Country Code': getCode(data.eventLocation),
          'Have you used HCB for any previous events?': '',
          'How did you hear about HCB?': 'This field doesn\'t exist on the form anymore.',
          Transparent: 'Yes, please!',
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
