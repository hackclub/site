import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await fetch("https://bucky.hackclub.com", {
    method: 'POST',
    body: req.body,
    headers: {
      'Content-Type': req.headers['content-type']
    }
  }).then(r => r.text())
  res.status(200).json({ result })
}