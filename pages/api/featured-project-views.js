import featuredProject from '../../lib/featured-project.json'

let projectViews = {}

export default function handler(req, res) {
    const currentProjectId = featuredProject.id

    if (projectViews[currentProjectId] === undefined) {
        projectViews[currentProjectId] = 0
    }

    if (req.method === 'POST') {
        projectViews[currentProjectId] += 1
        return res.status(200).json({ views: projectViews[currentProjectId] })
    } else {
        return res.status(200).json({ views: projectViews[currentProjectId] })
    }
}