// returns a list of all projects

export const getAllOnboardProjects = async () => {
  const url = 'https://api.github.com/repos/hackclub/onboard/contents/projects'
  const fetchOptions = {}
  if (process.env.GITHUB_TOKEN) {
    // this field is optional because we do heavy caching in production, but nice to have for local development
    fetchOptions.headers = {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    }
  }

  let res;
  try { res = await fetch(url, fetchOptions).then(r => r.json()) }
  catch (e) {
    console.error('Failed to fetch projects from GitHub', e)
    return []
  }

  if (res.message && res.message.startsWith('API rate limit exceeded')) {
    console.error('GitHub API rate limit exceeded')
    return []
  }
  if(!res) return []

  const projects = []

  res.forEach(p => {
    if (p.type !== 'dir') {
      return
    }
    if (p.name[0] === '.') {
      return
    }
    if (p.name[0] === '!') {
      return
    }

    const projectData = {
      name: p.name,
      url: `https://github.com/hackclub/OnBoard/tree/main/projects/${p.name}/README.md`,
      galleryURL: `/onboard/board/${p.name}`,
      githubURL: p.html_url,
      readmeURL: `https://raw.githubusercontent.com/hackclub/OnBoard/main/projects/${p.name}/README.md`,
      schematicURL: `https://raw.githubusercontent.com/hackclub/OnBoard/main/projects/${p.name}/schematic.pdf`,
      gerberURL: `https://raw.githubusercontent.com/hackclub/OnBoard/main/projects/${p.name}/gerber.zip`
    }

    projectData.imageTop = `/api/onboard/svg/${encodeURIComponent(projectData.gerberURL)}/top`
    projectData.imageBottom = `/api/onboard/svg/${encodeURIComponent(projectData.gerberURL)}/bottom`

    projects.push(projectData)
  })

  return projects
}

export default async function handler(req, res) {
  const projects = await getAllOnboardProjects()

  res.json(projects)
}
