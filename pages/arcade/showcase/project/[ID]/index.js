import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import ProjectView from '../../../../../components/arcade/showcase/project-view'


const ProjectShowPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMsg, setError] = useState(null)
  useEffect(async () => {
    const token = window.localStorage.getItem('arcade.authToken')
    const response = await fetch(`/api/arcade/showcase/projects/${id}`, {
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