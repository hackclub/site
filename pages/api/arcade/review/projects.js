import AirtablePlus from 'airtable-plus'

const airtable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'app4kCWulfB02bV8Q',
  tableName: 'Showcase'
})

async function getProjects() {
  try {
    const projects = await airtable.read({
      filterByFormula: `{ScreenshotLink} != ''`,
      fields: [
        'Name',
        'ScreenshotLink',
        'Name (from User)',
        'Zach - Country (from User)'
      ],
      maxRecords: 300
    })

    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function handler(req, res) {
  const projects = await getProjects()

  const results = projects.map(p => ({
    id: p.id,
    title: p.fields['Name'] || '',
    imageLink: p.fields['ScreenshotLink'] || '',
    user: p.fields['Name (from User)'] || '',
    country: p.fields['Zach - Country (from User)'] || ''
  }))

  return res.status(200).json({ results })
}
