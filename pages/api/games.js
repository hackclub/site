export async function getGames() {
  let games = await fetch(
    'https://raw.githubusercontent.com/hackclub/sprig/main/games/metadata.json'
  ).then(res => res.json())
  games = games
    .sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn))
    .slice(-4)

  return games
}

export default async function Games(req, res) {
  const games = await getGames()
  res.json(games)
}
