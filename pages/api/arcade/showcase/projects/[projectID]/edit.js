import AirtablePlus from 'airtable-plus'
import { ensureAuthed } from '../../login/test'

export default async function handler(req, res) {
  const user = await ensureAuthed(req)
  if (user.error) {
    return res.status(401).json(user)
  }

  const body = req.body
  if (!body) {
    return res.status(400).json({ error: 'No body provided' })
  }

  // html color input value always gives a 6-char hex color
  const colorRegex = /^#[0-9A-F]{6}$/i;
  if(body.color !== "" && !(colorRegex.test(body.color))) {
    return res
      .status(400)
      .json({ error: 'Invalid Color' });
  }
  if(body.textColor !== "" && !(colorRegex.test(body.textColor))) {
    return res
      .status(400)
      .json({ error: 'Invalid Text Color' });
  }

  if(body.hours <= 0) {
    return res
      .status(400)
      .json({ error: 'Hours should be a positive integer' });
  }

  const updatedFields = {}
  updatedFields['Name'] = body.title
  updatedFields['Estimated Hours'] = body.hours
  updatedFields['Description'] = body.description
  updatedFields['Slack Link'] = body.slackLink
  updatedFields['Code Link'] = body.codeLink
  updatedFields['Play Link'] = body.playLink
  updatedFields['Screenshot'] = [body.screenshot].map(i => ({ url: i }))
  // updatedFields['Video'] = [body.video].map(i => ({ url: i }))
  updatedFields['color'] = body.color
  updatedFields['textColor'] = body.textColor
  updatedFields['ScreenshotLink'] = body.screenshot
  updatedFields['VideoLink'] = body.video
  updatedFields['ReadMeLink'] = body.readMeLink

  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: 'Showcase'
  })

  const { projectID } = req.query

  const project = await airtable.update(projectID, updatedFields)

  const results = {
    id: project.id,
    title: project.fields['Name'] || '',
    hours: project.fields['Estimated Hours'] || '',
    description: project.fields['Description'] || '',
    slackLink: project.fields['Slack Link'] || '',
    codeLink: project.fields['Code Link'] || '',
    slackLink: project.fields['Slack Link'] || '',
    playLink: project.fields['Play Link'] || '',
    // images: (project.fields['Screenshot'] || []).map(i => i.url),
    user: user.fields['Name'],
    githubProf: project.fields['Github Profile'] || '',
    color: project.fields['color'] || '',
    textColor: project.fields['textColor'] || '',
    screenshot: project.fields['ScreenshotLink'] || '',
    video: project.fields['VideoLink'] || '',
    readMeLink: project.fields['ReadMeLink'] || ''
  }

  return res.status(200).json({ project: results })
}
