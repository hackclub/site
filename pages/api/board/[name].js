import {gerberToSvg} from "./svg/[board_url]";

export const FetchProject = async (name) => {
    const readme = await fetch(`https://raw.githubusercontent.com/hackclub/OnBoard/main/projects/${name}/README.md`)
    const text = await readme.text()
    // parse YAML frontmatter
    const lines = text.split('\n')
    const frontmatter = {}
    let i = 0
    for (; i < lines.length; i++) {
        if (lines[i].startsWith('---')) {
            break
        }
    }
    for (i++; i < lines.length; i++) {
        if (lines[i].startsWith('---')) {
            break
        }
        const [key, value] = lines[i].split(': ')
        frontmatter[key] = value
    }
    // check for a "thumbnail.png" file in the project directory
    //console.log(`https://github.com/snoglobe/OnBoard/raw/main/projects/${name}/thumbnail.png`)
    /*const thumbnail = await fetch(`https://github.com/snoglobe/OnBoard/raw/main/projects/${name}/thumbnail.png`, {mode: 'no-cors'})*/
    /*console.log(thumbnail)*/
    const image = /*thumbnail.ok ? `https://github.com/snoglobe/OnBoard/raw/main/projects/${name}/thumbnail.png`
        :*/ `data:image/svg+xml;base64,${btoa((await gerberToSvg(`https://github.com/snoglobe/OnBoard/raw/main/projects/${name}/gerber.zip`)).top)}`
    console.log("done")
    return({
        project_name: name ?? null,
        maker_name: frontmatter.name ?? null,
        slack_handle: frontmatter.slack_handle ?? null,
        github_handle: frontmatter.github_handle ?? null,
        tutorial: frontmatter.tutorial ?? null,
        description: lines.slice(i + 1).join('\n') ?? null,
        image: image ?? null
    })
}

export default async function handler(req, res) {
    const { name } = req.query
    if (!name) {
        return res.status(400).json({ status: 400, error: 'Must provide name' })
    }
    const project = await FetchProject(name)
    if (!project) {
        return res.status(404).json({ status: 404, error: 'Project not found' })
    }
    return res.status(200).json(project)
}