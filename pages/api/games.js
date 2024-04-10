export async function getGames() {
  let games = await fetch(
    'https://sprig.hackclub.com/api/gallery?new'
  ).then(res => res.json())

  return games
}

export default async function Games(req, res) {
  const games = await getGames()
  res.json(games)
}
