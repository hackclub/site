import AirtablePlus from "airtable-plus"
import { ensureAuthed } from "../login/test"

export default async function handler(req, res) {
  const authToken = req.body?.authToken
  if (!authToken) {
    return res.status(401).json({ error: 'No auth token provided' })
  }
  const user = await ensureAuthed({ headers: { authorization: `Bearer ${authToken}` } })
  if (user.error) {
    return res.status(401).json(user)
  }

  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: "Showcase"
  })

  if (!req.body.codeLink) {
    return res.status(400).json({ error: 'No code link provided' })
  }

  const org = req.body.codeLink?.split('/')?.[3]
  const name = req.body.codeLink?.split('/')?.slice(-1)?.[0]
  const ghData = await fetch(`https://api.github.com/repos/${org}/${name}`).then(r => r.json())
  const description = ghData.description || ''
  const playLink = ghData.homepage || ''

  const project = await airtable.create({
    "User": [user.id],
    "Code Link": req.body.codeLink,
    "Name": name,
    "Description": description,
    "Play Link": playLink,
  })

  return res.status(200).json({ project: project.id })
}