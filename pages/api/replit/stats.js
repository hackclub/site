export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const url = new URL('http://takeout.hackclub.com/stats')
      const response = await fetch(url)

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()
      res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching progress:', error)
      res
        .status(500)
        .json({ error: 'Error fetching progress', message: error.message })
    }
  } else {
    // Handle any non-GET requests
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
