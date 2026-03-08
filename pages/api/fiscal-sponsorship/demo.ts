export default async function handler(req, res) {
  return res.status(500).json({ status: 'error', error: 'API unsupported' })
}
