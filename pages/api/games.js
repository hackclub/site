export default async function getGames(req, res) {
  let games = await fetch(
    'https://editor.sprig.hackclub.com/metadata.json'
  ).then(res => res.json())
  games = games.sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn)).slice(0, 2)

  return res.json(games)
}
