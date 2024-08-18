import AirtablePlus from 'airtable-plus'
import { ensureAuthed } from '../../login/test'

export default async function handler(req, res) {
  const user = await ensureAuthed(req)
  if (user.error) {
    return res.status(401).json(user)
  }

  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: 'Showcase'
  })

  const { projectID } = req.query

  const project = await airtable.read({
    filterByFormula: `AND({User} = '${user.fields['Name']}', RECORD_ID() = '${projectID}')`,
    maxRecords: 1
  })

  let screenshot
  try { screenshot = JSON.parse(project.fields['ScreenshotLinks']) } catch { screenshot = [] }

  let video
  try { video = JSON.parse(project.fields['VideoLinks']) } catch { video = [] }

  const results = project.map(p => ({
    id: p.id,
    title: p.fields['Name'] || '',
    desc: p.fields['Description'] || '',
    slackLink: p.fields['Slack Link'] || '',
    codeLink: p.fields['Code Link'] || '',
    slackLink: p.fields['Slack Link'] || '',
    playLink: p.fields['Play Link'] || '',
    images: (p.fields['Screenshot'] || []).map(i => i.url),
    githubProf: p.fields['Github Profile'] || '',
    user: user.fields['Name'],
    color: p.fields['color'] || '',
    textColor: p.fields['textColor'] || '',
    screenshot,
    video,
  }))
  return res.status(200).json({ project: results[0] })
}
