import AirtablePlus from 'airtable-plus'

const airtable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'app4kCWulfB02bV8Q',
  tableName: 'Users'
})

// Function to get coordinates using OpenCage API
async function getCoordinates(city, country) {
  const apiKey = process.env.GEO_API_KEY
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)},${encodeURIComponent(country)}&key=${apiKey}`

  const response = await fetch(url)
  const data = await response.json()

  if (data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry

    console.log(lat)
    console.log(lng)
    return { lat, lng }
  } else {
    throw new Error('Location not found')
  }
}

export default async function handler(req, res) {
  const { lat, lng }  = await getCoordinates('New York', 'USA')
  console.log(lat)
  console.log(lng)

  return res.status(200).json({ 'lat': lat, 'lng': lng })
}
