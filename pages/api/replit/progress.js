// pages/api/replit/progress.js
import fetch from 'node-fetch'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { token } = req.query

    if (!token) {
      return res.status(400).json({ error: 'Token is required' })
    }

    try {
      // Construct the URL with the token query parameter
      const url = new URL('https://replit-takeout.hackclub.com/progress')
      url.searchParams.append('token', token)

      // Make the request to the replit-takeout service
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.text()

      // Forward the response from the replit-takeout service to the client
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
