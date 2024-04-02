async function onboardProjectCount() {
  const url = 'https://api.github.com/repos/hackclub/onboard/contents/projects'

  const response = await fetch(url).then(r => r.json())
  const countedProjects = response.filter(
    folder =>
      folder.type === 'dir' && folder.name[0] !== '.' && folder.name[0] !== '!'
  )
  return countedProjects.length
}

export default async function handler(req, res) {
  const count = await onboardProjectCount()

  res.json({ count })
}
