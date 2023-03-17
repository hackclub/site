export async function getGames() {
  // let games = await fetch(
  //   'https://editor.sprig.hackclub.com/metadata.json'
  // ).then(res => res.json())
    
  // games = games
  //   .sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn))
  //   .slice(0, 4)

  return []
}


export default async function Games(req, res) {
  const games = await getGames()
  res.json(games)
}