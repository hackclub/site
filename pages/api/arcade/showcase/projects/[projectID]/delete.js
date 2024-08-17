import AirtablePlus from "airtable-plus";
import { ensureAuthed } from "../../login/test";
import { DefaultLegendContent } from "recharts";

export default async function handler(req, res) {
  const user = await ensureAuthed(req)
  if (user.error) {
    return res.status(401).json(user)
  }

  const body = req.body
  if (!body) {
    return res.status(400).json({ error: "No body provided" })
  }

  const updatedFields = {}
  updatedFields['deleted'] = true;

  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: "Showcase"
  })

  const { projectID } = req.query

  const project = await airtable.update(projectID, updatedFields )

  const results = {
    id: project.id,
    title: project.fields['Name'] || '',
    desc: project.fields['Description'] || '',
    slackLink: project.fields['Slack Link'] || '',
    codeLink: project.fields['Code Link'] || '',
    slackLink: project.fields['Slack Link'] || '',
    playLink: project.fields['Play Link'] || '',
    images: (project.fields['Screenshot'] || []).map(i => i.url),
    githubProf: project.fields['Github Profile'] || '',
    deleted: project.fields['deleted'] || ''
  }

  return res.status(200).json({ project: results })
}