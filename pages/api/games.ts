import { NextApiRequest, NextApiResponse } from "next"

export async function getGames() {
  try {

  let games = await fetch(
    'https://sprig.hackclub.com/api/gallery?new'
  ).then(res => res.json())

  return games
  } catch(e) {
    console.error(e)
    return []
  }
}

export default async function Games(_req: NextApiRequest, res: NextApiResponse) {
  const games = await getGames()
  res.json(games)
}
