import { useEffect, useState } from 'react'
import ProjectView from '../../../../../components/arcade/showcase/project-view'

const ProjectShowPage = ({projectID}) => {
  const [project, setProject] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMsg, setError] = useState(null)
  useEffect(async () => {
    const token = window.localStorage.getItem('arcade.authToken')
    const response = await fetch(`/api/arcade/showcase/projects/${projectID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).catch(e => {
      console.error(e)
      setStatus('error')
      setError(e)
    })
    const data = await response.json()
    if (data.error) {
      setStatus('error')
      return
    } else {
      setProject(data.projects)
      setStatus('success')
    }
    console.log("project", project);
  }, [])

  return (
    <div>
      <ProjectView
        key={project.id}
        id={project.id}
        title={project.title}
        desc={project.desc}
        slack={project.slackLink}
        codeLink={project.codeLink}
        playLink={project.playLink}
        images={project.images}
        githubProf={project.githubProf}
      />
    </div>
  )
}

export default ProjectShowPage

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
export async function getStaticProps({params}) {
  const { projectID } = params
  console.log({ params })

  return { props: { projectID } }
}
