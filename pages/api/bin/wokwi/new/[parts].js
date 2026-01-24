import { findOrCreateProject } from "."

export default async function handler(req, res) {
  const parts = req.query.parts.split('|')
  const shareLink = await findOrCreateProject(parts)
  res.redirect(shareLink)
}