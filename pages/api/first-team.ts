import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios(
      `https://thebluealliance.com/api/v3/team/frc${encodeURIComponent(
        Array.isArray(req.query.teamNumber) ? req.query.teamNumber[0] : req.query.teamNumber
      )}`,
      {
        headers: {
          'X-TBA-Auth-Key': process.env.TBA_API_KEY
        }
      }
    )

    res.json(data)
  } catch (e) {
    res.status(404).json({ ok: false })
  }
}
