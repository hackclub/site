import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `https://thebluealliance.com/api/v3/team/frc${encodeURIComponent(
        Array.isArray(req.query.teamNumber)
          ? req.query.teamNumber[0]
          : req.query.teamNumber
      )}`,
      { headers: { 'X-TBA-Auth-Key': process.env.TBA_API_KEY } }
    )
    const data = await response.json()
    res.json(data)
  } catch (e) {
    res.status(404).json({ ok: false })
  }
}
