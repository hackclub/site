import AirtablePlus from 'airtable-plus'

const airtable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'app4kCWulfB02bV8Q',
  tableName: 'Users'
})
const locations = [
  { city: 'New York', country: 'USA' },
  { city: 'Paris', country: 'France' }
  // Add more locations...
]

// Work around a node v20.0.0, v20.1.0, and v20.2.0 bug. The issue was fixed
// in v20.3.0.
// https://github.com/nodejs/node/issues/47822#issuecomment-1564708870
// Safe to remove once support for Node v20 is dropped.
if (
    // !process.env.IS_BROWSER && // uncomment this line if you use a bundler that sets env.IS_BROWSER during build time
    process.versions &&
    // check for `node` in case we want to use this in "exotic" JS envs
    process.versions.node &&
    process.versions.node.match(/20\.[0-2]\.0/)
  ) {
    require("net").setDefaultAutoSelectFamily(false);
  }

// Function to get coordinates using OpenCage API
async function getCoordinates(city, country) {
  const apiKey = process.env.GEO_API_KEY
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)},${encodeURIComponent(country)}&key=${apiKey}`

  const response = await fetch(url)
  const data = await response.json()

  if (data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry
    console.log(lat)
    return { lat, lng }
  } else {
    throw new Error('Location not found')
  }
}

// const getUsers = async function () {
//   const records = await airtable.read({
//     filterByFormula: `{Total Earned (Hours)} > 3`,
//     fields: [
//       'Name',
//       'Description',
//       'Slack Link',
//       'Code Link',
//       'Play Link',
//       'ScreenshotLink',
//       'color',
//       'textColor'
//     ]
//   })

//   return records
// }

export default async function handler(req, res) {
  let coordinates = getCoordinates('New York', 'USA')
  return res.status(200).json({ coordinates })
}
