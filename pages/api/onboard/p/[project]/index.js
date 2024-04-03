// return a project's metadata

import { getAllOnboardProjects } from '..'

async function getReadmeData(url) {
  const readme = await fetch(url)
  const text = await readme.text()
  // parse YAML frontmatter
  const lines = text.split('\n')
  const frontmatter = {}
  let i = 0
  for (; i < lines.length; i++) {
    if (lines[i].startsWith('---')) {
      break
    }
  }
  for (i++; i < lines.length; i++) {
    if (lines[i].startsWith('---')) {
      break
    }
    const [key, value] = lines[i].split(': ')
    frontmatter[key] = value || null
  }
  const description = lines.slice(i + 1).join('\n')
  return {
    frontmatter,
    description
  }
}

export const getOnboardProject = async name => {
  // this is not performant to call all projects every time, but we're doing it for now while things load quickly enough
  // TODO: Speed this up
  try {
    const project = (await getAllOnboardProjects()).find(p => p.name === name)
    const readmeData = await getReadmeData(project.readmeURL)

    const result = { ...project, readmeData }

    return result
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function handler(req, res) {
  const { name } = req.query
  if (!name) {
    return res.status(400).json({ status: 400, error: 'Must provide name' })
  }
  const project = await getOnboardProject(name)
  if (!project) {
    return res.status(404).json({ status: 404, error: 'Project not found' })
  }
  return res.status(200).json(project)
}
