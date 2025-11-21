let views = 0

export default function handler(req, res) {
  if (req.method === 'POST') {
    views++
  }
  res.status(200).json({ views })
}
