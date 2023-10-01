import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { data } = await axios(
      `https://thebluealliance.com/api/v3/team/frc${encodeURIComponent(
        req.query.teamNumber
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
