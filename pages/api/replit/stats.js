export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await fetch('http://takeout.hackclub.com/stats')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      res.status(200).json(data)
    } catch (error) {
      console.error('Error processing signup:', error)
      res
        .status(500)
        .json({ message: 'Error processing signup', error: error.message })
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
