export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { token, email } = req.body

      const url = new URL('http://takeout.hackclub.com/signup')
      url.searchParams.append('token', token)
      url.searchParams.append('email', email)

      const response = await fetch(url, { method: 'POST' })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.text()

      // Send the response from the replit-takeout service back to the client
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
