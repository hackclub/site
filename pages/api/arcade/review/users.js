import AirtablePlus from 'airtable-plus'

const airtable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'app4kCWulfB02bV8Q',
  tableName: 'Users'
})

const testData = [
  {
    id: 'rec1FzO4EkkGpmKrE',
    country: ['Czech Republic'],
    state: ['Středočeský kraj']
  },
  { id: 'rec1FbmaqLe8ymTYt', country: ['United States'], state: ['MA'] },
  { id: 'rec1Dad1HKUHgMnL6', country: ['Australia'], state: ['Victoria'] },
  { id: 'rec1DUg36umkIVqpK', country: ['India'], state: ['Delhi'] },
  { id: 'rec1CmBrkirXIdHwC', country: ['Pakistan'], state: ['Sindh'] },
  { id: 'rec1BnDrIaco309Tw', country: ['United States'], state: ['Texas'] },
  {
    id: 'rec1B324lcw2GqIsB',
    country: ['United States'],
    state: ['South Carolina']
  }
]
async function getRelevantUsers() {
  try {
    const users = await airtable.read({
      filterByFormula: `{Zach - Country} != ''`
    })

    console.log(users)

    const userLocations = users.map(user => {
      return {
        id: user.id,
        project:
          user.fields['Project'][0] || `${user.fields['Total Earned (Hours)']}`,
        country: user.fields['Zach - Country'],
        state: user.fields['Belle - State']
      }
    })

    console.log(userLocations)

    return userLocations
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

async function updateLocation(userId, lat, lng) {
  await airtable.update(userId, {
    lat: lat,
    long: lng
  })
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
    console.log(lng)
    return { lat, lng }
  } else {
    throw new Error('Location not found')
  }
}

export default async function handler(req, res) {
  // const users = await getRelevantUsers()
  // users.map(user => getCoordinates(user.state, user.country))

  for (const user of testData) {
    const { lat, lng } = await getCoordinates(user.state, user.country)
    await updateLocation(user.id, lat.toString(), lng.toString())
  }

  return res.status(200).json()
}
