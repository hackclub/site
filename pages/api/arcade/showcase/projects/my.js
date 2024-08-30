import AirtablePlus from 'airtable-plus'
import { ensureAuthed } from '../login/test'

const airtable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'app4kCWulfB02bV8Q',
  tableName: 'Showcase'
})

const getProjects = async function (authToken) {
  if (!authToken || authToken === '') {
    return []
  }
  const records = await airtable.read({
    filterByFormula: `AND({Creator Auth Token} = '${authToken}', NOT({deleted}))`,
    fields: [
      'Name',
      'Description',
      'Slack Link',
      'Code Link',
      'Play Link',
      'ScreenshotLink',
      'color',
      'textColor',
      'Lost Cohorts'
    ]
  })

  return records
}

export default async function handler(req, res) {
  const authToken = req.headers.authorization
  const safeAuthToken = authToken
    .replace(/Bearer /, '')
    .replace(/[^a-zA-Z0-9-]/g, '')

  const [user, projects] = await Promise.all([
    ensureAuthed(req),
    getProjects(safeAuthToken)
  ])
  if (user.error) {
    return res.status(401).json(user)
  }

  const hasVoted = user.fields['Voted']

  const results = projects.map(p => {
    const result = {
      id: p.id,
      title: p.fields['Name'] || '',
      desc: p.fields['Description'] || '',
      slackLink: p.fields['Slack Link'] || '',
      codeLink: p.fields['Code Link'] || '',
      slackLink: p.fields['Slack Link'] || '',
      playLink: p.fields['Play Link'] || '',
      imageLink: p.fields['ScreenshotLink'] || '',
      user: user.fields['Name'],
      color: p.fields['color'] || '',
      textColor: p.fields['textColor'] || ''
    }

    if (hasVoted) {
      result.inRunning = !(Boolean(p.fields['Lost Cohorts']))
    }
    return result
  })
  return res.status(200).json({ projects: results, name: user.fields['Name'] })
}
