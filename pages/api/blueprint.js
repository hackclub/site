export async function fetchBlueprint() {
  try {
    const response = await fetch('https://blueprint.hackclub.com/api/site')
    if (!response.ok) {
      console.warn('Failed to fetch Blueprint data')
      return '100+ projects built'
    }
    const data = await response.text()
    return data
  } catch (error) {
    console.warn('Error fetching Blueprint data:', error)
    return '100+ projects built'
  }
}

export default async function Blueprint(req, res) {
  res.status(200).json(await fetchBlueprint())
}
