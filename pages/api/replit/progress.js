export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { token } = req.query

    if (!token) return res.status(400).json({ error: 'Token is required' })

    try {
      const url = new URL('http://takeout.hackclub.com/progress')
      url.searchParams.append('token', token)

      const response = await fetch(url)

      if (!response.ok) {
        console.error(`HTTP error: ${response.status}`)
        return res.status(response.status).json({ 
          error: 'Error fetching progress', 
          message: `Failed with status ${response.status}` 
        })
      }

      const data = await response.json()
      res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching progress:', error.message || 'Unknown error')
      res
        .status(500)
        .json({ error: 'Error fetching progress', message: error.message || 'Unknown error' })
    }
  } else {
    // Handle any non-GET requests
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
