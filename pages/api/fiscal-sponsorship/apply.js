import AirtablePlus from 'airtable-plus'
import { getCode } from 'country-list'

const applicationsTable = new AirtablePlus({
  baseID: 'apppALh5FEOKkhjLR',
  apiKey: process.env.AIRTABLE_WRITE_API_KEY,
  tableName: 'Events'
})

const tub_programs = ['ftcscout', 'GFGS'] // Pre-approved TUB programs

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ status: 'error', error: 'Must send POST request' })
    return
  }

  const data = req.body
  const roboticsPriority = data['robotics-priority'] === 'true'

  await fetch('https://hcb.hackclub.com/api/v1/events/create_demo', {
    body: JSON.stringify({
      email: data.userEmail,
      name: data.eventName,
      country: getCode(data.userAddressCountry) || '',
      postal_code: data.userAddressPostalCode || '',
      transparent: 'false'
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
        'Zip Code': data.userAddressPostalCode,
        'Tell us about your event': data.eventDescription,
        'Address Line 1': data.userAddressLine1,
        City: data.userAddressCity,
        State: data.userAddressProvince,
        'Address Country': data.userAddressCountry,
        'Event Location': data.userAddressCountry,
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
        Accommodations: data.accommodations,
        'Teenager Led?': data.eventTeenagerLed === 'true',
        '(Adults) Political Activity': data.eventPoliticalActivity,
        '(Adults) Annual Budget': parseInt(data.eventAnnualBudget),
        'HCB ID': r.id,
        'Referral Code': data.referralCode,
        Tubs: tub_programs.includes(data.tub_program)
          ? data.tub_program
          : undefined,
        'Org Type': roboticsPriority ? 'FIRST/Robotics' : undefined
      })
      res.status(200).end()
    })
    .catch(error => {
      console.error(error)
      res.writeHead(500, {
        Location: `/hcb/apply?step=3&airtable-error=${error}`
      })
    })
}
