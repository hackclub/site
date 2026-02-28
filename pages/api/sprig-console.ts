import { NextApiRequest, NextApiResponse } from "next"

function check(val: any) {
  return val === 'Pending' || val === 'Approved'
}

export async function getConsoles() {
  try {
    const response = await fetch(
      'https://airbridge.hackclub.com/v0.1/Sprig%20Waitlist/Requests'
    )

    if (!response.ok) {
      return 100
    }

    const data = await response.json()

    const consoleCount = Array.isArray(data)
      ? data.filter(console => check(console.fields.Status)).length
      : 100

    return consoleCount
  } catch (error) {
    console.error('Error fetching console data:', error)
    return 100
  }
}

export default async function SprigConsoles(_req: NextApiRequest, res: NextApiResponse) {
  let consoleCount = 100
  try {
    consoleCount = await getConsoles()
  } catch (error) {
    console.error(error)
  }
  res.json(consoleCount)
}
