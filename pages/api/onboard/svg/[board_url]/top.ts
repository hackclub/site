// test me with: curl http://localhost:3000/api/board/svg/https%3A%2F%2Fgithub.com%2Fhackclub%2FOnBoard%2Fraw%2Fmain%2Fprojects%2F2_Switch_Keyboard%2Fgerber.zip/top

import { gerberToSvg } from '.'

export default async function handler(req, res) {
  const { board_url } = req.query
  if (!board_url) {
    return res.status(404).json({ status: 404, error: 'Must provide file' })
  }
  // ensure valid file url is included
  const parsed_url = new URL(decodeURI(board_url))
  if (!parsed_url) {
    return res.status(404).json({ status: 404, error: 'Invalid file' })
  }
  const svg = await gerberToSvg(parsed_url)
  if (svg.error) {
    return res.status(svg.status).send(svg.error)
  }
  return res.status(200).send(svg.top)
}
