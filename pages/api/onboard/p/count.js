import { getAllOnboardProjects } from '.'

export async function onboardProjectCount() {
  const projects = await getAllOnboardProjects()
  return projects.length
}

export default async function handler(req, res) {
  const count = await onboardProjectCount()

  res.json({ count })
}
