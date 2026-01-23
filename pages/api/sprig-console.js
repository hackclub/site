export async function getConsoles() {
  try {
    const response = await fetch(
      'https://airbridge.hackclub.com/v0.1/Sprig%20Waitlist/Requests'
    )
    
    if (!response.ok) {
      return 100
    }

    const data = await response.json()

    function check(val) {
      return val === 'Pending' || val === 'Approved'
    }

    const consoleCount = Array.isArray(data)
      ? data.filter(console => check(console.fields.Status)).length
      : 100

    return consoleCount
  } catch (error) {
    console.error('Error fetching console data:', error)
    return 100
  }
}

export default async function SprigConsoles(req, res) {
  let consoleCount = 100
  try {
    consoleCount = await getConsoles()
  } catch (error) {
    console.error(error)
  }
  res.json(consoleCount)
}
